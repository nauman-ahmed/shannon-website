import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setImageRoute } from "../../UserServices/Services";
import { bannerLoader } from "../../redux/bannerImages";

const images = window.location.origin + "/assets/images";

function About() {

  const dispatch = useDispatch();
  const { bannerImages } = useSelector((state) => state);

  useEffect(() => {
    if(bannerImages.bipocBannerData.length == 0){
      dispatch(bannerLoader());
    }
  }, []);

  return (
    <>
      <h1 className="newsh2 hide">ABOUT SHANNON</h1>
      <div className="bipoc2cols mt-5">
        <Link 
          id="w-node-f29d90d7-09f6-7cad-9c63-f3e68a26341c-d6f2d062"
          to="#"
          className="artistcard bipoc set_height w-inline-block"
        >
          <img
            src={bannerImages.aboutBannerData.length > 0 ? bannerImages.aboutBannerData[0].imagePath : ""}
            loading="lazy"
            alt=""
            className="image bipoc "
          />
          <div className="artistnamediv">
            <div className="artistnametext-v2" style={{ lineHeight: '1', fontSize: '0.74vw' }}>ANNA &amp; ELENA BALBUSSO</div>
          </div>
        </Link>
        <div
          id="w-node-f29d90d7-09f6-7cad-9c63-f3e68a263421-d6f2d062"
          className="bipocinfo"
        >
          <h1 className="newsh2 h">ABOUT SHANNON</h1>
          <p className="paragraph">
              Shannon Associates is headquartered in New York City with clients around the globe. We are a premier creative management agency, serving the needs of professionals in publishing, advertising, entertainment, design, architecture, and tech.
            <br />
            <br />
              We represent a wide range of talent from contemporary to traditional, young breakouts to award-winning veterans. The unique creatives at Shannon reach across a wide spectrum of techniques and styles, specialties, and visions. From best-selling children’s books to global ads, movies to murals, from magazines to the latest virtual worlds, our group of top-talented individuals have their pulse on the ever-evolving culture of the creative economy.
            <br />
            <br />
              Their work speaks for itself, having been honored with every coveted award available in our fields of expertise.
            <br />
            <br />
              Our artists, illustrators, and authors are a representation of virtually every background, story, and region around the world. Shannon is made up of a diversity of talent with each artist bringing their unique voice and authentic touch to every client project. The selection of clients below demonstrates the variety of businesses that have entrusted their projects to Shannon Associates.
            <br />
            <br />
              Whether it the latest tech company or the most coveted fashion house. These companies, both large and small, have come to expect the best from our team.
            <br />
            <br />
              If you’d like more information about Shannon Associates or our team, please email or call anytime. It will be our honor to assist you.
          </p>
        </div>
      </div>
      <div className="clientscontainer desk">
        <h1 className="newsh2">CLIENTS WE WORK WITH</h1>
        <div className="logoscontainer">
          <div
            id="w-node-_2f7fb86f-d912-407d-6d1e-6a3520fdcdbd-d6f2d062"
            className="logo row1"
          ></div>
          <div
            id="w-node-d6cfdc68-d1ba-bb05-c5e7-4b336118c6ea-d6f2d062"
            className="logo row2"
          ></div>
          <div
            id="w-node-b239dcae-7dea-14f6-c5fb-25bb8c819939-d6f2d062"
            className="logo row3"
          ></div>
          <div
            id="w-node-fb3d240d-1dc4-b58f-3a10-8c25d0af7985-d6f2d062"
            className="logo row4"
          ></div>
          <div
            id="w-node-cc7c4bf8-8fd1-20b1-0a56-8b4cf6010f97-d6f2d062"
            className="logo row5"
          ></div>
          <div
            id="w-node-a077016f-ba11-54be-0b61-2471f02e0843-d6f2d062"
            className="logo row6"
          ></div>
          <div
            id="w-node-_529b55db-a881-2cf1-6a76-b14d081beac9-d6f2d062"
            className="logo row7"
          ></div>
          <div
            id="w-node-c8ea7bd0-b25a-215f-bea8-4d610e221a78-d6f2d062"
            className="logo row8"
          ></div>
          <div
            id="w-node-_8bc5f681-b1b1-8adb-873a-17c105806f54-d6f2d062"
            className="logo row9"
          ></div>
          <div
            id="w-node-_3360376d-9b1b-20a0-a2a9-ff4838b0a3a4-d6f2d062"
            className="logo row10"
          ></div>
          <div
            id="w-node-_03332b32-5156-5539-1889-f9d346582c1f-d6f2d062"
            className="logo row11"
          ></div>
          <div
            id="w-node-_40d4123d-692d-2c76-4b6e-76eac70c431f-d6f2d062"
            className="logo row12"
          ></div>
          <div
            id="w-node-_89b40009-9d6e-9be9-22ee-5b1917530cbc-d6f2d062"
            className="logo row13"
          ></div>
          <div
            id="w-node-_4fb6233d-83af-c76f-7c3a-41e68cd4fb67-d6f2d062"
            className="logo row14"
          ></div>
        </div>
      </div>
      <div className="clientscontainer resp">
        <h1 className="newsh2">CLIENTS WE WORK</h1>
        <div className="logoscontainer">
          <img src={images + "/Frame-60_1.png"} loading="lazy" alt="" /> 
          <img src={images + "/Frame-61_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-62_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-63_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-64_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-65_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-66_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-67_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-68_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-69_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-70_1.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-71.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-72.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-73.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-74.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-75.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-76.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-77.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-78.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-79.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-80.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-81.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-82.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-83.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-84.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-85.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-86.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-87.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-88.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-89.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-90.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-91.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-92.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-93.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-94.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-95.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-96.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-97.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-98.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-99.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-100.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-101.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-102.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-104.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-105.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-106.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-107.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-109.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-110.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-111.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-112.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-113.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-114.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-115.png"} loading="lazy" alt="" />
          <img src={images + "/Frame-116.png"} loading="lazy" alt="" />
          <img
            src={images + "/Frame-71.1.png"}
            loading="lazy"
            sizes="(max-width: 479px) 95vw, 100vw"
            srcSet="images/Frame-71.1-p-500.png 500w, images/Frame-71.1.png 629w"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default About;
