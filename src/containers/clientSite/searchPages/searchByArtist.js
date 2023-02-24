import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  SliderShow,
  SliderItems,
  FullScreenSliderItem,
} from "../../../components/slider/slider";
import loading from '../../../assets/loading.gif';

import Navbar from "../../../components/layout/navbar";
import { useDispatch, useSelector } from "react-redux";

import { artistImageDetailedSliceData } from '../../../AxiosFunctions/Axiosfunctionality';

import { ArtistImageSliceData } from "../../../redux/artistImageDataSlice";

import { addCart } from "../../../redux/addToCart";
import { updateMessage, updateOpen } from "../../../redux/message";
// import { Carousel } from "react-responsive-carousel";
// import { SliderItems, SliderShow } from "../../../components/slider/NewSlider";
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
  const [artistImages, setArtistImages] = useState(8);
  const [artistSimilar, setArtistSimilar] = useState(8);
  const [sliderImages, setSliderImages] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight };
  }

  function handleWindowResize() {
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
    let tempData = localStorage.getItem("artistViewed_V1");

    tempData = JSON.parse(tempData);
    console.log(key, _id, firstname, bio, listData, subListData, tempData)
    if (tempData === null) {
      tempData = {};
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
      };
      localStorage.setItem("artistViewed_V1", JSON.stringify(tempData));
    } else {
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
        subListData: subListData,
      };
      localStorage.setItem("artistViewed_V1", JSON.stringify(tempData));
    }
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const changeIndex = (index) => {
    console.log(index)
  }

  const getUserData = async () => {
    console.log("SEARCH", search)
    let tempData = await artistImageDetailedSliceData({ "artistId": search })

    console.log(tempData.activeArtist)

    dataLocalArtist(
      tempData.activeArtist[search].id,
      tempData.activeArtist[search].id,
      tempData.activeArtist[search].firstname + " " + tempData.activeArtist[search].lastname,
      tempData.activeArtist[search].detail,
      tempData.activeArtist[search].slideList,
      tempData.activeArtist[search].subListData
    );

    setSimilarData(tempData.similarArtist);
    setData1(tempData.activeArtist);

  }

  useEffect(() => {
    // localStorage.removeItem("artistViewed")

    getUserData()
    // function dataLoader() {
    //   if (artistImageDataSlice.artistImages !== undefined) {
    //     if (artistImageDataSlice.artistImages.length > 0) {
    //       let picturetitle = [];
    //       let listData = [];
    //       let subListData = [];
    //       let tempData = {};
    //       let tempSimilarData = {};
    //       let count = 0;
    //       artistImageDataSlice.artistImages.forEach((item, key) => {
    //         picturetitle = [];
    //         listData = [];
    //         subListData = [];
    //         item.mainImage.forEach((item1, key1) => {
    //           picturetitle.push(item1.title)
    //           listData.push(String(item1.path));
    //           subListData.push(String(item1.subImage[1].path));
    //         });
    //         tempData[item.artistId.firstname] = {
    //           id: item.artistId._id,
    //           pictureTitle: picturetitle,
    //           title: item.artistId.firstname + " " + item.artistId.lastname,
    //           detail: item.artistId.bio,
    //           slideList: listData,
    //           subListData: subListData,
    //           keywordId: item.mainImage[0].keywordID,
    //         };
    //         if (item.artistId.firstname === search) {
    //           dataLocalArtist(
    //             item.artistId._id,
    //             item.artistId._id,
    //             item.artistId.firstname + " " + item.artistId.lastname,
    //             item.artistId.bio,
    //             listData
    //           );
    //           artistImageDataSlice.artistImages.forEach((item1, key1) => {
    //             // let rando= getRandomArbitrary(0,res.payload.length);
    //             if (count < 12) {
    //               if (item1.artistId.firstname !== search) {
    //                 count++;
    //                 tempSimilarData[item1.artistId.firstname] = {
    //                   firstname: item1.artistId.firstname,
    //                   mainImage: item1.mainImage[0].path,
    //                 };
    //               }
    //             }


    //           });
    //         }
    //       });
    //       setSimilarData(tempSimilarData);
    //       setData1(tempData);
    //     } else {
    //       dispatch(ArtistImageSliceData({})).then((res) => {
    //         if (res.payload !== undefined) {
    //           let picturetitle = [];
    //           let listData = [];
    //           let tempData = {};
    //           let subListData = [];
    //           let tempSimilarData = {};
    //           let count = 0;
    //           res.payload.forEach((item, key) => {
    //             picturetitle = [];
    //             listData = [];
    //             subListData = [];
    //             item.mainImage.forEach((item1, key1) => {
    //               picturetitle.push(item1.title)
    //               listData.push(String(item1.path));
    //               subListData.push(String(item1.subImage[1].path));
    //             });
    //             tempData[item.artistId.firstname] = {
    //               id: item.artistId._id,
    //               pictureTitle: picturetitle,
    //               title: item.artistId.firstname + " " + item.artistId.lastname,
    //               detail: item.artistId.bio,
    //               slideList: listData,
    //               subListData: subListData,
    //               keywordId: item.mainImage[0].keywordID,
    //             };
    //             if (item.artistId.firstname === search) {
    //               dataLocalArtist(
    //                 item.artistId._id,
    //                 item.artistId._id,
    //                 item.artistId.firstname + " " + item.artistId.lastname,
    //                 item.artistId.bio,
    //                 listData,
    //                 subListData
    //               );
    //               res.payload.forEach((item1, key1) => {
    //                 if (count < 12) {
    //                   if (item1.artistId.firstname !== search) {
    //                     count++;
    //                     tempSimilarData[item1.artistId.firstname] = {
    //                       firstname: item1.artistId.firstname,
    //                       mainImage: item1.mainImage[0].subImage[1].path,
    //                     };
    //                   }

    //                 }

    //               });
    //             }
    //           });

    //           setSimilarData(tempSimilarData);
    //           setData1(tempData);
    //         }

    //       });


    //     }
    //   }
    // }
    function getLocalStorage() {
      if (localStorage.getItem("artistViewed_V1") !== null) {
        setDataViewed(JSON.parse(localStorage.getItem("artistViewed_V1")));
      }
    }
    handleWindowResize()
    getLocalStorage();
    // dataLoader();
  }, [search]);


  const setFullScreenHandler = (route, key) => {
    let temp = { ...fullscreen };

    if (!temp.screen) {
      temp.route = route;
      temp.key = key
    }

    temp.screen = !temp.screen;
    setFullscreen(temp);
    setFullScreenData(data1[search])


  };

  if (fullscreen.screen) {
    return (
      <FullScreenSliderItem
        onClick={setFullScreenHandler}
        currentData={fullScreenData}
        fullscreen={fullscreen}
      />)
  }

  if (data1 !== null) {

    if (Object.keys(data1).find(element => element == search) == undefined) {
      return (
        <div>
          "No Approved Images"
        </div>
      )
    }
  }

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <div className="row mt-0 pt-0" style={{
        maxWidth: "100%",
        justifyContent: "center"
      }}>
        {data1 !== null ? (
          <>
            <div className=" pl-2 left_content">
              <div >
                <h2 className="h2talent">{data1[search].title}</h2>
                {/* <div
              className="talentp large d-block hide_detail"
              style={{
                fontSize: "16px",

              }}
            >
              <div dangerouslySetInnerHTML={{ __html: data1[search].detail }}>
              </div>
            </div> */}
                {/* <div className="talenttext" style={{ marginBottom: 5 }}>Want to commission this artist?</div> */}
                <div className="d-flex mt-2">
                  <Link
                    to="#"
                    // style={{ fontSize: "16px", fontWeight: '600', minWidth: "60px", maxWidth: "70px" }}
                    className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearch  col-lg-2 col-md-3 mr-1" : "talentbutton mr-3"}
                  >
                    CALL
                  </Link>
                  <Link
                    to="/contact"
                    // style={{ fontSize: "16px", fontWeight: '600', minWidth: "110px", maxWidth: "120px" }}
                    className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearch  col-lg-2 col-md-3 mr-1" : "talentbutton mr-3"}
                  >
                    GET ESTIMATE
                  </Link>
                  <Link
                    data-w-id="e04f643e-f302-16e2-74ee-4bc7e85391d8"
                    to="#"
                    // style={{ fontSize: "16px", fontWeight: '600', minWidth: "110px", maxWidth: "120px" }}
                    className="talentbutton hide "
                    onClick={() => addToCartArtist(data1[search].id, data1[search].title)}
                  >
                    ADD TO MY LIST
                  </Link>
                </div>
                <div
                  data-current="Tab 3"
                  data-easing="ease"
                  data-duration-in="300"
                  data-duration-out="100"
                  className="w-tabs"
                >{windowSize.innerWidth < 479 ?
                  <div className="tabs-menu w-tab-menu">
                    <div
                      onClick={() => setTab(0)}
                      className={
                        "tabs py-2 w-inline-block w-tab-link flex_center " +
                        (tab === 0 ? "bg-white text-black flex_center" : null)
                      }
                    >
                      <div style={{ fontWeight: '600' }}>PORTFOLIO</div>
                    </div>
                    <div
                      onClick={() => setTab(1)}
                      className={
                        "tabs py-2 w-inline-block w-tab-link " +
                        (tab === 1 ? "bg-white  text-black" : null)
                      }
                    >
                      <div style={{ fontWeight: '600' }}>SIMILAR ILLUSTRATORS</div>
                    </div>

                  </div>
                  : null}


                  {tab === 0 ?
                    windowSize.innerWidth < 479 ?
                      <div>
                        <div
                          className="imagecont"
                          style={{ marginTop: 10 }}
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
                              </div> : null
                          )
                          }
                        </div>
                        <div style={{ textAlign: "center", margin: "10px", marginTop: 25 }}>
                          <Link
                            to="#"
                            style={{ fontSize: "16px" }}
                            className="talentbuttonArtistSearch col-3 mr-1"
                            onClick={() => setArtistImages(artistImages + 8)}
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                      : (
                        <div className="">

                          <div className="detail_card w-inline-block ">

                            {/* <SliderShow
                          changeIndex={changeIndex}
                          settings={{
                            arrows: true,
                            infinite: false,
                            speed: 500,
                            slidesToShow: data1[search].subListData.length > 18 ? 18 : 10,
                            slidesToScroll: 2,
                            variableWidth: true
                          }}
                          thumbNail="true"
                        > */}
                            {
                              data1[search].subListData.map((item, keys) => (
                                <span className="detail_card5_h " onClick={() => { setSliderIndex(keys) }}>
                                  <img src={item} className="w-100 h-100" style={{objectFit:"cover"}}
                                  // style={{ margin: "3px .43vw 3px 0vw"}}
                                  ></img>
                                </span>
                              ))
                            }

                            {/* </SliderShow> */}
                          </div>
                        </div>
                      ) : null}
                  {windowSize.innerWidth > 479 ?
                    <div>
                      <div style={{
                        width: "100%",
                        fontWeight: '600',
                        backgroundColor: "#ce651e",
                        fontSize: "18px",
                        color: "#fff",
                        paddingLeft: "20px",
                        marginTop: '8vh',
                        marginBottom: "3vh",
                        paddingTop: "6px",
                        paddingBottom: "6px",
                      }} className=" ">
                        SIMILAR ARTIST</div>
                    </div> : null
                  }

                  {
                    // 
                    windowSize.innerWidth < 479 ?
                      tab === 1 ? (<div>
                        <div
                          className="imagecont"
                          style={{ marginTop: 10 }}
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
                        <div style={{ textAlign: "center", margin: "10px" }}>
                          <Link
                            to="#"
                            style={{ fontSize: "16px" }}
                            className="talentbuttonArtistSearch col-3 mr-1"
                            onClick={() => setArtistSimilar(artistSimilar + 8)}
                          >
                            See More
                          </Link>
                        </div>
                      </div>) : null
                      :
                      <div className="detail_card2 my-2">
                        {Object.keys(similarData).length > 0
                          ? Object.keys(similarData).map((key, i) => (
                            <Link
                              id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                              data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                              className="card_img3"
                              // style={{ position: "relative" }}
                              to={"/artists/" + key}
                            >
                              <div className="detail_card6_h" style={{ position: "relative", overflow: "hidden",height:'25vh' }}>
                                <img
                                  src={String(similarData[key].mainImage)}
                                  loading="lazy"
                                  alt=""
                                  className="h-100"
                                  style={{ width: "100%", }} />
                                <div className="artistnamediv">
                                  <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                                    {similarData[key].lastname} {similarData[key].firstname}
                                  </div>
                                </div>
                                {/* <p className="card_img_text3 pb-3 pt-1">
                                  {similarData[key].lastname} {similarData[key].firstname}</p> */}
                              </div>
                            </Link>
                          ))
                          : "NO SIMILAR IMAGES FOUND"
                        }

                      </div>
                    // 
                  }
                  {windowSize.innerWidth > 479 ?
                    <div>
                      <div style={{
                        width: "100%",
                        fontWeight: '600',
                        backgroundColor: "#ce651e",
                        fontSize: "18px",
                        color: "#fff",
                        paddingLeft: "20px",
                        marginTop: '8vh',
                        marginBottom: "3vh",

                      }} className="py-2 ">RECENTLY VIEWED</div>
                    </div> : null

                  }

                  {/* tab === 2 ? */
                    windowSize.innerWidth < 479 ?
                      null :
                      (
                        <div className="detail_card2 my-2">
                          {/* <img src={dataViewed[key].slideList[0]} width={"120vh"} height={"120vh"} style={{ margin: "3px" ,cursor:"pointer"}}></img> */}

                          {Object.keys(dataViewed).length > 0
                            ? Object.keys(dataViewed).map((key, i) => (

                              <Link
                              id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                              data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                              className="card_img3"
                              // style={{ position: "relative" }}
                              to={"/artists/" + key}
                            >
                              <div className="detail_card6_h" style={{ position: "relative", overflow: "hidden",height:'25vh' }}>
                                <img
                                  src={String(dataViewed[key].slideList[0])}
                                  loading="lazy"
                                  alt=""
                                  className="h-100"
                                  style={{ width: "100%", }} />
                                <div className="artistnamediv">
                                  <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                                  {dataViewed[key].title}
                                  </div>
                                </div>
                                {/* <p className="card_img_text3 pb-3 pt-1">
                                  {similarData[key].lastname} {similarData[key].firstname}</p> */}
                              </div>
                            </Link>
                              // <Link
                              //   id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                              //   data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                              //   className="card_img3"
                              //   to={"/artists/" + key}
                              // >
                              //   <div className="detail_card6_h" style={{ position: "relative", overflow: "hidden" }}>

                              //     <img
                              //       src={String(dataViewed[key].slideList[0])}
                              //       loading="lazy"
                              //       alt=""
                              //       className="h-100"
                              //       style={{ width: "100%" }}
                              //     />
                              //     <div className="artistnamediv ">
                              //       <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                              //         {dataViewed[key].title}
                              //       </div>
                              //     </div>
  
                              //   </div>
                              // </Link>

                            ))
                            : ""
                          }

                        </div>
                      ) /* : null */}
                </div>
              </div>

            </div>
            <div className=" hide_detail right_content">
              <div className="rightside">
                <div className="d-flex" style={{ justifyContent: 'center' }}>


                  {fullscreen.screen ? (
                    <FullScreenSliderItem
                      onClick={setFullScreenHandler}
                      currentData={data1[search]}
                      fullscreen={fullscreen}
                    />
                  ) : (
                    <>
                      <SliderShow
                        changeIndex={changeIndex}
                        sliderIndex={sliderIndex}
                        settings={{
                          arrows: false,
                          infinite: true,
                          speed: 500,
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        }}
                      >
                        {
                          data1[search].slideList.map((item, keys) => (
                            <SliderItems
                              key={keys}
                              src={item}
                              onClick={setFullScreenHandler}

                            />
                          ))
                        }

                      </SliderShow>

                    </>

                    // <Slider 
                    // controllEnabled 
                    // interval={3000}
                    // setSliderImages={setSliderImages}
                    // sliderImages={sliderImages}
                    // setSliderIndex={setSliderIndex}
                    // images={data1[search].slideList}
                    // sliderIndex={sliderIndex}
                    // length={data1[search].slideList.length - 1}
                    // show={true}
                    // >
                    //   {data1[search].slideList.map((item, keys) => (
                    //     <>
                    //       <SliderItem
                    //       index={sliderImages}
                    //       images={data1[search].slideList}
                    //       onClick={setFullScreenHandler}
                    //       key={keys}
                    //       id={sliderIndex !== null ? sliderIndex : keys}
                    //       // id={keys}
                    //       fillMode="contain"
                    //       src={sliderImages !== null ? sliderImages : item}
                    //       // src={item}
                    //       setSliderImages={setSliderImages}
                    //       sliderImages={sliderImages}
                    //       setSliderIndex={setSliderIndex}
                    //       sliderIndex={sliderIndex}
                    //       length={data1[search].slideList.length - 1}
                    //     />
                    //     </>

                    //   ))}
                    // </Slider>
                  )}
                </div>

                <div className="hide_detail mb-1 mt-2 pt-3">
                  <h4 className="mb-1" style={{ fontWeight: "500", fontSize: "22px" }}>{data1[search].title}</h4>
                  <div
                    className="F large hide_detail pt-2 mt-1"
                    style={{
                      fontSize: "14px",
                      marginTop: "20px",
                      lineHeight: "2"
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: data1[search].detail }}>

                    </div>

                  </div>

                  <div className="d-flex" style={{
                    position: "relative",
                    paddingTop: "10px",
                  }}>
                    <Link
                      to="#"
                      // style={{ fontSize: "16px", fontWeight: '600', minWidth: "60px", maxWidth: "70px" }}
                      className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearch  col-lg-2 col-md-3 mr-1" : "talentbutton  mr-3"}
                    >
                      CALL
                    </Link>
                    <Link
                      to="/contact"
                      // style={{ fontSize: "16px", fontWeight: '600', minWidth: "110px", maxWidth: "120px" }}
                      className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearch  col-lg-2 col-md-3 mr-1" : "talentbutton  mr-3"}
                    >
                      GET ESTIMATE
                    </Link>
                    <Link
                      data-w-id="e04f643e-f302-16e2-74ee-4bc7e85391d8"
                      to="#"
                      // style={{ fontSize: "16px", fontWeight: '600', minWidth: "110px", maxWidth: "120px" }}
                      className="talentbutton hide "
                      onClick={() => addToCartArtist(data1[search].id, data1[search].title)}
                    >
                      ADD TO MY LIST
                    </Link>
                  </div>
                </div>
              </div>
            </div>



          </>
        ) :
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
              style={{ width: "50px" }}
            />
          </div>
        }
      </div>
    </div>

  );
}

export default SearchByArtist;
