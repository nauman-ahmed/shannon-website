import React, { useState } from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../components/table/table'
import SearchIcon from "../../assets/svgs/searchImage.svg"
import "./admin.css"
import ImagesForReview from './dashboardPages/imagesForReview'
import AddNewArtist from './dashboardPages/addNewArtist'
import AccountCreationReq from './dashboardPages/accountCreationReq'
import Input from '../../components/input/input'


function Dashboard(props) {
     
    const [search, setSearch] = useState("")
    

   
  return (
    <div className='px-xl-5 mx-xl-5'>
        <div className='px-lg-3 py-4 mt-3 d-flex justify-content-between'>
        {/* <div className='mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex justify-content-between'> */}
            <h4>{
                props.formNo === 2? "IMAGES FOR REVIEW"
                :props.formNo === 3? "ADD A NEW ARTIST"
                :props.formNo === 4? "ACCOUNT CREATION REQUESTS"
                :"DASHBOARD"
            }</h4>
            {props.formNo === 2 || props.formNo === 4? 
                <Input
                type="search"
                label="Search"
                value={search}
                onChange={(e)=>console.log(e.target.value)}
                onClick={(e)=>console.log(e)}/>
            :null}
        </div>
        <div className={'row'+(props.formNo === 0 || props.formNo === 3?" p-lg-3":"")}>
        {/* <div className={'row'+(props.formNo === 0 || props.formNo === 3?" mx-lg-4 p-lg-5":"")}> */}
            {
            props.formNo === 2?
            <ImagesForReview
            holder={props.holder}
            artistImages = {props.artistImages}
            
            />:
            props.formNo === 3?
            <AddNewArtist
            holder={props.holder}
            addArtistUser = {props.addArtistUser}
            
            />:
            props.formNo === 4?
            <AccountCreationReq
                artistImages = {props.artistImages}
                artistUsers = {props.artistUsers}
                deleteArtistUser= {props.deleteArtistUser}
                approveArtistUser= {props.approveArtistUser}
                loading = {props.loading}
            />:
            <>
                <div className='col-md-6 mb-3'>
                    <div onClick={()=>props.history.push("/admin/contact")} className='dash_card color1 p-5'>
                        <h5>
                            CONTACT <br/>
                            FORM <br/>
                            SUBMISSIONS
                        </h5>
                        <h1>{props.contactCount}</h1>
                    </div>
                </div>
                <div className='col-md-6 mb-3'> 
                    <div onClick={()=>props.setFormNo(2)} className='dash_card color2 p-5'>
                        <h5>
                            IMAGES FOR <br/>
                            REVIEW
                        </h5>
                        <h1>{props.reviewImagesCount}</h1>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div onClick={()=>props.setFormNo(3)} className='dash_card color3 p-5 justify-content-center'>
                        <h5>ADD A NEW ARTIST</h5>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div onClick={()=>props.setFormNo(4)} className='dash_card color4 p-5'>
                        <h5>
                            ACCOUNT <br/>
                            CREATION <br/>
                            REQUESTS
                        </h5>
                        <h1>{props.reviewArtistCount}</h1>
                    </div>
                </div>
            </> 
            }
        </div>
    </div>
  )
}

export default Dashboard