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
    const [bipocType,setBipocType] = useState("");
    const [passsword,setPassword] = useState("");
    const [value, setValue] = useState("")
    const [showList, setShow] = useState(false)

    const [searchListCity, setSearchListCity] = useState([])
    const [searchListState, setSearchListState] = useState([])
    const [searchList, setSearchList] = useState([{id:'1',value:'abc'},{id:'1',value:'abc123'},{id:'1',value:'abc12345'}])

    
    useEffect(() => {
        setFirstname(props.selectedArtist.firstname);
        setLastname(props.selectedArtist.lastname);
        setEmail(props.selectedArtist.email);
        setAddress(props.selectedArtist.address);
        setCity(props.selectedArtist.city);
        setState(props.selectedArtist.state);
        setStatus(String(props.selectedArtist.status));
        setType(props.selectedArtist.type)
        setBipocType(props.selectedArtist.bipocType)
        setPassword(props.selectedArtist.raw_password)
    }, []) 
  
    const changeArtistBipocType = (e) => {
        if(e.target.value == type){
            setBipocType("None")
            return
        }else{
            setBipocType(e.target.value)
        }
    }
    const changeArtistKidType = (e) => {
        if(e.target.value == type){
            setType("None")
            return
        }else{
            setType(e.target.value)
        }
    }
    
    const onChangeHandler = async(e) => {
            if(e.target){
               await setShow(true)
               await setValue(e.target.value)
            }
    }
    const onSelect  = async (value) => {
            await setShow(false)
            await setValue(value)
    }
    const onBlurHandler = async () => {
        await setShow(false)
    }


    const searchCity = async (e,selection) => {
        if(selection){
          setCity(e)      
          setSearchListCity([])
          return
        }
        setCity(e.target.value)      
        if(e.target.value == ""){
          setSearchListCity([])
          return
        }
        setSearchListCity(await allCityGetter(e.target.value))
    }
    
    const searchState = async (e,selection) => {
        if(selection){
            setState(e)      
            setSearchListState([])
            return
        }
        setState(e.target.value)      
        if(e.target.value == ""){
            setSearchListState([])
            return
        }
        setSearchListState(await allStateGetter(e.target.value))
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
            <label className='col-md-6'>
                <div>Email</div>
                <input type="email" className='textField' disabled value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>
            <label className='col-md-6'>
                <div>Password</div>
                <input type="email" className='textField' value={passsword} onChange={(e)=>{setPassword(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div>Address</div>
                <input className='textField' value={Address} onChange={(e)=>{setAddress(e.target.value)}}/>
            </label>
            <label className='col-md-6'>
                <div>City</div>
                <>
                <div className='d-flex align-items-center' style={{border:'2px solid black',borderRadius: 5,padding: '8px 15px'}}>
                  <input id='1' type='text' value={city} name='city'  onChange={searchCity} style={{border:'none',width: '90%',height: '100%',textDecoration: 'none',outline: 'none',border: 'none'}}/>
                  <img src='./images/down.png' width="13" height="13" style={{position: 'absolute',top: 25,right: 24}}/>
                 </div>
                  {searchListCity.length > 0 ?
                  <div style={{boxShadow: '0 3px 10px rgb(0 0 0 / 0.1)',padding:15,borderRadius:5}}>
                    {searchListCity.length > 0 ?
                        searchListCity.map((val,ind)=>
                        <><a onClick={()=>{searchCity(val.value,true)}} style={{cursor:'pointer',fontFamily:'inherit',fontSize:14}}>{val.value}</a><br /><br /></>
                        )
                        :
                        <a>No Item to Show</a>
                    }
                    </div>
                    :''
                 } 
                </>
            </label>
            <label className='col-md-6'>
                <div>State</div>
                <>
                <div className='d-flex align-items-center' style={{border:'2px solid black',borderRadius: 5,padding: '8px 15px'}}>
                  <input id='1' type='text' value={state} name='city'  onChange={searchState} style={{border:'none',width: '90%',height: '100%',textDecoration: 'none',outline: 'none',border: 'none'}}/>
                  <img src='./images/down.png' width="13" height="13" style={{position: 'absolute',top: 25,right: 24}}/>
                 </div>
                  {searchListState.length > 0 ?
                  <div style={{boxShadow: '0 3px 10px rgb(0 0 0 / 0.1)',padding:15,borderRadius:5}}>
                    {searchListState.length > 0 ?
                        searchListState.map((val,ind)=>
                        <><a onClick={()=>{searchState(val.value,true)}} style={{cursor:'pointer',fontFamily:'inherit',fontSize:14}}>{val.value}</a><br /><br /></>
                        )
                        :
                        <a>No Item to Show</a>
                    }
                    </div>
                    :''
                 } 
                </>
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
            
            <label className='col-12'>KIDSHANON</label>
            <label className='px-3'>
                <input className='mr-2' name="kidshannon" type="radio" value={"kidshannon"}  checked={type === "kidshannon"} onChange={(e)=>{changeArtistKidType(e);}}/>
                Yes
            </label>
            <label className='px-3'>
                <input className='mr-2' name="kidshannon" type="radio" value={"None"} checked={type !== "kidshannon"}  onChange={(e)=>{changeArtistKidType(e);}}/>
                No
            </label>
            
            
            <label className='col-12 my-2'>BIPOC</label>
            <label className='px-3'>
                <input className='mr-2' name="Black" type="radio" value={"Black"}  checked={bipocType === "Black"} onClick={(e)=>changeArtistBipocType(e)}/>
                Black
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Asian" type="radio" value={"Asian"} checked={bipocType === "Asian"}  onClick={(e)=>changeArtistBipocType(e)}/>
                Asian
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Latino" type="radio" value={"Latino"} checked={bipocType === "Latino"}  onClick={(e)=>changeArtistBipocType(e)}/>
                Latino
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Central Asia" type="radio" value={"Central Asia"} checked={bipocType === "Central Asia"}  onClick={(e)=>changeArtistBipocType(e)}/>
                Central Asia
            </label>
            <label className='px-3'>
                <input className='mr-2' name="Indigenous" type="radio" value={"Indigenous"} checked={bipocType === "Indigenous"}  onClick={(e)=>changeArtistBipocType(e)}/>
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
                    type:type,
                    bipocType:bipocType,
                    raw_password:passsword
                    }); }}>SAVE</button>}
            </div>
        </div>
    )
} 

export default Edit