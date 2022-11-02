import React, { Children, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import Slider from "react-slick";
import "./slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = window.location.origin + "/assets/images";


export const SliderShow=  (props) => {

    const [slider,setSlider] = useState(null)

    useEffect(()=>{
      
      if(props.sliderIndex){
        {console.log(props.sliderIndex,slider)}
        if(slider){
          slider.slickGoTo(props.sliderIndex)
        }
      }
    },[props.sliderIndex,slider])

    return(
        <Slider  className="slider"
        style={{
          width: "width" in props ? props.width : "100%",
          height: "height" in props ? props.height : "100%",
        }}
        {...props.settings}
        ref={slider => setSlider(slider)}
        >
          {props.children}
        </Slider>
    )
};

export const SliderItems = (props)=>{
    return(
        <div  className={
          "col" in props ? props.col + " slideItemNew" : "slideItemNew"
        }
          style={{ padding: 1 }}
       >
          <img 
            onClick={() => ("onClick" in props ? props.onClick(props.src) : null)}
            src={props.src}
            alt=""
            style={
              "col" in props
                ? { OObjectFit: "cover", objectFit: "cover", margin:"auto",width:"100%",height:"100%" }
                : { OObjectFit: "cover", objectFit: "cover", margin:"auto" }
            }
          />
        </div>
    )
}

export function FullScreenSliderItem(props) {
  const { pages } = useParams();
  const history = useHistory()

  return (
    <>
      {/* <Header aciveBtn={pages} /> */}
      {/* <div className={"talentsection" + " wf-section "}>
        <div className={"containerhome "}> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="col-5 mt-4 ">
          <h2
            className="h2talent"
            style={{ marginBottom: "5px", width: "70%" }}
          >
            {props.currentData.title}
          </h2>
          <p className="mb-5">{props.currentData.pictureTitle[props.fullscreen.key]}</p>

          <p
            style={{ fontSize: "22px", fontWeight: 700 }}
            className="mb-0 pt-5"
          >
            Keywords
          </p>
          <div className="row mt-2">
            <div className="col-6">
              <div className="row">
                {props.currentData.keywordId.map((item, key) => (
                  <div className="col-4 mb-2">
                    <p
                      className="mb-0"
                      style={{ lineHeight: "1.5", textTransform: "lowercase" }}
                    >
                      {item.keyword}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center mt-5">
            {/* <div>
              <button
                className="text-uppercase"
                style={{
                  width: "7vw",
                  fontFamily: "'Roboto Condensed', sans-serif",
                  paddingTop: "1.1vh",
                  paddingBottom: "1.1vh",
                  borderRadius: "5px",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "0.7vw",
                  fontWeight: 600,
                }}
              >
                Learn More
              </button>
            </div> */}
            <div>
              <button
                className=" text-uppercase"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 400,
                  paddingTop: "0.5vh",
                  paddingBottom: "0.5vh",
                }}
              >
                <img
                  style={{ width: "50%" }}
                  src={images + "/Vector.svg"}
                  alt=""
                />
              </button>
            </div>
          </div>

          <p
            style={{ fontSize: "18px", fontWeight: 500, marginTop: "30vh" }}
            className="mb-0"
          >
            Want to commission this artist?
          </p>
          <div className="d-flex align-items-center mt-3">
            <div>
              <button
                className=" text-uppercase"
                style={{
                  width: "7vw",
                  fontFamily: "'Roboto Condensed', sans-serif",
                  paddingTop: "1.1vh",
                  paddingBottom: "1.1vh",
                  borderRadius: "5px",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "0.7vw",
                  fontWeight: 600,
                }}
              >
                call
              </button>
            </div>
            <div className="mx-3">
              <button
                className="text-uppercase"
                style={{
                  width: "7vw",
                  fontFamily: "'Roboto Condensed', sans-serif",
                  paddingTop: "1.1vh",
                  paddingBottom: "1.1vh",
                  borderRadius: "5px",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "0.7vw",
                  fontWeight: 600,
                }}
                onClick = {()=>history.push("/contact")}
                // href="http://localhost:3000/#/contact"
                // href="http://shannon-kidshannon.herokuapp.com/#/contact"
              >
                Get an estimated
              </button>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div
            onClick={() => props.onClick()}
            style={{
              position: "absolute",
              right: "2vw",
              top: "0%",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 352 512"
            >
              <path
                fill="grey"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              />
            </svg>
          </div>
          <div
            className={
              "col" in props ? props.col + " slideItem" : "col-12 p-0 slideItem"
            }
          >
            <img
              onClick={() => ("onClick" in props ? props.onClick() : null)}
              src={props.fullscreen.route}
              alt=""
              style={
                "fillMode" in props
                  ? { OObjectFit: props.fillMode, objectFit: props.fillMode }
                  : {
                      OObjectFit: "cover",
                      objectFit: "cover",
                      width: "90%",
                      marginTop: "20px",
                    }
              }
            />
            {"label" in props ? (
              <div
                className="w-100 text-center position-relative py-2"
                style={{
                  margin: "-30px 0 30px 0",
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                {props.label}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
