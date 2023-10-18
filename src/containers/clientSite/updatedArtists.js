import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecentlyArtistImageSliceData } from "../../redux/recentlyArtistImageDataSlice";
import loading from "../../assets/loading.gif";
import { bannerLoader } from "../../redux/bannerImages";

const images = window.location.origin + "/assets/images";

function UpdatedArtists(props) {

  const dispatch = useDispatch();
  const { recentlyArtistImageDataSlice } = useSelector((state) => state);
  const [filterCond,setFilterCond]= useState(true);
  const [tempArtist,setTempArtist]= useState([]);
  const [filterHighlighted,setFilterHighlighted]= useState(null);
  const updatedArtistList = ['Alyssa Petersen','David Sanangelo','Gigi Moore','Tristan Elwell','Linh Nguyen','Aubrie Moyer','Tracey Laguerre','Felipe Calv','Larry Rostant'
                            ,'Mary Sullivan','Mike Deas','Danny Schlitz',"Peter O'toole",'Zhen Liu','Jerry Liu','Antonio Javier Caparo'
                            ,'Jennifer L. Meyer','Emma Gillette','Sam Rivera','Thiago Buzzy','David Miles','Staci Bryant'];

  const filterChange= (filter) => {

    if(filter==="A-Z"){
      let temp = []
      setFilterCond(false)
      let tempImage = [...recentlyArtistImageDataSlice.artistImages]
      temp = tempImage.sort((a, b) => a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize()));
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
    if(recentlyArtistImageDataSlice.artistImages.length == 0){
      dispatch(RecentlyArtistImageSliceData());
    }
  }, []);
  
  const updateTempArtist = (e) => {
    if(recentlyArtistImageDataSlice.artistImages.length){

      const searchvalue = e.toLowerCase();
      let temp = recentlyArtistImageDataSlice.artistImages.filter(function (element) {
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
  }, [recentlyArtistImageDataSlice,props.searchArtist]);


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
    <div className="_2cols" style={{clear:"both"}}>
      {props.children}
      <div
        id="w-node-a284be2a-4b91-3177-03eb-6614b24879c1-4bf2d022"
        className="_4cols-v2 heightIssue"
      >
        {recentlyArtistImageDataSlice.loading ? (
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
            />
          </div>
        ) : recentlyArtistImageDataSlice.artistImages && props.searchArtist === "" && filterCond ? (
          recentlyArtistImageDataSlice.artistImages.map((val, ind) =>  
            {
              return (    
                <>
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={"/artists/" + val.artistId.fullName}
                    className="artistcard"
                  >
                    <img
                      src={String(val.mainImage[0].subImage[0].path)}
                      loading="lazy"
                      alt=""
                      className="image" 
                    />
                    <div className="artistnamediv">
                      <div className="artistnametext-v3">
                      {val.artistId.firstname}  {val.artistId.lastname} 
                      </div>
                    </div>
                  </Link>
                </>
              )
            }
            )
        ) : ( 
          tempArtist.map((val, key) => (
            <>
            <Link
              id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
              data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
              to={"/artists/" + val.artistId.fullName}
              className="artistcard "
            >
              <img
                src={String(val.mainImage[0].subImage[0].path)}
                loading="lazy"
                alt=""
                className="image"
              />
              <div className="artistnamediv">
                <div className="artistnametext-v3">
                 {val.artistId.firstname} {val.artistId.lastname} 
                </div>
              </div>
            </Link>
            </>
          ))
        )}
      </div>
    </div>
    </>
  );
}

export default UpdatedArtists;
