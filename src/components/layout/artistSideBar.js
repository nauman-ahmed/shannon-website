import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { sortAlphaOrder } from '../../UserServices/Services'

function ArtistSideBar() {

  const {ArtistDataAPI} = useSelector(state=>state)
  const [artistData, setArtistData]  = useState([])
  let alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  useEffect(() => {
    setArtistData(sortAlphaOrder(ArtistDataAPI.artistData!==undefined?ArtistDataAPI.artistData.length>0?ArtistDataAPI.artistData:[]:[]))
  }, [ArtistDataAPI])


  return (
    
    <div id="w-node-a284be2a-4b91-3177-03eb-6614b2487763-4bf2d022" className="div-block-4">
    <h3 className="homeh3">ARTISTS</h3>
    <div className="allartist v2">
      {alpha.map((item,key)=>
       (
        <div key={key}>
          {artistData[item] !== undefined ? (
          <div key={key}>
            {item}<br/>
            {artistData[item].map((item1,key1)=>(
              <div key={key1}>
               <Link to={"/artists/"+item1._id} className="sidebarlink">{item1.lastname.toUpperCase()} {item1.firstname.toUpperCase()}<br/></Link>
              </div>
            ))}
            <br/>
          </div>
          ): ""}
       </div>
      ) 
      )}
    </div>
  </div>

)
}

export default ArtistSideBar