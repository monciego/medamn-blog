import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';

interface IHomeProps {
  posts: Post[];
}

const Home: NextPage<IHomeProps> = ({ posts }) => {
  console.log(posts);

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

export const getServerSideProps = async () => {
  const query = `*[ _type == "post"]{
  _id,
  title,
  author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
