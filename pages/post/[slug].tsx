import { GetStaticProps } from 'next';
import React from 'react';
import { Header } from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { IPost } from '../../typings';

export interface IPostPageProps {
  post: IPost;
}

const PostPage: React.FunctionComponent<IPostPageProps> = ({ post }) => {
  console.log(post);

  return (
    <main>
      <Header />
    </main>
  );
};

export default PostPage;

export const getStaticPaths = async () => {
  const query = `*[ _type == "post"]{
        _id,
        slug {
            current
        }
    }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: IPost) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug] [0] {
  _id,
  title,
  author-> {
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

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 10, // after 10 secs will update the old cache version
  };
};
