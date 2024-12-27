import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cart from '../Cart';

export default function Total({item}) {

    const [product,setProduct] = useState(null);

    const cartProducts = async () => {
        try {
        const response = await axios.get(`https://gipertm.com/api/v2/products/looksByThisProduct/164316?lang=tk&cId=${item.categories[0].id}&cCode=${item.categories[0].code}&bId=${item.manufacturer.id}&bCode=${item.manufacturer.code}&pCode=${item.categories[0].parents[0]}`)
        setProduct(response.data);
        } catch (error) {
            console.log(error)
        }}
    
        useEffect(()=>{
            cartProducts();
        },[item])

     return (
        <div>
        <h2 className='text-2xl font-bold roboto-medium text-gray-800 my-2'>Meňzeş harytlar</h2>
        <div className='grid grid-cols-5 gap-2'>
         {product ? product.products.map((e)=>(
            <Cart key={e.id} products={e}/>
         )) : <div className='mx-auto  container col-span-5 text-gray-600 roboto-bold text-center'>Yuklenyar...</div>}
        </div>
        <div className='text-gray-500 py-4 roboto-regular'>Ýokarda görkezilen maglumatlar habar beriji häsiýetlere eýe bolup, çap edilmezden öň iň soňky habarlardan esaslanýandyr we 
            (açyk çeşmelerdan, şeýle hem resmi saýtlardan we kataloklardan alnan) şonuň üçin hem biz harydyň beýanlamasynyň takyk we dolydygyny 100% kepillendirmeýäris. 
            Harydy gaplama dürli dizaýnlarda edip boljagyny
             Siziň dykkatyňyza ýetirýäris. Harydy gowşurma işleri, harydyň ammarda bar-ýoklugyna baglylykda amala aşyrylýar.</div>
        </div>
    )
    }
