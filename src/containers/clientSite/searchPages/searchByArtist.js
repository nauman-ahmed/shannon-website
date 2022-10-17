import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider, {
  SliderItem,
  FullScreenSliderItem,
} from "../../../components/slider/slider";

import { useDispatch, useSelector } from "react-redux";
// import { IMAGE_ROUTE } from '../../../AxiosFunctions/Axiosfunctionality';
import { ArtistImageSliceData } from "../../../redux/artistImageDataSlice";
import { addCart } from "../../../redux/addToCart";
import { updateMessage, updateOpen } from "../../../redux/message";
// import { setImageRoute } from '../../../UserServices/Services';

// import downloadArrow from "../../images/download.png";
const images = window.location.origin + "/assets/images";

function SearchByArtist(props) {
  const [keyword, setKeyword] = useState(0); 
  const [tab, setTab] = useState(0);
  const [fullscreen, setFullscreen] = useState({ screen: false, route: null });
  const [fullScreenData, setFullScreenData] = useState({ screen: false, route: null });
  const { search } = useParams();
  const { artistImageDataSlice } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data1, setData1] = useState(null);
  const [dataViewed, setDataViewed] = useState({});
  const [similarData, setSimilarData] = useState({});
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [artistImages, setArtistImages] = useState(8);
  const [artistSimilar, setArtistSimilar] = useState(8);

  function getWindowSize() {
    const {innerWidth, innerHeight} = window
    return {innerWidth, innerHeight};
  }
  function handleWindowResize() {
    console.log(getWindowSize() )
    setWindowSize(getWindowSize());
  }
  
  useEffect(() => {
    

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const addToCartArtist = (id, firstname) => {
    dispatch(addCart({ key: id, data: { id: id, Name: firstname } }));
    dispatch(updateOpen(true));
    dispatch(updateMessage("Add Artist in Cart"));
  };

  const dataLocalArtist = (key, _id, firstname, bio, listData, subListData) => {
    let tempData = localStorage.getItem("artistViewed");

    tempData = JSON.parse(tempData);
    if (tempData === null) {
      tempData = {};
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
      };
      localStorage.setItem("artistViewed", JSON.stringify(tempData));
    } else {
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
        subListData: subListData,
      };
      localStorage.setItem("artistViewed", JSON.stringify(tempData));
    }
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    function dataLoader() {
      if (artistImageDataSlice.artistImages !== undefined) {
        if (artistImageDataSlice.artistImages.length > 0) {
          let listData = [];
          let subListData = [];
          let tempData = {};
          let tempSimilarData = {};
          let count = 0;
          artistImageDataSlice.artistImages.forEach((item, key) => {
            listData = [];
            subListData = [];
            item.mainImage.forEach((item1, key1) => {
              listData.push(String(item1.path));
              subListData.push(String(item1.subImage[1].path));
            });
            tempData[item.artistId.firstname] = {
              id: item.artistId._id,
              title: item.artistId.firstname+" "+item.artistId.lastname,
              detail: item.artistId.bio,
              slideList: listData,
              subListData: subListData,
              keywordId: item.mainImage[0].keywordID,
            };
            if (item.artistId.firstname === search) {
              dataLocalArtist(
                item.artistId._id,
                item.artistId._id,
                item.artistId.firstname+" "+item.artistId.lastname,
                item.artistId.bio,
                listData
              );
              artistImageDataSlice.artistImages.forEach((item1, key1) => {
                // let rando= getRandomArbitrary(0,res.payload.length);
                if (count < 12) {
                  if (item1.artistId.firstname !== search) {
                    count++;
                    tempSimilarData[item1.artistId.firstname] = {
                      firstname: item1.artistId.firstname,
                      mainImage: item1.mainImage[0].path,
                    };
                  }
                }
              });
            }
          });
          setData1(tempData);
        } else {
          dispatch(ArtistImageSliceData({})).then((res) => {
            if (res.payload !== undefined) {
              let listData = [];
              let tempData = {};
              let subListData = [];
              let tempSimilarData = {};
              let count = 0;
              res.payload.forEach((item, key) => {
                listData = [];
                subListData = [];
                item.mainImage.forEach((item1, key1) => {
                  listData.push(String(item1.path));
                  subListData.push(String(item1.subImage[1].path));
                });
                tempData[item.artistId.firstname] = {
                  id: item.artistId._id,
                  title: item.artistId.firstname+" "+item.artistId.lastname,
                  detail: item.artistId.bio,
                  slideList: listData,
                  subListData: subListData,
                  keywordId: item.mainImage[0].keywordID,
                };
                if (item.artistId.firstname === search) {
                  dataLocalArtist(
                    item.artistId._id,
                    item.artistId._id,
                    item.artistId.firstname+" "+item.artistId.lastname,
                    item.artistId.bio,
                    listData,
                    subListData
                  );
                  res.payload.forEach((item1, key1) => {
                    if (count < 12) {
                      if (item1.artistId.firstname !== search) {
                        count++;
                        tempSimilarData[item1.artistId.firstname] = {
                          firstname: item1.artistId.firstname,
                          mainImage: item1.mainImage[0].subImage[1].path,
                        };
                      }
                    }
                  });
                }
              });

              setSimilarData(tempSimilarData);
              setData1(tempData);
            }
          });
        }
      }
    }
    function getLocalStorage() {
      if (localStorage.getItem("artistViewed") !== null) {
        setDataViewed(JSON.parse(localStorage.getItem("artistViewed")));
      }
    }
    handleWindowResize()
    getLocalStorage();
    dataLoader();
  }, []);

  const setFullScreenHandler = (route) => {
    let temp = { ...fullscreen };

    if (!temp.screen) {
      temp.route = route;
    }

    temp.screen = !temp.screen;
    setFullscreen(temp);
    setFullScreenData(data1[search])
  };

  if(fullscreen.screen){
    return(
      <FullScreenSliderItem
        onClick={setFullScreenHandler}
        currentData={fullScreenData}
        fullscreen={fullscreen}
      />)
  }

  return (
    <div className="row" style={{ maxWidth: "100%" }}>
      {data1 !== null ? (
        <>
          <div className="col-md-5">
            <h2 className="h2talent">{data1[search].title}</h2>
            <div
              className="talentp large d-block hide_detail"
              style={{
                fontSize: "18px",
                paddingTop: "50px",
              }}
            >
              {data1[search].detail}
            </div>
            <div className="talenttext">Want to commission this artist?</div>
            <div className="d-flex">
              <Link
                to="#"
                style={{ fontSize: "16px" }}
                className={windowSize.innerWidth < 335 ? "talentbuttonArtistSearch  col-3 mr-1" : "talentbutton col-3 mr-1"}
              >
                CALL
              </Link>
              <Link
                to="/contact"
                style={{ fontSize: "16px" }}
                className={windowSize.innerWidth < 335 ? "talentbuttonArtistSearch  col-3 mr-1" : "talentbutton col-3 mr-1"}
              >
                GET ESTIMATE
              </Link>
              <Link
                data-w-id="e04f643e-f302-16e2-74ee-4bc7e85391d8"
                to="#"
                style={{ fontSize: "16px" }}
                className="talentbutton hide col-3"
              >
                ADD TO MY LIST
              </Link>
            </div>
          </div>
          <div
            className="col-md-7 hide_detail"
            style={
              fullscreen.screen
                ? {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    bottom: 0,
                    right: 0,
                    zIndex: 10000,
                    maxWidth: "unset",
                    backgroundColor: "white",
                  }
                : { height: "600px" }
            }
          >
            {fullscreen.screen ? (
              <FullScreenSliderItem
                onClick={setFullScreenHandler}
                currentData={data1[search]}
                fullscreen={fullscreen}
              />
            ) : (
              <Slider controllEnabled interval={3000}>
                {data1[search].slideList.map((item, keys) => (
                  <SliderItem
                    onClick={setFullScreenHandler}
                    key={keys}
                    fillMode="contain"
                    src={item}
                  />
                ))}
              </Slider>
            )}
          </div>

          <div className="col-12 mt-5 ">
            <div
              data-current="Tab 3"
              data-easing="ease"
              data-duration-in="300"
              data-duration-out="100"
              className="w-tabs"
            >
              <div className="tabs-menu w-tab-menu">
                <div
                  onClick={() => setTab(0)}
                  className={
                    "tabs py-3 w-inline-block w-tab-link " +
                    (tab === 0 ? "bg-white text-black" : null)
                  }
                >
                  <div>PORTFOLIO</div>
                </div>
                <div
                  onClick={() => setTab(1)}
                  className={
                    "tabs py-3 w-inline-block w-tab-link " +
                    (tab === 1 ? "bg-white  text-black" : null)
                  }
                >
                  <div>SIMILAR ILLUSTRATORS</div>
                </div>
                {windowSize.innerWidth < 335 ?
                <div
                onClick={() => setTab(2)}
                className={
                  "tabs py-3 w-inline-block w-tab-link " +
                  (tab === 2 ? "bg-white  text-black" : null)
                }
              >
                <div>ALREADY VIEWED</div>
              </div>:null

                }
                
              </div>
              {tab === 0 ? 
                windowSize.innerWidth < 335 ?
                <div>
                <div
                  className="imagecont"
                  style={{marginTop:10}}
                >
                  {data1[search].subListData.map((item, keys) => 
                      keys < artistImages ?
                      <div className="talentthumbslide resp">
                        <img
                          src={item}
                          loading="lazy"
                          alt=""
                          className="image"
                        />
                      </div>:null
                    )
                  }
                </div>
                  <div style={{textAlign: "center",margin:"10px"}}>
                    <Link
                      to="#"
                      style={{ fontSize: "16px" }}
                      className="talentbuttonArtistSearch col-3 mr-1"
                      onClick={()=>setArtistImages(artistImages + 8)}
                    >
                      See More
                    </Link>
                  </div>
                </div>
                :(
                <div className="col-12 my-2">
                  <Slider disableAutoPlay controllEnabled="outside-dark">
                    {data1[search].subListData.map((item, keys) => (
                      <SliderItem
                        col="col-lg-1 col-md-3 col-6 px-md-1"
                        src={item}
                      />
                    ))}
                  </Slider>
                </div>
              ) : null}
              {tab === 1 ? (
                windowSize.innerWidth < 335 ?
                <div>
                <div
                className="imagecont"
                style={{marginTop:10}}
              >
                {Object.keys(similarData).length > 0 ?
                  Object.keys(similarData).map((key, i) => 
                    i < artistSimilar ? 
                      <div className="talentthumbslide resp">
                        <img
                          src={similarData[key].mainImage}
                          loading="lazy"
                          alt=""
                          className="image"
                        />
                      </div> 
                      : null
                    )
                  : "NO SIMILAR IMAGES FOUND"
                }
                </div>
                  <div style={{textAlign: "center",margin:"10px"}}>
                    <Link
                      to="#"
                      style={{ fontSize: "16px" }}
                      className="talentbuttonArtistSearch col-3 mr-1"
                      onClick={()=>setArtistSimilar(artistSimilar + 8)}
                    >
                      See More
                    </Link>
                  </div>
              </div>
                :
                <div className="col-12 my-2">
                  <Slider disableAutoPlay controllEnabled="outside-dark">
                    {Object.keys(similarData).length > 0
                      ? Object.keys(similarData).map((key, i) => (
                          <SliderItem
                            col="col-lg-1 col-md-3 col-6 px-md-2"
                            src={similarData[key].mainImage}
                          />
                        ))
                      : "NO SIMILAR IMAGES FOUND"
                    }
                  </Slider>
                </div>
              ) : null}
              {tab === 2 ? 
                windowSize.innerWidth < 335 ?
                null:
              (
                <div className="col-12 my-2">
                  <Slider disableAutoPlay controllEnabled="outside-dark">
                    {Object.keys(dataViewed).length > 0
                      ? Object.keys(dataViewed).map((key, i) => (
                          <SliderItem
                            col="col-lg-1 col-md-3 col-6 px-md-2"
                            src={dataViewed[key].slideList[0]}
                          />
                        ))
                      : ""
                    }
                    <SliderItem
                      col="col-lg-1 col-md-3 col-6 px-md-2"
                      src={images + "/Rectangle-171.png"}
                    />
                  </Slider>
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SearchByArtist;
