import React from 'react';
import { useState } from 'react';
import loading from '../../../assets/loading.gif';
function AddNewArtist(props) {
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [state,setState] = useState("");
    const [city,setCity] = useState("");
    const [address,setAddress] = useState("");
    
    
    return (
        <>
            <label className='col-md-6'>
                <div>Name</div>
                <input className='textField' value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} />
            </label>
            <label className='col-md-6'>
                <div>Last Name</div>
                <input className='textField'  value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div>Email</div>
                <input type="email" className='textField'  value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </label>
            <label className='col-md-12'>
                <div>Address</div>
                <input className='textField'  value={address} onChange={(e)=>{setAddress(e.target.value)}} />
            </label>
            <label className='col-md-6'>
                <div>City</div>
                <select className='textField'  value={city} onChange={(e)=>{setCity(e.target.value)}}>
                    <option></option>
                    <option value="karachi">karachi</option>
                    <option value="islamabad">islamabad</option>
                    <option value="lahore">lahore</option>
                    
                </select>
            </label>
            <label className='col-md-6'>
                <div>State</div>
                <select className='textField' value={state} onChange={(e)=>{setState(e.target.value)}} >
                    <option></option>
                    <option value="sindh">sindh</option>
                    <option value="balochistan">balochistan</option>
                    <option value="punjab">punjab</option>
                </select>
            </label>
            <div className='col-12 d-flex justify-content-end'>
                {props.holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active sm' onClick={(e) => {props.addArtistUser(e,{firstname:firstname,lastname:lastname,state:state,city:city,address:address,email:email})}}>ADD</button>}
            </div>
        </>
    )
}

export default AddNewArtist