import React, { useState } from 'react'
import { IMAGE_ROUTE,artistPortfolioOrder } from '../../../AxiosFunctions/Axiosfunctionality'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function Portfolio(props) {

  const [characters,updateCharacters] = useState(props.selectedImages.mainImage)
  const [enabled,setEnabled] = useState(false)

  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index,1)
    items.splice(result.destination.index,0,reorderedItem)
    updateCharacters(items)
  }

  const enableHandler = () => {

    if(enabled){
      for(let i = 0; i < characters.length; i++){
        characters[i].orderPortfolio = i
      };
      
      artistPortfolioOrder({
        id:props.selectedArtist._id,
        images:characters
      }).then(res=>{
        console.log('ENABELED',res)      
      })
    }
    setEnabled(!enabled)
  }

  if(enabled){
    return (
      <>
      <button className='m-2 myBtn active' type="text" onClick={enableHandler}>SUBMIT</button>
      {/* <button onClick={enableHandler}>{enabled?"Submit":"Enable"}</button> */}
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
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='col-12 col-md-12 col-sm-12 artistcard w-inline-block'>
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
      {Object.keys(props.selectedImages).length > 0 ?
      <button className='m-2 myBtn active' type="text" onClick={enableHandler}>ORDER PORTFOLIO</button>
      :
      null}
      {/* <button onClick={enableHandler}>Enable</button> */}
      <div className='row m-0'>
        {
        Object.keys(props.selectedImages).length > 0 ? characters.map((item,key)=>(
          item.status === 1?<div key={key} className='col-6 col-md-3 col-sm-4 artistcard w-inline-block'>
              <img alt='' src={item.path} className="image"/>
          </div>:""
        )):""
      }
      </div>
    </>
  )
}

export default Portfolio