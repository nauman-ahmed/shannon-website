import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./signInUp.css"
import back from "../../assets/svgs/back_asset.svg"
import down from "../../assets/img/down.png"
import Input from '../../components/input/input'
import MyPopup from '../../components/myPopup/myPopup'
import { useDispatch,useSelector } from 'react-redux'
import { userRegisterApi, userLoginApi } from "../../redux/signInUpSlice";
import {setAuthToken} from '../../AxiosFunctions/setCommonHeader';
import SnackbarCustom from '../../components/snackBar/SnackbarCustom';
import { updateMessage, updateOpen } from '../../redux/message'
import loading from '../../assets/loading.gif'; 
import { cityGetter, stateGetter, allCityGetter,allStateGetter } from '../../redux/StateCity'
import { decodeToken } from "react-jwt";
import { LoginAdmin, artistImageCreate,artistImagedelete, getAllContents, getArtist } from '../../AxiosFunctions/Axiosfunctionality'
import { keywordDataApi } from '../../redux/keywordSlice' 

const Logo = window.location.origin+"/assets/images/Frame.svg"
function Login() {
  const dispatch = useDispatch(); 
  const [showLoader,setShowLoader] = useState(true);

  const history = useHistory()
  const hash = (window.location.hash).split("/")
  const accountType = hash[1]
  const pageType = hash[2]
  const state = stateGetter()

  //sign in
  const [isPopupShow,setIsPopupShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [city, setCity] = useState("")
  const [msg, setMsg] = useState("")
  const [searchListCity, setSearchListCity] = useState([])
  const [searchListState, setSearchListState] = useState([])
 
//sign up
  const [name,setName] = useState("");
  const [lastName,setLastName] = useState("");
  const [emailUp,setEmailUp] = useState("");
  const [address,setAddress] = useState("");
  const [cityUp,setCityUp] = useState("");
  const [stateUp, setStateUp] = useState("")
  // const [openSnackbar, closeSnackbar] = useSnackbar()
  

  const getAllTheCity = async () => {
    setCity(await cityGetter())
  }

  useEffect(()=>{
    getAllTheCity()
    let details = decodeToken(localStorage.getItem("authorization"))
    
    if(details !== null && details.email == "tech@shannonassociates.com"){
      window.location.href = '/#/admin/artists'
    }
    else if(details !== null){
      window.location.href = '/#/artist'
    }

  },[])

  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  }

  const authenticationHandler = (data) => { 

    LoginAdmin(data).then( (res)=>{
      try{
        dispatch(updateOpen(true))
        setShowLoader(true)
        if(res.message === "Authentication failed. Invalid user or password."){
          dispatch(updateMessage("Invalid user or password"))
        }
        else{
          dispatch(updateMessage("Successfully Login"))
          localStorage.setItem("authorization",res.token!==undefined?res.token:"")
          setAuthToken(res.token);
          window.location.href = '/#/admin/artists'
        }
      }
      catch(err){
        dispatch(updateMessage(err.message))
      }
    })

  }


    const signInFunc = () =>{
      // for admin login
      if(accountType === "admin"){
      let data = {
        email:email,
        password:password
      }
      setShowLoader(false);

      setTimeout(() => {
        authenticationHandler(data)
      }, 2000);
      
      
    }else{
      // for artist login
      if(pageType === "signin"){
        setShowLoader(false);
        dispatch(userLoginApi({
          email:email,
          password:password
        }))
        .then((res)=>{
          localStorage.setItem("authorization",res.payload.token!==undefined?res.payload.token:"")
          console.log(res.payload.token)
          setAuthToken(res.token);
          dispatch(updateOpen(true))
          setShowLoader(true);
          if(res.payload.token !== undefined){
            dispatch(updateMessage("Successfully Login"))
            window.location.href = '/#/artist'
          }else{
            dispatch(updateMessage("Invalid Credentials or In Active Account" ))
          }
        });;
      }else{
        let data = {
          firstname:name,
          lastname:lastName,
          email:emailUp,
          state:stateUp,
          city:cityUp,
          address:address
        }
        if(emailUp == "" || name == "" || lastName == ""){
          setIsPopupShow(true)
          setMsg("Email And Names Required")
          // dispatch(updateOpen(true))
          // dispatch(updateMessage("Email And Names Required"))
          return
        }
        
        setShowLoader(false);
        dispatch(userRegisterApi(data)).then((res)=>{
          setMsg(
            <>
            <p style={{textAlign:'center'}}>We've received your account creation request.<br></br>You will receive your credentials via email within the next 24 hours.<br></br>If you need immediate access call us at 212.333.2251</p>
            </>
            )
           setIsPopupShow(true)
        }); 
      }
      
    }
  }
  
  const searchCity = async (val,selection) => {
    setCityUp(val)      
    if(selection){
      setCityUp(val)      
      setSearchListCity([])
      return
    }
    if(val == ""){
      setSearchListCity([])
      return
    }
    setSearchListCity(await allCityGetter(val))
  }

  const searchState = async (val,selection) => {
    setStateUp(val)      
    if(selection){
      setStateUp(val)      
      setSearchListState([])
      return
    }
    if(val == ""){
      setSearchListState([])
      return
    }
    setSearchListState(await allStateGetter(val))
  }

  const popupCloseHandler = () => {
    setIsPopupShow(false); 
    setShowLoader(true)
    setMsg("")
    history.push('/artist/signin')
  }

  return (
    <div className='loginPage d-flex justify-content-center'>
      <img className='backAsset1' alt='' src={back}/>
      <img className='backAsset2' alt='' src={back}/>
      <div className='myForm col-12 pt-md-0 pt-5'>
        <img className='myLogo my-md-5 mt-5 mb-1' alt='' src={Logo}/>
        {pageType === "signup"?
          <>
            <h5 className='mb-md-5 mb-0'>CREATE AN ACCOUNT</h5>
            <div className='row col-xl-4 col-lg-6'>
              <div className='col-md-6'>
                <Input
                  type="text"
                  name="firstname"
                  label="Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />
              </div>
              <div className='col-md-6'>
                <Input
                  type="text"
                  name="lastname"
                  label="Last Name"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  />
              </div>
              <div className='col-12'>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={emailUp}
                  onChange={(e)=>setEmailUp(e.target.value)}
                  />
              </div>
              {/* <div className='col-12'>
                <Input
                  type="text"
                  name="address"
                  label="Address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                  />
              </div>
              <div className='col-md-6' >
                <div className='d-flex align-items-center'>
                <Input
                  type="select"
                  name="city"
                  label="City"
                  option={city}
                  value={cityUp}
                  onChange={(e)=>e.target?searchCity(e.target.value):searchCity(e,true)}
                  searchList = {searchListCity}
                  />
                <img src='./images/down.png' width="13" height="13" style={{marginTop: 10,position: 'absolute',top: 0,right: 20}}/>
                </div>
              </div>
              <div className='col-md-6'>
                <Input
                  type="select"
                  name="state"
                  label="State"
                  option={state}
                  value={stateUp}
                  onChange={(e)=>e.target?searchState(e.target.value):searchState(e,true)}
                  searchList = {searchListState}
                />
                <img src='./images/down.png' width="13" height="13" style={{marginTop: 10,position: 'absolute',top: 0,right: 20}}/>
              </div> */}
            </div>
            {showLoader?<button className='myButton my-md-5 mb-5 mt-1' onClick={()=>signInFunc()}>REQUEST ACCOUNT CREATION</button>:<img className="mt-4" alt="loading" src={loading} style={{width:"30px"}}/>}
          </>
          :pageType === "signin"?
          <>
            <h5>{accountType === "admin"?"ADMIN LOGIN":"ARTIST PAGE"}</h5>
            <div className='row col-xl-3 col-md-5 col-sm-8'>
              <div className='col-12'>
                <Input
                  type="email"
                  name="email"
                  label="Username or Email"
                  value={email}
                  onChange={(e)=>onChangeHandlerEmail(e)}
                  />
              </div>
              <div className='col-12'>
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  value={password}
                  onChange={(e)=>onChangeHandlerPassword(e)}
                  />
              </div>
            </div>
            {accountType==="admin"?<Link to={"/forgetAdmin"}>Forgot your password?</Link>:<Link to={"/forgetArtist"}>Forgot your password?</Link>}
            
            {showLoader?<button className={'myButton '+(accountType === "admin"?'my-5':'mt-5')} onClick={()=>{signInFunc();}}>LOGIN</button>:<img className="mt-4" alt="loading" src={loading} style={{width:"30px"}}/>}
            <p>{msg}</p>
            {accountType !== "admin"?
            <Link style={{margin:"10px 0 50px 0"}} to={"/artist/signup"}>Create new account</Link>
            :null}
          </>
          :null}
      </div>
      {isPopupShow?
        <MyPopup BackClose CloseBtn onClose={popupCloseHandler}>
          <div className='m-3'>
            {msg} 
          </div> 
        </MyPopup>
      :null}
      <SnackbarCustom  />
    </div>
  )
}

export default Login