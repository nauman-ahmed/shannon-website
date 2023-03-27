import React from 'react'
import { IMAGE_ROUTE } from '../../../AxiosFunctions/Axiosfunctionality'
const img1 = window.location.origin+"/assets/images/IMG1.png"
const img2 = window.location.origin+"/assets/images/IMG2.png"
const img3 = window.location.origin+"/assets/images/IMG3.png"
const img4 = window.location.origin+"/assets/images/IMG4.png" 

function ImgSubmission(props) {
  return (
    <div className='row m-0'>
      {localStorage.setItem('currentArtist',JSON.stringify(props.selectedArtist))}
        {Object.keys(props.selectedImages).length > 0 ? props.selectedImages.mainImage.map((item,key)=>
            (item.statusSubmit === 1 && item.status === 0?<div key={key} onClick={()=>props.history.push({pathname:"/admin/artists/"+item._id,state: { selectedArtist: props.selectedArtist,selectedImages:props.selectedImages }})} className='col-6 col-md-3 col-sm-4 artistcardAdmin w-inline-block'>
            <img alt='' src={item.path} className="image" style={{cursor:"pointer"}} />
        </div>:<div key={key}></div>)
        ):""}
       
        
    </div>
  )
}

export default ImgSubmission