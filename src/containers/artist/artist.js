import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./artist.css"
import Header from '../../components/layout2/header'
import AddImage from "../../assets/svgs/addImage.svg"
import { useDispatch,useSelector } from 'react-redux'
import { artistImageDataApi, storeUploadedImage } from '../../redux/artistSlice' 
import { keywordDataApi } from '../../redux/keywordSlice' 
import { decodeToken } from "react-jwt";
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality'


// const img1 = window.location.origin+"/assets/images/IMG1.png"
// const img2 = window.location.origin+"/assets/images/IMG2.png"
// const img3 = window.location.origin+"/assets/images/IMG3.png"
// const img4 = window.location.origin+"/assets/images/IMG4.png"
// const img5 = window.location.origin+"/assets/images/IMG5.png"
// const img6 = window.location.origin+"/assets/images/IMG6.png"
// const img7 = window.location.origin+"/assets/images/IMG7.png"
// const img8 = window.location.origin+"/assets/images/IMG8.png"
// const img9 = window.location.origin+"/assets/images/IMG9.png"
// const img10 = window.location.origin+"/assets/images/IMG10.png"
// const img11 = window.location.origin+"/assets/images/IMG11.png"

function Artist() {
    
    let history = useHistory()

    const dispatch = useDispatch();
    const { artistReducer } = useSelector( state => state )
    const [artistDetails,setArtistDetails] = useState(null)

    const changePageHandler = (e) => {
        let name = e.target.name
        let value = e.target.files[0]
        
        dispatch(storeUploadedImage({ name, value }))
        history.push({
            pathname:'/artist/image_uploading',
            state: { name, value }
        })
    }

    useEffect(()=>{
        
        let storageData = localStorage.getItem("authorization")
        let details = decodeToken(storageData)
        try {
            dispatch(keywordDataApi())
            dispatch(artistImageDataApi({artistId:details._id}))
        } catch (error) {
            console.log('Causing Error in Dispatch',artistReducer)            
        }
        setArtistDetails(details)

    },[])
    

    return (
    <>
        <Header/>
        <div className='px-1 px-md-5 artist'>
            <div className='profile'>
                <div className='profilePic'></div>
                <h3 className='mb-5'>{artistDetails ?  artistDetails.firstname : "...loading"}</h3>
                <h6 className='mt-5'>SUBMIT IMAGES</h6>
            </div>
            <div className='row m-0'>
                <label className='col-6 col-lg-2 col-md-3 col-sm-4 m-0 artistcard w-inline-block addImageBtn'>
                    <img alt='' src={AddImage} className="addImage"/>
                    <input hidden type="file" onChange={(e)=>changePageHandler(e)}/>
                </label>
                {artistReducer.savedImages !== null && 
                    artistReducer.length > 0 &&
                    artistReducer[0].mainImage.map((val,ind)=>
                        <div className='col-6 col-lg-2 col-md-3 col-sm-4 artistcard' key={ind}>
                            <img alt='' src={val.path} className="image"/>
                        </div>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default Artist