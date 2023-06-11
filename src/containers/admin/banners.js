import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from "../../assets/svgs/searchImage.svg"
import { getAllBanner, IMAGE_ROUTE, updateBannerImage } from '../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../redux/message';
import ShannonBanners from './bannerPages/shannon-banner'
import BipocBanners from './bannerPages/bipoc-banner'
import AboutBanners from './bannerPages/about-banners'

function Banners(props) {
  const [formNo2, setFormNo2] = useState(0)
  const [shannonBanners,setShannonBanners] = useState([])
  const [bipocBanners,setBipocBanners] = useState([])
  const [aboutBanners,setAboutBanners] = useState([])
  const dispatch = useDispatch();
  
  const getAllBanners = ()=>{
    getAllBanner({}).then((res)=>{
      let shannon = res.filter((item) => item.pageName == "SHANNON")
      let bipoc = res.filter((item) => item.pageName == "BIPOC")
      let about = res.filter((item) => item.pageName == "ABOUT")

      setShannonBanners(shannon)
      setBipocBanners(bipoc)
      setAboutBanners(about)
    })
  }

  useEffect(() => {
    getAllBanners();
  }, [])

  const uploadImage = (e,Id)=>{

    const imageCreate = new FormData();
    imageCreate.append('id',Id);
    imageCreate.append('banner',e.target.files[0]);

    updateBannerImage(imageCreate).then((res)=>{
      dispatch(updateOpen(true))  
      dispatch(updateMessage(res))
       
      getAllBanners();
    })
  }

  return (
    <div className='px-xl-5 mx-xl-5 banners'>
    {console.log("B",shannonBanners)}
      <div className='mx-lg-5 px-lg-3 py-3 mt-3 ml-5 d-flex justify-content-center'>
        <div className='col-6 p-0 subNavBar d-flex justify-content-between'>
            <button  onClick={()=>setFormNo2(0)} className={'btn'+(formNo2 === 0? " active": "")}>Shannon Banner</button>
            <button  onClick={()=>setFormNo2(1)} className={'btn'+(formNo2 === 1? " active": "")}>Bipoc Banner</button>
            <button  onClick={()=>setFormNo2(2)} className={'btn'+(formNo2 === 2? " active": "")}>About Banner</button>
        </div>
      </div>
      {
        formNo2 == 1 ?
          <BipocBanners uploadImage={uploadImage} banners={bipocBanners}/>
        :
        formNo2 == 2 ?
          <AboutBanners uploadImage={uploadImage} banners={aboutBanners}/>
        :
          <ShannonBanners uploadImage={uploadImage} banners={shannonBanners}/>
      }
    </div>
  )
}

export default Banners