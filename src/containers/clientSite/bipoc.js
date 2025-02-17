import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SliderShow,
  SliderItems
} from "../../components/slider/slider";

import Slider, {
  SliderItem,
} from "../../components/slider/newSlider";

import {
  getBipocAsian,
  getBipocBlack,
  getBipocCentralAsia,
  getBipocIndigenous,
  getBipocLatino,
} from "../../AxiosFunctions/Axiosfunctionality";
import { IMAGE_ROUTE } from "../../AxiosFunctions/Axiosfunctionality";
import { getDummyData } from "./temp";
import coverImage from "./bipocSubPages/bipocAssets/BIPOC_PAGE_SQUARE.jpg"
import { bannerLoader } from "../../redux/bannerImages";


const images = window.location.origin + "/assets/images";

function Bipoc() {

  const dispatch = useDispatch();
  const { bannerImages } = useSelector((state) => state);

  const [gottenData, setGottenData] = useState(false);

  const [styleSheet, setStyleSheet] = useState({ maxWidth: "100%" });
  const [blackArtist, setBlackArtist] = useState(null);
  const [asianArtist, setAsianArtist] = useState(null);
  const [latinoArtist, setLatinoArtist] = useState(null);
  const [centralAsianArtist, setCentralAsianArtist] = useState(null);
  const [indegiousArtist, setIndegiousArtist] = useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const idBlack = "BLACKBIPOC"
  const idBlackSlider = "BLACKBIPOCSLIDER"

  const idAsian = "ASIANBIPOC"
  const idAsianSlider = "ASIANBIPOCSLIDER"

  const idLatino = "LATINOBIPOC"
  const idLatinoSlider = "LATINOBIPOCSLIDER"

  const idCentral = "CENTRALBIPOC"
  const idCentralSlider = "CENTRALBIPOCSLIDER"

  const idIndegious = "INDEGIOUSBIPOC"
  const idIndegiousSlider = "INDEGIOUSBIPOCSLIDER"

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

  useEffect(() => {
    if(bannerImages.bipocBannerData.length == 0){
      dispatch(bannerLoader());
    }
  }, []);

  useEffect(() => {

    // setBlackArtist(getDummyData());
    // setAsianArtist(getDummyData());
    // setLatinoArtist(getDummyData());
    // setCentralAsianArtist(getDummyData());
    // setIndegiousArtist(getDummyData());

    getBipocBlack().then((res) => {
      let orderedArtist = res?.sort((a, b) => {
        if(a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize()) === 0){
          return a.artistData.firstname.normalize().localeCompare(b.artistData.firstname.normalize())
        }else{
          return a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize());
        }
      });
      setBlackArtist(orderedArtist);
    });

    getBipocAsian().then((res) => {
      let orderedArtist = res?.sort((a, b) => {
        if(a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize()) === 0){
          return a.artistData.firstname.normalize().localeCompare(b.artistData.firstname.normalize())
        }else{
          return a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize());
        }
      });
      setAsianArtist(orderedArtist);
    });

    getBipocLatino().then((res) => {
      let orderedArtist = res?.sort((a, b) => {
        if(a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize()) === 0){
          return a.artistData.firstname.normalize().localeCompare(b.artistData.firstname.normalize())
        }else{
          return a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize());
        }
      });
      setLatinoArtist(orderedArtist);
    });

    getBipocCentralAsia().then((res) => {
      let orderedArtist = res?.sort((a, b) => {
        if(a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize()) === 0){
          return a.artistData.firstname.normalize().localeCompare(b.artistData.firstname.normalize())
        }else{
          return a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize());
        }
      });
      setCentralAsianArtist(orderedArtist);
    });

    getBipocIndigenous().then((res) => {
      let orderedArtist = res?.sort((a, b) => {
        if(a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize()) === 0){
          return a.artistData.firstname.normalize().localeCompare(b.artistData.firstname.normalize())
        }else{
          return a.artistData.lastname.normalize().localeCompare(b.artistData.lastname.normalize());
        }
      });
      setIndegiousArtist(orderedArtist);
    });
    setGottenData(true)
  }, []);

  const checkDirectionIndegious = (start, end) => {

    let left = document.querySelector("#left" + idIndegiousSlider);
    let right = document.querySelector("#right" + idIndegiousSlider);

    if (end < start) {
      right.click()
    }
    if (end > start) {
      left.click()
    }

  }

  const checkDirectionCentral = (start, end) => {

    let left = document.querySelector("#left" + idCentralSlider);
    let right = document.querySelector("#right" + idCentralSlider);

    if (end < start) {
      right.click()
    }
    if (end > start) {
      left.click()
    }

  }

  const checkDirectionLatino = (start, end) => {

    let left = document.querySelector("#left" + idLatinoSlider);
    let right = document.querySelector("#right" + idLatinoSlider);

    if (end < start) {
      right.click()
    }
    if (end > start) {
      left.click()
    }

  }

  const checkDirectionBlack = (start, end) => {

    let left = document.querySelector("#left" + idBlackSlider);
    let right = document.querySelector("#right" + idBlackSlider);

    if (end < start) {
      right.click()
    }
    if (end > start) {
      left.click()
    }

  }

  const checkDirectionAsian = (start, end) => {

    let left = document.querySelector("#left" + idAsianSlider);
    let right = document.querySelector("#right" + idAsianSlider);

    if (end < start) {
      right.click()
    }
    if (end > start) {
      left.click()
    }

  }

  // const implementAddListner = () => {

  //   let black = document.querySelector("#" + idBlack)
  //   let startB;
  //   let endB;

  //   black.addEventListener("touchstart", (e) => {
  //     startB = e.changedTouches[0].screenX
  //   })

  //   black.addEventListener("touchend", (e) => {
  //     endB = e.changedTouches[0].screenX
  //     checkDirectionBlack(startB, endB)
  //   })

  //   let asian = document.querySelector("#" + idAsian)
  //   let startA;
  //   let endA;
  //   asian.addEventListener("touchstart", (e) => {
  //     startA = e.changedTouches[0].screenX
  //   })

  //   asian.addEventListener("touchend", (e) => {
  //     endA = e.changedTouches[0].screenX
  //     checkDirectionAsian(startA, endA)
  //   })

  //   let latino = document.querySelector("#" + idLatino)
  //   let startL;
  //   let endL;
  //   latino.addEventListener("touchstart", (e) => {
  //     startL = e.changedTouches[0].screenX
  //   })

  //   latino.addEventListener("touchend", (e) => {
  //     endL = e.changedTouches[0].screenX
  //     checkDirectionLatino(startL, endL)
  //   })

  //   let central = document.querySelector("#" + idCentral)
  //   let startC;
  //   let endC;
  //   central.addEventListener("touchstart", (e) => {
  //     startC = e.changedTouches[0].screenX
  //   })

  //   central.addEventListener("touchend", (e) => {
  //     endC = e.changedTouches[0].screenX
  //     checkDirectionCentral(startC, endC)
  //   })

  //   let indegious = document.querySelector("#" + idIndegious)
  //   let startI;
  //   let endI;
  //   indegious.addEventListener("touchstart", (e) => {
  //     startI = e.changedTouches[0].screenX
  //   })

  //   indegious.addEventListener("touchend", (e) => {
  //     endI = e.changedTouches[0].screenX
  //     checkDirectionIndegious(startI, endI)
  //   })
  // }


  useEffect(() => {
    // if (indegiousArtist) {
    //   const myTimeout = setTimeout(implementAddListner, 2000);
    //   function myStopFunction() {
    //     clearTimeout(myTimeout);
    //   }
    // }
  }, [indegiousArtist])

  useEffect(() => {
    if (window.innerWidth <= 479) {
      setStyleSheet({ maxWidth: "100%" })
    }
    else if (window.innerWidth > 479 && window.innerWidth <= 1200) {
      setStyleSheet({ maxWidth: "100%", maxHeight: "32.5vh" })
    }
    else if (window.innerWidth >= 1500) {
      setStyleSheet({ maxWidth: "100%", maxHeight: "40vh" })
    } else {
      setStyleSheet({ maxWidth: "100%", maxHeight: "32.5vh" })
    }
  }, [window.innerWidth])

  const storeBipocCat = (cat) => {
    const route = [{val:"Home",link:"./"},{val:"Bipoc",link:"./bipoc"},{val:cat,link:"./bipoc/"+cat}]
   
    localStorage.setItem("routePaths",JSON.stringify(route))
    localStorage.setItem("Category","none")
    localStorage.setItem("Bipoc",cat)
    localStorage.removeItem("graphicNovel")

  }

  return (
    <> 
      <h1 className="newsh2 hide" >BLACK + INDIGENOUS + PEOPLE OF COLOR</h1>
      <div className="bipoc2cols " style={{marginTop:"39px"}}>
        <Link
          id="w-node-d7c7bef6-bf4c-3929-b7f7-7a0cd0fdac21-58f2d07a"
          to="#"
          className="artistcard bipoc set_height w-inline-block"
        >
          <img
            src={bannerImages.bipocBannerData.length > 0 ? bannerImages.bipocBannerData[0].imagePath : ""}
            loading="lazy"
            alt=""
            className="image bipoc"
          />
          <div className="artistnamediv">
            <div className="artistnametext-v2" style={{ lineHeight: '1', fontSize: '0.74vw' }}>EMMANUEL BOATENG</div>
          </div>
        </Link>
        <div
          id="w-node-_85a7ddb0-1565-6609-f698-06fa7db97dd9-58f2d07a"
          className="bipocinfo ml-md-5 pl-md-5"
        >
          <h1 className="newsh2 h">BLACK + INDIGENOUS + PEOPLE OF COLOR</h1>
          <p className="paragraph">
            Shannon Associates is pleased to introduce the following
            illustrators in our continued commitment to the diversity of voices
            rising through art and authorship. <br />
            <br />
            There is a world of illustration and stories that have yet to be
            told. Through our many years in the art industry we have been
            committed to realizing the full potential and talent of all
            available artists and illustrators. We are honored to bring these
            diverse voices, talents, and authorship to the industry. At Shannon
            Associates, we are committed to playing a bigger role by providing
            our clients access to 100% of the talent pool and supporting the
            communities that have been underrepresented in the commercial art
            world. <br />
            <br />
            We are connecting with and supporting the efforts of artists within
            the BIPOC communities to partner with and promote full participation
            in the work. We will continue to work hard to make critical
            connections between clients and artists to share their stories and
            voices with this generation. <br />
            <br />
            This is just the beginning as we continue to grow and learn. We are
            all better when we are all together.
          </p>
        </div>
      </div>
      <div className="bipoc2cols category w-100" style={{ position: "relative", marginTop: "10vh" }}>
        <div className="categoryinfo">
          <Link style={{ textDecoration: "none" }} to={"/bipoc/black"}><h2 className="bipocTitle" >BLACK ARTISTS</h2></Link>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {blackArtist ?
                blackArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="sidebarlink"
                    onClick={()=>storeBipocCat("Black")}
                  >
                    <div className="sidebarlink">{ val.artistData.firstname.toUpperCase()+ " " + val.artistData.lastname.toUpperCase() }</div>
                    </Link>
                </div>): null)
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          {blackArtist ? (
            <div className="mb-3 detail_card3_bipoc" id={idBlack} >
              {/* <Slider 
                disableAutoPlay 
                controllEnabled="outside-dark"
                id = {idBlackSlider}
            > */}
              {blackArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (

                  // <SliderItem
                  //   label={
                  //     val.artistData.lastname + " " + val.artistData.firstname
                  //   }
                  //   col={windowSize.innerWidth < 420 ? "MOBILE" :  ind===0?"col-lg-4 col-md-6 col-12 card _1":"col-lg-4 col-md-6 col-12 card "}
                  //   src={val.ImageData[0].subImage[1].path}
                  //   val={val}
                  // />
                  // (<div role="listitem">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="bipocLink"
                    onClick={()=>storeBipocCat("Black")}
                  >
                    <div className=" card_img2 detail_card3_h" style={{ position: "relative",   overflow:"hidden",}}>
                      <img src={val.ImageData[0].subImage[0].path} val={val} className="h-100 w-100" ></img>
                      <p className="p-1 card_img_text" >{val.artistData.firstname  + " " +val.artistData.lastname}</p>
                    </div>
                  </Link>
                  // </div>)
                  // <div className=" ">
                  //   <div className={windowSize.innerWidth < 420 ? "MOBILE" :  "images"}>
                  //     <img  src={val.ImageData[0].subImage[1].path} val={val} className=""></img>
                  //     <div className="">
                  //     <p className="">{val.artistData.lastname + " " + val.artistData.firstname}</p>

                  //     </div>
                  //     </div>
                  // </div>
                )
                  : null
              )}
              {/* </Slider> */}
            </div>
          ) : null}
          <div
            data-delay="4000"
            data-animation="slide"
            className="slider w-slider"
            data-autoplay="false"
            data-easing="ease"
            data-hide-arrows="false"
            data-disable-swipe="false"
            data-autoplay-limit="0"
            data-nav-spacing="3"
            data-duration="500"
            data-infinite="true"
            id="w-node-_7202b053-0a45-14d3-0891-b0f77fc389d8-58f2d07a"
          ></div>
        </div>
      </div>
      {/*  */}
      <div className="bipoc2cols category w-100" style={{ position: "relative" }}>
        <div className="categoryinfo">
        <Link style={{ textDecoration: "none" }} to={"/bipoc/asianArtist"}><h2 className="bipocTitle" >ASIAN ARTISTS</h2></Link>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {asianArtist ?
                asianArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    onClick={()=>storeBipocCat("Asian")}
                    className="sidebarlink"
                  >
                    <div className="sidebarlink">{ val.artistData.firstname.toUpperCase()  + " " +val.artistData.lastname.toUpperCase()}</div>
                  </Link>
                </div>): null)
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          {asianArtist ? (
            <div className="mb-3 detail_card3_bipoc" id={idAsian}>
              {/* <Slider
                disableAutoPlay
                controllEnabled="outside-dark"
                id={idAsianSlider}
              > */}
              {asianArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (
                  // <SliderItem
                  //   label={
                  //     val.artistData.lastname + " " + val.artistData.firstname
                  //   }
                  //   col={windowSize.innerWidth < 420 ? "MOBILE" : ind === 0 ? "col-lg-4 col-md-6 col-12 card _1" : "col-lg-4 col-md-6 col-12 card "}
                  //   src={val.ImageData[0].subImage[1].path}
                  //   val={val}
                  // />
                  
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="bipocLink "
                    onClick={()=>storeBipocCat("Asian")}
                  >
                    <div className="card_img2 detail_card3_h" style={{ position: "relative",   overflow:"hidden"}}>
                      <img src={val.ImageData[0].subImage[0].path} val={val} className=" w-100 h-100" ></img>
                      <p className="p-1 card_img_text" >{val.artistData.firstname  + " " +val.artistData.lastname}</p>
                   </div>

                  </Link>
                ) : null
              )}
              {/* </Slider> */}
            </div>
          ) : null}
        </div>
      </div>
      {/*  */}
      <div className="bipoc2cols category w-100" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <Link style={{ textDecoration: "none" }} to={"/bipoc/latinoArtist"}><h2 className="bipocTitle" >LATINO/LATINA ARTISTS</h2></Link>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {latinoArtist ?
                latinoArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="sidebarlink"
                    onClick={()=>storeBipocCat("Latino")}
                  >
                    <div className="sidebarlink">{val.artistData.firstname.toUpperCase()  + " " + val.artistData.lastname.toUpperCase()}</div>
                  </Link>
                </div>):null)
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          {latinoArtist ? (
            <div className="mb-3 detail_card3_bipoc" id={idLatino}>

              {/* <Slider
                disableAutoPlay
                controllEnabled="outside-dark"
                id={idLatinoSlider}
              > */}
              {latinoArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="bipocLink"
                    onClick={()=>storeBipocCat("Latino")}
                  >
                    <div className="card_img2 detail_card3_h" style={{ position: "relative",   overflow:"hidden",}}>
                      <img src={val.ImageData[0].subImage[0].path} val={val} className="w-100 h-100"></img>
                      <p className="p-1 card_img_text" >{val.artistData.firstname  + " " +val.artistData.lastname }</p>
                    </div>
                  </Link>
                  // <SliderItem
                  //   label={
                  //     val.artistData.lastname + " " + val.artistData.firstname
                  //   }
                  //   col={windowSize.innerWidth < 420 ? "MOBILE" : ind === 0 ? "col-lg-4 col-md-6 col-12 card _1" : "col-lg-4 col-md-6 col-12 card "}
                  //   src={val.ImageData[0].subImage[1].path}
                  //   val={val}
                  // />
                ) : null
              )}
              {/* </Slider> */}
            </div>
          ) : null}
        </div>
      </div>
      {/*  */}
      <div className="bipoc2cols category w-100" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <Link style={{ textDecoration: "none" }} to={"/bipoc/centralAsianArtist"}><h2 className="bipocTitle" >CENTRAL ASIAN ARTISTS</h2></Link>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {centralAsianArtist ?
                centralAsianArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="sidebarlink"
                    onClick={()=>storeBipocCat("Central Asia")}
                  >
                    <div className="sidebarlink">{val.artistData.firstname.toUpperCase()  + " " + val.artistData.lastname.toUpperCase()}</div>
                    {/* <div className="text-block-5">{val.artistData.firstname.toUpperCase()  + " " + val.artistData.lastname.toUpperCase()}</div> */}
                  </Link>
                </div>):null)
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          {centralAsianArtist ? (
            <div className="detail_card3_bipoc mb-3" id={idCentral}>
              {/* <Slider
                disableAutoPlay
                controllEnabled="outside-dark"
                id={idCentralSlider}
              > */}
              {centralAsianArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="bipocLink"
                    onClick={()=>storeBipocCat("Central Asia")}
                  >
                    <div className="card_img2 detail_card3_h" style={{ position: "relative",   overflow:"hidden",}}>
                      <img src={val.ImageData[0].subImage[0].path} val={val} className="w-100 h-100"></img>
                      <p className="p-1 card_img_text" >{ val.artistData.firstname+ " " + val.artistData.lastname}</p>
                    </div>
                  </Link>
                  // <SliderItem
                  //   label={
                  //     val.artistData.lastname + " " + val.artistData.firstname
                  //   }
                  //   col={windowSize.innerWidth < 420 ? "MOBILE" : ind === 0 ? "col-lg-4 col-md-6 col-12 card _1" : "col-lg-4 col-md-6 col-12 card "}
                  //   src={val.ImageData[0].subImage[1].path}
                  //   val={val}
                  // />
                ) : null
              )}
              {/* </Slider> */}
            </div>
          ) : null}
        </div>
      </div>
      {/*  */}
      <div className="bipoc2cols category w-100" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <Link style={{ textDecoration: "none" }} to={"/bipoc/indigenousArtist"}><h2 className="bipocTitle" >INDIGENOUS ARTISTS</h2></Link>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {indegiousArtist ?
                indegiousArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="sidebarlink"
                    onClick={()=>storeBipocCat("Indigenous")}
                  >
                    <div className="sidebarlink">{val.artistData.firstname.toUpperCase()  + " " + val.artistData.lastname.toUpperCase()}</div>
                  </Link>
                </div>):null)
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          {indegiousArtist ? (
            <div className="mb-3 detail_card3_bipoc" id={idIndegious}>
            
              {/* <Slider
                disableAutoPlay
                controllEnabled="outside-dark"
                id={idIndegiousSlider}
              > */}
              {indegiousArtist.map((val, ind) =>
                val.ImageData.length > 0 ? (
                  // <SliderItem
                  //   label={
                  //     val.artistData.lastname + " " + val.artistData.firstname
                  //   }
                  //   col={windowSize.innerWidth < 420 ? "MOBILE" : ind === 0 ? "col-lg-4 col-md-6 col-12 card _1" : "col-lg-4 col-md-6 col-12 card "}
                  //   src={val.ImageData[0].subImage[1].path}
                  //   val={val}
                  // />
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={val.artistData.fullName}
                    className="bipocLink"
                    onClick={()=>storeBipocCat("Indigenous")}
                  >
                    <div className="card_img2 detail_card3_h" style={{ position: "relative",overflow: "hidden" }}>
                      <img src={val.ImageData[0].subImage[0].path} val={val} className="w-100 h-100"></img>
                      <p className="p-1 card_img_text" >{val.artistData.firstname + " " + val.artistData.lastname}</p>
                    </div>
                  </Link>

                ) : null
              )}
              {/* </Slider> */}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Bipoc;
