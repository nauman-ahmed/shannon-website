import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getGraphicCovers,
  getGraphicSequential,
  getGraphicInking,
  getGraphicColoring,
  getGraphicLettering,
  getBipocAsian,
  getBipocBlack,
  getBipocCentralAsia,
  getBipocIndigenous,
  getBipocLatino,
} from "../../AxiosFunctions/Axiosfunctionality";
import { bannerLoader } from "../../redux/bannerImages";


import POSTER_IMAGE from '../../assets/img/1699586657881--originalImage.jpg';

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
  const [graphicNovel, setGraphicNovel] = useState(null);
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

    getGraphicCovers().then((res) => {
      let temp = []
      for (let index = 0; index < res.length; index++) {
        let orderedArtist = res[index].data?.sort((a, b) => {
          if(a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize()) === 0){
            return a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize())
          }else{
            return a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize());
          }
        });
        temp.push({
          cat:res[index].cat,
          data:orderedArtist
        })
      }
      setGraphicNovel(temp)
    });

    setGottenData(true)
  }, []);

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

  const storeGraphicCat = (cat) => {
    let lower = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()
    const route = [{val:"Home",link:"./"},{val:"Graphic Novel",link:"./graphicNovel"},{val:lower,link:"./graphicNovel"}]
   
    localStorage.setItem("routePaths",JSON.stringify(route))
    localStorage.setItem("Category",cat)
    localStorage.setItem("graphicNovel",cat)
    localStorage.removeItem("Bipoc")
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
            src={POSTER_IMAGE}
            loading="lazy"
            alt=""
            className="image bipoc"
          />
        </Link>
        <div
          id="w-node-_85a7ddb0-1565-6609-f698-06fa7db97dd9-58f2d07a"
          className="bipocinfo ml-md-5 pl-md-5"
        >
          <h1 className="newsh2 h">GRAPHIC NOVEL</h1>
          <p className="paragraph">
            Welcome to our curated world of graphic novel artists, where imagination knows no bounds! In Shannon Associates, we take pride in representing a diverse and talented array of artists who breathe life into the captivating realm of graphic novels. Our portfolio showcases the brilliance of storytellers who seamlessly blend artistry with narrative, bringing forth compelling tales that transcend traditional boundaries. From intricately detailed character designs to sweeping, cinematic landscapes, our artists wield their pens and brushes to craft visually stunning worlds that invite readers to embark on unforgettable journeys. Whether you're an author seeking the perfect collaborator or a publisher in search of fresh, innovative voices, our illustrator agency is your gateway to a vibrant community of creators pushing the boundaries of graphic storytelling. Join us in celebrating the power of visual narrative as we connect you with the visionary artists shaping the future of the graphic novel landscape.
          </p>
        </div>
      </div>
      {
        graphicNovel ?
          graphicNovel.map((obj,index) => 
            <div className="bipoc2cols category w-100" style={{ position: "relative", marginTop: "10vh" }}>
              <div className="categoryinfo">
                <Link style={{ textDecoration: "none" }} to={"#"}><h2 className="bipocTitle" >{obj.cat}</h2></Link>
                <div className="w-dyn-list">
                  <div role="list" className="collection-list-4 w-dyn-items">
                    {
                      obj.data.map((val, ind) =>
                      val.mainImage.length > 0 ? (<div role="listitem" className="w-dyn-item">
                        <Link
                          id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                          data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                          to={val.artistId.fullName}
                          className="sidebarlink"
                          onClick={()=>storeGraphicCat(obj.cat)}
                        >
                          <div className="sidebarlink">{ val.artistId.firstname.toUpperCase()+ " " + val.artistId.lastname.toUpperCase() }</div>
                          </Link>
                      </div>): null)
                    }
                  </div>
                </div>
              </div>
              <div className="sliderbipoc">
                {
                  <div className="mb-3 detail_card3_bipoc" id={idBlack} >
                    {obj.data.map((val, ind) =>
                      val.mainImage.length > 0 ? (
                        <Link
                          id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                          data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                          to={val.artistId.fullName}
                          className="bipocLink"
                          onClick={()=>storeGraphicCat(obj.cat)}
                        >
                          <div className=" card_img2 detail_card3_h" style={{ position: "relative",   overflow:"hidden",}}>
                            <img src={val.mainImage[0].subImage[0].path} val={val} className="h-100 w-100" ></img>
                            <p className="p-1 card_img_text" >{val.artistId.firstname  + " " +val.artistId.lastname}</p>
                          </div>
                        </Link>
                      )
                        : null
                    )}
                  </div>
                }
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
        )
        :null
      }
    </>
  );
}

export default Bipoc;
