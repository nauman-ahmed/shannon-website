import React, { useState } from 'react'
import Header from '../../../components/layout2/header'
import MyPopup from '../../../components/myPopup/myPopup'
import "../../artist/artist.css"
import BackArrow from "../../../assets/svgs/backArrow.svg"
import { useHistory } from 'react-router-dom'
import { changeArtistImageKeywords } from '../../../AxiosFunctions/Axiosfunctionality'
import { useEffect } from 'react'
import {  getCategory,getImageBaseURL } from '../../../AxiosFunctions/Axiosfunctionality'
import { useDispatch } from 'react-redux'
import { updateMessage, updateOpen } from '../../../redux/message'
import ReactCrop from 'react-image-crop'
import loading from '../../../assets/loading.gif'; 

const img1 = window.location.origin+"/assets/images/IMG3.png"

function Image_keywords(props) {
    const dispatch=useDispatch(); 
    const history = useHistory()
    const [isPopupShow, setIsPopupShow] = useState(false)
    const [artistImage, setArtistImage] = useState(false)
    const [keywordList, setKeywordList] = useState(null)
    const [keyword, setKeyword] = useState(null)
    const [keywordKids, setKeywordKids] = useState(null)
    const [artistkeyword, setArtistKeyword] = useState(null)
    const [temp, setTemp] = useState(null)
   
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
        try{

            getBase64FromUrl(props.images.originalPath)
            setArtistImage({
                imgPath: props.images.originalPath,
                title: props.images.title,
                _id:props.artistId._id,
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
            history.push({
                pathname:'/admin/artists',
                state:{Nauman:1}
            });
        }

    },[keywordList,maximumLimit])
    

    const keywordSetter = (val,checked,kids = false) => {
        
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
        imageCreate.append('mainId',props.images._id)
        imageCreate.append('adminPortfolio',true)
        imageCreate.append('_id',props.artistId._id)

        let data = {
            'k_id':keywordListTemp,
            'mainId':props.images._id,
            'adminPortfolio':true,
            '_id':props.artistId._id
        }

        setIsPopupShow(true)
        changeArtistImageKeywords(data).then((res)=>{
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
                    <div className='col-xl-6 col-lg-6 my-5' style={{ position: "sticky", top:"2rem" }}>
                        {artistImage !== null ? 
                             <img
                             alt="Crop me"
                             src={temp}
                             loading="lazy"
                             role="presentation"
                             decoding= "async"
                             fetchpriority= {"high"}
                             style={{position: "sticky", top:"2rem"}}
                         />
                        : null
                        } 
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                        <div className='row m-0'>
                            <h4 className='col-12 mb-5'>KEYWORD LISTING</h4>
                            {keyword !== null &&
                                keyword.map((val,ind)=>
                                <div className='col-xl-4 col-lg-3 col-sm-12 col-md-6' key={ind}>
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
                        <div className='row mt-5'>
                            <h4 className='col-12 mb-5'>KEYWORD LISTING KIDS</h4>
                            {keywordKids !== null &&
                                keywordKids.map((val,ind)=>
                                    <div className='col-xl-4 col-lg-3 col-sm-12 col-md-6' key={ind}>
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
                        <div className='col-12 d-flex justify-content-end py-5'>
                            {isPopupShow?
                            <img alt="loading" src={loading} style={{marginTop:-20}}/>
                            :
                            <button 
                                className='btn1 dark px-4 align-self-bottom' 
                                style={{marginTop:-20}} 
                                onClick={()=>onSubmitHandler()}
                            >Submit</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Image_keywords
