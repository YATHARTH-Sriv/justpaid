import React from 'react'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'

function Navbar() {
  return (
    <div className="navbar border-black bg-base-100 fixed top-0 left-0 w-full z-50">
    <div className="navbar-start">
      <Link href={"/"} className="text-5xl m-2 p-3 font-bold flex text-gray-800">JustPaid<p className=' rounded-full text-green-500'>.</p></Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
        <Link className=' hover:bg-black hover:text-white font-medium text-xl' href={""}>
            Home
            </Link>
        </li>
        <li>
            <summary className='  hover:bg-black hover:text-white font-medium text-xl'>
            Platform
            </summary>
        </li>
        <li>
            <Link className='  hover:bg-black hover:text-white font-medium text-xl' href={""}>
            About
            </Link>
        </li>
        <li>
            <Link className='  hover:bg-black hover:text-white font-medium text-xl' href={""}>
            Blog
            </Link>
        </li>
      </ul>
    </div>
    <div className="navbar-end gap-3">
      <Link href={"/login"} className=" text-black mr-7">Login</Link>
      <Link href={"/sign-in"} className=" flex hover:bg-black text-md btn  bg-black text-white ">Schedule Demo<FaArrowRightLong className=" m-1 hover:bg-black hover:text-white" /></Link>
    </div>
  </div>
  )
}

export default Navbar