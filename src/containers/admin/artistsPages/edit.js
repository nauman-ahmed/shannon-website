import React, { useEffect, useState } from 'react'
import loading from '../../../assets/loading.gif';
import { allCityGetter,allStateGetter } from '../../../redux/StateCity'

function Edit(props) {
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [Address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [status,setStatus] = useState("0");
    const [type,setType] = useState("");
    const [searchListCity, setSearchListCity] = useState([])
    const [searchListState, setSearchListState] = useState([])

    useEffect(() => {
        setFirstname(props.selectedArtist.firstname);
        setLastname(props.selectedArtist.lastname);
        setEmail(props.selectedArtist.email);
        setAddress(props.selectedArtist.address);
        setCity(props.selectedArtist.city);
        setState(props.selectedArtist.state);
        setStatus(String(props.selectedArtist.status));
        setType(props.selectedArtist.type)
    }, []) 


    // const searchCity = async (val,selection) => {
    //     setCityUp(val)      
    //     if(selection){
    //       setCityUp(val)      
    //       setSearchListCity([])
    //       return
    //     }
    //     if(val == ""){
    //       setSearchListCity([])
    //       return
    //     }
    //     setSearchListCity(await allCityGetter(val))
    //   }
    
    //   const searchState = async (val,selection) => {
    //     setStateUp(val)      
    //     if(selection){
    //       setStateUp(val)      
    //       setSearchListState([])
    //       return
    //     }
    //     if(val == ""){
    //       setSearchListState([])
    //       return
    //     }
    //     setSearchListState(await allStateGetter(val))
    //   }
    
    const changeArtistType = (e) => {
        if(e.target.value == type){
            setType("None")
            return
        }else{
            setType(e.target.value)
        }
    }
    
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
                <>
                <input className='textField' />
                <select className='textField d-none'>
                <option >{city}</option>
                    <option value="karachi">karachi</option>
                    <option value="islamabad">islamabad</option>
                    <option value="lahore">lahore</option>
                </select>
                </>
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
            <label className='col-12 my-2'>BIPOC</label>
            <label className='px-3'>
                <input className='mr-2' name="Black" type="radio" value={"Black"}  checked={type === "Black"} onClick={(e)=>changeArtistType(e)}/>
                Black
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Asian" type="radio" value={"Asian"} checked={type === "Asian"}  onClick={(e)=>changeArtistType(e)}/>
                Asian
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Latino" type="radio" value={"Latino"} checked={type === "Latino"}  onClick={(e)=>changeArtistType(e)}/>
                Latino
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Central Asia" type="radio" value={"Central Asia"} checked={type === "Central Asia"}  onClick={(e)=>changeArtistType(e)}/>
                Central Asia
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Indigenous" type="radio" value={"Indigenous"} checked={type === "Indigenous"}  onClick={(e)=>changeArtistType(e)}/>
                Indigenous
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
                    status:status,
                    type:type
                    }); }}>SAVE</button>}
            </div>
        </div>
    )
}

export default Edit