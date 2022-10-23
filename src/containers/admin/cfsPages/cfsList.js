import React, { useEffect, useState } from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import loading from '../../../assets/loading.gif';
import {deleteContacts} from '../../../AxiosFunctions/Axiosfunctionality';
import { updateMessage, updateOpen } from '../../../redux/message'
import { useDispatch, useSelector } from 'react-redux'
import SnackbarCustom from '../../../components/snackBar/SnackbarCustom';

function CFSList(props) {

  const dispatch = useDispatch();

  const [contacts,setContacts] = useState(props.contacts)
  const [isLoader,setIsLoader] = useState(false)
  
  const deleteContactForm = (id) => {
      setIsLoader(true)

      deleteContacts({_id:id}).then((res)=>{
        if(res == "delete Successfully"){
          let ind=-1;
          contacts.map((val,i) => {if(val._id == id){ind=i}})
          contacts.splice(ind,1) 
       }
       dispatch(updateOpen(true))
       dispatch(updateMessage(res));
    })
    setIsLoader(false)
  }

  return (
    <Table height="calc(100vh - 350px)">
      <THead>
        <Th minWidth="120">Name</Th>
        <Th minWidth="120">Company</Th>
        <Th>Email</Th>
        <Th minWidth="100">Purpose of inquiry</Th>
        <Th minWidth="100">Status</Th>
        <Th width="110"></Th>
      </THead>
      <TBody>
        {contacts.map((item,key)=>(
          <Tr key={key}> 
          <Td>{item.Name}</Td>
          <Td>{item.company}</Td>
          <Td>{item.email}</Td>
          <Td>{item.purposeOfInquiry}</Td>
          <Td className="text-success">{item.status === 0? "Not Reviewed":"Reviewed"}</Td>
          <Td className="d-flex">
            <button onClick={() => {props.setFormNo(1);props.setContactId(item._id);}} className='mx-1 myBtn active' style={{ width: 100 }} type="text">VIEW MORE</button>
            {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{deleteContactForm(item._id)}}>DELETE</button>}
          </Td>
          </Tr>
        ))}
      </TBody>
      <SnackbarCustom  />
    </Table>
  )
}

export default CFSList