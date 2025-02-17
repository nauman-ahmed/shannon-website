import React from "react";
import { Link } from "react-router-dom";
import Slider, { SliderItem } from "../../components/slider/slider";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_ROUTE } from "../../AxiosFunctions/Axiosfunctionality";
import { ArtistImageSliceData } from "../../redux/artistImageDataSlice";
import loading from "../../assets/loading.gif";
import { bannerLoader } from "../../redux/bannerImages";
import { setImageRoute } from "../../UserServices/Services";

const images = window.location.origin + "/assets/images";

function Artists(props) {
  const dispatch = useDispatch();
  const { artistImageDataSlice } = useSelector((state) => state);
  const { bannerImages } = useSelector((state) => state);
  const [filterCond,setFilterCond]= useState(true);
  const [tempArtist,setTempArtist]= useState([]);
  const [filterHighlighted,setFilterHighlighted]= useState(null);


  const filterChange= (filter) => {

    if(filter==="A-Z"){
      let temp = []
      setFilterCond(false)
      let tempImage = [...artistImageDataSlice.artistImages]
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
    if(artistImageDataSlice.artistImages.length == 0){
      dispatch(ArtistImageSliceData());
    }
    dispatch(bannerLoader());
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
    <div className="_2cols" style={{clear:"both"}}>
      {props.children}
      <div
        id="w-node-a284be2a-4b91-3177-03eb-6614b24879c1-4bf2d022"
        className="_4cols-v2"
      >
        {artistImageDataSlice.loading ? (
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
            />
          </div>
        ) : artistImageDataSlice.artistImages && props.searchArtist === "" && filterCond ? (
          artistImageDataSlice.artistImages.map((val, ind) =>  (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={val.artistId.fullName}
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
              {/* { ind === 35 ? (
                bannerImages.bannerData.length > 0 ? (
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879ea-4bf2d022"
                    to="/bipoc"
                    className="banner _1 v2 w-inline-block-banner2 "
                  >
                    <div 
                      className="bannerletters _1 v2"
                      style={{
                        backgroundImage: "url(" + images + "/BIPOC.png)",
                        marginLeft: "0vw",
                        marginTop: "0.8vh",
                      }}
                    ></div> 
                    { <img id="w-node-a284be2a-4b91-3177-03eb-6614b24879ec-4bf2d022" alt="banner " src={IMAGE_ROUTE+bannerImages.bannerData[0].imagePath}  className="bannerletters _1 v2"/> }
                    <div
                      id="w-node-a284be2a-4b91-3177-03eb-6614b24879ec-4bf2d022"
                      className="bannerhome _1 v2"
                      style={{
                        backgroundImage:
                          "url(" +
                          setImageRoute(bannerImages.bannerData[0].imagePath) +
                          ")",
                        // height: "100%",
                      }}
                    ></div>
                  </Link>
                ) : null
              ) : null 
              } */}
              {/* {ind === 47 ? (
                bannerImages.bannerData.length > 0 ? (
                  <>
                    <a
                      id="w-node-a284be2a-4b91-3177-03eb-6614b2487a29-4bf2d022"
                      href="https://kidshannon.com/#/"
                      className="banner _2 v2 w-inline-block-banner "
                    >
                      <div className="bannerletters _2 v2"></div>
                      <div
                        id="w-node-a284be2a-4b91-3177-03eb-6614b2487a2b-4bf2d022"
                        className="bannerhome _2 v2"
                        style={{
                          backgroundImage:
                            "url(" +
                            setImageRoute(
                              bannerImages.bannerData[1].imagePath
                            ) +
                            ")",
                        }}
                      ></div>
                    </a>
                    <Link
                      id="w-node-a284be2a-4b91-3177-03eb-6614b2487a2c-4bf2d022"
                      to="/medical"
                      className="banner _3 v2 w-inline-block-banner"
                    >
                      <div className="bannerletters _3 v2"></div>
                      <div
                        id="w-node-a284be2a-4b91-3177-03eb-6614b2487a2e-4bf2d022"
                        className="bannerhome _3 v2 "
                        style={{
                          backgroundImage:
                            "url(" +
                            setImageRoute(
                              bannerImages.bannerData[2].imagePath
                            ) +
                            ")",
                        }}
                      ></div>
                    </Link>
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {ind === 59 ? (
                bannerImages.bannerData.length > 0 ? (
                  <a
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879ea-4bf2d022"
                    href="https://www.instagram.com/shannonassociates/?hl=es"
                    className="banner _1 v2 w-inline-block-banner2"
                  >
                    <div className="bannerletters _4 v2"></div>
                    <div
                      id="w-node-a284be2a-4b91-3177-03eb-6614b24879ec-4bf2d022"
                      className="bannerhome _1 v2"
                      style={{
                        backgroundImage:
                          "url(" +
                          setImageRoute(bannerImages.bannerData[3].imagePath) +
                          ")",
                      }}
                    ></div>
                  </a>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {ind === 71 ? (
                bannerImages.bannerData.length > 0 ? (
                  <>
                    <Link
                      id="w-node-a284be2a-4b91-3177-03eb-6614b2487a29-4bf2d022"
                      to="/motion"
                      className="banner _2 v2 w-inline-block-banner3"
                      
                    >
                      <div className="bannerletters _5 v2" style={{textAlign:"center"}}></div>
                      <div
                        id="w-node-a284be2a-4b91-3177-03eb-6614b24879ec-4bf2d022"
                        className="bannerhome _1 v2"
                        style={{
                          backgroundImage:
                            "url(" +
                            setImageRoute(
                              bannerImages.bannerData[4].imagePath
                            ) +
                            ")",
                        }}
                      ></div>
                    </Link>
                    <Link
                      id="w-node-a284be2a-4b91-3177-03eb-6614b2487a2c-4bf2d022"
                      to="/about"
                      className="banner _3 v2 w-inline-block-banner3"
                    >
                      <div className="bannerletters _6 v2"></div>
                      <div
                        id="w-node-a284be2a-4b91-3177-03eb-6614b24879ec-4bf2d022"
                        className="bannerhome _1 v2 w-100"
                        style={{
                          backgroundImage:
                            "url(" +
                            setImageRoute(
                              bannerImages.bannerData[5].imagePath
                            ) +
                            ")",
                        }}
                      ></div>
                    </Link>
                  </>
                ) : null
              ) : null} */}
            </>
          ))
        ) : ( 
          tempArtist.map((val, key) => (
            <>
            <Link
              id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
              data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
              to={val.artistId.fullName}
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

export default Artists;
