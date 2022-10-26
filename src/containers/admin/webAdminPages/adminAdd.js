import React, { useEffect, useState } from 'react'
import loading from './../../../assets/loading.gif';
function AdminAdd(props) {
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [Role,setRole] = useState("");
    const [password,setPassword] = useState("");
    useEffect(() => {
        if(Object.keys(props.singleAdmin).length !== 0){
            setId(props.singleAdmin._id)
            // setName(props.singleAdmin.name)
            // setUsername(props.singleAdmin.username)
            setPassword(props.singleAdmin.raw_password)
            setEmail(props.singleAdmin.email)
            setRole(props.singleAdmin.Role)
        }
    }, [props.singleAdmin])

  return (
    <div className='mx-5 px-5'>   
        {/* <label>
            <div style={{minWidth:80, marginTop:10}}>Name</div>
            <input className='textField' value={name} onChange ={(e)=>setName(e.target.value)}/>
        </label>
        <label>
            <div style={{minWidth:80, marginTop:10}}>Username</div>
            <input className='textField'  value={username} onChange ={(e)=>setUsername(e.target.value)}/>
        </label> */}
        <label>
            <div style={{minWidth:80, marginTop:10}}>Email</div>
            <input className='textField' value={email} onChange ={(e)=>setEmail(e.target.value)}/>
        </label>
        <label>
            <div style={{minWidth:80, marginTop:10}}>Password</div>
            <input className='textField' value={password} onChange ={(e)=>setPassword(e.target.value)}/>
        </label>
        <label>
            <div style={{minWidth:80, marginTop:10}}>Role</div>
            <select className='textField' value={Role} onChange ={(e)=>setRole(e.target.value)}>
                <option></option>
                <option value={1}>Super Admin</option>
                <option value={2}>Admin</option>
 
            </select>
        </label>
        { Object.keys(props.singleAdmin).length !== 0?
        (props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button onClick={(e)=>{props.editUser(e,{id:id,email:email,password:password,Role:Role});}} className='mt-4 myBtn active sm float-right px-4' >Update</button>)
        :(props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>: <button onClick={(e)=>{props.addUser(e,{email:email,password:password,Role:Role});}} className='mt-4 myBtn active sm float-right px-4' >ADD</button>)

        }
       
    </div>
  )
}

export default AdminAdd