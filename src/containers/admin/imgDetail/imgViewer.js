import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BackArrow from "../../../assets/svgs/backArrow.svg"
import { changeArtistImageStatus, getByImageId, IMAGE_ROUTE } from '../../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../../redux/message'
import Admin_image from '../Image_uploading'
import loading from './../../../assets/loading.gif'; 
import MyPopup from '../../../components/myPopup/myPopup'


function ImgViewer(props) {
  const dispatch = useDispatch();

  let {imageId} = useParams()
  let history = useHistory()

  const [isPopupShow, setIsPopupShow] = useState(false)
  const [imageData,setImageData]  = useState({mainImage:[{}]});
  const [holder,setHolder] = useState(false);
  const getArtistImage = () =>{
    let params = {
      _id:imageId
    }
    getByImageId(params).then((res)=>{
      setImageData(res);

    })
  }
  const changeStatus = (e)=>{
    if(imageData.mainImage[0].subImage.length === 0){
      setIsPopupShow(true)
      return
    }
    let params = {
      _id:imageId
    }
    setHolder(true);
    changeArtistImageStatus(params).then((res)=>{
      setHolder(false);
      dispatch(updateOpen(true))
      dispatch(updateMessage(res));
      history.push({
        pathname:'/admin/artists',
        state:{Nauman:2}
    });
    })

  }
  useEffect(() => {
    getArtistImage();
  }, [])
  if(history.location.pathname.split("/")[3] === "updateImage"){
    return(
      <Admin_image
        images = {imageData.mainImage[0]}
        data = {props.artistImages}
        artistId = {imageData.artistId}
      />
    )
  }
  return (
  <div className='px-xl-5 mx-xl-5'>
    <div className='mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex justify-content-between'>
        <h4>{imageData.mainImage[0]?.title}</h4>
        <div>
          <button className='btn1 mt-3 mb-5' onClick={()=>history.push({
                pathname:'/admin/artists',
                state:{Nauman:1}
            })}>
              <img alt='' src={BackArrow}/>
          </button>
          <button onClick={()=>history.push("/admin/artists/updateImage")} className='mx-1 myBtn sm align-self-center px-4'>EDIT</button>
          {holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active sm align-self-center px-4' onClick={(e)=>{changeStatus(e);}}>APPROVE</button>}
        </div>
    </div>
    <div className='px-5 mx-5 row scrollerOn py-5'>
      <div className='col-md-6'>
        <h5 className='mb-4'>Original</h5>
        <img alt='' src={String(Object.keys(imageData.mainImage[0]).length > 0 ? imageData.mainImage[0].path:"")} />
        <div className='row'>
          <div className='col-md-12'>
            <h5 className='mb-4'>Thumbnails</h5>
          </div>
          <div className='col-md-8'>
            {Object.keys(imageData.mainImage[0]).length !== 0 &&
            imageData.mainImage[0].subImage.length > 0 ? 
            <img alt='' src={String(Object.keys(imageData.mainImage[0]).length > 0 ? imageData.mainImage[0].subImage[0].path:"")} />
            :null
            }
          </div>
          {/* <div className='col-md-4'>
            {Object.keys(imageData.mainImage[0]).length !== 0 && imageData.mainImage[0].subImage.length > 0 ?
            <img alt='' src={String(Object.keys(imageData.mainImage[0]).length > 0 ? imageData.mainImage[0].subImage[1].path:"")} />
            :null
            }
          </div> */}
        </div>
      </div>
      <div className='col-md-6'>
        <h5 className='mb-4'>Keywords</h5>
        {Object.keys(imageData.mainImage[0]).length !== 0 && imageData.mainImage[0].keywordID.length > 0 ?
          Object.keys(imageData.mainImage[0]).length > 0 ? imageData.mainImage[0].keywordID.map((item,key)=>(<p key={key}>{item.keyword}</p>)):""
          : 
          null
        }
      </div>
    </div>
    {isPopupShow ?
      <MyPopup BackClose onClose={()=>{setIsPopupShow(false)}}>
          <div className='mx-5 my-4'>
              You Dont have Sub Images
          </div>
      </MyPopup>
    :null
    }
  </div>
  )
}

export default ImgViewer