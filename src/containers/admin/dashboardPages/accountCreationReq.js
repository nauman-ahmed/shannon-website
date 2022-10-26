import React from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import loading from '../../../assets/loading.gif';
function AccountCreationReq(props) {
  return (
    <div className='col'>
                <Table height="calc(100vh - 350px)">
                    <THead>
                        <Th minWidth="120">Name</Th>
                        <Th minWidth="120">Last Name</Th>
                        <Th>Email</Th>
                        <Th minWidth="100">Address</Th>
                        <Th minWidth="100">City</Th>
                        <Th minWidth="100">State</Th>
                        <Th width="110"></Th>
                    </THead>
                    <TBody>
                        {props.artistUsers.map((item,key)=>(
                    <>
                        {item.status === 0 ? (
                            <Tr key={key}>
                                <Td>{item.firstname}</Td>
                                <Td>{item.lastname}</Td>
                                <Td>{item.email}</Td>
                                <Td>{item.address}</Td>
                                <Td>{item.city}</Td>
                                <Td>{item.state}</Td>
                                <Td className="d-flex">
                                    <button className='mx-1 myBtn' type="text" onClick={(e)=>{props.deleteArtistUser(e,item._id)}}>DELETE</button>
                                    {props.loading?
                                        <img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>
                                    :
                                    <button className='mx-1 myBtn active' type="text" onClick={(e)=>{props.approveArtistUser(e,item._id)}}>{item.status === 1 ? "APPROVE":"APPROVE"}</button>
                                    }
                                </Td>
                            </Tr>
                         ):""}
                            </>
                            
                        )
                        
                        )}
                        
                        
                    </TBody>
                </Table>
            </div>
  )
}

export default AccountCreationReq