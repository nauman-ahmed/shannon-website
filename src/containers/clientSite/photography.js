import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPhotography } from '../../AxiosFunctions/Axiosfunctionality'
import loading from '../../assets/loading.gif';
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality';

const images = window.location.origin+"/assets/images"

function Photography(props) {

  const [data,setData] = useState(null)

  useEffect(()=>{
    getPhotography().then((res)=>{
      setData(res)
    })
  },[])


  return (
    <div className="_2cols">
    {props.children}
    <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403e-576fcec6" className="divisionscolumn">
      <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403f-576fcec6" className="divisioncontainer">
        <div className="divisiondivider grad">
          <h2 className="divisionh2">PHOTOGRAPHY</h2>
        </div>
        <div class="sortingcont">
          <a sort-by=".order" href="#" class="filter-button w-inline-block">
            <div>DEFAULT</div>
          </a>
          <a sort-by=".name" href="#" class="filter-button w-inline-block">
            <div>ALPHABETICAL A-Z</div>
          </a>
        </div>
        <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464043-576fcec6" className="_4cols divisions">
          {data?
            data.map((val,ind)=>
            <Link id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464049-576fcec6" to={"/artists/"+val.artistId.firstname} className="artistcard bipoc w-inline-block">
              <img src={String(val.ImageData[0].mainImage[0].subImage[0].path)} loading="lazy" alt="" className="image"/>
              <div className="artistnamediv">
                <div className="artistnametext">{val.artistId.lastname} {val.artistId.firstname}</div>
              </div>
            </Link>
            )
          :
          <div style={{position:"absolute",top:"50%",left:"50%"}}><img className="mb-3" alt="loading" src={loading} style={{width:"50px"}}/></div>
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default Photography