import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./layout2.css"
import { decodeToken } from "react-jwt";

function Sidebar(props) {

    const [adminDetails, setAdminDetails] = useState(null)

    let side_toggle = false;
    const activePage = props.activePage
    const sidebar_display = () => {
        let sideBar = document.getElementsByClassName("sideBar")[0]
        let sideBar_menubtn = document.getElementsByClassName("sideBar_menubtn")[0]
        if(side_toggle){
            sideBar.classList.add("d-none");
            sideBar_menubtn.style.transform = "rotate(-90deg) translateY(0px)"
            sideBar_menubtn.innerHTML = "|||"
        }else{
            sideBar.classList.remove("d-none")
            sideBar_menubtn.style.transform = "rotate(-90deg) translateY(230px)"
            sideBar_menubtn.innerHTML = "\&times;"
        }
        side_toggle =! side_toggle
    }

    useEffect(()=>{
        let storageData = localStorage.getItem("authorization")
        let details = decodeToken(storageData)
        setAdminDetails(details)
    },[])

    return (
    <>
        <button onClick={()=>sidebar_display()} className='sideBar_menubtn d-md-none d-inline'>|||</button>
        <div className='sideBar d-md-inline d-none'>
            <div className='sidebar_header px-5 py-4'>
                <div className='profileDet'>
                    <h5>
                        SUPER ADMIN
                    </h5>
                    <small>ADMINISTRATOR</small>
                </div>
            </div> 
            <div className='sidebar_body pl-5 pt-4'>
                <Link className={'my-2 '+(!activePage || activePage === "dashboard"?"active":"")} to="/admin/dashboard" onClick={()=>{props.setFormNo(0)}}>Dashboard</Link>
                <Link className={'my-2 '+(activePage === "website_admin"?"active":"")} to="/admin/website_admin">Website Administrator</Link>
                <Link className={'my-2 '+(activePage === "artists"?"active":"")} to="/admin/artists" onClick={()=>{props.setFormNo(0)}}>Artists</Link>
                <Link className={'my-2 '+(activePage === "banners"?"active":"")} to="/admin/banners">Banners</Link>
                <Link className={'my-2 '+(activePage === "content"?"active":"")} to="/admin/content">Content</Link>
                <Link className={'my-2 '+(activePage === "categories"?"active":"")} to="/admin/categories">Categories</Link>
                <Link className={'my-2 '+(activePage === "contact"?"active":"")} to="/admin/contact">Contact Form Submissions</Link>
            </div>
        </div>
    </>
  )
}

export default Sidebar