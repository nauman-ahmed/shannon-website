import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getIllustrations, artistImageSliceData } from '../../AxiosFunctions/Axiosfunctionality'
import loading from '../../assets/loading.gif';
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality';


import { useDispatch, useSelector } from "react-redux";
import { ArtistImageSliceData } from "../../redux/artistImageDataSlice";

const images = window.location.origin + "/assets/images";


 
function IllustrationArtists(props) { 

  const [data,setData] = useState(null)
  const [dataOriginal,setDataOriginal] = useState(null)
  const [tempArtist,setTempArtist]= useState([]);
  const [filterCond,setFilterCond]= useState(true);
  const [filterHighlighted,setFilterHighlighted]= useState(null);




  const dispatch = useDispatch();
  const { artistImageDataSlice } = useSelector((state) => state);

  const filterChange= (filter) => {


    if(filter==="A-Z"){
      let temp = []
      setFilterCond(false)
      let tempImage = [...artistImageDataSlice.artistImages]
      temp = tempImage.sort((a, b) => {
        if(a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize()) === 0){
          return a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize())
        }else{
          return a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize());
        }
      });
      setFilterHighlighted(2)
      setTempArtist(temp)
      // tempData = tempData.sort((a, b) => a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize()));
    }
    else{
      setFilterHighlighted(1)
      setFilterCond(true)
      // tempData = [...dataOriginal];
      // tempData = dataOriginal;
      // setData(tempData);

    }

  }

  useEffect(() => {
    if(artistImageDataSlice.artistImages.length == 0){
      dispatch(ArtistImageSliceData());
    }

    // artistImageSliceData().then((res)=>{
    //   setData(res)
    // })
  }, []);


  const updateTempArtist = (e) => {
    if(artistImageDataSlice.artistImages.length){

      const searchvalue = e.toLowerCase();
      let temp = artistImageDataSlice.artistImages.filter(function (element) {
        let checker = false
        if(element.artistId.firstname.toLowerCase().includes(searchvalue) || element.artistId.lastname.toLowerCase().includes(searchvalue)){
            checker = true
        }
        return checker;
      })
      setFilterHighlighted(null)
      setTempArtist(temp)
    }
  }

  useEffect(() => {
    localStorage.setItem("Category","none")
    updateTempArtist(props.searchArtist)
  }, [artistImageDataSlice,props.searchArtist]);



  return (  
   <> 
      <div class="sortingcont right pt-0  me-0 ">
        <div className="d-flex right-filter-button">
              <a class={filterHighlighted == 1 ? "filter-button sort-active w-inline-block  mt-0" : (filterHighlighted == 2)? "filter-button w-inline-block  mt-0" : "filter-button sort-active w-inline-block  mt-0"} style={{ marginLeft: "0px" }} onClick={()=>filterChange("Default")}>
                <div >FEATURED</div>
              </a>
              <a class={filterHighlighted == 2 ? "filter-button sort-active mt-0 me-0" : "filter-button mt-0 me-0"} onClick={()=>filterChange("A-Z")}>
                <div >ALPHABETICAL A-Z</div>
              </a>
        </div>
      </div>
    <div className="_2cols2_" style={{clear:"both",marginBottom:"1vh"}}>
    {props.children}
    <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403e-576fcec6" className="divisionscolumn">
      <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403f-576fcec6" className="divisioncontainer">
       
      <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464043-576fcec6" className="_4cols-v2">
        { artistImageDataSlice.loading ?
        (
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
            />
          </div>
        ) :
        artistImageDataSlice.artistImages && props.searchArtist === "" && filterCond ?  (
          artistImageDataSlice.artistImages.map((val, ind) => (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={"/artists/" + val.artistId._id+"?imageIndex=0"}
                className="artistcard  w-inline-block"
              >
                <img
                  src={String(val.mainImage[0].subImage[0].path)}
                  loading="lazy"
                  alt=""
                  className="image"
                />
                {/* <p className="card_img_text2"> 
                {val.artistId.firstname} {val.artistId.lastname} </p> */}
                {/* <div className="artistnamediv">
                  <div className="artistnametext">
                    {val.artistId.firstname} {val.artistId.lastname} 
                  </div>
                </div> */}
                <div className="artistnamediv">
                  <div className="artistnametext-v3">
                  {val.artistId.firstname}  {val.artistId.lastname} 
                  </div>
                </div>
              </Link>
              </>
        )))
        : 
        (
          tempArtist.map((val, ind) => (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={"/artists/" + val.artistId._id+"?imageIndex=0"}
                className="artistcard  w-inline-block"
              >
                <img
                  src={String(val.mainImage[0].subImage[0].path)}
                  loading="lazy"
                  alt=""
                  className="image"
                />
                {/* <p className="card_img_text2 pt-2">
                {val.artistId.firstname} {val.artistId.lastname} </p> */}
                {/* <div className="artistnamediv">
                  <div className="artistnametext">
                    {val.artistId.firstname} {val.artistId.lastname} 
                  </div>
                </div> */}
                <div className="artistnamediv">
                  <div className="artistnametext-v3">
                  {val.artistId.firstname}  {val.artistId.lastname} 
                  </div>
                </div>
              </Link>
              </>
        )))
        
        }
        </div>
      </div>
    </div>
  </div>
   </>
  )
}

export default IllustrationArtists