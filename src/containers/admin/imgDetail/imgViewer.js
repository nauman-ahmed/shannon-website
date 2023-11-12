import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BackArrow from "../../../assets/svgs/backArrow.svg"
import { changeArtistImageStatus, getByImageId, getImageBaseURL,changeArtistImageCopyRight } from '../../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../../redux/message'
// import Admin_image from '../Image_uploading'
import loading from './../../../assets/loading.gif'; 
import loadingUpdate from './../../../assets/loading_trasnparent.gif'; 
import MyPopup from '../../../components/myPopup/myPopup'

import Admin_image_Keywords from '../imageEdit/updateKeyword'
import Admin_image_thumbnail from '../imageEdit/updateThumbnail'


function ImgViewer(props) {
  const dispatch = useDispatch();

  let {imageId} = useParams()
  let history = useHistory()

  const [isPopupShow, setIsPopupShow] = useState(false)
  const [isCopyrightPopupShow, setCopyrightIsPopupShow] = useState(false)

  const [imageData,setImageData]  = useState({mainImage:[{}]});
  const [holder,setHolder] = useState(false);
  const [loader,setLoader] = useState(false);
  const [imageReady,setImageReady] = useState(0);
  const [locationChange,setLocationChange] = useState(false);

  const [copyrightText, setCopyrightText] = useState("")
  const [copyrightColor, setCopyrightColor] = useState("")

  const getArtistImage = () =>{
    let params = {
      _id:imageId
    }
    getByImageId(params).then((res)=>{
      setImageData(res);
      setCopyrightText(`© ${res.artistId.firstname.toLowerCase()} ${res.artistId.lastname.toLowerCase()}`)
      setCopyrightColor(res.mainImage[0].copyrightColor  ? res.mainImage[0].copyrightColor : "light Gray")
    })
  }
  const changeStatus = (e)=>{
    if(imageData.mainImage[0].subImage.length === 0){
      setIsPopupShow(true)
      return
    }
    let params = {
      _id:imageId,
      artistId: imageData.artistId._id
    }
    setHolder(true);
    changeArtistImageStatus(params).then((res)=>{
      setHolder(false);
      dispatch(updateOpen(true))
      dispatch(updateMessage(res.msg));
      history.push({
        pathname:'/admin/artists',
        state:{Nauman:2}
    });
    })

  }

  useEffect(() => {
    getArtistImage();
  }, [history])
  
  const onSubmitCopyrightHandler = async () => {
    setLoader(true)

    const dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
              
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      let croppedImage = new File([u8arr], filename, {type:mime});
      return croppedImage 
    }

    const getFileFromUrl = async (dataurl) => {
      try {
        if(dataurl){
            let res = await getImageBaseURL({url:dataurl})
            return dataURLtoFile("data:image/jpeg;base64,"+res.data,"originalImage.jpg")
        }
      } catch (error) {
         console.log("ERROR")
      }
    } 
    
    const file = await getFileFromUrl(imageData.mainImage[0].originalPath)
    
    let copyrightTextWChar = copyrightText
    // Checking if copyright has a & in it
    if (copyrightTextWChar.includes("&")) {
        copyrightTextWChar = copyrightTextWChar.replace(/&/g, '&amp;');
    } else {
        console.log("The string does not contain &");
    }
    
    const imageCreate = new FormData()
    imageCreate.append('mainId',imageData.mainImage[0]._id)
    imageCreate.append('artistImage',file) // It will causing problem in backend that is why I have to make duplication here 
    imageCreate.append('artistImage',file)
    imageCreate.append('caption',copyrightTextWChar)
    imageCreate.append('color',copyrightColor)
    imageCreate.append('_id',imageData.artistId._id)

    changeArtistImageCopyRight(imageCreate).then((res)=>{
        if(res == 'successfully updated'){
            dispatch(updateOpen(true));
            dispatch(updateMessage(res));
        }else{
            dispatch(updateOpen(true))
            dispatch(updateMessage("Error Occured"))
        }
        setCopyrightIsPopupShow(false)
        setLoader(false)
    })

  }

  if(history.location.pathname.split("/")[3] === "updateKeywords"){
    if(!locationChange){
      setLocationChange(true)
    }
    return(
      <Admin_image_Keywords
        images = {imageData.mainImage[0]}
        data = {props.artistImages}
        artistId = {imageData.artistId}
      />
    )
  }
  if(history.location.pathname.split("/")[3] === "updateThumbnail"){
    if(!locationChange){
      setLocationChange(true)
    }
    return(
      <Admin_image_thumbnail
        images = {imageData.mainImage[0]}
        data = {props.artistImages}
        artistId = {imageData.artistId}
      />
    )
  }
  
  if(locationChange && history.location.pathname.split("/")[3] !== "updateThumbnail" && history.location.pathname.split("/")[3] !== "updateKeywords"){
    setLocationChange(false)
    getArtistImage();
  }

  return (
    <div className='px-xl-5 mx-xl-5'>
      <div className='mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex justify-content-between'>
        <button className='btn1 mt-3 mb-5' onClick={()=>history.push({
            pathname:'/admin/artists',
            state:{Nauman:1}
        })}>
          <img alt='' src={BackArrow}/>
        </button>
        {holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active sm align-self-center px-4' onClick={(e)=>{changeStatus(e);}}>APPROVE</button>}
      </div>
      <div className='px-5 mx-5 row scrollerOn py-5'>
        <div className='col-md-5'>
          <h5 className='mb-4'>Original</h5>
          <img onLoad={() => setImageReady(imageReady+1)} alt='' src={String(Object.keys(imageData.mainImage[0]).length > 0 ? imageData.mainImage[0].originalPath:"")} />
        </div>
        <div className='col-md-5'>
          <h5 className='mb-4'>Keywords</h5>
          {Object.keys(imageData.mainImage[0]).length !== 0 && imageData.mainImage[0].keywordID.length > 0 ?
            Object.keys(imageData.mainImage[0]).length > 0 ? imageData.mainImage[0].keywordID.map((item,key)=>(<p key={key}>{item.keyword}</p>)):""
            : 
            null
          }
        </div>
        <div className='col-md-2'>
          {imageReady >= 1 ? <button onClick={()=>history.push("/admin/artists/updateKeywords")} className='mx-1 myBtn sm align-self-center px-4'>EDIT</button> : 
            <img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>
          }
        </div>
      </div>
      <div className='px-5 mx-4 row scrollerOn py-5'>
        <div className='col-md-6'>
            <div className='col-md-12 d-flex justify-content-between'>
              <h5 className='mb-4'>Thumbnail</h5>
              {imageReady >= 1 ? <button onClick={()=>history.push("/admin/artists/updateThumbnail")} className='mx-1 myBtn sm align-self-center px-4'>EDIT</button> : 
                <img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>
              }
            </div>
            <div className='col-md-8'>
              {Object.keys(imageData.mainImage[0]).length !== 0 &&
              imageData.mainImage[0].subImage.length > 0 ? 
              <img onLoad={() => setImageReady(imageReady+1)} alt='' src={String(Object.keys(imageData.mainImage[0]).length > 0 ? imageData.mainImage[0].subImage[0].path:"")} />
              :null
              }
            </div>
        </div>
        <div className='col-md-6'>
            <div className='col-md-12 d-flex justify-content-between'>
              <h5 className='mb-4'>Copyright Text</h5>
              {imageReady >= 1 ? <button onClick={()=>setCopyrightIsPopupShow(true)} className='mx-1 myBtn sm align-self-center px-4'>EDIT</button> : 
                <img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>
              }
            </div>
            <div className='col-md-8'>
              {copyrightText}
            </div>
        </div>
      </div>
      {isPopupShow ?
        <MyPopup BackClose onClose={()=>{setIsPopupShow(false)}}>
            <div className='mx-5 my-4'>
                You Dont have Sub Images
            </div>
        </MyPopup>
        :
        isCopyrightPopupShow ? 
          <MyPopup BackClose onClose={()=>{setCopyrightIsPopupShow(false)}} lightgrey={true}>
              <p className='text-black'>Copyright Text & Color</p>
              <div className='mx-5 my-4 d-flex row align-items-baseline'>
                <div className='mx-3 col-6'>
                  <input 
                    className='textFieldCopyright' 
                    type="text"
                    name= "title"
                    value={copyrightText}
                    onChange={(e) => setCopyrightText(e.target.value)}
                  />
                </div>
                <div className='mx-3 col-4'>
                  <div className='d-flex flex-column align-items-center w-100 mb-2'>
                    <div className='d-flex align-items-center'>
                        <label className='px-3 d-flex text-black' style={{width:"max-content", cursor:"pointer"}} >
                            <input className='mr-2' name="color" type="radio" value={"Light Gray"} checked={copyrightColor === "Light Gray"} onClick={(e)=>setCopyrightColor(e.target.value)}/>
                            Light Gray
                        </label>
                        <label className='px-3 d-flex text-black' style={{width:"max-content", cursor:"pointer"}} >
                            <input className='mr-2' name="color" type="radio" value={"Dark Gray"} checked={copyrightColor === "Dark Gray"} onClick={(e)=>setCopyrightColor(e.target.value)}/>
                            Dark Gray
                        </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  {loader?
                    <img alt="loading" src={loadingUpdate} style={{width:"40px"}}/>
                    :
                    <button className='btn1 dark px-4 align-self-bottom' onClick={() => onSubmitCopyrightHandler()}>UPDATE</button>
                  }
                </div>
                <div className='col-6'>
                  {loader?
                    null // So that no can cancel the request on the go
                    :
                    <button className='btn1 dark px-4 align-self-bottom ' onClick={()=>{setCopyrightIsPopupShow(false)}} >CANCEL</button>
                  }
                </div>
              </div>
          </MyPopup>
        : null
      }
    </div>
  )
}

export default ImgViewer
