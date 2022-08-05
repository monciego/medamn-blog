import { GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react';
import { Header } from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { IPost } from '../../typings';
import { parseISO, format } from 'date-fns';
import Link from 'next/link';
import PortableText from 'react-portable-text';

export interface IPostPageProps {
  post: IPost;
}

const PostPage: React.FunctionComponent<IPostPageProps> = ({ post }) => {
  console.log(post.body);

  return (
    <main>
      <Header />
      <div className='max-w-screen-md mx-auto '>
        <h1 className='mt-4 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl '>
          {post.title}
        </h1>

        <div className='flex justify-center mt-3 space-x-3 text-gray-500 '>
          <div className='flex items-center gap-3'>
            <div className='relative flex-shrink-0 w-10 h-10'>
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).url()}
                  layout='fill'
                  className='rounded-full'
                  priority
                />
              )}
            </div>
            <div>
              <p className='text-gray-800 dark:text-gray-400'>
                {post.author.name}
              </p>
              <div className='flex items-center space-x-2 text-sm'>
                <time
                  className='text-gray-500 dark:text-gray-400'
                  dateTime={post?._updatedAt || post._createdAt}
                >
                  {format(
                    parseISO(post?._updatedAt || post._createdAt),
                    'MMMM dd, yyyy'
                  )}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative mt-4 z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video'>
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).url()}
            layout='fill'
            loading='eager'
            objectFit='cover'
            priority
          />
        )}
      </div>

      <article className='max-w-screen-lg mx-auto '>
        <div className='mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500'>
          {/* {post.body && <PortableText value={post.body} />} */}
          {post.body && (
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              className=''
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className='text-2xl font-bold my-5' {...props} />
                ),
                h2: (props: any) => (
                  <h2 className='text-xl font-bold my-5 ' {...props} />
                ),
                li: ({ children }: any) => (
                  <li className='ml-4 list-disc'>{children}</li>
                ),
                links: ({ href, children }: any) => (
                  <a href={href} className='text-blue-500 hover:underline'>
                    {children}
                  </a>
                ),
              }}
            />
          )}
        </div>
        <div className='flex justify-center mt-7 mb-7'>
          <Link href='/'>
            <a className='px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 '>
              ← View all posts
            </a>
          </Link>
        </div>
        {/* {post.author && <AuthorCard author={post.author} />} */}
      </article>
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
  body,
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
