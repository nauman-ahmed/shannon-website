import React, { useEffect, useState } from 'react'
import "./input.css"
import SearchIcon from "../../assets/svgs/searchImage.svg"
function Input(props) {
    const uniqueId = new Date().getTime()
    const [state, setState] = useState({
        type:"text",
        label:"please add label attr.",
        name:"please add name attr.",
        option:[],
    })
    const [value, setValue] = useState("")
    const [active, setActive] = useState(false)
    useEffect(() => {
        let state1 = {...state}
        if("type" in props){
            state1.type = props.type
        }
        if("label" in props){
            state1.label = props.label
        }
        if("name" in props){
            state1.name = props.name
        }
        if("option" in props){
            state1.option = props.option
        }
        setState(state1)
    }, [props.type,props.label,props.name,props.option])

    useEffect(() => {
      if("value" in props){
        setValue(props.value)
        if(props.value){
            setActive(true)
        }
      }
    }, [props.value])

    const onChangeHandler = (e) => {
        if("onChange" in props){
            setValue(e.target.value)
            props.onChange(e)
        }else{
            console.error("please add onChange attr. to get event")
        }
    }
    const onClickHandler = (e) => {
        if("onClick" in props){
            setValue(e)
            props.onClick({target:{value:e,name:state.name}})
        }else{
            console.error("please add onClick attr. to get event")
        }
    }
    const onBlurHandler = () => {
        if(!value){
            setActive(false)
        }
    }
  return (
    state.type === "search"?
        <label id={"input_"+(uniqueId)} htmlFor={state.type+"_"+(uniqueId)} className='searchField btn btn-light' onChange={(e)=>{onChangeHandler(e)}}>
            <input id={state.type+"_"+(uniqueId)} type="text" value={value} placeholder={state.label} name={state.name} onChange={(e)=>{onChangeHandler(e)}}/>
            <button onClick={(e)=>onClickHandler(value)}>
                <img alt="" src={SearchIcon}/>
            </button>
        </label>
        :<label id={"input_"+(uniqueId)} className='myInput' htmlFor={state.type+"_"+(uniqueId)}>
            <div className={'label '+(active?"active":"")}>{state.label}</div>
            {state.type === "select"?
            <input id={state.type+"_"+(uniqueId)} onFocus={()=>setActive(true)}  onBlur={()=>onBlurHandler()} value={value} type={state.type} name={state.name} onChange={(e)=>{onChangeHandler(e)}}/>
            :<input id={state.type+"_"+(uniqueId)} onFocus={()=>setActive(true)}  onBlur={()=>onBlurHandler()} value={value} type={state.type} name={state.name} onChange={(e)=>{onChangeHandler(e)}}/>}
        </label>
  )
}

export default Input