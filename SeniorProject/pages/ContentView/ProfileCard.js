import TinderCard from "react-tinder-card";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";

const GET_POST = gql`
  query GetPostsByUserID($id: String) {
    getPostsByUserID(id: $id) {
      id
      userID
      media
      caption
      timestamp
      user {
        username
      }
      discussion {
        id
      }
    }
  }
`;

function Posts({ id }) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });
  const [lastDirection, setLastDirection] = useState();

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  // main styling for user content cards
  return (
    <Center>
      <CardContainer>
        {data.getPostsByUserID.map((post) => (
          <TinderCard
            key={post.id}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, post.caption)}
            onCardLeftScreen={() => outOfFrame(post.caption)}
          >
            <Swipe>
              <Card>
                <CardImage src={post.media}></CardImage>
                <H3> {post.caption} </H3>
                <P>
                  {`@` + post.user.username} <br />
                  {new Date(parseInt(post.timestamp)).toLocaleString(
                    ("en-GB", { timeZone: "EST" })
                  )}
                </P>
                <Button
                  onClick={() =>
                    router.push({
                      pathname: "/ContentView/Thoughts",
                      query: { id: post.id },
                    })
                  }
                >
                  View Discussion
                </Button>
              </Card>
            </Swipe>
          </TinderCard>
        ))}
      </CardContainer>
    </Center>
  );
}

const Button = styled.button`
  display: center;
  position: absolute;
  color: black;
  font-size: 1em;
  border: 2px solid black;
  padding: 0 16px;
  margin: auto;
  width: 50%;
`;

const Card = styled.div`
  display: inline-block;
  width: 90vw;
  max-width: 400px;
  height: 600px;
  background: #ffffff;
  padding-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  will-change: transform;
  transition: all 0.3s ease-in-out;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
  border: 2px solid black;
`;

const CardImage = styled.img`
  display: center;
  width: 100%; /* Can be in percentage also. */
  height: auto;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  max-width: 100%;
  max-height: 400px;
  pointer-events: none;
  padding: auto;
`;
const H3 = styled.h3`
  margin-top: 32px;
  font-size: 32px;
  padding: 0 16px;
  pointer-events: none;
`;
const P = styled.p`
  position: absolute;
  font-size: 20px;
  padding: 16px;
  pointer-events: none;
`;

const Center = styled.div`
  margin: auto;
  width: 60%;
  padding: 10px;
`;

const CardContainer = styled.div`
  margin: auto;
  width: 180vw;
  max-width: 520px;
  height: 600px;
`;

const Swipe = styled.div`
  position: absolute;
`;

export default function ProfileCard({ uid }) {
  return (
    <div>
      <Posts id={uid} />
    </div>
  );
}
