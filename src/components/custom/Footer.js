import React from 'react'

function Footer() {
  return (
    <footer className='absolute bottom-0 left-0 w-full p-4'>
      <div className='flex items-center justify-around'>
        <p className='text-md text-black dark:text-white'>Made with ❤️ by Tarun Singh</p>
        <a href='https://github.com/tarunsinghofficial' className='text-md text-black dark:text-white hover:underline'>@GitHub</a>
      </div>
    </footer>
  )
}

export default Footer