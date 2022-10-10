import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from "../../assets/svgs/searchImage.svg"
import { getAllBanner, IMAGE_ROUTE, updateBannerImage } from '../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../redux/message';
import "./admin.css"

const img1 = window.location.origin+"/assets/images/IMG1.png"
const img2 = window.location.origin+"/assets/images/IMG2.png"
const img3 = window.location.origin+"/assets/images/IMG3.png"
const img4 = window.location.origin+"/assets/images/IMG4.png"

function Banners(props) {
  const inputFileRef1 = useRef();
  const inputFileRef2 = useRef();
  const inputFileRef3 = useRef();
  const inputFileRef4 = useRef();
  const inputFileRef5 = useRef();
  const inputFileRef6 = useRef();
  const history = useHistory();
  const [bannerNumber,setBannersNumber] = useState([])
  const [banners,setBanners] = useState([])
  const dispatch = useDispatch();
  const getAllBanners = ()=>{
    getAllBanner({}).then((res)=>{
      setBanners(res)
    })
  }

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
  useEffect(() => {
    getAllBanners();
  }, [])
  return (
  <div className='px-xl-5 mx-xl-5 banners'>
    <div className='mx-lg-5 px-lg-3 py-3 mt-3 ml-5 d-flex justify-content-between'>
        <h4>BANNERS</h4>
        <label className='searchField btn btn-light'>
            <input type="text" placeholder='Search'/>
            <button>
                <img alt="searchIcon" src={SearchIcon}/>
            </button>
        </label>
    </div>
    <div className='d-flex flex-column scrollerOn pt-2 mx-5'>
      <p className='mb-3'><b>BIPOC</b> ({banners.length>0?banners[0].aspectRatio.width+"X"+banners[0].aspectRatio.height:null})</p>
      <div className='d-flex mb-4'>
        <div className='artistcard'>
            <img alt='first' src={(banners.length>0?banners[0].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick1} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef1} hidden onChange={(e)=>{uploadImage(e,banners.length>0?banners[0]._id:"")}} type="file"/>
      </div>
      <p className='mb-3'><b>KIDSHANNON</b> ({banners.length>0?banners[1].aspectRatio.width+"X"+banners[1].aspectRatio.height:null})</p>
      <div className='d-flex mb-4'>
        <div className='artistcard half'>
            <img alt='second' src={(banners.length>0?banners[1].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick2} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef2} hidden onChange={(e)=>{uploadImage(e,banners.length>0?banners[1]._id:"")}} type="file"/>
      </div>
      <p className='mb-3'><b>MEDICAL</b> ({banners.length>0?banners[2].aspectRatio.width+"X"+banners[2].aspectRatio.height:null})</p>
      <div className='d-flex mb-4'>
        <div className='artistcard'>
            <img alt='third' src={(banners.length>0?banners[2].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick3} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef3} hidden onChange={(e)=>{uploadImage(e,banners.length>0?banners[2]._id:"")}} type="file"/>
      </div>
      <p className='mb-3'><b>NEWS</b> (({banners.length>0?banners[3].aspectRatio.width+"X"+banners[3].aspectRatio.height:null}))</p>
      <div className='d-flex mb-4'>
        <div className='artistcard half'>
            <img alt='forth' src={(banners.length>0?banners[3].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick4} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef4} hidden onChange={(e)=>{uploadImage(e,banners.length>0?banners[3]._id:"")}} type="file"/>
      </div>
      <p className='mb-3'><b>MOTION</b> (({banners.length>0?banners[4].aspectRatio.width+"X"+banners[4].aspectRatio.height:null}))</p>
      <div className='d-flex mb-4'>
        <div className='artistcard half'>
            <img alt='forth' src={(banners.length>0?banners[4].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick5} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef5} hidden onChange={(e)=>{uploadImage(e,banners.length>0?banners[4]._id:"")}} type="file"/>
      </div>
      <p className='mb-3'><b>ABOUT</b> (({banners.length>0?banners[5].aspectRatio.width+"X"+banners[5].aspectRatio.height:null}))</p>
      <div className='d-flex mb-4'>
        <div className='artistcard half'>
            <img alt='forth' src={(banners.length>0?banners[5].imagePath:"")} className="image"/>
        </div>
        <button onClick={onBtnClick6} className='myBtn align-self-end m-3'>UPLOAD</button>
        <input ref={inputFileRef6} hidden onChange={(e)=>{uploadImage(e,banners.length>0?banners[5]._id:"")}} type="file"/>
      </div>
    </div>
  </div>
  )
}

export default Banners