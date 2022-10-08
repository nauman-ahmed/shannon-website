import React from 'react'
import { IMAGE_ROUTE } from '../../../AxiosFunctions/Axiosfunctionality'
const img1 = window.location.origin+"/assets/images/IMG1.png"
function Portfolio(props) {
  return (
    <div className='row m-0'>
      {
      Object.keys(props.selectedImages).length > 0 ? props.selectedImages.mainImage.map((item,key)=>(
        item.status === 1?<div key={key} className='col-6 col-md-3 col-sm-4 artistcard w-inline-block'>
            <img alt='' src={item.path} className="image"/>
        </div>:""
      )):""
    }
        
    </div>
  )
}

export default Portfolio