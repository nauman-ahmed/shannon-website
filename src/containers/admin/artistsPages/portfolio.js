import React, { useEffect, useState } from 'react'
import { IMAGE_ROUTE,artistPortfolioOrder,getTypeTwoKeyword } from '../../../AxiosFunctions/Axiosfunctionality'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function Portfolio(props) {

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
    updateCharacters(tempDataOne)
   
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


      artistPortfolioOrder({
        id:props.selectedArtist._id,
        images:tempTypeTwo
      }).then(res=>{
        console.log('ENABELED',res)      
      })
    }
    setEnabled(!enabled)
  }

  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index,1)
    items.splice(result.destination.index,0,reorderedItem)
    if(formNo2 == 0){
      setTypeOneData(items)
    }else{
      setTypeTwoData(items)
    }
    updateCharacters(items)
  }
  
  if(enabled){
    return (
      <>
      <button className='m-2 myBtn active' onClick={enableHandler}>SUBMIT</button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>
            {(provided)=>(
              <div className='row m-0' {...provided.droppableProps} ref={provided.innerRef}>
                {
                Object.keys(props.selectedImages).length > 0 ?
                characters.map((item,key)=>(
                  item.status === 1?
                  <Draggable key={item._id} draggableId={item._id} index={key}>
                    {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='col-12 col-md-12 col-sm-12 artistcardAdmin w-inline-block'>
                      <img alt='' src={item.path} className="image"/>
                    </div>
                    )}
                  </Draggable>
                  :""
                  ))
                  :""
                }
                {provided.placeholder}
              </div>
            )}
        </Droppable>
        </DragDropContext>
      </>
    )
  }

  return (
    <>
    <div className='d-flex flex-column' style={{marginTop:-10,marginLeft:'25%'}}> 
       <button onClick={()=>{setFormNo2(0);updateCharacters(typeOneData);}} className={'btn'+(formNo2 === 0? " active": " non_active")} style={{border:'none',
      textDecoration:'none',outline:'none'}}>All Artist</button>
       <button onClick={()=>{setFormNo2(1);updateCharacters(typeTwoData);}} className={'btn'+(formNo2 === 1? " active": " non_active")} style={{marginTop:-5,border:'none',
      textDecoration:'none',outline:'none'}}>Kid Shanon</button>
       </div>
      {Object.keys(props.selectedImages).length > 0 ?
        formNo2 == 0 && typeOneData.length > 0 ?
          <button className='m-2 myBtn active' type="text" onClick={enableHandler}>ORDER PORTFOLIO</button>
        : formNo2 == 1 && typeTwoData.length > 0 ?
            <button className='m-2 myBtn active' type="text" onClick={enableHandler}>ORDER PORTFOLIO</button>
          : null
      :
      null}
      <div className='row m-0'>
        {
        characters.length > 0 ? characters.map((item,key)=>(
          item.status === 1?<div key={key} className='col-6 col-md-3 col-sm-4 artistcardAdmin w-inline-block'>
              <img alt='' src={item.path} className="image"/>
          </div>:""
        )):""
      }
      </div>
    </>
  )
}

export default Portfolio