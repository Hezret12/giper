import React from 'react'
import ProductSlice from './ProductSlice'
import Swipper from '../Header/Swipper'
import { Helmet } from 'react-helmet'
 

export default function Home() {

  return (
    <div>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Giper - market</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
        <Swipper/>
       <ProductSlice/>
    </div>
  )
}
