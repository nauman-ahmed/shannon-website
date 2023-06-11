import React, { useEffect, useState } from 'react'
import { IMAGE_ROUTE,artistPortfolioOrder,getTypeTwoKeyword,artistImagedelete, artistImageToggleVisibility } from '../../../AxiosFunctions/Axiosfunctionality'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import unHide from "../../../assets/img/icons8-hide-48.png"
import hide from "../../../assets/img/icons8-eye-64.png"
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import { Grid } from "./dropableFolder/Grid";
import { SortablePhoto } from "./dropableFolder/SortablePhoto";
import { Photo } from "./dropableFolder/Photo";


function Portfolio(props) {

  const [items, setItems] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));


  const [characters,updateCharacters] = useState([])
  const [typeOneData,setTypeOneData] = useState([])
  const [typeTwoData,setTypeTwoData] = useState([])
  const [enabled,setEnabled] = useState(false)
  const [formNo2, setFormNo2] = useState(0)
  

  const getKeywordsAndSeperate = async () => {
 
    let keywords = []
    let tempKeywords = await getTypeTwoKeyword({})

    tempKeywords.map((val,ind)=>{
      keywords.push(val._id)
    })
    filterImages(keywords)
  }

  useEffect(() => {
    localStorage.setItem('currentArtist',JSON.stringify(props.selectedArtist))
    if(props.selectedImages.mainImage !== undefined){
      getKeywordsAndSeperate()
    } 
  }, [props.selectedImages])

  const filterImages = (keywordsList)=>{
    
    let tempData = [];

    tempData = props.selectedImages.mainImage.filter((item,key)=>{
      let checker = false;
      for(var i=0;i<item.keywordID.length;i++){
        if(keywordsList.includes(item.keywordID[i])){
          checker = true;
        }
      }
      if(checker){
        return true;
      }
      else{
        return false;
      }
    })


    for (let i = 0; i < tempData.length; i++) {
      for (let j = 0; j < tempData.length - i - 1; j++) {

          if (tempData[j + 1].orderKidPortfolio < tempData[j].orderKidPortfolio) {
              [tempData[j + 1], tempData[j]] = [tempData[j], tempData[j + 1]]
          }

      }
  };


    setTypeTwoData(tempData)
    let tempDataOne = [];

    tempDataOne = props.selectedImages.mainImage


    setTypeOneData(tempDataOne)
    setItems(tempDataOne)
  }

  const enableHandler = () => {

    if(enabled){
      let sortedImages = []
      let tempTypeTwo = [...typeOneData]
      let tempTypeOne = [...typeTwoData]

      for(let i = 0; i < tempTypeOne.length; i++){
        tempTypeOne[i].orderKidPortfolio = i
      };
      for(let i = 0; i < tempTypeTwo.length; i++){
          tempTypeTwo[i].orderPortfolio = i
      };

      console.log(tempTypeTwo)
        artistPortfolioOrder({
        id:props.selectedArtist._id,
        images:tempTypeTwo
      }).then(res=>{
        console.log('ENABELED',res)      
      })
    }
    setEnabled(!enabled)
  }

  // const handleOnDragEnd = (result) => {
  //   if(!result.destination) return;
  //   const items = Array.from(characters)
  //   const [reorderedItem] = items.splice(result.source.index,1)
  //   items.splice(result.destination.index,0,reorderedItem)
  //   if(formNo2 == 0){
  //     setTypeOneData(items)
  //   }else{
  //     setTypeTwoData(items)
  //   }
  //   updateCharacters(items)
  // }
  

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id) {

      let oldIndex;
      let newIndex;

      setItems((items) => {
        oldIndex = items.findIndex((val)=>val.path === active.id)
        newIndex = items.findIndex((val)=>val.path === over.id)
        return arrayMove(items, oldIndex, newIndex);
      });
      console.log(oldIndex,newIndex)
      if(formNo2 == 0){
        setTypeOneData((typeOneData) => {
          return arrayMove(typeOneData, oldIndex, newIndex);
        })
      }else{
        setTypeTwoData((typeTwoData) => {
          return arrayMove(typeTwoData, oldIndex, newIndex);
        })
      }
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  if(enabled){
    return (
      <>
        <button className='m-2 myBtn active' onClick={enableHandler}>SUBMIT</button>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <Grid columns={4}>
              {items.map((url, index) => (
                <SortablePhoto key={url.path} url={url.path} index={index} />
              ))}
            </Grid>
          </SortableContext>
    
          <DragOverlay adjustScale={true}>
            {activeId ? (
              <Photo url={activeId} index={items.findIndex((val)=>val.path === activeId)} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </>
    );
    
  }

  const deleteImageHandler = async (val) => {
    let response = await artistImagedelete({
        artistId:props.selectedArtist._id,
        imageData:val
    })
    props.updateSelectedImagesArray(response.data)
  }

  const toggleImageVisibilityHandler = async (val) => {
    let response = await artistImageToggleVisibility({
        _id:val._id,
        hideImage: !val.hideImage

    })
    props.updateSelectedImagesArray(response.data)
  }

  return (
    <>
    <div className='d-flex flex-column' style={{marginTop:-10,marginLeft:'25%'}}> 
       <button onClick={()=>{setFormNo2(0);setItems(typeOneData);}} className={'btn'+(formNo2 === 0? " active": " non_active")} style={{border:'none',
      textDecoration:'none',outline:'none'}}>Shannon</button>
       <button onClick={()=>{setFormNo2(1);setItems(typeTwoData);}} className={'btn'+(formNo2 === 1? " active": " non_active")} style={{marginTop:-5,border:'none',
      textDecoration:'none',outline:'none'}}>Kid Shannon</button>
       </div>
      {Object.keys(props.selectedImages).length > 0 ?
        formNo2 == 0 && typeOneData.length > 0 ?
          <button className='m-2 myBtn active' type="text" onClick={enableHandler}>ORDER PORTFOLIO</button>
        : formNo2 == 1 && typeTwoData.length > 0 ?
            <button className='m-2 myBtn active' type="text" onClick={enableHandler}>ORDER PORTFOLIO</button>
          : null
      :
      null}
      <div className='_4cols-v2-admin'>  
        { 
        items?.length > 0 ? items.map((item,key)=>(
          item.status === 1?
          <div key={key} className='artistcardAdmin w-inline-block' >
              <div
                  
                  className="crossSection"
                  >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      height="12px"
                      viewBox="0 0 352 512"
                      onClick={() => deleteImageHandler(item)}
                  >
                      <path
                      fill="grey"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                      />
                  </svg>
                  <img 
                    src={item.hideImage? hide : unHide } 
                    style={{width:"20px", height:"20px", marginTop:"1vh", }} 
                    onClick={() => toggleImageVisibilityHandler(item)}
                  />
              </div>
              <img style={item.hideImage? {cursor: "pointer",filter:"brightness(0.5)"} : {cursor: "pointer"}} onClick={()=>props.history.push({pathname:"/admin/artists/"+item._id,state: { selectedArtist: props.selectedArtist,selectedImages:props.selectedImages }})}  alt='' src={item.path} className="image"/>
          </div>:""
        )):""
      }
      </div>
    </>
  )
}

export default Portfolio