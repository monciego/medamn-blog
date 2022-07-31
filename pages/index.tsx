import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
