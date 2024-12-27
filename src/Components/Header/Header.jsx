import React from 'react'
import Input from './Input'
import Category from './Category'

export default function Header() {
  return (
    <div className='bg-gradient-to-r sticky top-0 z-30 from-[#4a56bd] to-[#be84f0] text-[.875rem] leading-[1.60rem]'>
      <Input />
      <div className='hidden md:block border-b-[0.1px] border-white'></div>
      <Category/>
    </div>
  )
}
