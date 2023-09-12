import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./artist.css"
import Header from '../../components/layout2/header'
import AddImage from "../../assets/svgs/addImage.svg"
import { useDispatch,useSelector } from 'react-redux'
import { artistImageDataApi, updateUploadedImage, storeUploadedImages,resetUploadedImages } from '../../redux/artistSlice' 
import { keywordDataApi } from '../../redux/keywordSlice' 
import { decodeToken } from "react-jwt";
import { artistImageCreate,artistImagedelete,getAllContents } from '../../AxiosFunctions/Axiosfunctionality'
import MyPopupLoading from '../../components/loader/myPopup'
import loading from '../../assets/loading.gif'; 
import BackArrow from "../../assets/svgs/backArrow.svg"
import MyPopup from '../../components/myPopup/myPopup'

function Artist() {
    
    let history = useHistory()

    const dispatch = useDispatch();
    const { artistReducer } = useSelector( state => state )
    const [artistDetails,setArtistDetails] = useState(null)
    const [showLoader,setShowLoader] = useState(false);
    const [imageContent,setImageContent] = useState([])
    const [warning,setWarning] = useState(false)

    const changePageHandler = async (e) => {
        try{
            setShowLoader(true)
            let storageData = localStorage.getItem("authorization")
            let details = decodeToken(storageData)
    
            const imageCreate = new FormData()
            imageCreate.append('_id',details._id)
    
            for(let i=0;i<e.target.files.length;i++){
                imageCreate.append('artistImage',e.target.files[i])
            }
    
            let response = await artistImageCreate(imageCreate)
            if(response.msg == "Add Artist Image"){
                dispatch(await storeUploadedImages(response.data.mainImage))
            }else if(response.msg == "Add Artist Image And Problem With Image"){
                dispatch(await storeUploadedImages(response.data.mainImage))
                setWarning(true)
            }else if(response.msg == "PROBLEM WITH IMAGE PROPERTIES"){
                setWarning(true)
            }
            setShowLoader(false)
        }catch (error) {
            console.log('Causing Error in Uploading',error)            
        }
    }

    const getAllContent = ()=>{
        getAllContents({type: "IMAGE"}).then((res)=>{
            let image = res[0].content
            setImageContent(image)
        })
    }
    
    useEffect(()=>{
        
        let storageData = localStorage.getItem("authorization")
        let details = decodeToken(storageData)
        try {
            getAllContent();
            dispatch(keywordDataApi())
            dispatch(artistImageDataApi({artistId:details._id}))
        } catch (error) {
            console.log('Causing Error in Dispatch',artistReducer)            
        }
        setArtistDetails(details)

    },[])
    
    const updateImageDetails = (data) => {
        console.log(data)
        dispatch(updateUploadedImage({
            _id:data._id,
            imageFile: data
        }))
        
        history.push({
            pathname:'/artist/image_uploading',
        })

    }

    const deleteImageHandler = async (val) => {
        let storageData = localStorage.getItem("authorization")
        let details = decodeToken(storageData)
        let response = await artistImagedelete({
            artistId:details._id,
            imageData:val
        })

        if(response){
            dispatch(await resetUploadedImages(response.data))
        }

    }


    return (
    <>  
        <Header/>
        {warning && 
            <MyPopup BackClose onClose={()=>{setWarning(false)}}>
                <div className='mx-5 my-4 popUpfontsize'>
                    Any of your uploaded Image does not comply to our company's standards <br/>
                    Please contact admin
                </div>
            </MyPopup>
        }
        <div className='px-1 px-md-5 artist mb-5' >
            <div className='profile'>
                <div className='profilePic mb-5'>{artistDetails ? "WELCOME " + artistDetails.firstname.toUpperCase() : "...loading"}</div>
                <h3 className='artistCounter mb-5'> STEP 1</h3>
                <div className='imageUploader'>
                    <p className='artistCounterMessage mb-5'>
                        {/* <p style={{ textTransform: "initial" }}>
                            {imageContent.length > 0 ? imageContent[0].name : 'To upload one or more images click on the "UPLOAD HERE" button on the left.'}
                        </p> */}
                        <p style={{ textTransform: "initial" }}>
                            To upload one or more images click on the "UPLOAD HERE" button on the left.
                        </p>
                        <p style={{ textTransform: "initial" }}>
                            Click on an image to crop the thumbnail.
                        </p>
                    </p>
                </div>  
                {/* <h3 className='artistCounterMessage mb-5' >Upload one or more images. Click on the thumbnail to select thumbnail, keyword and submit. </h3> */}
            </div>
            <div className='_4cols-v2'>
                <label className='artistcardAdmin w-inline-block addImageBtn'>
                    <img alt='' src={AddImage} className="addImage"/>
                    <input hidden multiple type="file" onChange={(e)=>changePageHandler(e)}/>
                </label>
                {artistReducer.savedImages !== null && 
                    artistReducer.savedImages.map((val,ind)=>
                    val.statusSubmit == 0 ?
                            <div className='artistcardAdmin w-inline-block' style={{cursor: "pointer"}} key={ind}>
                                <div
                                    onClick={() => deleteImageHandler(val)}
                                    className="crossSection"
                                    >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12px"
                                        height="12px"
                                        viewBox="0 0 352 512"
                                    >
                                        <path
                                        fill="grey"
                                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                        />
                                    </svg>
                                </div>
                                <img onClick={()=>updateImageDetails(val)}  alt='' src={val.path} className="image"/>
                            </div>
                        :
                        null
                    )
                }
                {showLoader?
                    <MyPopupLoading >
                        <img className="mt-4" alt="loading" src={loading} style={{width:"100px"}}/>
                    </MyPopupLoading>
                    :
                    null                
                }
                
            </div>
            <div className='desc'>
                <div className='inner'>
                    <div className='inner_text'>"At Shannon Associates, we genuinely care about our artist's work, and glaze emerges as a powerful tool to prevent the learning and imitating of your unique style of AI-art models"</div>
                    <div className='buttons_div' >
                        <a className='buttons' href='https://glaze.cs.uchicago.edu/downloads.html' target="_blank">Download Glaze</a> 
                        <a className='buttons' href='https://youtu.be/zryvJjb9EEY' target="_blank">Tutorial</a> 
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Artist