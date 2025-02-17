import React, { useEffect, useState } from 'react'
import { updateSingleContact } from '../../../AxiosFunctions/Axiosfunctionality';
import { findSingleContact } from '../../../UserServices/Services';
import {updateMessage, updateOpen} from '../../../redux/message';
import { useDispatch } from 'react-redux';


function CFSViewMore(props) {
    const dispatch = useDispatch();
    const [singleContact,setSingleContact] = useState({});
    const [message,setMessage] = useState("");
    const updateContact = ()=>{
        if(Object.keys(singleContact).length !== 0){
            let data = {
                id:singleContact._id,
                message:message
            }
            updateSingleContact(data).then((res)=>{
                dispatch(updateOpen(res));
                dispatch(updateMessage(res));
            });
        }
    }
    const extractArtist=(item)=>{
        let combine = "";
        item.artistId.forEach((artist,key)=>{
            combine += artist.lastname+" "+artist.firstname+",";
        })
        return combine;
    }
    useEffect(() => {
        let singleContact = findSingleContact(props.contacts,props.contactId);
        setSingleContact(singleContact);
        setMessage(singleContact.message);
    }, [])

    const handleDownload = () => {
        const filePath = singleContact.path; // Replace with the actual file path
        const fileName = "Reference Image "+ new Date() +" .png"; // Replace with the desired file name
    
        const anchor = document.createElement('a');
        anchor.href = filePath;
        anchor.download = fileName;
        anchor.style.display = 'none';
    
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      };

    return (
       
       <>
       {Object.keys(singleContact).length !== 0 ? 
            <>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>Name*:</span>
                    <input className='textField' value={singleContact.Name} readOnly/>
                </label>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>Company:</span>
                    <input className='textField' value={singleContact.company} readOnly/>
                </label>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>Email*:</span>
                    <input type="email" className='textField' value={singleContact.email} readOnly/>
                </label>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>Phone:</span>
                    <input className='textField' value={singleContact.phone} readOnly/>
                </label>
                {/* <label className='col-md-12 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>Address:</span>
                    <input className='textField' value={singleContact.address} readOnly/>
                </label>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>City:</span>
                    <input className='textField' value={singleContact.city} readOnly/>
                </label>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>State:</span>
                    <input className='textField' value={singleContact.state} readOnly/>
                </label> */}
                <label className='col-md-12 d-flex'>
                    <span className='py-2' style={{ minWidth: 100 }}>Intrested In:</span>
                    <input className='textField' value={extractArtist(singleContact)} readOnly/>
                </label>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 150 }}>How did you find us?:</span>
                    <input className='textField' value={singleContact.findUs} readOnly/>
                </label>
                <label className='col-md-6 d-flex'>
                    <span className='py-2' style={{ minWidth: 150 }}>Purpose of inquiry:</span>
                    <input className='textField' value={singleContact.purposeOfInquiry} readOnly/>
                </label>
                {
                    singleContact.purposeOfInquiry === 'Looking for representation'?
                    <label className='col-md-6 d-flex'>
                        <span className='py-2' style={{ minWidth: 150 }}>Website:</span>
                        <input className='textField' value={singleContact.website} readOnly/>
                    </label>
                    :null
                }
                <label className='col-md-12 d-flex'>
                    <span className='py-2' style={{ minWidth: 70 }}>Message:</span>
                    <textarea className='textField' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                </label>
                {singleContact.path !== "" ?
                    <label className='col-md-12'>
                        <span className='py-2' style={{ minWidth: 70 }}>Sample Image:</span>
                        <button onClick={handleDownload} className="mx-1 myBtn active sm">Download File</button>
                        <div className='my-5'>
                            <img
                                src={singleContact.path}
                                style={{ width:"25%" }}
                            />   
                        </div>
                    </label>
                    : 
                    null
                }
                <div className='col-12 d-flex justify-content-end'>
                    {singleContact.status===0?<button className='mx-1 myBtn active sm' onClick={() => {props.setFormNo(0);updateContact(singleContact._id)}}>REVIEWED</button>:<button className='mx-1 myBtn active sm' onClick={() => {props.setFormNo(0);}}>Back</button>}
                </div>
            </>
 :
<div></div>} 
            </>
   
       
    )
}

export default CFSViewMore