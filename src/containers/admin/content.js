import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from "../../assets/svgs/searchImage.svg"
import { getAllContents, IMAGE_ROUTE, updateContents } from '../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../redux/message';

import ShannonContent from './contentPages/shannon'
import ImageContent from './contentPages/image'

function Content(props) {
  const [formNo2, setFormNo2] = useState(0)
  const [shannonContent,setShannonContent] = useState([])
  const [imageContent,setImageContent] = useState([])
  const dispatch = useDispatch();
  
  const getAllContent = ()=>{
    getAllContents({}).then((res)=>{
        let shannon = res.filter((item) => item.contentType == "SHANNON")
        let image = res.filter((item) => item.contentType == "IMAGE")
        setShannonContent(shannon)
        setImageContent(image)
    })
  }

  useEffect(() => {
    getAllContent();
  }, [])

  const uploadContent = (data)=>{

    console.log(data)
    updateContents({data}).then((res)=>{
      dispatch(updateOpen(true))  
      dispatch(updateMessage(res))
       
      getAllContent();
    })
  }

  return (
    <div className='px-xl-5 mx-xl-5 banners'>
      <div className='mx-lg-5 px-lg-3 py-3 mt-3 ml-5 d-flex justify-content-center'>
        <div className='col-6 p-0 subNavBar d-flex justify-content-between'>
            <button  onClick={()=>setFormNo2(0)} className={'btn'+(formNo2 === 0? " active": "")}>Shannon Content</button>
            <button  onClick={()=>setFormNo2(1)} className={'btn'+(formNo2 === 1? " active": "")}>Image Uploading</button>
        </div>
      </div>
      {
        formNo2 == 1 ?
          <ImageContent uploadContent={uploadContent} content={imageContent}/>
        :
          <ShannonContent uploadContent={uploadContent} content={shannonContent}/>
      }
    </div>
  )
}

export default Content