import React from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'

function CFSList(props) {
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
        {props.contacts.map((item,key)=>(
          <Tr key={key}>
          <Td>{item.Name}</Td>
          <Td>{item.company}</Td>
          <Td>{item.email}</Td>
          <Td>{item.purposeOfInquiry}</Td>
          <Td className="text-success">{item.status === 0? "Not Reviewed":"Reviewed"}</Td>
          <Td className="d-flex">
            <button onClick={() => {props.setFormNo(1);props.setContactId(item._id);}} className='mx-1 myBtn active' style={{ width: 100 }} type="text">VIEW MORE</button>
          </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  )
}

export default CFSList