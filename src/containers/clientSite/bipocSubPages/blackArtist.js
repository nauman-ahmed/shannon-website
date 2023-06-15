import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setImageRoute } from "../../../UserServices/Services";
import { bannerLoader } from "../../../redux/bannerImages";

import {
  SliderShow,
  SliderItems
} from "../../../components/slider/slider";

import Slider, {
  SliderItem,
} from "../../../components/slider/newSlider";

import {
  getBipocAsian,
  getBipocBlack,
  getBipocCentralAsia,
  getBipocIndigenous,
  getBipocLatino,
} from "../../../AxiosFunctions/Axiosfunctionality";
import { IMAGE_ROUTE } from "../../../AxiosFunctions/Axiosfunctionality";



// import downloadArrow from "../../images/download.png";
const images = window.location.origin + "/assets/images";

function BlackArtist(props) {

  const dispatch = useDispatch();
  const { bannerImages } = useSelector((state) => state);

  const [gottenData, setGottenData] = useState(false);
  const [styleSheet, setStyleSheet] = useState({ maxWidth: "100%" });
  const [blackArtist, setBlackArtist] = useState(null);
  const [asianArtist, setAsianArtist] = useState(null);
  const [latinoArtist, setLatinoArtist] = useState(null);
  const [centralAsianArtist, setCentralAsianArtist] = useState(null);
  const [indegiousArtist, setIndegiousArtist] = useState(null);

  useEffect(() => {
    if(bannerImages.bipocBannerData.length == 0){
      dispatch(bannerLoader());
    }
  }, []);

  useEffect(() => {

    getBipocBlack().then((res) => {
      setBlackArtist(res);
    });

  }, []);

  return (
    <div>
      {console.log(bannerImages.bipocBannerData)}
    <div className="bipoc2cols category w-100 h-100" style={{ position: "relative", marginTop: "10vh" }}>
      <Link
                    id="w-node-a284be2a-4b91-3177-03eb-6614b24879ea-4bf2d022"
                    to="/bipoc"
                    className="banner _1 v2 w-inline-block-banner2 "
                    style={{ gridTemplateColumns: "6vw 1fr" }}
                  >
                    <div 
                      className="bannerletters _1 v2"
                      style={{
                        backgroundImage: "url(" + images + "/blackNew.png)",
                        marginLeft: "0vw",
                        marginTop: "0.8vh",
                        padding:"5px"
                      }}
                    ></div>
                    {/* <img id="w-node-a284be2a-4b91-3177-03eb-6614b24879ec-4bf2d022" alt="banner " src={IMAGE_ROUTE+bannerImages.bannerData[0].imagePath}  className="bannerletters _1 v2"/> */}
                    <div
                      id="w-node-a284be2a-4b91-3177-03eb-6614b24879ec-4bf2d022"
                      className="bannerhome _1 v2"
                      style={ bannerImages.bipocBannerData.length > 0 ? {
                        backgroundImage:
                          "url(" +
                          setImageRoute(
                            bannerImages.bipocBannerData[1].imagePath 
                            ) +
                          ")",
                        // height: "100%",
                      }:{}}
              
                    ></div>
                  </Link>
    </div>
    <div className="bipoc2cols category w-100 h-100" style={{ position: "relative", marginTop: "10vh" }}>
    <div className="categoryinfo">
      <div className="w-dyn-list">
        <div role="list" className="collection-list-4 w-dyn-items">
          {blackArtist ?
            blackArtist.map((val, ind) =>
            val.ImageData.length > 0 ? (<div role="listitem" className="w-dyn-item">
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={"/artists/" + val.artistData._id}
                className="sidebarlink"
              >
                <div className="sidebarlink">{ val.artistData.firstname.toUpperCase()+ " " + val.artistData.lastname.toUpperCase() }</div>
                {/* <div className="text-block-5">{val.artistData.firstname.toUpperCase()  + " " + val.artistData.lastname.toUpperCase()}</div> */}
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
        <div className="mb-3 detail_card3_bipoc"  >
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
                to={"/artists/" + val.artistData._id}
                className="bipocLink"
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
  </div>
  );
}

export default BlackArtist;
