import React from 'react'
import logo from '../../Image/logo_transparent.png';
import { useTranslation } from 'react-i18next';
import android from '../../Image/android.svg';
import ios from '../../Image/ios.svg';

export default function Footer() {

    const {t} = useTranslation();

  return (
    <div className='border-y mt-2'>
    <div className='md:grid md:grid-cols-4 container mx-auto text-[#6B7280] text-[16px]'>

      <div className='pb-2'>
        <img src={logo} width={100} height={50} alt='logo'/>
        <h4>{t("info")}</h4>
      </div>

      <div className='m-auto text-[#4B5563] text-[17px]'>
       <p className='mb-2.5'>{t("about")}</p>
       <p>{t("dostawka")}</p>
      </div>

      <div className='m-auto text-[#4B5563] text-[17px]'>
       <p className='mb-2.5'>{t("call")}</p>
       <p>{t("admin")}</p>
      </div>

      <div className='m-auto flex justify-center gap-3 mb-3'>
       <img src={android} width={150} height={100} alt='android' className='border'/>
       <img src={ios} width={150} height={100} alt='ios' className='border'/>
      </div>
    </div>
    <div className='border-t text-center text-[#6B7280] text-[16px] py-1'>
        <h2>© {new Date().getFullYear()} GIPER {t("privacy")}</h2>
    </div>
    </div>
  )
}
