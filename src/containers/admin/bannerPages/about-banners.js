import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from "../../../assets/svgs/searchImage.svg"
import { getAllBanner, IMAGE_ROUTE, updateBannerImage } from '../../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../../redux/message';
import "../admin.css"

const img1 = window.location.origin+"/assets/images/IMG1.png"
const img2 = window.location.origin+"/assets/images/IMG2.png"
const img3 = window.location.origin+"/assets/images/IMG3.png"
const img4 = window.location.origin+"/assets/images/IMG4.png"

function AboutBanners(props) {
  const inputFileRef1 = useRef();
  const inputFileRef2 = useRef();
  const inputFileRef3 = useRef();
  const inputFileRef4 = useRef();
  const inputFileRef5 = useRef();
  const inputFileRef6 = useRef();
  const history = useHistory();
  const [banners,setBanners] = useState(props.banners)

  const dispatch = useDispatch();

  const onBtnClick1 = () => {
    /*Collecting node-element and performing click*/
    inputFileRef1.current.click();
  };

  const onBtnClick2 = () => {
    /*Collecting node-element and performing click*/
    inputFileRef2.current.click();
  };
  const onBtnClick3 = () => {
    /*Collecting node-element and performing click*/
    inputFileRef3.current.click();
  };
  const onBtnClick4 = () => {
    /*Collecting node-element and performing click*/
    inputFileRef4.current.click();
  };
  const onBtnClick5 = () => {
    /*Collecting node-element and performing click*/
    inputFileRef5.current.click();
  };
  const onBtnClick6 = () => {
    /*Collecting node-element and performing click*/
    inputFileRef6.current.click();
  };
  
  useEffect(()=>{
    console.log(props.banners)
    setBanners(props.banners)
  },[props.banners])

  
  return (
  <div className='px-xl-5 mx-xl-5 banners'>
    <div className='d-flex flex-column scrollerOn pt-2 mx-5'>
      <p className='mb-3'><b>SHANNON ABOUT</b> ({banners.length>0?banners[0].aspectRatio.width+"X"+banners[0].aspectRatio.height:null})</p>
      <div className='d-flex mb-4'>
        <div className='artistcardAdmin'>
            <img alt='first' src={(banners.length>0?banners[0].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick1} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef1} hidden onChange={(e)=>{props.uploadImage(e,banners.length>0?banners[0]._id:"")}} type="file"/>
      </div>
    </div>
    <div className='d-flex flex-column scrollerOn pt-2 mx-5'>
      <p className='mb-3'><b>KID ABOUT</b> ({banners.length>0?banners[1].aspectRatio.width+"X"+banners[0].aspectRatio.height:null})</p>
      <div className='d-flex mb-4'>
        <div className='artistcardAdmin'>
            <img alt='first' src={(banners.length>0?banners[1].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick1} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef1} hidden onChange={(e)=>{props.uploadImage(e,banners.length>0?banners[1]._id:"")}} type="file"/>
      </div>
    </div>
  </div>
  )
}

export default AboutBanners