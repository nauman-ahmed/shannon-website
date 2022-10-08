import React, { useEffect, useState } from 'react'
import loading from '../../../assets/loading.gif';
function Edit(props) {
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [Address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [status,setStatus] = useState("0");
    useEffect(() => {
        setFirstname(props.selectedArtist.firstname);
        setLastname(props.selectedArtist.lastname);
        setEmail(props.selectedArtist.email);
        setAddress(props.selectedArtist.address);
        setCity(props.selectedArtist.city);
        setState(props.selectedArtist.state);
        setStatus(String(props.selectedArtist.status));
    }, [])
    return (
        <div className='row px-5 mx-5'>
            <label className='col-md-6'>
                <div>Name</div>
                <input className='textField' value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} />
            </label>
            <label className='col-md-6'>
                <div>Last Name</div>
                <input className='textField' value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div>Email</div>
                <input type="email" className='textField' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div>Address</div>
                <input className='textField' value={Address} onChange={(e)=>{setAddress(e.target.value)}}/>
            </label>
            <label className='col-md-6'>
                <div>City</div>
                <select className='textField' value={city} onChange={(e)=>{setCity(e.target.value)}}>
                <option >{city}</option>
                    <option value="karachi">karachi</option>
                    <option value="islamabad">islamabad</option>
                    <option value="lahore">lahore</option>
                </select>
            </label>
            <label className='col-md-6'>
                <div>State</div>
                <select className='textField' value={state} onChange={(e)=>{setState(e.target.value)}}>
                    <option>{state}</option>
                    <option value="sindh">sindh</option>
                    <option value="balochistan">balochistan</option>
                    <option value="punjab">punjab</option>
                </select>
            </label>
            <label className='col-12'>Status</label>
            <label className='px-3'>
                <input className='mr-2' name="status" type="radio" value={"1"}  checked={status === "1"} onChange={(e)=>{setStatus(e.target.value);}}/>
                {"Active"}
            </label>
            <label className='px-3'>
                <input className='mr-2' name="status" type="radio" value={"0"} checked={status === "0"}  onChange={(e)=>{setStatus(e.target.value);}}/>
                {"Inactive"}
            </label>
            <div className='col-12 d-flex justify-content-end'>
                {props.holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active sm' onClick={(e) => { props.updateArtist(e,{
                    _id:props.selectedArtist._id,
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    address:Address,
                    state:state,
                    city:city,
                    status:status

                    }); }}>SAVE</button>}
            </div>
        </div>
    )
}

export default Edit