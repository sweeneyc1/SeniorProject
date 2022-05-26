import React from 'react'
import Header from '../components/NavBar/NavBar'
import styled from 'styled-components';



const Container = styled.div`
max-width: 1280px;
width: 100%;
margin: auto;
`;


export default function Layout({ children }) {
  return (
    <Container>
      <Header/>
      <main>{children}</main> 
   </Container>
  )
}