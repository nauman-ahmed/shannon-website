import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

const images = window.location.origin + "/assets/images";

function Bipoc() {

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

    setBlackArtist(getDummyData());
    setAsianArtist(getDummyData());
    setLatinoArtist(getDummyData());
    setCentralAsianArtist(getDummyData());
    setIndegiousArtist(getDummyData());

    // getBipocBlack().then((res) => {
    //   setBlackArtist(res);
    // });

    // getBipocAsian().then((res) => {
    //   setAsianArtist(res);
    // });

    // getBipocLatino().then((res) => {
    //   setLatinoArtist(res);
    // });

    // getBipocCentralAsia().then((res) => {
    //   setCentralAsianArtist(res);
    // });

    // getBipocIndigenous().then((res) => {
    //   setIndegiousArtist(res);
    // });
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

  const implementAddListner = () => {

    let black = document.querySelector("#" + idBlack)
    let startB;
    let endB;

    black.addEventListener("touchstart", (e) => {
      startB = e.changedTouches[0].screenX
    })

    black.addEventListener("touchend", (e) => {
      endB = e.changedTouches[0].screenX
      checkDirectionBlack(startB, endB)
    })

    let asian = document.querySelector("#" + idAsian)
    let startA;
    let endA;
    asian.addEventListener("touchstart", (e) => {
      startA = e.changedTouches[0].screenX
    })

    asian.addEventListener("touchend", (e) => {
      endA = e.changedTouches[0].screenX
      checkDirectionAsian(startA, endA)
    })

    let latino = document.querySelector("#" + idLatino)
    let startL;
    let endL;
    latino.addEventListener("touchstart", (e) => {
      startL = e.changedTouches[0].screenX
    })

    latino.addEventListener("touchend", (e) => {
      endL = e.changedTouches[0].screenX
      checkDirectionLatino(startL, endL)
    })

    let central = document.querySelector("#" + idCentral)
    let startC;
    let endC;
    central.addEventListener("touchstart", (e) => {
      startC = e.changedTouches[0].screenX
    })

    central.addEventListener("touchend", (e) => {
      endC = e.changedTouches[0].screenX
      checkDirectionCentral(startC, endC)
    })

    let indegious = document.querySelector("#" + idIndegious)
    let startI;
    let endI;
    indegious.addEventListener("touchstart", (e) => {
      startI = e.changedTouches[0].screenX
    })

    indegious.addEventListener("touchend", (e) => {
      endI = e.changedTouches[0].screenX
      checkDirectionIndegious(startI, endI)
    })
  }


  useEffect(() => {
    if (indegiousArtist) {
      const myTimeout = setTimeout(implementAddListner, 2000);
      function myStopFunction() {
        clearTimeout(myTimeout);
      }
    }
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

  return (
    <>
      <h1 className="newsh2 hide" >BLACK + INDIGENOUS + PEOPLE OF COLOR</h1>
      <div className="bipoc2cols mt-5 pt-3">
        <Link
          id="w-node-d7c7bef6-bf4c-3929-b7f7-7a0cd0fdac21-58f2d07a"
          to="#"
          className="artistcardBIPOC bipoc w-inline-block"
        >
          <img
            src={images + "/Rectangle-114.png"}
            loading="lazy"
            alt=""
            className="image bipoc"
          />
          <div className="artistnamedivBIPOC">
            <div className="artistnametext-v3">LONNIE OLLIVIERRE</div>
          </div>
        </Link>
        <div
          id="w-node-_85a7ddb0-1565-6609-f698-06fa7db97dd9-58f2d07a"
          className="bipocinfo"
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
      <div className="bipoc2cols category" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <h2 className="newsh2 h" >BLACK ARTISTS</h2>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
            </div>
            <div role="list" className="collection-list-4 w-dyn-items">
              {blackArtist ?
                blackArtist.map((val, ind) =>
                (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className="text-block-5">{val.artistData.lastname.toUpperCase() + " " + val.artistData.firstname.toUpperCase()}</div>
                  </Link>
                </div>))
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          <div className=" ">
            {/* <h2 className="newsinstah2 h">PORTFOLIOS</h2> */}
            <h1 className="newsh2 hide">BLACK ARTISTS</h1>
          </div>
          {blackArtist ? (
            <div className=" my-3" id={idBlack}>
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
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className=" justify-content-center w-inline-block" style={{ position: "relative", height: "auto", overflow: "hidden" }}>
                      <img src={val.ImageData[0].subImage[1].path} val={val} className="card_img m-1"></img>
                      <p className="p-1 card_img_text" >{val.artistData.lastname + " " + val.artistData.firstname}</p>
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
      <div className="bipoc2cols category" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <h1 className="newsh2 h">ASIAN ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {asianArtist ?
                asianArtist.map((val, ind) =>
                (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className="text-block-5">{val.artistData.lastname.toUpperCase() + " " + val.artistData.firstname.toUpperCase()}</div>
                  </Link>
                </div>))
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          <div className="divisiondivider ">
            {/* <h2 className="newsinstah2 h">PORTFOLIOS</h2> */}
            <h1 className="newsh2 hide">ASIAN ARTISTS</h1>
          </div>
          {asianArtist ? (
            <div className=" my-3" id={idAsian}>
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
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className=" justify-content-center w-inline-block" style={{ position: "relative", height: "auto", overflow: "hidden" }}>
                      <img src={val.ImageData[0].subImage[1].path} val={val} className="card_img m-1"></img>
                      <p className="p-1 card_img_text" >{val.artistData.lastname + " " + val.artistData.firstname}</p>
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
      <div className="bipoc2cols category" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <h1 className="newsh2 h">LATINO/LATINA ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {latinoArtist ?
                latinoArtist.map((val, ind) =>
                (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className="text-block-5">{val.artistData.lastname.toUpperCase() + " " + val.artistData.firstname.toUpperCase()}</div>
                  </Link>
                </div>))
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          <div className="divisiondivider ">
            {/* <h2 className="newsinstah2 h">PORTFOLIOS</h2> */}
            <h1 className="newsh2 hide">LATINO/LATINA ARTISTS</h1>
          </div>
          {latinoArtist ? (
            <div className=" my-3" id={idLatino}>
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
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className=" justify-content-center w-inline-block" style={{ position: "relative", height: "auto", overflow: "hidden" }}>
                      <img src={val.ImageData[0].subImage[1].path} val={val} className="card_img m-1"></img>
                      <p className="p-1 card_img_text" >{val.artistData.lastname + " " + val.artistData.firstname}</p>
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
      <div className="bipoc2cols category" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <h1 className="newsh2 h">CENTRAL ASIAN ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {centralAsianArtist ?
                centralAsianArtist.map((val, ind) =>
                (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className="text-block-5">{val.artistData.lastname.toUpperCase() + " " + val.artistData.firstname.toUpperCase()}</div>
                  </Link>
                </div>))
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          <div className="divisiondivider ">
            {/* <h2 className="newsinstah2 h">PORTFOLIOS</h2> */}
            <h1 className="newsh2 hide">CENTRAL ASIAN ARTISTS</h1>
          </div>
          {centralAsianArtist ? (
            <div className=" my-3" id={idCentral}>
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
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className=" justify-content-center w-inline-block" style={{ position: "relative", height: "auto", overflow: "hidden" }}>
                      <img src={val.ImageData[0].subImage[1].path} val={val} className="card_img m-1"></img>
                      <p className="p-1 card_img_text" >{val.artistData.lastname + " " + val.artistData.firstname}</p>
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
      <div className="bipoc2cols category" style={{ position: "relative" }}>
        <div className="categoryinfo">
          <h1 className="newsh2 h">INDIGENOUS ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              {indegiousArtist ?
                indegiousArtist.map((val, ind) =>
                (<div role="listitem" className="w-dyn-item">
                  <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                    data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className="text-block-5">{val.artistData.lastname.toUpperCase() + " " + val.artistData.firstname.toUpperCase()}</div>
                  </Link>
                </div>))
                :
                <div role="listitem" className="w-dyn-item">
                  <div className="text-block-5"></div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="sliderbipoc">
          <div className="divisiondivider ">
            {/* <h2 className="newsinstah2 h">PORTFOLIOS</h2> */}
            <h1 className="newsh2 hide">INDIGENOUS ARTISTS</h1>
          </div>
          {indegiousArtist ? (
            <div className="my-3" id={idIndegious}>
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
                    to={"/artists/" + val.artistData.firstname}
                    className="bipocLink"
                  >
                    <div className=" justify-content-center w-inline-block" style={{ position: "relative", height: "auto", overflow: "hidden" }}>
                      <img src={val.ImageData[0].subImage[1].path} val={val} className="card_img m-1"></img>
                      <p className="p-1 card_img_text" >{val.artistData.lastname + " " + val.artistData.firstname}</p>
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
