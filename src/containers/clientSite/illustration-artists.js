import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getIllustrations } from '../../AxiosFunctions/Axiosfunctionality'
import loading from '../../assets/loading.gif';
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality';


import { useDispatch, useSelector } from "react-redux";
import { ArtistImageSliceData } from "../../redux/artistImageDataSlice";

const images = window.location.origin + "/assets/images";



function IllustrationArtists(props) { 

  const [data,setData] = useState(null)
  const [dataOriginal,setDataOriginal] = useState(null)
  const dispatch = useDispatch();
  const { artistImageDataSlice } = useSelector((state) => state);

  const filterChange= (filter) => {

    let tempData = [...data];
    setDataOriginal([...data])
    if(filter==="A-Z"){
      tempData = tempData.sort((a, b) => a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize()));
    }
    else if (dataOriginal){
      tempData = [...dataOriginal];
      // tempData = dataOriginal;
    }

    setData(tempData);

  }

 

  useEffect(() => {
    dispatch(ArtistImageSliceData());
  }, []);

  return (  
   <> 
        <div class="sortingcont right pt-0 mt-0">
          <a class="filter-button w-inline-block  mt-0" onClick={()=>filterChange("Default")}>
            <div >DEFAULT</div>
          </a>
          <a class="filter-button w-inline-block  mt-0" onClick={()=>filterChange("A-Z")}>
            <div >ALPHABETICAL A-Z</div>
          </a>
        </div>
    <div className="_2cols" style={{clear:"both"}}>
    {props.children}
    <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403e-576fcec6" className="divisionscolumn">
      <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403f-576fcec6" className="divisioncontainer">
       
        <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464043-576fcec6" className="_4cols-v2">
        {artistImageDataSlice.loading ? (
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
              style={{ width: "50px" }}
            />
          </div>
        ) : (
          artistImageDataSlice.artistImages.map((val, ind) => (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={"/artists/" + val.artistId.firstname}
                className="artistcard  w-inline-block"
              >
                <img
                  src={String(val.mainImage[0].subImage[0].path)}
                  loading="lazy"
                  alt=""
                  className="image"
                />
                <div className="artistnamediv">
                  <div className="artistnametext">
                    {val.artistId.lastname} {val.artistId.firstname}
                  </div>
                </div>
              </Link>
              </>
        )))}
        </div>
      </div>
    </div>
  </div>
   </>
  )
}

export default IllustrationArtists