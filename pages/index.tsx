import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Post } from '../components/Post';
import { sanityClient, urlFor } from '../sanity';
import { IPost } from '../typings';

interface IHomeProps {
  posts: IPost[];
}

const Home: NextPage<IHomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Hero />
      <div className='mt-8 container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-xl'>
        <div className='grid gap-10 lg:gap-10 md:grid-cols-2 '>
          {posts.slice(0, 2).map((post) => (
            <Post post={post} key={post._id} aspect='landscape' />
          ))}
        </div>
        <div className='grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 '>
          {posts.slice(2).map((post) => (
            <Post key={post._id} post={post} aspect='square' />
          ))}
        </div>
      </div>
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
    image,
  },
  description,
  excerpt,
  mainImage,
  slug,
  _createdAt,
  _updatedAt
}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
