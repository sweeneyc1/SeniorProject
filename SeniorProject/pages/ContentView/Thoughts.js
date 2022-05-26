import { useState } from "react";
import { render } from "react-dom";
import styles from "../../styles/Home.module.css";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter, withRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "../../firebase/firebase";
import Layout from "../../layout/navBarLayout";

const BubbleGroupStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 700px;
  margin-top: 3rem;
`;

const Bubble = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  //transition: color 0.15s ease, border-color 0.15s ease;
  width: 50%;
`;

const Title = styled.p`
  font-size: 21px;
  font-weight: bolder;
  text-decoration: underline;
`;

const FirstComment = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Comment = styled.p`
  font-size: 12px;
`;

const Username = styled.p`
  font-size: 12px;
`;

const Time = styled.p`
  font-size: 12px;
  font-weight: lighter;
`;

const CREATE_THOUGHT = gql`
  mutation CreateThought(
    $userId: String
    $discussionId: String
    $comment: String
  ) {
    createThought(
      userID: $userId
      discussionID: $discussionId
      comment: $comment
    ) {
      id
    }
  }
`;

const GET_THOUGHTS_BY_DISUCUSSION_ID = gql`
  query GetThoughtsByDiscussionID($getThoughtsByDiscussionIdId: String) {
    getThoughtsByDiscussionID(id: $getThoughtsByDiscussionIdId) {
      id
      comment
      timestamp
      user {
        name
        username
      }
    }
  }
`;

const GET_DICUSSION_BY_POST_ID = gql`
  query GetDiscussions($getDiscussionsByPostIdId: String) {
    getDiscussionsByPostID(id: $getDiscussionsByPostIdId) {
      id
      title
      comment
      timestamp
      thought {
        id
        comment
      }
      user {
        name
      }
    }
  }
`;

const CREATE_NEW_DISCUSSION = gql`
  mutation Mutation(
    $userId: String
    $postId: String
    $title: String
    $comment: String
  ) {
    createDiscussion(
      userID: $userId
      postID: $postId
      title: $title
      comment: $comment
    ) {
      id
    }
  }
`;

// data represenation of a singular discussion bubble
const BubbleComponent = (props) => {
  const [isTextShowing, isTextShown] = useState(false);
  const [comment, setComment] = useState("");
  const [createThought, { data, loading, error }] = useMutation(CREATE_THOUGHT);

  // get all thoughts within this discussion
  const {
    data: thoughtsData,
    refetch,
    loading: thoughtsLoading,
  } = useQuery(GET_THOUGHTS_BY_DISUCUSSION_ID, {
    variables: {
      getThoughtsByDiscussionIdId: props.data.id, // id of this current discussion
    },
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  // callback usesd when the user presses button to post comment
  const handleSave = async () => {
    if (!comment) {
      return alert("comment is required");
    }
    try {
      const response = await createThought({
        variables: {
          userId: props.authId,
          discussionId: props.data.id,
          comment,
        },
      });

      // refetch so that we can refresh the dom so user sees new comment immediatly after post
      refetch();
      isTextShown(false);
      setComment("");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <Bubble>
      <Title>
        {props.data.title} - @{props.data.user?.name}
      </Title>
      <FirstComment>{props.data.comment}</FirstComment>

      {thoughtsLoading ? (
        <div>loading</div>
      ) : (
        thoughtsData.getThoughtsByDiscussionID?.map((v, index) => (
          <div key={index}>
            <Comment> {v.comment} @{v.user?.username}  </Comment>

            <Time>
              {new Date(parseInt(v.timestamp)).toLocaleString(
                ("en-GB", { timeZone: "UTC" })
              )}
            </Time>
          </div>
        ))
      )}
      <hr></hr>

      <button onClick={() => isTextShown(!isTextShowing)}>Add Comment</button>
      {isTextShowing ? (
        <div>
          <textarea value={comment} onChange={handleOnChange}></textarea>
          <button onClick={handleSave}> post comment</button>
        </div>
      ) : (
        <></>
      )}

    </Bubble>

  );
};

// props are passed in dynamically from content card to this page
const Thoughts = (props) => {
  const [uid, setUid] = useState("");
  const auth = projectAuth;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const authUid = user.uid;
      setUid(authUid);
    }
  });

  const { data: AllDiscussions, loading } = useQuery(GET_DICUSSION_BY_POST_ID, {
    variables: {
      getDiscussionsByPostIdId: props.router.query.id,
    },
  });
  const [CreateDiscussion, { discussionData, discussionLoading, error }] =
    useMutation(CREATE_NEW_DISCUSSION);

  // Creates pop up text boxes within browser for user to create a new discussion Bubble
  const CreateNewDiscussion = () => {
    const discussionTitle = prompt("New dicsussion Title");
    if (discussionTitle != null && discussionTitle != "") {
      const initalComment = prompt("enter new comment");
      if (initalComment != null && initalComment != "") {
        CreateDiscussion({
          variables: {
            userId: uid,
            postId: props.router.query.id,
            title: discussionTitle,
            comment: initalComment,
          },
        });
      }
    }
  };

  if (loading) return <div>loading</div>;
  return (
    <Layout>
      <div>
      <button
        onClick={() => {
          CreateNewDiscussion();
        }}
      >
        Create New Discussion
      </button>
      <BubbleGroupStyle>
        {AllDiscussions?.getDiscussionsByPostID?.map((value, index) => {
          return <BubbleComponent key={index} data={value} authId={uid} />;
          
        })}
      </BubbleGroupStyle>
    </div>
    </Layout>
    
  );
};

export default withRouter(Thoughts);