import React, { useState } from 'react'
import Header from '../../components/layout2/header'
import MyPopup from '../../components/myPopup/myPopup'
import "../artist/artist.css"
import BackArrow from "../../assets/svgs/backArrow.svg"
import { useHistory } from 'react-router-dom'
import { changeArtistImageDetails, IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality'
import { useEffect } from 'react'
import {  getCategory,getImageBaseURL } from '../../AxiosFunctions/Axiosfunctionality'
import { useDispatch } from 'react-redux'
import { updateMessage, updateOpen } from '../../redux/message'
import ReactCrop from 'react-image-crop'
import loading from '../../assets/loading.gif'; 

const img1 = window.location.origin+"/assets/images/IMG3.png"

function Image_uploading(props) {
    const dispatch=useDispatch(); 
    const history = useHistory()
    const [pageNo, setPageNo] = useState(0)
    const [isPopupShow, setIsPopupShow] = useState(false)
    const [artistImage, setArtistImage] = useState(false)
    const [keywordList, setKeywordList] = useState(null)
    const [keyword, setKeyword] = useState(null)
    const [keywordKids, setKeywordKids] = useState(null)
    const [artistkeyword, setArtistKeyword] = useState(null)
    const [temp, setTemp] = useState(null)
    const [image,setImage] = useState(null)
    const [svg,setSvg] = useState("")
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
            
            // let caption = props.images.copyrightText  ? props.images.copyrightText : `© ${props.artistId.lastname.toLowerCase()} ${props.artistId.firstname.toLowerCase()}`
            //let caption = props.images.copyrightText  ? props.images.copyrightText : ``
            setCopyrightColor(props.images.copyrightColor  ? props.images.copyrightColor : "light Gray")
            //setCopyrightText(caption)

            if(keywordList == null){
                let data = {};
                getCategory(data).then((res)=>{
                    setKeywordList(res)
                })
        
            }
            if(keywordList){
                let keywordTemp = []
                let keywordKidsTemp = []
        
                keywordList.map((val,ind)=>{
                    if(val.type == 1){
                        props.images.keywordID.map((val1,ind1)=>{
                            if(val1.type == 1){
                                if(val._id == val1._id){
                                    val.checked = true
                                } 
                            }         
                        }) 
                        keywordTemp.push(val)
                    } else{
                        props.images.keywordID.map((val1,ind1)=>{
                            if(val1.type == 2){
                                if(val._id == val1._id){
                                    val.checked = true
                                }
                            }         
                        }) 

                        keywordKidsTemp.push(val)
                    }        
                })     
                
                setArtistKeyword(props.images.keywordID)
                setKeyword(keywordTemp)
                setKeywordKids(keywordKidsTemp)
        
            }

    }catch(e){
        history.push({
            pathname:'/admin/artists',
            state:{Nauman:1}
        });
    }

    },[keywordList,maximumLimit])
    

    const onChangeHandler = (e) => {
        let artistImageDetails1 = {...artistImage}
        artistImageDetails1[e.target.name] = e.target.value
        setArtistImage(artistImageDetails1)
    }
    

    const keywordSetter = (val,checked,kids = false) => {
        let artistKeywordTemp = [...artistkeyword] 
        
        if(kids){
            let keywordKidsTemp = [...keywordKids]

            keywordKidsTemp.map((val1,ind)=>{
                if(val == val1._id){
                    keywordKidsTemp[ind].checked = !checked
                }
            })

            setKeywordKids(keywordKidsTemp)
        
        }else{
            let keywordTemp = [...keyword]

            keywordTemp.map((val1,ind)=>{
                if(val == val1._id){
                    keywordTemp[ind].checked = !checked
                }
            })

            setKeyword(keywordTemp)
        
        }


    }

    const onSubmitHandler = () => {
        let keywordList = []

        let keywordKidsTemp = []
        keywordKidsTemp = keywordKids.filter(val => val.checked == true)

        let keywordTemp = []
        keywordTemp = keyword.filter(val => val.checked == true)

        keywordList = keywordKidsTemp.concat(keywordTemp);

        let originalImage = dataURLtoFile(temp,"originalImage.jpg")

        let artistImageTemp = {...artistImage,keyword:keywordList,mainId:props.images._id}
        let keywordListTemp = []
        artistImageTemp.keyword.map(val => {
            keywordListTemp.push(val._id)
        })

        const imageCreate = new FormData()
        imageCreate.append('k_id',keywordListTemp)
        imageCreate.append('title',artistImageTemp.title)
        imageCreate.append('mainId',props.images._id)
        imageCreate.append('artistImage',artistImageTemp["0"])
        imageCreate.append('artistImage',originalImage)
        imageCreate.append('caption',copyrightText)
        imageCreate.append('color',copyrightColor)
        // imageCreate.append('svg',svg)
        imageCreate.append('adminPortfolio',true)
        imageCreate.append('_id',props.artistId._id)

        imageCreate.append('croppedDetails_x',completedCrop.x)
        imageCreate.append('croppedDetails_y',completedCrop.y)
        imageCreate.append('croppedDetails_width',completedCrop.width)
        imageCreate.append('croppedDetails_height',completedCrop.height)

        setIsPopupShow(true)
        changeArtistImageDetails(imageCreate).then((res)=>{
            if(res == 'successfully updated'){
                dispatch(updateOpen(true));
                dispatch(updateMessage(res));
            }else{
                dispatch(updateOpen(true))
                dispatch(updateMessage("Error Occured"))
            }
            history.push({
                pathname:'/admin/artists',
                state:{Nauman:2}
            });
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
                   let croppedFile =  dataURLtoFile(reader.result,"sub_image_"+pageNo+'.jpg')
                   artistImageTemp[pageNo] = croppedFile
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
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
        let demen_object = {
            "width": width,
            "height": height
        }

        // try {
        //     demen_object = sizeOf(req.files[1].path)
        // } catch (error) {
        //     demen_object = sizeOf(await sharp(await readFile(req.files[1].path)).toColorspace("srgb").toBuffer())
        // }

        let demen_width = 0
        let demen_height = 0
        let diff = 0
        let per = copyrightText.length <= 8 ? 0.7 : copyrightText.length <= 14 ? 0.65 : 0.6 
        let fontFamily = "'Century Gothic', sans-serif"
        let fontSize =  Math.floor(demen_object.width * 0.0299).toString()+"px"
        


        diff = demen_object.height - Math.floor(demen_object.height * 0.95)
        demen_width = Math.floor(demen_object.width * per)
        demen_height = Math.floor(demen_object.height * 0.1)

        setSvg(`<svg viewBox="0 0 ${demen_object.width} ${demen_object.height}" width="${demen_object.width}" height="${demen_object.height}" >
        <style>
            .small {
                font-family: ${fontFamily};
                font-size: ${fontSize};
                fill: ${copyrightColor};
            }
            </style>
            <text  x="95%" y="95%" text-anchor="end" dominant-baseline="ideographic" class="small"> ${copyrightText} </text>
         </svg>`)
        setImage(e.currentTarget)
    }

    return (
        <> 
            <div className=' mx-5 imageUploader'>
                <div className='px-5 row m-0'>
                <button className='btn1 mt-3 mb-5'
                        onClick={()=>history.push({
                            pathname:'/admin/artists',
                            state:{Nauman:1}
                        })}
                    >
                        CANCEL
                    </button>
                    {pageNo > 0?
                    <button className='btn1 mt-3 mb-5' onClick={()=>setPageNo(pageNo-1)}>
                        <img alt='' src={BackArrow}/>
                    </button>
                    :null}
                </div>
                {pageNo === 0  ?
                    <div className='px-5 row m-0'>
                        <div className='col-xl-9 col-lg-8 d-flex my-5 justify-content-center'>
                           
                        {artistImage !== null ? 
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
                               />
                           </ReactCrop>

                           :null                   
                        : null
                        } 
                        </div>
                        {pageNo === 0?
                        <div className='col-xl-3 col-lg-4 mt-lg-0 mt-5 d-flex flex-column align-items-center'>
                            {/* <div className='d-flex flex-column align-items-center w-100'>
                                <b className='mb-4'>ORIGINAL</b>
                                <label className='checkBox'>THUMBNAIL {pageNo}
                                </label>
                                <input 
                                    className='textField' 
                                    value={artistImage? artistImage.title: ""} 
                                    type="text"
                                    name= "title"
                                    onChange={onChangeHandler}
                                />
                            </div> */}
                            <div className='d-flex flex-column align-items-center w-100'>
                                <b className='mb-4'>Copyright Text</b>
                                <input 
                                    className='textField' 
                                    value={copyrightText}
                                    type="text"
                                    name= "title"
                                    onChange={(e) => setCopyrightText(e.target.value)}
                                />
                            </div>
                            <div className='d-flex flex-column align-items-center w-100 mb-2'>
                                <b className='mb-4'>Copyright Color</b>
                                <div className='d-flex align-items-center'>
                                    <label className='px-3 d-flex' style={{width:"max-content", cursor:"pointer"}} >
                                        <input className='mr-2' name="color" type="radio" value={"Light Gray"}  checked={copyrightColor === "Light Gray"} onClick={(e)=>setCopyrightColor(e.target.value)}/>
                                        Light Gray
                                    </label>
                                    <label className='px-3 d-flex' style={{width:"max-content", cursor:"pointer"}} >
                                        <input className='mr-2' name="color" type="radio" value={"Dark Gray"} checked={copyrightColor === "Dark Gray"} onClick={(e)=>setCopyrightColor(e.target.value)} />
                                        Dark Gray
                                    </label>
                                </div>
                            </div>
                            <button className='btn1 dark px-4 align-self-bottom' onClick={()=>{setPageNo(pageNo + 1); getCroppedImg();} }>NEXT</button>
                        </div>
                        :null}
                    </div>
                :
                    <div className='px-0 row m-0'>
                        <div className='col-12 border-bottom'>
                            <p>
                                Please choose up to 8 keywords in each section (if your work is applicable for both sections).<br/>
                                Please be sure to keyword for the SPECIFIC IMAGE and not your body of work.
                            </p>
                        </div>
                        <div className='col-md-6 col-12 px-0 py-5 border-right border-md-0'>
                            <div className='row m-0'>
                                <h4 className='col-12 mb-5'>KEYWORD LISTING</h4>
                                {keyword !== null &&
                                    keyword.map((val,ind)=>
                                    <div className='col-xl-4 col-lg-6 col-sm-12 col-12' key={ind}>
                                        <label className='checkBox'>{val.keyword}
                                            <input 
                                                type="checkbox" 
                                                value= "checking 1" 
                                                defaultChecked={val.checked}
                                                onClick={()=>keywordSetter(val._id,val.checked)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='col-md-6 col-12 px-0 py-5'>
                            <div className='row m-0'>
                                <h4 className='col-12 mb-5'>KEYWORD LISTING KIDS</h4>

                                {keywordKids !== null &&
                                    keywordKids.map((val,ind)=>
                                    <div className='col-xl-4 col-lg-6 col-sm-12 col-12' key={ind}>
                                        <label className='checkBox'>{val.keyword}

                                            <input 
                                                type="checkbox" value= "checking 1" 
                                                defaultChecked ={val.checked}
                                                onClick={()=>keywordSetter(val._id,val.checked,true)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    )
                                }
                            </div>

                        </div>
                        <div className='col-12 d-flex justify-content-end'>
                        {isPopupShow?
                           <img alt="loading" src={loading} style={{width:"30px",marginTop:-20}}/>
                        :
                        <button 
                                className='btn1 dark px-4 align-self-bottom' 
                                style={{marginTop:-20}} 
                                onClick={()=>onSubmitHandler()}
                            >Submit</button>
                        }
                        </div>
                    </div>
                }
            </div>
            {/* {isPopupShow?
                <MyPopup BackClose onClose={()=>setIsPopupShow(false)}>
                <div className='mx-5 my-4'>
                    WE RECEIVED YOUR IMAGE
                </div>
                </MyPopup>
            :null} */}
        </>
  )
}

export default Image_uploading
