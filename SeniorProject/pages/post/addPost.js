import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { projectStorage } from "../../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "../../firebase/firebase";
import styles from "../../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import Layout from "../../layout/navBarLayout";
import styled from "styled-components";

export default function AddPost() {
  let caption;
  const [uid, setUid] = useState("");

  const auth = projectAuth;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUid(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const CREATE_POST = gql`
    mutation CreatePost($userId: String, $media: String, $caption: String) {
      createPost(userID: $userId, media: $media, caption: $caption) {
        id
        userID
        media
        caption
        timestamp
      }
    }
  `;

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  if (error) return `Submission error! ${error.message}`;

  const storage = projectStorage;
  const metadata = {
    contentType: "image/jpeg",
  };
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload() {
    const storageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  }

  return (
    <Layout>
      <Margin>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
          }}
        >
          <input type="file" accept="image/*" onChange={handleChange} />
          <button disabled={!file}>Add Image</button>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost({
              variables: { userId: uid, caption: caption.value, media: url },
            });
          }}
        >
          <label>
            Caption:
            <input
              ref={(node) => {
                caption = node;
              }}
            />
          </label>
          <button>Send Post</button>
        </form>

        {/* <img src={url} alt="" /> */}
      </Margin>
    </Layout>
  );
}

const Margin = styled.div`
margin-left: 20px;
margin-top: 20px;
`
