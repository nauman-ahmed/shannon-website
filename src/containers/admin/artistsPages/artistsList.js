import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import { orderArtist, similarArtistAdd, similarArtistGetAll } from '../../../AxiosFunctions/Axiosfunctionality';
import { updateMessage, updateOpen } from '../../../redux/message'
import { useDispatch, useSelector } from 'react-redux'
import SnackbarCustom from "../../../components/snackBar/SnackbarCustom";
import MyPopup from '../../../components/myPopup/myPopup'

import loading from '../../../assets/loading.gif';
function ArtistsList(props) {

    const dispatch = useDispatch();

    const splitTextLengthLimit = 20
    const [isLoader,setIsLoader] = useState(0)
    const [isPopupShow, setIsPopupShow] = useState(false)
    const [selectedArtist, setSelectedArtist] = useState(false)
    const [characters,updateCharacters] = useState([])
    const [filterArtist,setFilterArtist] = useState([]);
    const [similarArtist,setSimilarArtist] = useState([]);
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

        if(props.similarArtist){
            if(similarArtist){
                let temp = [...typeOneArtist]
                let counter = 0
                for (let index = 0; index < typeOneArtist.length; index++) {
                    if(similarArtist.similarArtistCollection.findIndex((item1)=> item1 == typeOneArtist[index]._id) !== -1){
                        temp.splice(counter,0,typeOneArtist[index])
                        console.log("CHALA",temp.length)
                        temp.splice(index+1,1)
                        console.log("CHALA",temp.length)
                        counter += 1
                    }
                }
                updateCharacters(temp)
            }
        }

    },[similarArtist])

    useEffect(()=>{
        updateList()
        if(props.similarArtist){
            similarArtistGetAll({_id:props.selectedArtist._id}).then((res) => {
                setSimilarArtist(res.data[0])
            })
        }
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

            if(props.similarArtist){
                setTypeOneArtist(typeOther.sort((a, b) => a.lastname.normalize().localeCompare(b.lastname.normalize())))
                setTypeTwoArtist(typeKid.sort((a, b) => a.lastname.normalize().localeCompare(b.lastname.normalize())))
                updateCharacters(typeOther.sort((a, b) => a.lastname.normalize().localeCompare(b.lastname.normalize())))
            }else{
                setTypeOneArtist(typeOther)
                setTypeTwoArtist(typeKid)
                updateCharacters(typeOther)
            }

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
        setIsLoader(true)
        orderArtist(tempTypeOne).then(res=>{
            dispatch(updateOpen(true))
            if(res=="Recieved"){
                dispatch(updateMessage("Successfully Updated"));
            }else{
                dispatch(updateMessage(res));
            }
            setIsLoader(false)
        })
        props.reorderArtistHandler(tempTypeOne)
    }
    
    const onSubmitSimilarArtistHandler = (data,status="ADD") => {
        
        setIsLoader(true)
        similarArtistAdd({
            artist: props.selectedArtist,
            similarArtist: data,
            status
        }).then(res=>{
            dispatch(updateOpen(true))
            if(res.msg=="Recieved"){
                setSimilarArtist(res.data[0])
                dispatch(updateMessage("Successfully Updated"));
            }else{
                dispatch(updateMessage(res.msg));
            }
            setIsLoader(false)
        })

    }

    return (
    <>
    {
    props.similarArtist ?  null 
    
    :isLoader?
        <img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>
    :
        <button className='mr-3 mb-3 myBtn active' type="text" onClick={onSubmitHandler}>CONFIRM ORDER</button>
    }
    <button className='mx-3 mb-3 myBtn active' type="text" onClick={()=>{updateCharacters(typeOneArtist); setFormNo(0);}}>ALL ARTISTS</button>
    <button className='mx-3 mb-3 myBtn active' type="text" onClick={()=>{updateCharacters(typeTwoArtist);setFormNo(1)}}>KIDSHANON ARTISTS</button>
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
                    props.selectedArtist ? 
                    item._id !== props.selectedArtist._id &&
                    (
                    <Tr key={key}>
                        <Td>{item.lastname} {item.firstname}</Td>
                        <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                        {
                            similarArtist ? similarArtist.similarArtistCollection ? 
                            similarArtist.similarArtistCollection.findIndex((item1)=> item1 == item._id) == -1 ?
                                <Td className="d-flex">
                                    {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id)}}>ADD</button>}
                                </Td>
                            :
                                <Td className="d-flex">
                                    {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id,"DELETE")}}>REMOVE</button>}
                                </Td>
                            :  <Td className="d-flex">
                                    {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id)}}>ADD</button>}
                                </Td>
                            :  <Td className="d-flex">
                                    {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id)}}>ADD</button>}
                                </Td>
                        }
                    </Tr>
                    )
                    :
                    (
                        <Tr key={key}>
                            <Td>{item.lastname} {item.firstname}</Td>
                            <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                            <Td className="d-flex">
                                <button onClick={()=>props.formChangeEvent(item)} className='mx-1 myBtn' type="text">EDIT</button>
                                {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{setIsPopupShow(true); setSelectedArtist(item)}}>DELETE</button>}
                            </Td>
                        </Tr>
                    )
                    ):
                    characters.map((item,key)=>
                    props.selectedArtist ?
                    item._id !== props.selectedArtist._id &&
                    (
                        <Draggable key={item._id} draggableId={item._id} index={key}>
                        {(provided) => (
                            <Tr key={key} provided={provided}>
                                <Td>{item.lastname} {item.firstname}</Td>
                                {/* <Td><p style={item.status ===1?{color:"green"}:{color:"red"}}>{item.status ===1?"Active":"Inactive"}</p> </Td> */}
                                <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                                {
                                    similarArtist ? similarArtist.similarArtistCollection ? 
                                    similarArtist.similarArtistCollection.findIndex((item1)=> item1 == item._id) == -1 ?
                                        <Td className="d-flex">
                                            {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id)}}>ADD</button>}
                                        </Td>
                                    :
                                        <Td className="d-flex">
                                            {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id,"DELETE")}}>REMOVE</button>}
                                        </Td>
                                    :  <Td className="d-flex">
                                            {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id)}}>ADD</button>}
                                        </Td>
                                    :  <Td className="d-flex">
                                            {isLoader?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{onSubmitSimilarArtistHandler(item._id)}}>ADD</button>}
                                        </Td>
                                }
                            </Tr>
                    )}
                    </Draggable>
                      )
                      :
                      (
                        <Draggable key={item._id} draggableId={item._id} index={key} >
                            {(provided) => (
                                <Tr key={key} provided={provided} >
                                    <div onClick={()=>props.formChangeEvent(item)} style={{ display: "contents", cursor: "pointer" }}>
                                        <Td>{item.lastname} {item.firstname}</Td>
                                        {/* <Td><p style={item.status ===1?{color:"green"}:{color:"red"}}>{item.status ===1?"Active":"Inactive"}</p> </Td> */}
                                        <Td className={item.status ===1?"text-success":"text-danger"}>{item.status ===1?"Active":"Inactive"}</Td>
                                        <Td className="d-flex">
                                            <button onClick={()=>props.formChangeEvent(item)} className='mx-1 myBtn' type="text">EDIT</button>
                                            {props.holder?<img className="mt-1" alt="loading" src={loading} style={{width:"30px"}}/>:<button className='mx-1 myBtn active' type="text" onClick={(e)=>{setIsPopupShow(true); setSelectedArtist(item)}}>DELETE</button>}
                                        </Td>
                                    </div>
                                </Tr>
                            )}
                        </Draggable>
                      )
                      
                      ):"" }
                    
                   
                </TBody>
                {provided.placeholder}
            </Table>
            )}
            </Droppable>
            </DragDropContext>
        }
        {isPopupShow?
                <MyPopup BackClose onClose={()=>{setIsPopupShow(false)}}>
                    <div className='mx-5 my-2'>
                        <>
                            Are you sure you want to delete "{selectedArtist.lastname}" profile,
                            <br />
                            <div className='my-4'>
                                this action can't be undone.
                            </div>
                        </>
                        <div className='mx-5 my-2 d-flex' style={{ justifyContent: "space-between" }}>
                            <button className='mx-1 myBtn' type="text" style={{ background: "red", padding:"10px 15px" }} onClick={(e)=>{props.deleteArtistUser(e,selectedArtist._id); setIsPopupShow(false)}}>DELETE</button>
                            <button className='mx-1 myBtn' type="text" style={{ background: "#ffb71b", padding:"10px 15px" }} onClick={(e)=>{setIsPopupShow(false)}}>CANCEL</button>
                        </div>
                    </div>
                </MyPopup>
                :null
            }
        <SnackbarCustom  />

    </>
  )
}

export default ArtistsList