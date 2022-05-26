import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import styled from "styled-components";
import {
  Container,
  Div1,
  Div2,
  Div3,
  NavLink,
  SocialIcons,
} from "./HeaderStyle";
// import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
const Header = (props) => (
  <Container>
    <Div1>
      {/* <Image
        src="/images/justin.png"
        height={300}
        width={300}
    /> */}
      <Link href="/">Popflash</Link>
    </Div1>
    <Div3>
        <Link href="/user/login">Login</Link>
      <Link href="/user/register">Sign Up</Link>
    </Div3>
  </Container>
);

export default Header;
