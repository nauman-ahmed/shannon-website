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
    const [completedCrop, setCompletedCrop] = useState({
        unit: 'px',
        x: 20,
        y: 20,
        width: 225,
        height: 225,
        aspect: 1 ,
      })



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
            let temp = new File([u8arr], {type:mime})
            setTemp("data:image/jpeg;base64,"+res.data)
    
        }
    } 


    useEffect(()=>{
        try{
            getBase64FromUrl(props.images.path)
            setArtistImage({
                imgPath: props.images.path,
                title: props.images.title,
                _id:props.data[0].artistId._id
            })

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
        history.push('/admin/artists')
    }

    },[keywordList])
    

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


        let artistImageTemp = {...artistImage,keyword:keywordList,mainId:props.images._id}
        let keywordListTemp = []
        artistImageTemp.keyword.map(val => {
            keywordListTemp.push(val._id)
        })
        const imageCreate = new FormData()
        imageCreate.append('k_id',keywordListTemp)
        imageCreate.append('title',artistImageTemp.title)
        imageCreate.append('artistImage',artistImageTemp["1"])
        imageCreate.append('artistImage',artistImageTemp["2"])
        imageCreate.append('EDIT',"True")
        imageCreate.append('mainId',props.images._id)

        changeArtistImageDetails(imageCreate).then((res)=>{
            dispatch(updateOpen(true));
            dispatch(updateMessage(res.msg));
            history.push('/admin/artists');
        })
        setIsPopupShow(true)
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

                let artistImageTemp = {...artistImage}
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = () => {
                   let croppedFile =  dataURLtoFile(reader.result,"sub_image_"+pageNo+'.jpg')
                   artistImageTemp[pageNo] = croppedFile
                   setArtistImage(artistImageTemp)
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

    const onImageLoad = (e) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
        setImage(e.currentTarget)
    }


    return (
        <> 
            <div className='px-5 mx-5 imageUploader'>
                <div className='px-5 row m-0'>
                <button className='btn1 mt-3 mb-5'
                        onClick={()=>history.push('/admin/artists')}
                    >
                        CANCEL
                    </button>
                    {pageNo > 0?
                    <button className='btn1 mt-3 mb-5' onClick={()=>setPageNo(pageNo-1)}>
                        <img alt='' src={BackArrow}/>
                    </button>
                    :null}
                </div>
                {pageNo === 0 || pageNo === 1 || pageNo === 2?
                    <div className='px-5 row m-0'>
                        <div className='col-xl-9 col-lg-8 d-flex justify-content-center'>
                           {artistImage !== null && pageNo === 0 ? 
                           <img alt='' src={props.images.path}/>
                           : null
                        }
                        {artistImage !== null ? 
                           pageNo === 1 || pageNo === 2?
                               <ReactCrop
                                crop={completedCrop}
                                onChange={(percentCrop) => setCompletedCrop(percentCrop)}
                                minHeight={10}
                                minWidth={10}
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
                        <div className='col-xl-3 col-lg-4 mt-lg-0 mt-5 d-flex flex-column align-items-center justify-content-between'>
                            <div className='d-flex flex-column align-items-center w-100'>
                                <b className='mb-4'>ORIGINAL</b>
                                <input 
                                    className='textField' 
                                    value={artistImage? artistImage.title: ""} 
                                    type="text"
                                    name= "title"
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <button className='btn1 dark px-4 align-self-bottom' onClick={()=>setPageNo(pageNo + 1)}>NEXT</button>
                        </div>
                        :pageNo === 1 || pageNo === 2?
                        <div className='col-xl-3 col-lg-4 mt-lg-0 mt-5 d-flex flex-column align-items-center justify-content-between'>
                            <div className='d-flex flex-column align-items-center w-100'>
                                <b className='mb-4'>ORIGINAL</b>
                                <label className='checkBox'>THUMBNAIL {pageNo}
                                    {/* <input type="checkbox"/>
                                    <span className="checkmark"></span> */}
                                </label>
                            </div>
                            <button className='btn1 dark px-4 align-self-bottom' onClick={()=>{setPageNo(pageNo + 1); getCroppedImg()}}>NEXT</button>
                        </div>
                        :null}
                    </div>
                :
                    <div className='px-5 row m-0'>
                        <div className='col-12 border-bottom'>
                            <p>
                                Please choose up to 8 keywords in each section (if your work is applicable for both sections).<br/>
                                Please be sure to keyword for the SPECIFIC IMAGE and not your body of work.
                            </p>
                        </div>
                        <div className='col-md-6 col-12 px-5 py-5 border-right border-md-0'>
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
                        <div className='col-md-6 col-12 px-5 py-5'>
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
                            <button 
                                className='btn1 dark px-4 align-self-bottom' 
                                style={{marginTop:-20}} 
                                onClick={()=>onSubmitHandler()}
                            >Submit</button>
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