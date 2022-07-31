import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.svg';
import Link from 'next/link';

export interface IHeaderProps {}

export const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className='bg-slate-800'>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          <div className='relative flex items-center justify-between h-16'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              <button
                onClick={toggle}
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>

                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>

                <svg
                  className='hidden h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex-shrink-0 flex items-center'>
                <Link href='/'>
                  <a>
                    <Image
                      className='cursor-pointer w-auto'
                      src={logo}
                      height={32}
                    />
                  </a>
                </Link>
              </div>
              <div className='hidden sm:block sm:ml-6'>
                <div className='flex space-x-4'>
                  <h3 className='cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                    About
                  </h3>
                  <h3 className='cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                    Contact
                  </h3>
                </div>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <button
                type='button'
                className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              >
                <span className='sr-only'>View notifications</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='#fff'
                >
                  <path d='M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z' />
                  <path d='M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* className='sm:hidden' */}
        <div className={isOpen ? 'sm-hidden block' : 'hidden'} id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            <h3
              className='cursor-pointer bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
              aria-current='page'
            >
              About
            </h3>

            <h3 className='cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
              Contact
            </h3>
          </div>
        </div>
      </nav>
    </>
  );
};
