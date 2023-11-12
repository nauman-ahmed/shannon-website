import React, { useState } from 'react'
import Header from '../../../components/layout2/header'
import MyPopup from '../../../components/myPopup/myPopup'
import "../../artist/artist.css"
import BackArrow from "../../../assets/svgs/backArrow.svg"
import { useHistory } from 'react-router-dom'
import { changeArtistImageThumbnail } from '../../../AxiosFunctions/Axiosfunctionality'
import { useEffect } from 'react'
import {  getCategory,getImageBaseURL } from '../../../AxiosFunctions/Axiosfunctionality'
import { useDispatch } from 'react-redux'
import { updateMessage, updateOpen } from '../../../redux/message'
import ReactCrop from 'react-image-crop'
import loading from '../../../assets/loading.gif'; 

const img1 = window.location.origin+"/assets/images/IMG3.png"

function Image_thumbnail(props) {
    const dispatch=useDispatch(); 
    const history = useHistory()
    const [isPopupShow, setIsPopupShow] = useState(false)
    const [artistImage, setArtistImage] = useState(false)
    const [temp, setTemp] = useState(null)
    const [image,setImage] = useState(null)
    const [imageLoaded,setImageLoaded] = useState(false)
    const [completedCrop, setCompletedCrop] = useState({
        unit: 'px',
        x: 20,
        y: 20,
        width: 200,
        height: 200,
        aspect: 1 ,
      })
      const [copyrightText, setCopyrightText] = useState(`© ${props.artistId.firstname.toLowerCase()} ${props.artistId.lastname.toLowerCase()}`)
      const [copyrightColor, setCopyrightColor] = useState("")
      const [maximumLimit, setMaximumLimit] = useState(0)



    const getBase64FromUrl = async (dataurl) => {
        try {
            if(dataurl){
                let res = await getImageBaseURL({url:dataurl})
                setTemp("data:image/jpeg;base64,"+res.data)
            }
        } catch (error) {
            if(maximumLimit < 10){
                setMaximumLimit(maximumLimit+1)
            }
        }
    } 

    useEffect(()=>{
        if(props.images.aspectRatio){
            setCompletedCrop({...props.images.aspectRatio,unit:"px",aspect:1})
        }
    },[])


    useEffect(()=>{
        try{

            getBase64FromUrl(props.images.originalPath)
            setArtistImage({
                imgPath: props.images.originalPath,
                title: props.images.title,
                _id:props.artistId._id,
            })
            
            setCopyrightColor(props.images.copyrightColor  ? props.images.copyrightColor : "light Gray")

        
        }catch(e){
            history.push({
                pathname:'/admin/artists',
                state:{Nauman:1}
            });
        }

    },[maximumLimit])
    

    const onSubmitHandler = () => {

        let artistImageTemp = {...artistImage,mainId:props.images._id}
        console.log("artistImageTemp[]",artistImageTemp)
        const imageCreate = new FormData()
        imageCreate.append('mainId',props.images._id)
        imageCreate.append('artistImage',artistImageTemp["0"])
        imageCreate.append('adminPortfolio',true)
        imageCreate.append('_id',props.artistId._id)

        imageCreate.append('croppedDetails_x',completedCrop.x)
        imageCreate.append('croppedDetails_y',completedCrop.y)
        imageCreate.append('croppedDetails_width',completedCrop.width)
        imageCreate.append('croppedDetails_height',completedCrop.height)

        setIsPopupShow(true)
        changeArtistImageThumbnail(imageCreate).then((res)=>{
            if(res == 'successfully updated'){
                dispatch(updateOpen(true));
                dispatch(updateMessage(res));
            }else{
                dispatch(updateOpen(true))
                dispatch(updateMessage("Error Occured"))
            }
            history.push("/admin/artists/"+props.images._id)
            setIsPopupShow(false)
        })
    }

    const getCroppedImg = () => {
        if(image == null){
            return
        }


        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        var originWidth = completedCrop.width * scaleX;
        var originHeight = completedCrop.height * scaleY;
        // maximum width/height
        var maxWidth = 2400, maxHeight = 2400 / (16 / 9);
        var targetWidth = originWidth,
          targetHeight = originHeight;
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // set canvas size
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image, 
          completedCrop.x * scaleX, 
          completedCrop.y * scaleY, 
          completedCrop.width * scaleX, 
          completedCrop.height * scaleY, 
          0, 
          0, 
          targetWidth, 
          targetHeight 
        );
      
        new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {

                    let artistImageTemp = {...artistImage}
                    const reader = new FileReader()
                    reader.readAsDataURL(blob)
                    reader.onloadend = () => {
                    let croppedFile =  dataURLtoFile(reader.result,"sub_image_0.jpg")
                    artistImageTemp["0"] = croppedFile
                    setArtistImage(artistImageTemp)
                    }

                },
                "image/png",
                1
            );
        });

    }
    
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

    const onImageLoad = (e) => {
        setImage(e.currentTarget)
    }

    if(image && !imageLoaded){
        getCroppedImg()
        setImageLoaded(true)
    }

    return (
        <> 
            <div className=' mx-5 imageUploader'>
                <div className='px-5 row m-0'>
                <button className='btn1 mt-3 mb-5'
                    onClick={()=>history.goBack()}
                >
                    CANCEL
                </button>
                </div>
                    <div className='px-5 row m-0'>
                        <div className='col-xl-9 col-lg-8 d-flex my-5 justify-content-center'>
                            {artistImage !== null ? 
                                <ReactCrop
                                crop={completedCrop}
                                onChange={(percentCrop) => {setCompletedCrop(percentCrop);getCroppedImg()}}
                                minHeight={200}
                                minWidth={200}
                                aspect={1}
                                >
                                    <img
                                        alt="Crop me"
                                        src={temp}
                                        onLoad={(e) => {onImageLoad(e); getCroppedImg()}}
                                        loading="lazy"
                                        role="presentation"
                                        decoding= "async"
                                        fetchpriority= {"high"}
                                    />
                            </ReactCrop>

                            : null
                            } 
                        </div>
                            {isPopupShow?
                                <div className='col-xl-3 col-lg-4 my-5'>
                                    <img 
                                        style={{ position:"sticky", top:"2rem" }}
                                        alt="loading" 
                                        src={loading}
                                    />
                                </div>
                            :
                                <div className='col-xl-3 col-lg-4 d-flex my-5 justify-content-center'>
                                    <button 
                                            style={{ position:"sticky", top:"2rem" }}
                                            className='btn1 dark px-4 align-self-bottom' 
                                            onClick={()=>{onSubmitHandler()}}
                                        >Submit</button>
                                </div>
                            }
                    </div>
            </div>
        </>
  )
}

export default Image_thumbnail
