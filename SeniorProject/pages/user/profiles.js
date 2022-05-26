import Image from "next/image";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "../../firebase/firebase";
import styled from "styled-components";
import ProfileCard from "../ContentView/ProfileCard";
import Layout from "../../layout/navBarLayout";
import Settings from "./settings";
import router from "next/router";


const StatsMainBox = styled.div`
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
    position: absolute;
    overflow: visible;
    width: 531px;
    height: auto;
    left: 100px;
	top: 150px;
`;

const ProfilePic = styled.div`
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.161));
	position: absolute;
	width: 231px;
	height: 223px;
	left: 150px;
	top: 0px;
	overflow: visible;
`;

const FullNameText = styled.div`
    left: 223px;
	top: 238px;
	position: absolute;
	overflow: visible;
	width: 87px;
	height: 37px;
	text-align: left;
	font-family: Calibri;
	font-style: normal;
	font-weight: normal;
	font-size: 30px;
	color: rgba(0,0,0,1);
	letter-spacing: 0.075px;
`;

const StatsSubBox = styled.div`
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.161));
	position: absolute;
	overflow: visible;
	width: 462px;
	height: 53px;
	left: 35px;
	top: 290px;
`;

const StatsSubText = styled.div`
    left: 301px;
	top: 359px;
	position: absolute;
	overflow: visible;
	width: 130px;
	height: 40px;
	text-align: center;
	font-family: Calibri;
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	color: rgba(0,0,0,1);
	letter-spacing: 0.075px;
`;

const BioBox = styled.div`
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
    position: absolute;
    overflow: visible;
    width: 448px;
    left: 42px;
	top: 376px;
    opacity: 0.87;
    fill: rgba(255,255,255,1);
`;

const BioText = styled.div`
    left: 0px;
	top: 0px;
	position: absolute;
	overflow: visible;
	width: 448px;
	text-align: center;
	font-family: Calibri;
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	color: rgba(0,0,0,1);
	letter-spacing: 0.075px;
`;


const auth = projectAuth;
const GET_USER_PROFILE = gql`
  query GetUserByID($id: String) {
    getUserByID(id: $id) {
      id
      name
      username
      email
      timestamp
      profileImage
    }
  }
`;
const StyledImage = styled(Image)`
  border-radius: 10px;
`;

function UserProfile({ id }) {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Layout>
         <div key={data.getUserByID.id}>
      <StatsMainBox>

        <ProfilePic>
        {data.getUserByID.profileImage ? (
          <StyledImage
            placeholder="blurDataURL"
            src={data.getUserByID.profileImage}
            alt=""
            width={500}
            height={500}
          />) : <Settings/>}
        </ProfilePic>
        <FullNameText>{data.getUserByID.name}</FullNameText>
        <StatsSubBox>
          <StatsSubText></StatsSubText>
        </StatsSubBox>
        <BioBox>
          <BioText>
            @{data.getUserByID.username}
            <br></br>
            {"Joined: " +
              new Date(parseInt(data.getUserByID.timestamp)).toLocaleString(
                ("en-GB", { timeZone: "UTC" })
              )}
          </BioText>
        </BioBox>
      </StatsMainBox>
    </div>
    </Layout>
 
  );
}
export default function Profile() {
  const [uid, setUid] = useState("");

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
  return (
    <div> 
        <UserProfile id={uid} />
        <ProfileCard uid={uid}/>
    </div>
  );
}
