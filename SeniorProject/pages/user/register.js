import styles from "../../styles/Home.module.css";
import { projectAuth } from "../../firebase/firebase";
import { gql, useMutation } from "@apollo/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Header from "../../components/Header/Header";
import Layout from "../../layout/layout";
import { H1, H2, H3, BodyIntro, Title } from "../../styles/TextStyles";
import styled from "styled-components";

const auth = projectAuth;

const ADD_USER = gql`
  mutation Mutation(
    $id: String
    $name: String
    $username: String
    $email: String
  ) {
    createUser(id: $id, name: $name, username: $username, email: $email) {
      id
      name
      username
      email
    }
  }
`;

const Button = styled.button`
  display: inline-block;
  color: black;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

function AddUser() {
  let name;
  let username;
  let email;
  let password;

  const [addUser, { data, loading, error }] = useMutation(ADD_USER);
  if (loading) return "Submitting...";
  //if (error) return `Submission error! ${error.message}`;

  async function getRegisterInput(
    nameInput,
    usernameInput,
    emailInput,
    passInput
  ) {
    await createUserWithEmailAndPassword(auth, emailInput, passInput)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user.uid;
        console.log(user);
        addUser({
          variables: {
            id: user,
            name: nameInput,
            username: usernameInput,
            email: emailInput,
          },
        });
        alert(user);
        router.push("/user/profiles");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + "\n" + errorMessage);
      });
  }

  return (
    <Layout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getRegisterInput(
            name.value,
            username.value,
            email.value,
            password.value
          );
          name.value = "";
          username.value = "";
          email.value = "";
          password.value = "";
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "grid",
          }}
        >
          <label>
            Name
            <Input
              ref={(node) => {
                name = node;
              }}
            />
          </label>

          <label>
            Username
            <Input
              ref={(node) => {
                username = node;
              }}
            />
          </label>

          <label>
            Email
            <Input
              ref={(node) => {
                email = node;
              }}
            />
          </label>

          <label>
            Password
            <Input
              type="password"
              ref={(node) => {
                password = node;
              }}
            />
          </label>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "72%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Button type="submit">Register</Button>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "62%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </form>
    </Layout>
  );
}

export default function register() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "25%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <title>Sign Up</title>
        <Title>Sign Up</Title>
      </div>
      <AddUser />
    </div>
  );
}
