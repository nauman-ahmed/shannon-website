import React, { useCallback, useEffect, useState } from 'react'
import { findSingleContact } from '../../UserServices/Services'
import "./admin.css"
import CFSList from './cfsPages/cfsList'
import CFSViewMore from './cfsPages/cfsViewMore'

function ContactFormSubmissions(props) {
    const [formNo, setFormNo] = useState(0)
    const [contactId,setContactId] =useState(""); 
    useEffect(()=>{
        props.populateContacts();
    },[formNo, props])
  return (
    <div className='px-xl-5 mx-xl-5'>
        {/* <h4 className='mx-lg-5 px-lg-5 py-4 mt-3 ml-5'>{
            "CONTACT FORM SUBMISSIONS"
        }</h4> */}
        <h4 className='py-4 mt-3'>{
            "CONTACT FORM SUBMISSIONS"
        }</h4>
        <div className={'row'+(formNo === 1?" mx-lg-4 p-lg-5":"")}>
            {
            formNo === 1?
            <CFSViewMore  
            contacts = {props.contacts}
            setFormNo={(e)=>setFormNo(e)}
            contactId = {contactId}
            />:
            <div className='col'>
                <CFSList
                contacts = {props.contacts}
                setFormNo={(e)=>setFormNo(e)}
                setContactId = {setContactId}
                
                />
            </div>
            }
        </div>
    </div>
  )
}

export default ContactFormSubmissions