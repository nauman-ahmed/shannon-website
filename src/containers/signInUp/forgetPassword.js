import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./signInUp.css"
import back from "../../assets/svgs/back_asset.svg"
import Input from '../../components/input/input'
import SnackbarCustom from '../../components/snackBar/SnackbarCustom';
import loading from '../../assets/loading.gif'; 
import { useDispatch } from 'react-redux'
import { updateMessage, updateOpen } from '../../redux/message'
import { forgetAdmin, forgetArtist } from '../../AxiosFunctions/Axiosfunctionality'
import MyPopup from '../../components/myPopup/myPopup'

const Logo = window.location.origin+"/assets/images/Frame.svg"
function ForgetPassword() {

  const history = useHistory()
  const dispatch = useDispatch();

  const [showLoader,setShowLoader] = useState(true);
  const [isPopupShow,setIsPopupShow] = useState(false)
  const [msg, setMsg] = useState("")


  const hash = (window.location.hash).split("/")
  const accountType = hash[1]

 
  //sign in
  const [email, setEmail] = useState("")

 
    const signInFunc = () =>{
      
    if(accountType === "forgetAdmin"){
     
      setShowLoader(false);
      let data = {
        email:email
      }
      
      setShowLoader(false)
      forgetAdmin(data).then( (res)=>{
        try{
          setIsPopupShow(true)
          if(res == "Check your email"){
            setMsg("Your new password has been sent to your email.")
          }else if("Email not exist"){
            setMsg("Email not exist")
          }
          else{
            setMsg("ERROR In Generating Passowrd")
          }
        }
        catch(err){
          dispatch(updateMessage(err.message))
        }
      })
      
      
    }else{
      
      setShowLoader(false);
      let data = {
        email:email
      }
      
      setShowLoader(false)
      forgetArtist(data).then( (res)=>{
        try{
          setIsPopupShow(true)
          if(res == "Check your email"){
            setMsg("Your new password has been sent to your email")
          }else if("Email not exist"){
            setMsg("Email not exist")
          }
          else{
            setMsg("ERROR in Generating Passowrd")
          }
        }
        catch(err){
          dispatch(updateMessage(err.message))
        }
      })
      
    }
  }
  
  const popupCloseHandler = () => {
    setIsPopupShow(false); 
    setShowLoader(true)
    setMsg("")
    if(accountType === "forgetAdmin"){
      history.push('/admin/signin')
    }else{
      history.push('/artist/signin')
    }
  }
 
  return (
    <div className='loginPage d-flex justify-content-center'>
      <img className='backAsset1' alt='' src={back}/>
      <img className='backAsset2' alt='' src={back}/>
      <div className='myForm col-12 pt-md-0 pt-5'>
        <img className='myLogo my-md-5 mt-5 mb-1' alt='' src={Logo}/>
        {accountType === "forgetAdmin"?
          <>
            <h5 className='mb-md-5 mb-0'>FORGET ADMIN PASSWORD</h5>
            <div className='row col-xl-3 col-md-5 col-sm-8'>
         
              <div className='col-12'>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
              </div>
             
            </div>
            <Link to={"/admin/signin"}>Back to Login</Link>
            {showLoader?<button className='myButton my-md-5 mb-5 mt-1' onClick={()=>signInFunc()}>Forget Password</button>:<img className="mt-4" alt="loading" src={loading} style={{width:"30px"}}/>}
          </>
          :accountType === "forgetArtist"?
          <>
            <h5 className='mb-md-5 mb-0'>GENERATE PASSWORD</h5>
            <div className='row col-xl-3 col-md-5 col-sm-8'>
            <div className='col-12'>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
            </div>
            </div>
            <Link to={"/artist/signin"}>Back to Login</Link>
            {showLoader?<button className={'myButton '+(accountType === "admin"?'my-5':'mt-5')} onClick={()=>{signInFunc();}}>Generate New Password</button>:<img className="mt-4" alt="loading" src={loading} style={{width:"30px"}}/>}
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

export default ForgetPassword