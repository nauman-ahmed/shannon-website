import React, { useEffect, useState, useRef } from "react";
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
import { addCart, saveCartItemMessageKey, getAnEstimateHandler } from "../../../redux/addToCart";
import { updateMessage, updateOpen } from "../../../redux/message";
import MyPopup from "../../../components/myPopup/myPopup";


// import downloadArrow from "../../images/download.png";
const images = window.location.origin + "/assets/images";

function SearchByArtist(props) {

  const { pages } = useParams()
  const [keyword, setKeyword] = useState(0);
  const [tab, setTab] = useState(0);
  const [fullscreen, setFullscreen] = useState({ screen: false, route: null });
  const [fullScreenData, setFullScreenData] = useState({ screen: false, route: null });
  const { search } = useParams();
  const { artistImageDataSlice, AddToCart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data1, setData1] = useState(null);
  const [dataViewed, setDataViewed] = useState({});
  const [similarData, setSimilarData] = useState({});
  const [artistImages, setArtistImages] = useState(8);
  const [artistSimilar, setArtistSimilar] = useState(8);
  const [sliderImages, setSliderImages] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [isPopupShowWithCheckbox, setIsPopupShowWithCheckbox] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [msg, setMsg] = useState("");
  
  const myStateRef = useRef(0);
  const screenScrolling = useRef(true);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight };
  }

  function handleWindowResize() {
    setWindowSize(getWindowSize());
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    // window.addEventListener('scroll', function() {
    //   var myDiv = document.getElementsByClassName('rightside')[0];
    //   var myDivReference = document.getElementsByClassName('right_content')[0];

    //   if(myDiv){
    //     var myDivRect = myDiv.getBoundingClientRect();
    //     var myDivRectReference = myDivReference.getBoundingClientRect();
  
    //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
    //     console.log('BEFOre',myDivRectReference.top,myDivRect.top);
    //     if (myDivRect.top <= 5) {
    //       console.log('Div is hidden');
    //       screenScrolling.current = myDivRect.top
    //       myDiv.style.position = 'fixed';
    //       myDiv.style.top = '5px';
    //       myDiv.style.width = '-webkit-fill-available';
    //       myDiv.style.marginRight = '3%';
    //     } 
    //     if (myDivRectReference.top > myDivRect.top) {
    //       console.log('Div is visible');
    //       screenScrolling.current = myDivRect.top
    //       myDiv.style.position = 'relative';
    //       myDiv.style.top = '0rem';
    //     }
    //   }
    // });
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', function(){});
      localStorage.setItem("Category","none")
    };
  }, []);

  const addToCartArtist = (id, firstname,getAnEstimate=false) => {
    dispatch(addCart({ key: id, data: { id: id, Name: firstname } }));
    if(getAnEstimate){
      dispatch(getAnEstimateHandler());
    }
  };

  const dataLocalArtist = (key, _id, firstname, bio, listData, subListData) => {
    let tempData = localStorage.getItem("artistViewed_V2");

    tempData = JSON.parse(tempData);
    if (tempData === null) {
      tempData = {};
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
      };
      localStorage.setItem("artistViewed_V2", JSON.stringify(tempData));
    } else {
      tempData[key] = {
        id: _id,
        title: firstname,
        detail: bio,
        slideList: listData,
        subListData: subListData,
      };

      let tempDataOnlySix = {}

      // Convert the object into an array of key-value pairs
      const entries = Object.entries(tempData);
      // Reverse the array
      const reversedEntries = entries.reverse();

      // Loop over the reversed array
      reversedEntries.forEach(([key, value],index) => {
          tempDataOnlySix[key] = value
      });

      localStorage.setItem("artistViewed_V2", JSON.stringify(tempDataOnlySix));
    }
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const changeIndex = (index) => {
    console.log(index)
  }

  const getUserData = async () => {
    let localPrevCate = localStorage.getItem("Category") == "cgi" || localStorage.getItem("Category") == "motion" ? "3D Rendering" : localStorage.getItem("Category")

    let tempData = await artistImageDetailedSliceData({ "artistId": search, "category": localPrevCate })

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
    let currentSelectedSlider = document.getElementById("firstSlider0");
    var prev = document.getElementsByClassName('slick-prev')[0];
    var next = document.getElementsByClassName('slick-next')[0]

    
    if(currentSelectedSlider){
      
      currentSelectedSlider.style.boxShadow = "0 2px 10px #141c2a"
      if(prev){
        prev.addEventListener("click", (e) => {
          console.log("LEFT BUTTON CLICKED",myStateRef.current ,data1[search].pictureTitle.length)
          
          if(myStateRef.current == 0 ){
            setSliderIndexHandler(data1[search].pictureTitle.length-1,myStateRef.current,true)
          }else{
            setSliderIndexHandler(myStateRef.current -1 ,myStateRef.current,true)
          }
        })
      }
       
      if(next){
        next.addEventListener("click", (e) => {
  
          if(myStateRef.current !== data1[search].pictureTitle.length-1){
            setSliderIndexHandler(myStateRef.current+1,myStateRef.current,true)
          }else{
            setSliderIndexHandler(0,data1[search].pictureTitle.length - 1,true)
          }
        })
      }
    }

  }, [data1]);

  const setSliderIndexHandler = (keys, oldValue = null, clickedSliderButton = false) => {
    if(clickedSliderButton){
      

      let previousSelectedSlider = document.getElementById("firstSlider"+oldValue);
      let currentSelectedSlider = document.getElementById("firstSlider"+keys);

      currentSelectedSlider.style.boxShadow = "0 2px 10px #141c2a"
      previousSelectedSlider.style.boxShadow = ""
      myStateRef.current = keys
      setSliderIndex(keys)
    }else{
      let previousSelectedSlider = document.getElementById(sliderIndex? "firstSlider"+sliderIndex : "firstSlider0");
      let currentSelectedSlider = document.getElementById("firstSlider"+keys);
      
      currentSelectedSlider.style.boxShadow = "0 2px 10px #141c2a"
      previousSelectedSlider.style.boxShadow = ""
      myStateRef.current = keys
      setSliderIndex(keys)
    }

  };

  useEffect(() => {
    getUserData()
    
    function getLocalStorage() {
      if (localStorage.getItem("artistViewed_V2") !== null) {
        setDataViewed(JSON.parse(localStorage.getItem("artistViewed_V2")));
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

    temp.resposive = windowSize.innerWidth < 479 ? true : false
    temp.screen = !temp.screen;
    setFullscreen(temp);
    setFullScreenData(data1[search])


  };

  const saveCartMessage = (msg) =>{
    dispatch(saveCartItemMessageKey({ messageShow:msg }));
  }

  const addToCartArtistHandler = (id,title,getAnEstimate=false) =>{
    let key = Object.keys(AddToCart.cartInfo).find(element => element == id)
    if(key == undefined){
      if(AddToCart.cartInfo.messageShow){
        setMsg("You have added "+ title +" to your list, to view your list visit Contact/My List Page.")
        setIsPopupShow(true)
      }
      addToCartArtist(id, title, getAnEstimate)
    }else{
      setMsg("You have already added "+ title +" to your list, to view your list visit Contact/My List Page.")
      setIsPopupShow(true)
      setIsPopupShowWithCheckbox(false)
    }
  }

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
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
              style={{ width: "50px" }}
            />
          </div>
      )
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {data1 !== null ? 
        <div className={windowSize.innerWidth < 479 ? "" : "d-flex"} style={windowSize.innerWidth < 479 ? { marginLeft: "8%" } : { justifyContent: "end", marginTop: "-10px" }} > 
            <div className="d-flex" style={windowSize.innerWidth < 479 ? { } :  { justifyContent: "space-between", width: "20%" }}>
                <Link
                  to="/contact"
                  className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearchDetailed  col-lg-2 col-md-3 mr-1" : "talentbutton mr-3"}
                  onClick={() => addToCartArtistHandler(data1[search].id, data1[search].title, true)}
                >
                  GET ESTIMATE
                </Link>
                <Link
                  data-w-id="e04f643e-f302-16e2-74ee-4bc7e85391d8"
                  to="#"
                  className={windowSize.innerWidth < 479 ? "talentbuttonArtistSearchDetailed  col-lg-2 col-md-3 mr-1" : "talentbutton mr-3"}
                  onClick={() => addToCartArtistHandler(data1[search].id, data1[search].title)}
                  style={{ marginRight: "0px" }}
                >
                  ADD TO MY LIST
                </Link>
            </div>
        </div>
      : "" }
      
      <div className="row m-0 pt-0" style={{
        maxWidth: "100%",
        justifyContent: "space-around",
        margin: "0px"
      }}>
        {data1 !== null ? (
          <>
            <div className="pl-2 left_content">
              {props.children}
            </div>
            <div className="row mid_full_content">
              <div className="pl-2 mid_content">

              <div className={windowSize.innerWidth < 479 ? "" : "d-flex"} style={windowSize.innerWidth < 479 ? { marginLeft: "8%" } : { justifyContent: "space-between", marginTop: "-10px" ,marginBottom:"10px", width:"98.4%" }} > 
                <h2 className="h2talent">{data1[search].title}</h2>  
                <a href={"http://13.59.180.10/#/artists/"+data1[search].id} target="_blank" className="linkToKS">View Kid's portfolio</a> 
              </div>

                {windowSize.innerWidth < 479 ?
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
                              <div className="talentthumbslide resp" onClick={() => setFullScreenHandler(item)}>
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
                          <div className="detail_card w-inline-block ">
                            {
                              data1[search].subListData.map((item, keys) => (
                                <div id={"firstSlider"+keys} className="detail_card5_h" style={windowSize.innerWidth <= 991 ? { overflow: "hidden", height:"8vh" } : { overflow: "hidden", height:"14.5vh" }} onClick={() => { setSliderIndexHandler(keys) }}> 
                                  <img src={item} className="w-100 h-100" 
                                  style={{objectFit: "cover"}}
                                  ></img>
                                </div>
                              ))
                            }
                          </div>
                      ) : null}
                  {/* <div className="detail_card w-inline-block ">
                    {
                      data1[search].subListData.map((item, keys) => (
                        <div id={"firstSlider"+keys} className="detail_card5_h" style={windowSize.innerWidth <= 991 ? { overflow: "hidden", height:"8vh" } : { overflow: "hidden", height:"14.5vh" }} onClick={() => { setSliderIndexHandler(keys) }}> 
                          <img src={item} className="w-100 h-100" 
                          style={{objectFit: "cover"}}
                          ></img>
                        </div>
                      ))
                    }
                </div> */}
              </div>
              <div className="right_content">
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
                        >
                          {
                            data1[search].slideList.map((item, keys) => (
                              <SliderItems
                                keys={keys}
                                src={item}
                                data1={data1}
                                search={search}
                                windowSize={windowSize}
                                onClick={setFullScreenHandler}
                                addToCartArtistHandler={addToCartArtistHandler}
                              />
                            ))
                          }

                        </SliderShow>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", backgroundColor: "white", zIndex:"1" }}>
                {/* Starting of Similar Artist */}
                {windowSize.innerWidth > 479 ?
                    <div style={{
                      fontWeight: '700',
                      backgroundColor: "#ce651e",
                      fontSize: "18px",
                      color: "#fff",
                      paddingLeft: "20px",
                      marginTop: '8vh',
                      marginBottom: "3vh",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    }} className=" ">
                      CLIENTS WHO VIEWED THIS ARTIST ALSO VIEWED</div> : null
                }
                <div className="pl-2">
                {
                  windowSize.innerWidth < 479 ?
                    tab === 1 ? (<div>
                      <div
                        className="imagecont"
                        style={{ marginTop: 10 }}
                      >
                        {Object.keys(similarData).length > 0 ?
                          Object.keys(similarData).map((key, i) =>
                              <div className="talentthumbslide resp">
                               <Link
                                  id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                                  data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                                  className="card_img3"
                                  // style={{ position: "relative" }}
                                  to={"/artists/" + key}
                                >
                                  <div className="detail_card6_h">
                                    <img
                                      src={String(similarData[key].mainImage)}
                                      loading="lazy"
                                      alt=""
                                      className="image"
                                      style={{ width: "100%", }} />
                                    <div className="artistnamediv">
                                      <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                                        {similarData[key].firstname} {similarData[key].lastname}
                                      </div>
                                    </div>
                                    {/* <p className="card_img_text3 pb-3 pt-1">
                                      {similarData[key].lastname} {similarData[key].firstname}</p> */}
                                  </div>
                                </Link>
                              </div>
                          )
                          : "NO SIMILAR IMAGES FOUND"
                        }
                      </div>
                      {/* <div style={{ textAlign: "center", margin: "25px 10px 10px" }}>
                        <Link
                          to="#"
                          style={{ fontSize: "16px" }}
                          className="talentbuttonArtistSearch col-3 mr-1"
                          onClick={() => setArtistSimilar(artistSimilar + 8)}
                        >
                          See More
                        </Link>
                      </div> */}
                    </div>) : null
                    :
                    <div className="detail_card2 my-2">
                      {Object.keys(similarData).length > 0
                        ? Object.keys(similarData).map(key => 
                        (
                          <Link
                            id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                            data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                            className="card_img3"
                            // style={{ position: "relative" }}
                            to={"/artists/" + key}
                          >
                            <div className="detail_card6_h">
                              <img
                                src={String(similarData[key].mainImage)}
                                loading="lazy"
                                alt=""
                                className="image"
                                style={{ width: "100%", }} />
                              <div className="artistnamediv">
                                <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                                  {similarData[key].firstname} {similarData[key].lastname}
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
                    }
                </div>
                {/* ENDING of Similar Artist */}

                {/* Starting of Recently Viewed */}
                {/* Starting of Recently Viewed */}

                {windowSize.innerWidth > 479 ?
                    <div style={{
                      width: "100%",
                      fontWeight: '700',
                      backgroundColor: "#ce651e",
                      fontSize: "18px",
                      color: "#fff",
                      paddingLeft: "20px",
                      marginTop: '8vh',
                      marginBottom: "3vh",

                    }} className="py-2 ">RECENTLY VIEWED</div>
                  : null
                }
                {
                    windowSize.innerWidth < 479 ?
                    null :
                    (
                      <div className="detail_card2 my-2">

                        {Object.keys(dataViewed).length > 0
                          ? Object.keys(dataViewed).map((key, i) => 
                          i<=18 && dataViewed[key].subListData?
                          (
                            <Link
                            id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                            data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                            className="card_img3"
                            to={"/artists/" + key}
                          >
                            <div className="detail_card6_h">
                              <img
                                src={String(dataViewed[key]?.subListData[0])}
                                loading="lazy"
                                alt=""
                                className="image"
                                style={{ width: "100%", }} />
                              <div className="artistnamediv">
                                <div className="artistnametext-v3" style={{padding:"6px 0px"}}>
                                {dataViewed[key].title}
                                </div>
                              </div>
                            </div>
                          </Link>
                          ):null)
                          : ""
                        }

                      </div>
                    )}

                {/* Ending of Recently Viewed */}
                {/* Ending of Recently Viewed */}

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

      {/* END OF ROWS AND COLUMN */}
      {/* END OF ROWS AND COLUMN */}
      {/* END OF ROWS AND COLUMN */}
      {/* END OF ROWS AND COLUMN */}
      {/* END OF ROWS AND COLUMN */}


      <div className="contactpage mt-5 pt-2" >
        {isPopupShow && isPopupShowWithCheckbox? (
          <MyPopup
            BackClose
            onClose={() => {
              saveCartMessage(!isCheckboxChecked) 
              setIsPopupShow(false);
            }}
          >
            <div className="mx-5 my-4">
              <div>{msg}</div>
              <div class="form-check form-switch mt-2"> 
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="flexSwitchCheckDefault" 
                  style={{cursor:"pointer",accentColor:"#BC6127"}}
                  checked={isCheckboxChecked}
                  onClick={()=> { setIsCheckboxChecked(!isCheckboxChecked); console.log("CLICKED")}}
                  />
                <label class="form-check-label" for="flexSwitchCheckDefault" style={{paddingTop:"5px"}}>Do not show this again</label>
              </div>
            </div>
            <div className="cartBadgeSearchArtist" onClick={() => {
              saveCartMessage(!isCheckboxChecked) 
              setIsPopupShow(false);
            }} >x</div>
          </MyPopup>
        ) : isPopupShow && !isPopupShowWithCheckbox?
        <MyPopup
            BackClose
            onClose={() => {
              setIsPopupShowWithCheckbox(true);
              setIsPopupShow(false);
            }}
          >
            <div className="mx-5 my-4">
              <div>{msg}</div>
            </div>
            <div className="cartBadgeSearchArtist" onClick={() => {
              saveCartMessage(!isCheckboxChecked) 
              setIsPopupShow(false);
            }} >x</div>
          </MyPopup> : null
        }
      </div>
    </div>

  );
}

export default SearchByArtist;
