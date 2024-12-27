import React, { useEffect, useState } from 'react'

export default function Time() {
    const [check,setCheck] = useState(4);
    const timeExpress = [
        {
            id:1,
            time: [10,13],
            find: "active"
        },
        {
           id:2,
           time: [13,16],
           find: "active"
        },
        {
            id:3,
            time: [16,18],
            find: "active"
        },
        {
            id:4,
            time: [18,20],
            find: "active"
        },
        {
            id:5,
            time: [20,22],
            find: "active"
        }
    ]
    const tomorrowExpress = [
        {
            id:10,
            time: [10,13],
            find: "active"
        },
        {
           id:20,
           time: [13,16],
           find: "active"
        },
        {
            id:30,
            time: [16,18],
            find: "active"
        },
        {
            id:40,
            time: [18,20],
            find: "active"
        },
        {
            id:50,
            time: [20,22],
            find: "active"
        }
    ]
    const [day,setDay] = useState(timeExpress);

    const dayFilter = () => {
        const hours = new Date().getHours();
        setDay(day.filter((e)=>( hours < e.time[0])))
    }
    useEffect(()=>{
     dayFilter();
    },[])

    
  return (
    <div>
        <h4 className='border-t pt-2 font-bold text-lg'>Ertip berme wagty</h4>
        {day && <span>Şu gün</span> } 
        <div className='grid grid-cols-2'>
        {day && day.map((t)=>(
        <section className='flex gap-1' key={t.id} onClick={()=>setCheck(t.id)}>
        <span className='relative'>
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className='text-gray-400' height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
          <circle cx={"256"} cy={"256"} r="192" fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth={"32"}></circle>
        </svg>
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className={`text-blue-500 ${ t.id === check ? "z-0": "-z-10"}  absolute top-0 bottom-0`} height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
        </svg>
        </span>
        {<p>{t.time[0]}:00 - {t.time[1]}:00</p>}
        </section>))}
        </div>
        <span>Erti</span>
        <section className='grid grid-cols-2 gap-1'>
        {tomorrowExpress && tomorrowExpress.map((t)=>(
        <section className='flex gap-1' key={t.id} onClick={()=>setCheck(t.id)}>
        <span className='relative'>
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className='text-gray-400' height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
          <circle cx={"256"} cy={"256"} r="192" fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth={"32"}></circle>
        </svg>
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className={`text-blue-500 ${ t.id === check ? "z-0": "-z-10"}  absolute top-0 bottom-0`} height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
        </svg>
        </span>
        {<p>{t.time[0]}:00 - {t.time[1]}:00</p>}
        </section>))}
        </section>
    </div>
  )
}
