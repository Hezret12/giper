import React, { useEffect, useState } from 'react'
import Cart from './Cart';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';


export default function MaxProduct({id}) {

    const [product,setProducts] = useState();
    const {i18n} = useTranslation();

    const getProduct = async () => {
         try {
           const response = await axios.get(`https://gipertm.com/api/v2/products/group/short/${id}?max=5&lang=${i18n.language}`);
           setProducts(response.data)
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };
    
       useEffect(()=>{
         getProduct(id);
       },[i18n.language])
  return (
    <div>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
            {product ? product.map((item)=>(
            <Cart key={item.id} products={item}/> )) :
            <ReactLoading type={"bars"} className='ml-[220%]' color={"purple"} height={70} width={80} />
          }
        </div>
    </div>
  )
}
