import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import { orderArtist } from '../../../AxiosFunctions/Axiosfunctionality';

import loading from '../../../assets/loading.gif';
function ArtistsList(props) {

    const [characters,updateCharacters] = useState([])
    const [filterArtist,setFilterArtist] = useState([]);
    const [typeOneArtist,setTypeOneArtist] = useState([]);
    const [typeTwoArtist,setTypeTwoArtist] = useState([]);
    const [formNo,setFormNo] = useState(0);
  
    const handleOnDragEnd = (result) => {
        if(!result.destination) return;
        const items = Array.from(characters)
        const [reorderedItem] = items.splice(result.source.index,1)
        items.splice(result.destination.index,0,reorderedItem)

        if(formNo == 0){
            setTypeOneArtist(items)
        }else{
            setTypeTwoArtist(items)
        }

        updateCharacters(items)
    }
    
    useEffect(()=>{
        updateList()
    },[props.artistUsers])
   
    const updateList = (payload)=>{
        let temp = [];
        let typeOther = []
        let typeKid = []

        if(props.artistUsers.length>0){
            props.artistUsers.forEach((item,key)=>{
                if(item.type === "kidshannon"){
                    typeKid.push(item);
                }
                typeOther.push(item);
            })

            setTypeOneArtist(typeOther)
            setTypeTwoArtist(typeKid)
            updateCharacters(typeOther)

        }
    }

    const onSubmitHandler = () => {
        let tempTypeTwo = [...typeTwoArtist]
        let tempTypeOne = [...typeOneArtist]

        for(let i = 0; i < tempTypeOne.length; i++){
            tempTypeOne[i].orderArtist = i
        };
        for(let i = 0; i < tempTypeTwo.length; i++){
            tempTypeTwo[i].orderKidArtist = i
        };

        
        orderArtist(tempTypeOne)
        props.reorderArtistHandler(tempTypeOne)
    }

    return (
    <>
    <button className='m-2 myBtn active' type="text" onClick={onSubmitHandler}>SUBMIT ORDER</button>
    <button className='m-2 myBtn active' type="text" onClick={()=>{updateCharacters(typeOneArtist); setFormNo(0);}}>ALL ARTISTS</button>
    <button className='m-2 myBtn active' type="text" onClick={()=>{updateCharacters(typeTwoArtist);setFormNo(1)}}>KIDSHANON ARTISTS</button>
    {/* <button className='m-2' onClick={onSubmitHandler}>Submit</button> */}
    {props.holder?<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}><img className="mb-3" alt="loading" src={loading} style={{width:"50px"}}/></div>:
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='charactersStuff'>
          {(provided)=>(
          <Table height="calc(100vh - 350px)" provided={provided}>
                <THead>
                    <Th minWidth="120">Name</Th>
                    <Th minWidth="120">Status</Th>
                    <Th width="110"></Th>
                </THead>
                <TBody>
                    {props.artistUsers.length>0    ?  props.search !== "" ? props.tempArtist.map((item,key)=>
                    (
                    <Tr key={key}>
                        <Td>{item.lastname} {item.firstname}</Td>
                        <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                        <Td className="d-flex">
                            <button onClick={()=>props.formChangeEvent(item)} className='mx-1 myBtn' type="text">EDIT</button>
                            {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{props.deleteArtistUser(e,item._id)}}>DELETE</button>}
                        </Td>
                    </Tr>
                    )):
                    characters.map((item,key)=>
                    (
                        <Draggable key={item._id} draggableId={item._id} index={key}>
                        {(provided) => (
                            <Tr key={key} provided={provided}>
                                <Td>{item.lastname} {item.firstname}</Td>
                                {/* <Td><p style={item.status ===1?{color:"green"}:{color:"red"}}>{item.status ===1?"Active":"Inactive"}</p> </Td> */}
                                <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                                <Td className="d-flex">
                                    <button onClick={()=>props.formChangeEvent(item)} className='mx-1 myBtn' type="text">EDIT</button>
                                    {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{props.deleteArtistUser(e,item._id)}}>DELETE</button>}
                                </Td>
                            </Tr>
                    )}
                    </Draggable>
                      )):"" }
                    
                   
                </TBody>
                {provided.placeholder}
            </Table>
            )}
            </Droppable>
            </DragDropContext>
                        }
                    </>
  )
}

export default ArtistsList