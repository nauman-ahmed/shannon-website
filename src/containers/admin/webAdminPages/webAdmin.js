import React from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import loading from './../../../assets/loading.gif';
function WebAdmin(props) {

    
  return (
    <>
    {props.holder?<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}><img className="mb-3" alt="loading" src={loading} style={{width:"50px"}}/></div>:
    <Table height="calc(100vh - 350px)">
        <THead>
            <Th minWidth="120">Name</Th>
            <Th minWidth="120">Username</Th>
            <Th>Email</Th>
            <Th minWidth="100">Role</Th>
            <Th width="110"></Th>
        </THead>
        <TBody>
            {props.adminUser.length > 0 ? props.adminUser.map((item,key)=>(
            <Tr key={key}>
                <Td>{item.name}</Td>
                <Td>{item.username}</Td>
                <Td>{item.email}</Td>
                <Td>{item.Role === 1? "SuperAdmin" : "Admin"}</Td>
                <Td className="d-flex">
                    {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn' type="text" onClick={(e)=>{props.setFormNo(1);props.setSingleAdmin(item);}}>EDIT</button>}
                    {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>props.deleteUser(e,item)}>DELETE</button>}
                </Td>
            </Tr>
            ))
           
            :(<Tr></Tr>)}
           
        </TBody>
    </Table>
    }
    </>
  )
}

export default WebAdmin