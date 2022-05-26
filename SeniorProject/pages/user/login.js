import styles from "../../styles/Home.module.css";
import { projectAuth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Layout from "../../layout/layout";
import { H1, H2, H3, BodyIntro, Title } from "../../styles/TextStyles";
import styled from "styled-components";
import router from "next/router";

const auth = projectAuth;

function getLoginInputValue() {
  var emailInput = document.getElementById("email").value;
  var passInput = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, emailInput, passInput)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.uid;

      alert("User signed in! " + user);
      router.push("/user/profiles");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
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

export default function Login() {
  return (
    <Layout>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "25%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <title>Login Validation</title>

        <Title>Login</Title>
      </div>
      
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          display: "grid",
        }}
      >
        <label>Username </label>
        <Input id="email" type="text"></Input>

        <label>Password </label>
        <Input id="pass" type="password"></Input>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          display: "inline-block",
          textAlign: "center"
        }}
      >
        <Button
          id="loginButton"
          onClick={() => {
            getLoginInputValue();
          }}
        >
          Log In
        </Button>
        <Button
          onClick={() => {
            auth.signOut().then(() => console.log("Sign Out"));
          }}
        >
          Log Out
        </Button>
      </div>
    </Layout>
  );
}
