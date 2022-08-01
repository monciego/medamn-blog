import Link from 'next/link';
import React from 'react';
import { cx } from '../utils/all';
import { urlFor } from '../sanity';
import { IPost } from '../typings';
import Image from 'next/image';

interface IPostProps {
  post: IPost;
  aspect: string;
}

export const Post: React.FunctionComponent<IPostProps> = ({ post, aspect }) => {
  return (
    <>
      <div className='cursor-pointer group'>
        <div
          className={cx(
            'relative overflow-hidden transition-all duration-300 bg-gray-100 rounded-md dark:bg-gray-200 hover:scale-105',
            aspect === 'landscape' ? 'aspect-video' : 'aspect-square'
          )}
        >
          <Link href={`/post/${post.slug.current}`}>
            <a>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).url()}
                  sizes='80vw'
                  layout='fill'
                  objectFit='cover'
                />
              )}
            </a>
          </Link>
        </div>
        <h2 className='mt-2 text-lg font-semibold tracking-normal text-brand-primary '>
          <Link href={`/post/${post.slug.current}`}>
            <span
              className='bg-gradient-to-r from-indigo-500 to-indigo-400
          bg-[length:0px_10px]
          bg-left-bottom
          bg-no-repeat
          transition-[background-size]
          duration-500
          hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]'
            >
              {post.title}
            </span>
          </Link>
        </h2>

        {post.excerpt && (
          <p className='mt-2 text-sm text-gray-700 '>
            <Link href={`/post/${post.slug.current}`}>{post.excerpt}</Link>
          </p>
        )}

        <div className='flex items-center mt-3 space-x-3 text-gray-600'>
          <div className='flex items-center gap-3'>
            <div className='relative flex-shrink-0 w-5 h-5'>
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).url()}
                  objectFit='cover'
                  layout='fill'
                  alt={post?.author?.name}
                  sizes='30px'
                  className='rounded-full'
                />
              )}
            </div>
            <span className='text-sm'>{post.author.name}</span>
          </div>
          <span className='text-xs text-gray-600'>&bull;</span>
          {/* install date-fns and add the updated at */}
          <time className='text-sm' dateTime={post._createdAt}>
            {/* fixed this undefined createdAt */}
            {/* {post._createdAt} */}
            August 01, 2022
          </time>
        </div>
      </div>
    </>
  );
};
