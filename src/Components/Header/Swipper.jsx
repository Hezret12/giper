import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

export default function Swipper({swip}) {

  const navigate = useNavigate();
  console.log(swip)
  return (
    <div className=''>
        <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}   
    >
     {swip && swip.map((l,index)=>(
     <SwiperSlide onClick={()=> navigate(`/swipper/${l.productRelationshipId}/${l.filterParams}`)} key={index}><img className='h-auto w-full' src={l.image.siteImageUrl} alt={index}></img></SwiperSlide>))}
    
    </Swiper>
    </div>
  )
}
