import React, {  useEffect, useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import "./admin.css"
import Header from '../../components/layout2/header'
import Sidebar from '../../components/layout2/sidebar'
import Main from '../../components/layout2/main'
import Dashboard from './dashboard'
import WebsiteAdmin from './websiteAdmin'
import Artists from './artists'
import ContactFormSubmissions from './contactFormSubmissions'
import ImgViewer from './imgDetail/imgViewer'
import Banners from './banners'
import Categories from './categories'
import {getContacts,getArtImages, getArtist} from '../../AxiosFunctions/Axiosfunctionality';
import { findCountOfReviewArtist,findCountOfArtistUsers } from '../../UserServices/Services'
import { DArtistUser, UArtistUser ,AArtistUser } from '../../AxiosFunctions/Axiosfunctionality'
import { useDispatch, useSelector } from 'react-redux'
import { updateMessage, updateOpen } from '../../redux/message'
import SnackbarCustom from '../../components/snackBar/SnackbarCustom';
import { setAuthToken } from '../../AxiosFunctions/setCommonHeader'

function Admin(props) {
    const dispatch = useDispatch();
    let history = useHistory();
    const [formNo, setFormNo] = useState(0)
    const {pageName} = useParams()
    const {imageId} = useParams()
    const [Contacts,setContacts] =useState([]); 
    const [artistImages,setArtistImages] =useState([]); 
    const [artistUsers,setArtistUsers] =useState([]); 
    const [reviewImagesCount,setReviewImagesCount] =useState(0); 
    const [reviewArtistCount,setReviewArtistCount] =useState(0); 
    const [holder,setHolder] =useState(false); 
    const [Uholder,setUHolder] =useState(false); 
    const populateContacts =()=>{
        let data = {};
        getContacts(data).then((res)=>{
            setContacts(res)
        })
    } 
    const populateArtistImages =()=>{
        let data = {};
        getArtImages(data).then((res)=>{
            setArtistImages(res)
            setReviewImagesCount(findCountOfReviewArtist(res));
        })
          
        
    }
    
    const populateArtistUsers =()=>{
        let data = {};
        getArtist(data).then((res)=>{
            setArtistUsers(res)
            setReviewArtistCount(findCountOfArtistUsers(res));
        })
    }
    const addArtistUser = (e,data)=>{
        if(data){
            setHolder(true)
            AArtistUser(data).then((res)=>{
                setHolder(false)
                dispatch(updateOpen(true))
                dispatch(updateMessage(res));
                populateArtistUsers();
                history.push('admin/dashboard');
                
            })
        }
    }


    const deleteArtistUser = (e,id)=>{
        if(id){
            let data = {
                id:id
            }
            DArtistUser(data).then((res)=>{

                dispatch(updateOpen(true))
                dispatch(updateMessage(res));
                populateArtistUsers();
            })
        }
    }
    const approveArtistUser = (e,id)=>{
        if(id){
            let data = {
                id:id
            }
            UArtistUser(data).then((res)=>{
                dispatch(updateOpen(true))
                dispatch(updateMessage(res));
                populateArtistUsers();
            })
        }
    }

    const contactViewMore = (id) => {

    }
    
    useEffect(() => {
        populateContacts();
        populateArtistImages();
        populateArtistUsers();

    }, [])



    return (
        <>
        <Header/>
        <SnackbarCustom  />
        <div className='admin d-flex m-0'>
            <Sidebar  setFormNo={setFormNo}  activePage={pageName}   />
            <Main>
                {!pageName || pageName === "dashboard"?
                <Dashboard 
                history={props.history}
                //Counts And small Stuff
                contactCount = {Contacts !== undefined ? Contacts.length:0}
                reviewImagesCount = {reviewImagesCount}
                reviewArtistCount = {reviewArtistCount}
                //All Mandatory Data
                contacts = {Contacts !== undefined ? Contacts:[]}
                artistImages = {artistImages !== undefined ? artistImages:[]}
                artistUsers = {artistUsers !== undefined ? artistUsers:[]}
                //functions for contact
                contactViewMore = {contactViewMore}
                //populate artist users
                populateArtistUsers={populateArtistUsers}
                //artist functionalities
                addArtistUser= {addArtistUser}
                deleteArtistUser = {deleteArtistUser}
                approveArtistUser = {approveArtistUser}

                holder={holder}
                formNo = {formNo}
                setFormNo={setFormNo} 

                />
                
                :pageName === "website_admin"?
                <WebsiteAdmin 
                    history={props.history}
                    formNo = {formNo}
                    setFormNo={setFormNo} 
                />
                :pageName === "artists"?
                    imageId?
                    <ImgViewer 
                    artistImages = {artistImages}
                    artistData = {artistUsers}
                    history={props.history}/>
                    :<Artists 
                    history={props.history}
                    artistUsers = {artistUsers}
                    populateArtistUsers = {populateArtistUsers}
                    deleteArtistUser = {deleteArtistUser}
                    approveArtistUser = {approveArtistUser}
                    formNo = {formNo}
                    setFormNo={setFormNo} 
                    />
                :pageName === "banners"?
                <Banners history={props.history}/>
                :pageName === "categories"?
                <Categories history={props.history}/>
                :pageName === "contact"?
                <ContactFormSubmissions  history={props.history}  
                    contacts = {Contacts !== undefined ? Contacts:[]}
                    populateContacts = {populateContacts}
                />
                :<Redirect to="/admin/"/>}
            </Main>

        </div>
    </>
  )
}

export default Admin