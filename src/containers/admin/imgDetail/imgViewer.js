import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BackArrow from "../../../assets/svgs/backArrow.svg"
import { changeArtistImageStatus, getByImageId, IMAGE_ROUTE } from '../../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../../redux/message'
import Admin_image from '../Image_uploading'
import loading from './../../../assets/loading.gif'; 


function ImgViewer(props) {
  const dispatch = useDispatch();
  let {imageId} = useParams()
  let history = useHistory()
  const [imageData,setImageData]  = useState({});
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
    let params = {
      _id:imageId
    }
    setHolder(true);
    changeArtistImageStatus(params).then((res)=>{
      setHolder(false);
      dispatch(updateOpen(true))
      dispatch(updateMessage(res));
      history.push('/admin/artists')
    })

  }
  useEffect(() => {
    getArtistImage();
  }, [])
  if(history.location.pathname.split("/")[3] === "updateImage"){
    return(
      <Admin_image
        images={imageData}
        data={props.artistImages}
      />
    )
  }
  return (
  <div className='px-xl-5 mx-xl-5'>
    <div className='mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex justify-content-between'>
        <h4>{imageData.title}</h4>
        <div>
          <button className='btn1 mt-3 mb-5' onClick={()=>history.goBack()}>
              <img alt='' src={BackArrow}/>
          </button>
          <button onClick={()=>history.push("/admin/artists/updateImage")} className='mx-1 myBtn sm align-self-center px-4'>EDIT</button>
          {holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active sm align-self-center px-4' onClick={(e)=>{changeStatus(e);}}>APPROVE</button>}
        </div>
    </div>
    <div className='px-5 mx-5 row scrollerOn py-5'>
      <div className='col-md-6'>
        <h5 className='mb-4'>Original</h5>
        <img alt='' src={String(Object.keys(imageData).length > 0 ? imageData.path:"")} />
        <div className='row'>
          <div className='col-md-12'>
            <h5 className='mb-4'>Thumbnails</h5>
          </div>
          <div className='col-md-8'>
            <img alt='' src={String(Object.keys(imageData).length > 0 ? imageData.subImage[0].path:"")} />
          </div>
          <div className='col-md-4'>
            <img alt='' src={String(Object.keys(imageData).length > 0 ? imageData.subImage[1].path:"")} />
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h5 className='mb-4'>Keywords</h5>
          {Object.keys(imageData).length > 0 ? imageData.keywordID.map((item,key)=>(<p key={key}>{item.keyword}</p>)):""}
      </div>
    </div>
  </div>
  )
}

export default ImgViewer