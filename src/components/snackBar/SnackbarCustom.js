import SnackBar from 'react-material-snackbar';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateOpen } from '../../redux/message';

const SnackbarCustom = (props) => {
  const { message } = useSelector( state => state )
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(function changerState(){dispatch(updateOpen(false))},4000);
    
  }, [message])
  return (
    <SnackBar
        show={message.open}                    
        timer={4000}                          
        >
            <div >
              <label>{message.message}</label>
        </div>
        
       
    </SnackBar>
  )
}

export default SnackbarCustom
