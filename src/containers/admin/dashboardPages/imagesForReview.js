import React from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
function ImagesForReview(props) {
    const findStatusCount = (item)=>{
        var count = 0;
        item.mainImage.forEach((item,key)=>{
            if(item.status === 0) {
                count++;
            }
        })
        return count;
    }
  return (
    <div className='col'>
    <Table height="calc(100vh - 350px)">
        
        <THead>
            <Th minWidth="120">Name</Th>
            <Th minWidth="120">#</Th>
            <Th width="110"></Th>
        </THead>
        <TBody>
            {props.artistImages.map((item,key)=>( 
            <Tr key={key}>
                <Td>{item.artistId !== null?item.artistId.firstname:""}</Td>
                <Td>{findStatusCount(item)}</Td>
                <Td className="d-flex">
                    <button className='mx-1 myBtn active' style={{width: 130}} type="text">VIEW PROFILE</button>
                </Td>
            </Tr>
            )
            ) 
            }
        </TBody>
    </Table>
</div>
  )
}

export default ImagesForReview