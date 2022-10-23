import React from 'react'
import "./layout2.css"
import Logout from "../../assets/svgs/logout.svg"
import { useHistory } from 'react-router-dom'
import { updateMessage, updateOpen } from '../../redux/message'
import SnackbarCustom from '../snackBar/SnackbarCustom';
import { useDispatch, } from 'react-redux'

const Logo = window.location.origin+"/assets/images/Frame.svg"
function Header(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = ()=>{
    localStorage.removeItem("authorization")
    dispatch(updateOpen(true))
    if(window.location.href.includes("/artist") && !window.location.href.includes("/admin")){
      history.push('/artist/signin/')
    }
    else{
      history.push('/admin/signin/')
    }
    dispatch(updateMessage("Successfully Logged Out"))
    
  }

  return (
    <div className='header'>
        <SnackbarCustom  />
        <div className='px-5 py-3'>
            <img alt='' src={Logo}/>
            <div className='d-flex justify-content-end'>
                <button onClick={logout}>
                    LOG OUT
                    <img alt='' src={Logout}/>
                </button>
            </div>

        </div>
    </div>
  )
}

export default Header