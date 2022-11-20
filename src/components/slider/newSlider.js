import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./slider.css";
import { setImageRoute } from "../../UserServices/Services";
import Header from "../layout/header";
import Navbar from "../layout/navbar";

const images = window.location.origin + "/assets/images";
export default function Slider(props) {
  
  const { location } = useHistory();
  const sm = "576";
  const md = "768";
  const lg = "992";
  const xl = "1200";
  const id = new Date().getTime();

  useEffect(() => {
    let slider = document.querySelector("#slideScroller" + id);
    let slideTotalAmount = 0;
    let slideDetail = getSliderSize(slider);
    let backBtn = document.querySelector("#left" + props.id);
    let nextBtn = document.querySelector("#right" + props.id);
    console.log(slideDetail)
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (slideTotalAmount > 0) {
          slideTotalAmount -= slideDetail.slideAmount;
        } else {
          slideTotalAmount = slideDetail.frameWidth - slideDetail.slideWidth;
        }
        slider.scrollLeft = slideTotalAmount;
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (
          slideDetail.frameWidth <=
          slideTotalAmount + slideDetail.slideWidth
        ) {
          slideTotalAmount = 0;
        } else {
          slideTotalAmount += slideDetail.slideAmount;
        }
        slider.scrollLeft = slideTotalAmount;
      });
    }
    
    let slider1 = null;
    if (!"disableAutoPlay" in props) {
      window.addEventListener(
        "focus",
        () =>
          (slider1 = setInterval(
            () => {
              if (
                slideDetail.frameWidth <=
                slideTotalAmount + slideDetail.slideWidth
              ) {
                slideTotalAmount = 0;
              } else {
                slideTotalAmount += slideDetail.slideAmount;
              }
              slider.scrollLeft = slideTotalAmount;
            },
            "interval" in props ? props.interval : 2000
          ))
      );
      window.addEventListener("blur", () => clearInterval(slider1));
    }
    
    window.addEventListener("resize", () => {
      slideDetail = getSliderSize(slider);
      slideTotalAmount = 0;
    });
    return () => {
      clearInterval(slider1);
    };
  }, []);
  
  const getSliderSize = (slider) => {
    let slideAmount = 0;
    slider.scrollLeft = 0;
    let slideWidth = slider.clientWidth;
    let frameWidth = slider.scrollWidth;
    let winSize = window.innerWidth;
    slideAmount = slideWidth;
    // if(lg < winSize){
    //     slideAmount = slideWidth/6
    // }
    // else if(md < winSize){
    //     slideAmount = slideWidth/4
    // }
    // else if(sm < winSize){
    //     slideAmount = slideWidth/3
    // }
    // else{
    //     slideAmount = slideWidth/2
    // }
    return { slideAmount, frameWidth, slideWidth };
  };
  
  return (
    <div
      className="slider"
      style={{
        width: "width" in props ? props.width : "100%",
        height: "height" in props ? props.height : "100%",
      }}
    >
      <div id={"slideScroller" + id} className="slideScroller h-100">
        <div className="slideContent h-100">{props.children}</div>
      </div>
      {"controllEnabled" in props ? (
        <>
          <button
            id={"id" in props ? "left" + props.id :"left" + id}
            className={
              props.controllEnabled === "outside-dark"
                ? "arrow2 left"
                : "arrow left"
            }
          >
            {location.pathname == "/bipoc" ? (
              <img
                src={images + "/bi_arrow-down-right-circle-fill2.svg"}
                loading="lazy"
                alt=""
                class="image-3"
              />
            ) : (
              <i className={"icon w-icon-slider-left"}></i>
            )}
          </button>
          <button
            id={"id" in props ? "right" + props.id :"right" + id}
            className={
              props.controllEnabled === "outside-dark"
                ? "arrow2 right"
                : "arrow right"
            }
          >
            {location.pathname == "/bipoc" ? (
              <img
                src={images + "/bi_arrow-down-right-circle-fill.svg"}
                loading="lazy"
                alt=""
                class="image-3"
              />
            ) : (
              <i className={"icon w-icon-slider-right"}></i>
            )}
          </button>
        </>
      ) : null}
    </div>
  );
} 

export function SliderItem(props) {
  return "src" in props ? (
    <div
      className={
        "col" in props ? props.col == "MOBILE" ? "col-12 p-0 slideItem" : props.col + " slideItem" : "col-12 p-0 slideItem"
      }
      style={{padding:1}}
    >
      <img
        onClick={() => ("onClick" in props ? props.onClick(props.src) : null)}
        src={props.src}
        alt=""
        style={
          "fillMode" in props
            ? {
                OObjectFit: props.fillMode,
                objectFit: props.fillMode,
              }
            : { OObjectFit: "cover", objectFit: "cover" }
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
  ) : null;
}