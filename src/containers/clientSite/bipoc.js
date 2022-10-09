import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider, { SliderItem } from '../../components/slider/slider'
import {getBipocAsian, getBipocBlack, getBipocCentralAsia, getBipocIndigenous, getBipocLatino} from '../../AxiosFunctions/Axiosfunctionality';
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality'

const images = window.location.origin+"/assets/images"

function Bipoc() {


  const [blackArtist,setBlackArtist] = useState(null)
  const [asianArtist,setAsianArtist] = useState(null)
  const [latinoArtist,setLatinoArtist] = useState(null)
  const [centralAsianArtist,setCentralAsianArtist] = useState(null)
  const [indegiousArtist,setIndegiousArtist] = useState(null)

  useEffect(()=>{
    
    getBipocBlack().then((res)=>{
      setBlackArtist(res.slice(0,12))
    })
  
    getBipocAsian().then((res)=>{
      setAsianArtist(res)
    })
    
    getBipocLatino().then((res)=>{
      setLatinoArtist(res)
    })
    
    getBipocCentralAsia().then((res)=>{
      setCentralAsianArtist(res)
    })
    
    getBipocIndigenous().then((res)=>{
      setIndegiousArtist(res)
    })
  
  },[])



  return (
    <>
    <h1 className="newsh2 hide">BLACK + INDIGENOUS + PEOPLE OF COLOR</h1>
      <div className="bipoc2cols">
        <Link id="w-node-d7c7bef6-bf4c-3929-b7f7-7a0cd0fdac21-58f2d07a" to="#" className="artistcard bipoc w-inline-block"><img src={images+"/Rectangle-114.png"} loading="lazy" alt="" className="image bipoc"/>
          <div className="artistnamediv">
            <div className="artistnametext-v2">LONNIE OLLIVIERRE</div>
          </div>
        </Link>
        <div id="w-node-_85a7ddb0-1565-6609-f698-06fa7db97dd9-58f2d07a" className="bipocinfo">
          <h1 className="newsh2 h">BLACK + INDIGENOUS + PEOPLE OF COLOR</h1>
          <p className="paragraph">Shannon Associates is pleased to introduce the following illustrators in our continued commitment to the diversity of voices rising through art and authorship. <br/><br/>There is a world of illustration and stories that have yet to be told. Through our many years in the art industry we have been committed to realizing the full potential and talent of all available artists and illustrators. We are honored to bring these diverse voices, talents, and authorship to the industry. At Shannon Associates, we are committed to playing a bigger role by providing our clients access to 100% of the talent pool and supporting the communities that have been underrepresented in the commercial art world. <br/><br/>We are connecting with and supporting the efforts of artists within the BIPOC communities to partner with and promote full participation in the work. We will continue to work hard to make critical connections between clients and artists to share their stories and voices with this generation. <br/><br/>This is just the beginning as we continue to grow and learn. We are all better when we are all together.</p>
        </div>
      </div>
      <div className="row category mt-5" style={{maxWidth: "100%"}}>
        <div className="col-sm-4 col-12 d-sm-inline d-none">
          <h1 className="newsh2 h">BLACK ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              <div role="listitem" className="w-dyn-item">
                <div className="text-block-5"></div>
              </div>
            </div>
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
        </div>
        <div className="col-sm-8 col-12">
          <div className="divisiondivider grad">
            <h2 className="newsinstah2 h">PORTFOLIOS</h2>
            <h1 className="newsh2 hide">BLACK ARTISTS</h1>
          </div>
          {blackArtist?
            <div className='slider w-slider my-3'>
              <Slider disableAutoPlay controllEnabled="outside-dark">
                {blackArtist.map((val,ind)=>
                  <SliderItem label={val.artistData.firstname +" " + val.artistData.lastname} col="col-lg-4 col-md-6 col-12 px-md-4" src={val.ImageData[0].subImage[1].path}/>
                )}
              </Slider>
            </div>
            :
            null
          }
          <div data-delay="4000" data-animation="slide" className="slider w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true" id="w-node-_7202b053-0a45-14d3-0891-b0f77fc389d8-58f2d07a">
            </div>
        </div>
      </div>
      <div className="row category" style={{maxWidth: "100%"}}>
        <div className="col-sm-4 col-12 d-sm-inline d-none">
          <h1 className="newsh2 h">ASIAN ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              <div role="listitem" className="w-dyn-item">
                <div className="text-block-5"></div>
              </div>
            </div>
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
        </div>
        <div className="col-sm-8 col-12">
          <div className="divisiondivider grad">
            <h2 className="newsinstah2 h">PORTFOLIOS</h2>
            <h1 className="newsh2 hide">ASIAN ARTISTS</h1>
          </div>
          {asianArtist?
            <div className='slider w-slider my-3'>
              <Slider disableAutoPlay controllEnabled="outside-dark">
                {asianArtist.map((val,ind)=>
                  <SliderItem label={val.artistData.firstname +" " + val.artistData.lastname} col="col-lg-4 col-md-6 col-12 px-md-4" src={val.ImageData[0].subImage[1].path}/>
                )}
              </Slider>
            </div>
            :
            null
          }
        </div>
      </div>
      <div className="row category" style={{maxWidth: "100%"}}>
        <div className="col-sm-4 col-12 d-sm-inline d-none">
          <h1 className="newsh2 h">LATINO/LATINA ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              <div role="listitem" className="w-dyn-item">
                <div className="text-block-5"></div>
              </div>
            </div>
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
        </div>
        <div className="col-sm-8 col-12">
          <div className="divisiondivider grad">
            <h2 className="newsinstah2 h">PORTFOLIOS</h2>
            <h1 className="newsh2 hide">LATINO/LATINA ARTISTS</h1>
          </div>
          {latinoArtist?
            <div className='slider w-slider my-3'>
              <Slider disableAutoPlay controllEnabled="outside-dark">
                {latinoArtist.map((val,ind)=>
                  <SliderItem label={val.artistData.firstname +" " + val.artistData.lastname} col="col-lg-4 col-md-6 col-12 px-md-4" src={val.ImageData[0].subImage[1].path}/>
                )}
              </Slider>
            </div>
            :
            null
          }
        </div>
      </div>
      <div className="row category" style={{maxWidth: "100%"}}>
        <div className="col-sm-4 col-12 d-sm-inline d-none">
          <h1 className="newsh2 h">CENTRAL ASIAN ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              <div role="listitem" className="w-dyn-item">
                <div className="text-block-5"></div>
              </div>
            </div>
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
        </div>
        <div className="col-sm-8 col-12">
          <div className="divisiondivider grad">
            <h2 className="newsinstah2 h">PORTFOLIOS</h2>
            <h1 className="newsh2 hide">CENTRAL ASIAN ARTISTS</h1>
          </div>
          {centralAsianArtist?
            <div className='slider w-slider my-3'>
              <Slider disableAutoPlay controllEnabled="outside-dark">
                {centralAsianArtist.map((val,ind)=>
                  <SliderItem label={val.artistData.firstname +" " + val.artistData.lastname} col="col-lg-4 col-md-6 col-12 px-md-4" src={val.ImageData[0].subImage[1].path}/>
                )}
              </Slider>
            </div>
            :
            null
          }
        </div>
      </div>
      <div className="row category" style={{maxWidth: "100%"}}>
        <div className="col-sm-4 col-12 d-sm-inline d-none">
          <h1 className="newsh2 h">INDIGENOUS ARTISTS</h1>
          <div className="w-dyn-list">
            <div role="list" className="collection-list-4 w-dyn-items">
              <div role="listitem" className="w-dyn-item">
                <div className="text-block-5"></div>
              </div>
            </div>
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
        </div>
        <div className="col-sm-8 col-12">
          <div className="divisiondivider grad">
            <h2 className="newsinstah2 h">PORTFOLIOS</h2>
            <h1 className="newsh2 hide">INDIGENOUS ARTISTS</h1>
          </div>
          {indegiousArtist?
            <div className='slider w-slider my-3'>
              <Slider disableAutoPlay controllEnabled="outside-dark">
                {indegiousArtist.map((val,ind)=>
                  <SliderItem label={val.artistData.firstname +" " + val.artistData.lastname} col="col-lg-4 col-md-6 col-12 px-md-4" src={val.ImageData[0].subImage[1].path}/>
                )}
              </Slider>
            </div>
            :
            null
          }
        </div>
      </div>
    </>
  )
}

export default Bipoc