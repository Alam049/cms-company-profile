import Image from 'next/image'
import React from 'react'
import Theme from '../theme'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between fixed z-50 w-full p-6 sm:px-12'>
       <Link 
       href="/"
       className='flex items-center gap-1'
       >
       <Image
        src="/site-logo.svg"
        alt='Logo'
        width={23}
        height={23}
        />
        <p>SG<span>CMS</span> </p>
       </Link>
        <div>
            <Theme/>
        </div>
    </nav>
  )
}

export default Navbar