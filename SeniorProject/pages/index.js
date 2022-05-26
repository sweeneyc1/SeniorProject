import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { gql, useQuery} from "@apollo/client";
import styled from 'styled-components';
import Layout from '../layout/layout';
import About from '../components/About/About';

const GET_USER = gql`
  query Query {
    getUsers {
      id
      name
      username
      email
      timestamp
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className={styles.grid}>
    {data.getUsers.map((user) => (
      <Card key={user.id}>
        <p>
          {user.name + " - "}

          {new Date(parseInt(user.timestamp)).toLocaleString(('en-GB', { timeZone: 'UTC' }))}
        </p>
      </Card>
    ))}
  </div>
  );

}

export const Card = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;
`

export default function Home() {

  return (
    <Layout>
      <About/>
    </Layout>
    
    // <div className={styles.container}>
    //   <Head>
    //     <title>Popflash</title>
    //     <meta name="description" content="Popflash" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className={styles.main}>
    //     <h1 className={styles.title}>
    //       Popflash
    //     </h1>

    //     <p className={styles.description}>
    //       Get started by editing{' '}
    //       <code className={styles.code}>pages/index.js</code>
    //     </p>
    //     <Users/>

    //   </main>

    //   <footer className={styles.footer}>
    //     <a
    //       href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Powered by{' '}
    //       <span className={styles.logo}>
    //         <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    //       </span>
    //     </a>
    //   </footer>
    // </div>
  )
}
