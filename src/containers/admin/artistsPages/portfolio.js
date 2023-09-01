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
import { connectAdvanced } from 'react-redux'
import loading from '../../../assets/loading.gif';

const img1 = window.location.origin+"/assets/images/IMG1.png"
const img2 = window.location.origin+"/assets/images/IMG2.png"
const img3 = window.location.origin+"/assets/images/IMG3.png"
const img4 = window.location.origin+"/assets/images/IMG4.png" 

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
    if(props.selectedImages.mainImage !== undefined){
      getKeywordsAndSeperate()
    } 
  }, [props.selectedImages])

  const filterImages = (keywordsList)=>{
    // in this function we are trying to seperate shannon and kidshannon images
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
      let kidCounter = 0
      let counter = 0

      for(let i = 0; i < tempTypeOne.length; i++){
        if(tempTypeOne[i].status == 1 && tempTypeOne[i].hideImage == false){
          tempTypeOne[i].orderKidPortfolio = kidCounter
          kidCounter += 1
        }
      };
      for(let i = 0; i < tempTypeTwo.length; i++){
        if(tempTypeTwo[i].status == 1 && tempTypeTwo[i].hideImage == false){
          tempTypeTwo[i].orderPortfolio = counter
          counter += 1
        }          
      };

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

  // if(enabled){
  //   return (
  //     <>
  //       <button className='m-2 myBtn active' onClick={enableHandler}>SUBMIT</button>
  //       <DndContext
  //         sensors={sensors}
  //         collisionDetection={closestCenter}
  //         onDragStart={handleDragStart}
  //         onDragEnd={handleDragEnd}
  //         onDragCancel={handleDragCancel}
  //       >
  //         <SortableContext items={items} strategy={rectSortingStrategy}>
  //           <Grid columns={8}>
  //             {items.map((url, index) => (
  //               url.hideImage == false && <SortablePhoto key={url.path} url={url.path} index={index} />
  //             ))}
  //           </Grid>
  //         </SortableContext>
    
  //         <DragOverlay adjustScale={true}>
  //           {activeId ? (
  //             <Photo url={activeId} index={items.findIndex((val)=>val.path === activeId)} />
  //           ) : null}
  //         </DragOverlay>
  //       </DndContext>
  //     </>
  //   );
    
  // }

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

  const goToPortfolioHandler = () =>{
    // window.location.href = '/#/artists/'+props.selectedArtist._id
    window.open('/#/artists/'+props.selectedArtist._id, '_blank');
  }

  if(props.holder){
    return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}><img className="mb-3" alt="loading" src={loading} style={{width:"50px"}}/></div>
  }
  
  return (
    <>
    {enabled ?
     <>
     <div className='row'>
      <div className='my-3'>
        <h2>  ORDER IMAGES </h2>
      </div>
     </div>
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
             url.status === 1 &&  url.hideImage == false && <SortablePhoto key={url.path} url={url.path} index={index} />
           ))}
         </Grid>
       </SortableContext>
 
       <DragOverlay adjustScale={true}>
         {activeId ? (
           <Photo url={activeId} index={items.findIndex((val)=>val.path === activeId)} />
         ) : null}
       </DragOverlay>
     </DndContext>
   </>:

   <>
   <div className='row'>
      <div className='mt-5'>
       <h2>  ACTIVE IMAGES </h2>
      </div>
      <div className='col-12 d-flex justify-content-between align-items-baseline my-5'>
        <div>
          {Object.keys(props.selectedImages).length > 0 ?
            formNo2 == 0 && typeOneData.length > 0 ?
              <div> 
                <button className='m-2 myBtn active' type="text" onClick={enableHandler}>ORDER PORTFOLIO</button>
                <button className='m-2 myBtn active' type="text" onClick={goToPortfolioHandler}>GO TO PORTFOLIO</button>
              </div>
          : formNo2 == 1 && typeTwoData.length > 0 ?
              <div> 
                <button className='m-2 myBtn active' type="text" onClick={enableHandler}>ORDER PORTFOLIO</button>
                <button className='m-2 myBtn active' type="text" onClick={goToPortfolioHandler}>GO TO PORTFOLIO</button>
              </div>
            : null
          :
          null}
        </div>
        <div className='d-flex ' style={{marginTop:-10,marginLeft:'25%'}}> 
          <button onClick={()=>{setFormNo2(0);setItems(typeOneData);}} className={'btn'+(formNo2 === 0? " active": " non_active")} style={{border:'none',
          textDecoration:'none',outline:'none'}}>Shannon</button>
          <button onClick={()=>{setFormNo2(1);setItems(typeTwoData);}} className={'btn'+(formNo2 === 1? " active": " non_active")} style={{marginTop:-5,border:'none',
          textDecoration:'none',outline:'none'}}>Kid Shannon</button>
        </div>
      </div>
      </div>
      <div className='_4cols-v2-admin my-3'>  
        { 
        items?.length > 0 ? items.map((item,key)=>(
          item.status === 1 && item.hideImage == false ?
          <div key={key} className='artistcardAdminPortfolio w-inline-block' >
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
                    src={item.hideImage? unHide : hide } 
                    style={{width:"20px", height:"20px", marginTop:"1vh", }} 
                    onClick={() => toggleImageVisibilityHandler(item)}
                  />
              </div>
              <img 
                key={key}
                style={{cursor: "pointer"}} 
                onClick={()=>props.history.push({pathname:"/admin/artists/"+item._id,state: { selectedArtist: props.selectedArtist,selectedImages:props.selectedImages }})}  
                alt='LOADING' 
                src={item.subImage[0].path} 
                className="image"
                loading="eager"
              />
          </div>:""
        )):""
      }
      </div>
   </>

    }
      <div className='row mt-5'>
       <h2>  INACTIVE IMAGES </h2>
      </div>
      <div className='_4cols-v2-admin my-3'>  
        { 
        items?.length > 0 ? items.map((item,key)=>(
          item.status === 1 && item.hideImage == true ?
          <div key={key} className='artistcardAdminPortfolio w-inline-block' >
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
                    src={item.hideImage? unHide : hide } 
                    style={{width:"20px", height:"20px", marginTop:"1vh", }} 
                    onClick={() => toggleImageVisibilityHandler(item)}
                    loading="eager"
                  />
              </div>
              <img 
                style={{cursor: "pointer"}} 
                onClick={()=>props.history.push({pathname:"/admin/artists/"+item._id,state: { selectedArtist: props.selectedArtist,selectedImages:props.selectedImages }})}  
                alt='' 
                src={item.subImage[0].path} 
                className="image"
                loading='eager'
              />
          </div>:""
        )):""
      }
      </div>
      <div style={{ paddingBottom: "50px" }}>
      <div className='row'>
        <div className='col-12 p-0'>
          <h2> IMAGES SUBMISSIONS</h2>
        </div>
      </div>
      <div className='row m-0'>
        <div className='_4cols-v2-admin my-3'>  
            {Object.keys(props.selectedImages).length > 0 ? props.selectedImages.mainImage.map((item,key)=>
                (item.statusSubmit === 1 && item.status === 0?
                  <div key={key} onClick={()=>props.history.push({pathname:"/admin/artists/"+item._id,state: { selectedArtist: props.selectedArtist,selectedImages:props.selectedImages }})} className='artistcardAdminPortfolio w-inline-block'>
                    <img alt='' src={item.path} className="image" style={{cursor:"pointer"}} />
                  </div>
                :null)
              )
            :""}
        </div>
      </div>
    </div>
    <div className='mt-5'></div>
    </>
  )
}

export default Portfolio