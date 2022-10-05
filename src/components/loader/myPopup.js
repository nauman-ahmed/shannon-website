import React from 'react'
import "./myPopup.css"
function MyPopup(props) {
  return (
    <div className='myPopupLoader'>
        {"BackClose" in props?
            <div className='closeBack' onClick={()=>("onClose" in props?props.onClose():console.error("MyPopup Component:","Please add onClose att. for get close event"))}></div>
            :null}
        <div className='myPopupCard p-5 mx-3'>
          {"CloseBtn" in props?
              <div className='closeBtn' onClick={()=>("onClose" in props?props.onClose():console.error("MyPopup Component:","Please add onClose att. for get close event"))}></div>
            :null}
          {props.children}
        </div>
    </div>
  )
}

export default MyPopup