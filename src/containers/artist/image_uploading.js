import React, { useState, useEffect } from 'react'
import Header from '../../components/layout2/header'
import MyPopup from '../../components/myPopup/myPopup'
import MyPopupLoading from '../../components/loader/myPopup'
import "./artist.css"
import BackArrow from "../../assets/svgs/backArrow.svg"
import { useDispatch,useSelector } from 'react-redux'
import ReactCrop from 'react-image-crop'
import { getImageBaseURL, changeArtistImageDetails, getAllContents} from '../../AxiosFunctions/Axiosfunctionality'
import { artistImageCreateApi } from '../../redux/artistImageSlice'
import { decodeToken } from "react-jwt";
import { useHistory } from 'react-router-dom'
import { updateMessage, updateOpen } from '../../redux/message'
import SnackbarCustom from '../../components/snackBar/SnackbarCustom';
import loading from '../../assets/loading.gif'; 


const img1 = window.location.origin+"/assets/images/IMG3.png"
function Image_uploading() {

    const history = useHistory()

    const [imageContent,setImageContent] = useState([])
    const [showLoader,setShowLoader] = useState(false);
    const [pageNo, setPageNo] = useState(0)
    const [isPopupShow, setIsPopupShow] = useState(false) 
    const [image,setImage] = useState(null)
    const [keyword,setKeyword] = useState(null)
    const [keywordList,setKeywordList] = useState(null)
    const [keywordKids,setKeywordKids] = useState(null)
    const [temp, setTemp] = useState(null)
    const [details, setDetails] = useState(decodeToken(localStorage.getItem("authorization")))


    const [pagination, setPagination] = useState({
        previous:[],
        current:{},
        next:[]
    })
    const [completedCrop, setCompletedCrop] = useState({
        unit: 'px',
        x: 20,
        y: 20,
        width: 225,
        height: 225,
        aspect: 1 ,
      })



    const dispatch = useDispatch();
    const { keywordReducer,artistReducer } = useSelector( state => state )
    const [artistImageDetails,setArtistImageDetails] = useState(null)

    
    const getBase64FromUrl = async (dataurl) => {
        if(dataurl){
            let res = await getImageBaseURL({url:dataurl})
            var arr = res.data,
                mime = "image/jpeg",
                bstr = atob(arr), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
                
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            setTemp("data:image/jpeg;base64,"+res.data)
    
        }
    } 

    const getAllContent = ()=>{
        getAllContents({type: "IMAGE"}).then((res)=>{
            let image = res[0].content
            setImageContent(image)
        })
    }

    useEffect(()=>{

        try{
            getAllContent();
            getBase64FromUrl(artistReducer.uploadedImage.imageFile.originalPath)
            let artistImageDetailsTemp = []
            artistImageDetailsTemp.push({
                img: artistReducer.uploadedImage.imageFile.originalPath,
                title: "",
            })
            setArtistImageDetails(artistImageDetailsTemp)
            // paginationHandler(0)   

            let keywordTemp = []
            let keywordKidsTemp = []

            keywordReducer.map((val,ind)=>{
                if(val.type == 1){
                    keywordTemp.push(val)
                } else{
                    keywordKidsTemp.push(val)
                }         
            })     

            setKeywordList(keywordReducer)
            setKeyword(keywordTemp)
            setKeywordKids(keywordKidsTemp)

        }catch(e){
            history.push("/artist")
        }
    },[])


    const paginationHandler = (num,prev=false) =>{
        if(prev){
            console.log(artistImageDetails.length)
            const len = artistImageDetails.length
            for (let index = 0; index < len - 1; index++) {
                artistImageDetails.pop()
            }
        }else(
            getCroppedImg()
        )
        setPageNo(num)
    }


    const getCroppedImg = () => {
        if(image == null){
            return
        }


        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext("2d");
      
        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = completedCrop.width * pixelRatio;
        canvas.height = completedCrop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
      
        ctx.drawImage(
          image,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width,
          completedCrop.height
        );
      
        new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
                let artistImageDetailsTemp = [...artistImageDetails]
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = () => {
                   let croppedFile =  dataURLtoFile(reader.result, artistImageDetailsTemp[0].img.name+"_sub_image_"+pageNo+'.jpg')
                   artistImageDetailsTemp.push({
                    name:"thumbnail_image_"+pageNo,
                    img:croppedFile
                    })
                    setArtistImageDetails(artistImageDetailsTemp)
                }

            },
            "image/jpeg",
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

    const onChangeHandler = (e) => {
        let artistImageDetails1 = [...artistImageDetails]
        artistImageDetails1[0][e.target.name] = e.target.value
        setArtistImageDetails(artistImageDetails1)
    }


    const onImageLoad = (e) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
        setImage(e.currentTarget)
    }

    const keywordSetter = (val,ind) => {
        let artistImageDetailsTemp = [...artistImageDetails]
        
        if(artistImageDetailsTemp[artistImageDetailsTemp.length-1].keywordList == undefined){
            let keywordListTemp = []
            keywordListTemp.push(val)
            artistImageDetailsTemp.push({
                keywordList: keywordListTemp              
            })
            setArtistImageDetails(artistImageDetailsTemp)
            return
        }

        let keywordListTemp = [...artistImageDetails[artistImageDetails.length-1].keywordList]
        
        if(keywordListTemp.includes(val)){
            const index = keywordListTemp.indexOf(val);
            if (index > -1) { 
                keywordListTemp.splice(index, 1); 
            }
        }else{
            keywordListTemp.push(val)
        }

        artistImageDetailsTemp[artistImageDetailsTemp.length-1].keywordList = keywordListTemp
        setArtistImageDetails(artistImageDetailsTemp)
    }


    const onSubmit = () => {
        try{
            console.log("NAUMAN",artistImageDetails)
            let storageData = localStorage.getItem("authorization")
            let details = decodeToken(storageData)
            if(artistImageDetails.length == 2){
                dispatch(updateOpen(true))
                dispatch(updateMessage("Select Atleast One Keyword"))
            }
            else if(artistImageDetails[2].keywordList.length == 0){
                dispatch(updateOpen(true))
                dispatch(updateMessage("Select Atleast One Keyword"))
            }
            else if(artistImageDetails[2].keywordList.length > 8 ){
                    let message1 = artistImageDetails[2].keywordList.length > 8 ? "Keywords Must be 8 or Less" : null
                    let message2 = artistImageDetails[0].title =="" ? "Image Title Should not be Empty" : null
                    let message = message1 == null ? message2 : message2 == null ? message1 : message1 + " and " + message2
                    dispatch(updateOpen(true))
                    dispatch(updateMessage(message))
            }else{

                let originalImage = dataURLtoFile(temp,"originalImage.jpg")
        
                const imageCreate = new FormData()
                imageCreate.append('k_id',artistImageDetails[2].keywordList)
                imageCreate.append('_id',details._id)
                imageCreate.append('mainId',artistReducer.uploadedImage.imageFile._id)
                imageCreate.append('artistDir',details.artistDir)
                imageCreate.append('artistImage_2',artistImageDetails[1].name)
                imageCreate.append('artistImage',artistImageDetails[1].img)
                imageCreate.append('artistImage',originalImage)
                imageCreate.append('caption',"© " + details.firstname.toLowerCase())
                imageCreate.append('color',artistReducer.uploadedImage.imageFile.copyrightColor)

                setShowLoader(true)
                changeArtistImageDetails(imageCreate).then(res => {
                    if(res == 'successfully updated'){
                        setShowLoader(false)
                        setIsPopupShow(true)
                    }else{
                        dispatch(updateOpen(true))
                        dispatch(updateMessage("Error Occured"))
                        history.push('/artist')
                    }
                })
            }

        }
        catch(e){
            dispatch(updateOpen(true))
            dispatch(updateMessage("Error Occured"))
            history.push('/artist')
        }
    }


    return (
        <>
            <Header/>
            <div className='px-0 mx-5 mb-5 imageUploader'>
                <div className='profile'>
                    <div className='profilePic'>{ details ? details.firstname ?  "WELCOME " + details.firstname.toUpperCase() : "...loading" : null }</div>
                        {pageNo > 0?
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <button 
                                        className='btn1 mt-3 '
                                        onClick={()=>history.push('/artist')}
                                    >
                                        CANCEL
                                    </button>
                                    <button className='btn1 mt-3' onClick={()=>paginationHandler(pageNo-1,true)}>
                                        <img alt='' src={BackArrow}/>
                                    </button>
                                </div>
                                <div>
                                    {showLoader?
                                        <img alt="loading" src={loading} style={{width:"30px",marginTop:-20}}/>
                                        :
                                        <button className='btn1 dark px-4 align-self-bottom' style={{fontSize: "1.3vw"}} onClick={onSubmit}>Submit</button>
                                    }
                                </div>
                            </div>
                            :
                                <button 
                                className='btn1 mt-3 '
                                onClick={()=>history.push('/artist')}
                            >
                                CANCEL
                            </button>
                        }
                    <h3 className='artistCounter mb-5'>STEP {pageNo + 2}</h3>
                    <p className='artistCounterMessage mb-5' >
                        {pageNo == 1 ?
                            <p>
                                {imageContent.length > 0 ? imageContent[2].name : "Please choose up to 8 keywords in each section (if your work is applicable for both sections)"}
                                <br/>
                                {imageContent.length > 0 ? imageContent[3].name : "Please be sure to keyword for the SPECIFIC IMAGE and not your body of work."}
                            </p>
                            :
                            imageContent.length > 0 ? imageContent[1].name : "Move and resize the box to select the desired thumbnail, click next when the thumbnail has been selected."
                        }
                         
                    </p>
                </div>
                <div className='px-0 row m-0'>
                </div>
                {pageNo === 0 ?
                    <div className='px-0 row m-0'>
                        <div className='col-xl-9 col-lg-8 my-5'>
                        {artistImageDetails !== null ? 
                           pageNo === 0 ?
                            <ReactCrop
                                    crop={completedCrop}
                                    onChange={(percentCrop) => setCompletedCrop(percentCrop)}
                                    minHeight={200}
                                    minWidth={200}
                                    aspect={1}
                                    >
                                    <img
                                        alt="Crop me"
                                        src={temp}
                                        onLoad={onImageLoad}
                                        style={{ maxWidth: "500px", objectFit: "cover", maxHeight: "1000px"}}
                                    />
                                </ReactCrop>
                           :null                   
                        : null
                        } 
                        </div>
                        {pageNo === 0?
                        <div className='col-xl-3 col-lg-4 mt-lg-0 mt-5'>
                            <button className='btn1 dark px-4 align-self-bottom' onClick={()=>paginationHandler(pageNo + 1)}>NEXT</button>
                        </div>
                        :null}
                    </div>
                :
                    <div className='px-5 row m-0'>
                        {/* <div className='col-12 border-bottom'>
                            <p>
                                Please choose up to 8 keywords in each section (if your work is applicable for both sections).<br/>
                                Please be sure to keyword for the SPECIFIC IMAGE and not your body of work.
                            </p>
                        </div> */}
                        <div className='col-md-6 col-12 px-0 py-5 border-right border-md-0 border-top'>
                            <div className='row m-0'>
                                <h4 className='col-12 mb-5'>KEYWORD LISTING</h4>
                                {keyword !== null &&
                                    keyword.map((val,ind)=>
                                    <div className='col-xl-4 col-lg-6 col-sm-12 col-12' key={ind}>
                                        <label className='checkBox'>{val.keyword}
                                            <input type="checkbox" value= "checking 1" onClick={()=>keywordSetter(val._id,ind)}/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='col-md-6 col-12 px-0 py-5 border-top'>
                            <div className='row m-0'>
                                <h4 className='col-12 mb-5'>KEYWORD LISTING KIDS</h4>
                                {keywordKids !== null &&
                                    keywordKids.map((val,ind)=>
                                    <div className='col-xl-4 col-lg-6 col-sm-12 col-12' key={ind}>
                                        <label className='checkBox'>{val.keyword}
                                            <input type="checkbox" value= "checking 1" 
                                            onClick={()=>keywordSetter(val._id)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div> 
                                    )
                                }
                            </div>
                        </div>
                        
                    </div>
                }
            </div>
            {isPopupShow?
                <MyPopup BackClose onClose={()=>{setIsPopupShow(false); history.push("/artist")}}>
                    <div className='mx-5 my-4'>
                        WE RECEIVED YOUR IMAGE
                    </div>
                </MyPopup>
                :null
            }
          <SnackbarCustom  />
        </>
  )
}

export default Image_uploading