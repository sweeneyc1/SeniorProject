import Link from "next/link";
import React from "react";
import Image from "next/image";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
// import utilStyles from '../../styles/utils.module.css'
import {
  Container,
  Div1,
  Div2,
  Div3,
  NavLink,
  SocialIcons,
} from "./NavBarStyle";
// import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
const NavBar = (props) => (
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
      <Link href="/post/addPost">Post</Link>
      <Link href="/ContentView/ContentCard">Content</Link>
      <Link href="/user/profiles">Profile</Link>
      <Link href="/user/register">Log Out</Link>
    </Div3>
  </Container>
);

export default NavBar;
