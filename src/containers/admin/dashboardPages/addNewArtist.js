import React from 'react';
import { useState } from 'react';
import loading from '../../../assets/loading.gif';
import { allCityGetter,allStateGetter } from '../../../redux/StateCity'

function AddNewArtist(props) {
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [state,setState] = useState("");
    const [city,setCity] = useState("");
    const [address,setAddress] = useState("");
    const [searchListCity, setSearchListCity] = useState([])
    const [searchListState, setSearchListState] = useState([])
    
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
        <>
            <label className='col-md-6'>
                <div>Name</div>
                <input className='textField' value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} />
            </label>
            <label className='col-md-6'>
                <div>Last Name</div>
                <input className='textField'  value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
            </label>
            <label className='col-md-6'>
                <div>Email</div>
                <input type="email" className='textField'  value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </label>
            <label className='col-md-6'>
                <div>Password</div>
                <input type="textField" className='textField'  value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </label>
            <label className='col-md-12'>
                <div>Address</div>
                <input className='textField'  value={address} onChange={(e)=>{setAddress(e.target.value)}} />
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
            <div className='col-12 d-flex justify-content-end'>
                {props.holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active sm' onClick={(e) => {props.addArtistUser(e,{firstname:firstname,lastname:lastname,state:state,city:city,address:address,email:email,raw_password:password})}}>ADD</button>}
            </div>
        </>
    )
}

export default AddNewArtist