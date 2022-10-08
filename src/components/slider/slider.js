import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./slider.css"
import { setImageRoute } from '../../UserServices/Services';

const images = window.location.origin+"/assets/images"
export default function Slider(props) {

    const {location} = useHistory()
    const sm= "576"; const md= "768"; const lg= "992"; const xl= "1200";
    const id = new Date().getTime();
    useEffect(() => {
        let slider = document.querySelector('#slideScroller'+id)
        let slideTotalAmount = 0
        let slideDetail =  getSliderSize(slider)
        let backBtn = document.querySelector('#left'+id)
        let nextBtn = document.querySelector('#right'+id)
        if(backBtn){
            backBtn.addEventListener("click",()=>{
                if(slideTotalAmount > 0){
                    slideTotalAmount -= slideDetail.slideAmount
                }else{
                    slideTotalAmount = slideDetail.frameWidth-slideDetail.slideWidth
                }
                slider.scrollLeft = slideTotalAmount
            })
        }
        if(nextBtn){
            nextBtn.addEventListener("click",()=>{
                if(slideDetail.frameWidth <= slideTotalAmount+slideDetail.slideWidth){
                    slideTotalAmount = 0
                }else{
                    slideTotalAmount += slideDetail.slideAmount
                }
                slider.scrollLeft = slideTotalAmount
            })
        }
        let slider1 = null
        if(!"disableAutoPlay" in props){
            window.addEventListener('focus', ()=>
                slider1 = setInterval(() => {
                    if(slideDetail.frameWidth <= slideTotalAmount+slideDetail.slideWidth){
                        slideTotalAmount = 0
                    }else{
                        slideTotalAmount += slideDetail.slideAmount
                    }
                    slider.scrollLeft = slideTotalAmount
                }, "interval" in props?props.interval:2000)
            );
            window.addEventListener('blur', ()=>clearInterval(slider1));
        }
        window.addEventListener("resize",()=>{
            slideDetail = getSliderSize(slider)
            slideTotalAmount = 0;
        })
        return(()=>{
            clearInterval(slider1)
        })
    }, [])
    const getSliderSize = (slider) => {
        let slideAmount = 0
        slider.scrollLeft = 0
        let slideWidth = slider.clientWidth
        let frameWidth = slider.scrollWidth
        let winSize = window.innerWidth
        slideAmount = slideWidth
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
        return {slideAmount,frameWidth,slideWidth}
    }
  return (
    <div className='slider' style={{
        width:"width" in props?props.width:"100%",
        height:"height" in props?props.height:"100%",
    }}>
        <div id={"slideScroller"+id} className='slideScroller h-100'>
            <div className='slideContent h-100'>
                {props.children}
            </div>
        </div>
        {"controllEnabled" in props? 
        <>
            <button id={"left"+id} className={props.controllEnabled === "outside-dark"? 'arrow2 left' : 'arrow left'}>
                {location.pathname == "/bipoc"?
                <img src={images+"/bi_arrow-down-right-circle-fill2.svg"} loading="lazy" alt="" class="image-3"/>
                :
                <i className={'icon w-icon-slider-left'}></i>
            }
            </button>
            <button id={"right"+id} className={props.controllEnabled === "outside-dark"? 'arrow2 right' : 'arrow right'}>
            {location.pathname == "/bipoc"?
                <img src={images+"/bi_arrow-down-right-circle-fill.svg"} loading="lazy" alt="" class="image-3"/>
                :
                <i className={'icon w-icon-slider-right'}></i>
            }
            </button>
        </>
        :null}
    </div>
  )
}
export function SliderItem(props) {
  return (
    "src" in props?
    <div className={"col" in props?props.col+' slideItem':'col-12 p-0 slideItem'}>
        <img onClick={()=>"onClick" in props? props.onClick(props.src) :null} src={props.src} alt='' style={"fillMode" in props?{OObjectFit: props.fillMode,objectFit: props.fillMode}:{OObjectFit: "cover",objectFit: "cover"}}/>
        {"label" in props? 
        <div className='w-100 text-center position-relative py-2' style={{margin: "-30px 0 30px 0",backgroundColor:'rgba(255,255,255,0.8)'}}>
            {props.label}
        </div>:null}
    </div>
    :null
  )
}

export function FullScreenSliderItem(props) {
  console.log(props.currentData)
    return (
        <><div onClick={()=>props.onClick()} style={{position:'absolute',right:'20px',top:"20px",cursor:'pointer',zIndex:1}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 352 512"><path fill="grey" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
        </div>
        <div className="col-6 mt-5 pl-md-3 ml-md-5">
    <h2 className="" style={{ borderBottom: "4px solid black" }}>
      {props.currentData.title}
    </h2>
    <small>Baby Alpaca Children's Book</small>

    <p style={{ fontSize: "22px", fontWeight: 700 }} className="mb-0 mt-5">
      Tabs
    </p>
    <div className="row mt-2">
      <div className="col-6">
        <div className="row">
         {props.currentData.keywordId.map((item,key)=>(
          <div className="col-4 mb-2">
            <p className="mb-0">{item.keyword}</p>
          </div>
         ))}
          
        </div>
      </div>
    </div>
    <div className="d-flex align-items-center mt-3">
      <div>
        <button
          className="px-3 py-2 text-uppercase"
          style={{
            borderRadius: "5px",
            backgroundColor: "black",
            color: "white",
            fontSize: '18px',
            fontWeight: 400
          }}
        >
          Learn More
        </button>
      </div>
      <div className="mx-3">
        <button
          className="px-3 py-2 text-uppercase"
          style={{
            borderRadius: "5px",
            backgroundColor: "black",
            color: "white",
            fontSize: '18px',
            fontWeight: 400
          }}
        >
          <img className="w-75" src={images+"/Vector.svg"} alt="" />
        </button>
      </div>
    </div>

    <p style={{ fontSize: "18px", fontWeight: 500 }} className="mb-0 mt-5">
      Want to commission this artist?
    </p>
    <div className="d-flex align-items-center mt-3">
      <div>
        <button
          className="px-3 py-2 text-uppercase"
          style={{
            borderRadius: "5px",
            backgroundColor: "black",
            color: "white",
            fontSize: '18px',
            fontWeight: 400
          }}
        >
          call
        </button>
      </div>
      <div className="mx-3">
        <button
          className="px-3 py-2 text-uppercase"
          style={{
            borderRadius: "5px",
            backgroundColor: "black",
            color: "white",
            fontSize: '18px',
            fontWeight: 400
          }}
        >
          Get estimated
        </button>
      </div>
    </div>
  </div>
  <div className="col-6">
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
  </div>
        </>    )
  }