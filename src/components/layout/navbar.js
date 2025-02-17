import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) { 

  const { AddToCart } = useSelector((state) => state);

  const pageIllustration = ['kidshannon','photography','bipoc','black','medical','motion','categories','newest','recentlyUpdated','about','contact'];

  const localStorageAddToCart = () => {
    let addToCartArray = []
    Object.keys(AddToCart.cartInfo).map((oneKey, i) => {
      if(oneKey !== "messageShow" && oneKey !== "count" && oneKey !== "getAnEstimate" ){
        addToCartArray.push(AddToCart.cartInfo[oneKey])
      }
    })
    if(addToCartArray.length > 0){
      localStorage.setItem('addToCart',JSON.stringify(addToCartArray))
    }else{
      localStorage.removeItem('addToCart')
    }
  }
 
  return (  
    <div>
      <div>
        <div className="div-block-11 w-100 ">
          <div className='mobileViewNavbar'>
            <div className='w-100 d-flex flex-wrap justify-content-center '>
              <Link to="/illustration-artists" className={"filterhomelink v2 " + (props.aciveBtn === "illustration-artists"? "w--current" : "")}>ILLUSTRATION</Link>
              <a href="https://kidshannon.com" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")} onClick={()=>localStorageAddToCart()}>KIDSHANNON</a> 
              <Link to="/photography" className={"filterhomelink v2 " + (props.aciveBtn === "photography" ? "w--current" : "")}>PHOTOGRAPHY</Link>
              <Link to="/bipoc" className={"filterhomelink v2 " + (props.aciveBtn === "bipoc" ? "w--current" : "")}>BIPOC</Link>
              <Link to="/bipoc/black" className={"filterhomelink v2 " + (props.aciveBtn === "black" ? "w--current" : "")}>BLACK</Link>
              {/* <Link to="/cgi" className={"filterhomelink v2 " + (props.aciveBtn === "cgi" ? "w--current" : "")}>CGI</Link> */}
              <Link to="/medical" className={"filterhomelink v2 " + (props.aciveBtn === "medical" ? "w--current" : "")}>MEDICAL</Link>
              <Link to="/motion" className={"filterhomelink v2 " + (props.aciveBtn === "motion" ? "w--current" : "")}>MOTION</Link>
              <Link to="/graphicNovel" className={"filterhomelink v2 " + (props.aciveBtn === "graphicNovel" || props.currentCat == "GraphicNovel" ? "w--current" : "")}>GRAPHIC NOVEL</Link>
            </div>

            {props.searchBar && props.aciveBtn == undefined?
              <div className="form-block-2 search">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2"> 
                  <input onChange={(e) => { props.updateTempArtist(e) }} value={props.searchArtist} type="text" className="searchbarhome w-input" maxLength="256" name="Search" data-name="Search" placeholder="SEARCH" id="Search" />
                  <Link to="#" className="link-block-3 w-inline-block"></Link>
                </form>
              </div> : null}
          </div> 
        </div>
      </div >
 
      <div className='fullViewNavbar'>
        <div className="filterhomebox v2">
          <Link to="/illustration-artists" className={"filterhomelink v2 " + (props.aciveBtn === "illustration-artists" || props.currentCat == "Illustration" || props.currentCat == "Illustration-artists" ? "w--current" : "")}>ILLUSTRATION</Link>
          {/* <a href="http://localhost:3001/" target="_blank" className={"filterhomelink v2 "+(props.aciveBtn === "kidshannon"?"w--current":"")}>KIDSHANNON</a> */}
          <a href="https://kidshannon.com" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")} onClick={()=>localStorageAddToCart()}>KIDSHANNON</a>
          <Link to="/photography" className={"filterhomelink v2 " + (props.aciveBtn === "photography" || props.currentCat == "Photography" ? "w--current" : "")}>PHOTOGRAPHY</Link>
          <div className='navbarBipocLink'>
            {/* <Link to="/bipoc" className={"filterhomelink v2 d-flex " + (props.aciveBtn === "bipoc" ? "w--current" : "")}>BIPOC <span className='bipocSpan'></span> </Link> */}
            <Link to="/bipoc" className={"filterhomelink v2 d-flex " + (props.aciveBtn === "bipoc" || (props.currentBi !== "none" && props.currentBi !== null) ? "w--current" : "")}>BIPOC </Link>
            <div className='navbarBipocItemsLink'>
              <Link to="/bipoc/black" className={"filterhomelink v2 mb-3 " + (props.currentBi === "Black" ? "w--current" : "")}>BLACK</Link>
              <Link to="/bipoc/asianArtist" className={"filterhomelink v2 mb-3 " + (props.currentBi === "AsianArtist" ? "w--current" : "")}>ASIAN</Link>
              <Link to="/bipoc/latinoArtist" className={"filterhomelink v2 mb-3 " + (props.currentBi === "LatinoArtist" ? "w--current" : "")}>LATINO/LATINA</Link>
              <Link to="/bipoc/centralAsianArtist" className={"filterhomelink v2 mb-3 " + (props.currentBi === "CentralAsianArtist" ? "w--current" : "")}>CENTRAL ASIAN</Link>
              <Link to="/bipoc/indigenousArtist" className={"filterhomelink v2 mb-1 " + (props.currentBi === "IndigenousArtist" ? "w--current" : "")}>INDIGENOUS</Link>
            </div>
          </div>
          <Link to="/medical" className={"filterhomelink v2 " + (props.aciveBtn === "medical" || props.currentCat == "Medical" ? "w--current" : "")}>MEDICAL</Link>
          {/* <Link to="/cgi" className={"filterhomelink v2 " + (props.aciveBtn === "cgi" ? "w--current" : "")}>CGI</Link> */}
          <Link to="/motion" className={"filterhomelink v2 " + (props.aciveBtn === "motion" || props.currentCat == "Motion" ? "w--current" : "")}>MOTION</Link>
          <Link to="/graphicNovel" className={"filterhomelink v2 " + (props.aciveBtn === "graphicNovel" || props.currentCat == "GraphicNovel" ? "w--current" : "")}>GRAPHIC NOVEL</Link>
          <Link className= "navbarDot"> · </Link>
          <Link to="/newest" className={"filterhomelink v2 mb-3 " + (props.aciveBtn === "newest" ? " w--current undelinedNavbar" : "")} > NEW </Link>
          <Link to="/recentlyUpdated" className={"filterhomelink v2 mb-3 " + (props.aciveBtn === "recentlyUpdated" ? "w--current" : "")} > UPDATED </Link>

          {
            props.searchBar ?
              <div className="form-block-2" style={{ marginLeft: "auto" }}>
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2">
                  <input onChange={(e) => { props.updateTempArtist(e) }} type="text" value={props.searchArtist} className="searchbarhome w-input" maxLength="256" name="Search" data-name="Search" placeholder="SEARCH" id="Search" />
                  <Link to="#" className="link-block-3 w-inline-block"></Link>
                </form>
              </div> : null 
          }
        </div>
      </div>
    </div >
  )  
}

export default Navbar