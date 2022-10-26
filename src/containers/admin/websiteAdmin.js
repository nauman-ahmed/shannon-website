import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AAdminUser, AdminUsers, DAdminUser, UAdminUser } from '../../AxiosFunctions/Axiosfunctionality'
import { updateMessage, updateOpen } from '../../redux/message'
import "./admin.css"
import AdminAdd from './webAdminPages/adminAdd'
import WebAdmin from './webAdminPages/webAdmin'

function WebsiteAdmin(props) {
    const dispatch = useDispatch();
    const [adminUser,setAdminUser] = useState([]);
    const [singleAdmin,setSingleAdmin] = useState({});
    const [holder,setHolder]= useState(false);
    const populateAdminUsers =()=>{
        let data = {};
        setHolder(true);
        AdminUsers(data).then((res)=>{
            setHolder(false)
            setAdminUser(res)
        })
    }

    const editUser = (e,item)=>{
        if(Object.keys(item).length !== 0){
            let data = {
                id:item.id,
                email:item.email,
                hash_password:item.password,
                Role:item.Role,
            }
            setHolder(true);
            UAdminUser(data).then((res)=>{
                props.setFormNo(0);
                setHolder(false);
                dispatch(updateOpen(true))
                dispatch(updateMessage(res));
                populateAdminUsers();
            });
        }
    }

    const addUser = (e,item)=>{
        if(Object.keys(item).length !== 0){
            let data = {
                email:item.email,
                hash_password:item.password,
                Role:item.Role
            }
            setHolder(true);
            AAdminUser(data).then((res)=>{
                props.setFormNo(0);
                setHolder(false);
                dispatch(updateOpen(true))
                dispatch(updateMessage(res.msg));
                populateAdminUsers();
            });
        }
    }

    const deleteUser = (e,item)=>{
        if(Object.keys(item).length !== 0){
            let data = {
                id:item._id,
            }
            setHolder(true);
            DAdminUser(data).then((res)=>{
                setHolder(false);
                dispatch(updateOpen(true))
                dispatch(updateMessage(res));
                populateAdminUsers();
            });
        }
    }
    useEffect(() => {
        populateAdminUsers();
    }, [])
    return (
        <div className='px-xl-5 mx-xl-5'>
        <div className='mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex justify-content-between'>
            <h4>{props.formNo === 1?"ADD A WEB ADMIN":"WEBSITE ADMINISTRATOR"}</h4>
            {props.formNo === 0?<button onClick={()=>{props.setFormNo(1);setSingleAdmin({})}} className='mx-1 myBtn sm align-self-center px-4'>ADD A WEB ADMIN</button>:null}
        </div>
        <div className='mx-5'>
        {/* <div className='mx-5 px-5'> */}
            {props.formNo === 1?
            <AdminAdd
            singleAdmin={singleAdmin} 
            setFormNo={(e)=>props.setFormNo(e)} 
            editUser={editUser} 
            addUser={addUser}
            holder= {holder}/>
            : <WebAdmin 
                setSingleAdmin={setSingleAdmin}
                setFormNo = {(e)=>props.setFormNo(e)}
                adminUser={adminUser}
                deleteUser = {deleteUser}
                holder= {holder}
                
            />   
            }
        </div>
    </div>
  )
}

export default WebsiteAdmin