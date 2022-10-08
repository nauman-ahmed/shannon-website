import React from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import loading from '../../../assets/loading.gif';
function ArtistsList(props) {
    const setCurrentArtist = (item)=>{
        localStorage.setItem("currentArtist",JSON.stringify(item));
    }
  return (
    <>
    {props.holder?<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}><img className="mb-3" alt="loading" src={loading} style={{width:"50px"}}/></div>:
    <Table height="calc(100vh - 350px)">
                <THead>
                    <Th minWidth="120">Name</Th>
                    <Th minWidth="120">Status</Th>
                    <Th width="110"></Th>
                </THead>
                <TBody>
                    {props.artistUsers.length>0 ?  props.search !== "" ? props.tempArtist.map((item,key)=>
                    (
                    <Tr key={key}>
                        <Td>{item.lastname+" "+item.firstname}</Td>
                        <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                        <Td className="d-flex">
                            <button onClick={()=>{props.formChangeEvent(item);setCurrentArtist(item)}} className='mx-1 myBtn' type="text">EDIT</button>
                            {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{props.deleteArtistUser(e,item._id)}}>DELETE</button>}
                        </Td>
                    </Tr>
                    )):props.artistUsers.map((item,key)=>
                    (
                    <Tr key={key}>
                        <Td>{item.lastname+" "+item.firstname}</Td>
                        {/* <Td><p style={item.status ===1?{color:"green"}:{color:"red"}}>{item.status ===1?"Active":"Inactive"}</p> </Td> */}
                        <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                        <Td className="d-flex">
                            <button onClick={()=>{props.formChangeEvent(item);setCurrentArtist(item)}} className='mx-1 myBtn' type="text">EDIT</button>
                            {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{props.deleteArtistUser(e,item._id)}}>DELETE</button>}
                        </Td>
                    </Tr>
                    )):"" }
                    
                   
                </TBody>
            </Table>
                    }
                    </>
  )
}

export default ArtistsList