import React, { useState } from 'react'

export default function Pay() {
    const [check,setCheck] = useState(11);
    console.log(check,"check")

    const pay = [
        {id:11,name:"Nagt toleg"},
        {id:22,name:"Kart tolegi"},
        {id:33,name:"Online tolegi"}
      ]
  return (
    <div className='flex gap-2'>
          {pay && pay.map((times)=>(
        <section className='flex gap-1' key={times.id} onClick={()=>setCheck(times.id)}>
        <span className='relative'>
            {times.id !== check ?
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className='text-gray-400' height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
          <circle cx={"256"} cy={"256"} r="192" fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth={"32"}></circle>
        </svg> :
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className={`text-blue-500`} height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
        </svg>}
        </span>
        {<p>{times.name}</p>}
        </section>))}
    </div>
  )
}
