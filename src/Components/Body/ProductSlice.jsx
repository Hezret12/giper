import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MaxProduct from './MaxProduct';
import Swipper from '../Header/Swipper';

export default function ProductSlice() {
    const [data, setData] = useState([]);
    const [bannersData, setBannersData] = useState({});
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const saleDate = async () => {
        try {
            const response = await axios.get(`https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/tk.json`);
            setData(response.data.pageProps.index);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchBanners = async (ids) => {
        try {
            const bannerRequests = ids.map(id => axios.get(`https://gipertm.com/api/v2/products/group/banners/${id}`));
            const responses = await Promise.all(bannerRequests);
            const banners = responses.reduce((acc, response, index) => {
                acc[ids[index]] = response.data;
                return acc;
            }, {});
            setBannersData(banners);
            console.log(banners)
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    useEffect(() => {
        saleDate();
    }, [i18n.language]);

    useEffect(() => {
        if (data.length > 0) {
            const ids = data.filter(e => e.withImage).map(e => e.id);
            fetchBanners(ids);
        }
    },[data]);

    return (
        <div className=''>
            {data && data.map((e) => (
                <div className='container mx-auto' key={e.id}>
                    {e.withImage !== true ? (
                        <div className='flex justify-between'>
                            <h1 className='text-xl md:text-2xl font-bold text-gray-800 mt-[40px] mb-4'>
                                {i18n.language === "tk" ? e.description.nameTm : e.description.nameRu}
                            </h1>
                            <h2
                                className='text-sm font-semibold text-blue-700 cursor-pointer mt-[43px] font-serif hover:text-blue-900 mb-4'
                                onClick={() => navigate("/products/" + e.id)}
                            >
                                {t("allSale")}
                            </h2>
                        </div>
                    )
                    : (
                        <div className={`${bannersData[e.id]?.length > 3 ? 'mx-[-95px]' : "mx-auto my-4"}`}>
                            {bannersData[e.id] && (
                              <Swipper key={e.id} swip={bannersData[e.id]}/>
                            )}
                        </div>
                    )}
                    <MaxProduct id={e.id} />
                </div>
            ))}
        </div>
    );
}
