import React, { useEffect, useState } from 'react'
import loading from '../../../assets/loading.gif';
import { allCityGetter,allStateGetter } from '../../../redux/StateCity'

function Image(props) {
    
    const [step1, setStep1] = useState("")
    const [step2, setStep2] = useState("")
    const [step3, setStep3] = useState("")
    const [step4, setStep4] = useState("")

    useEffect(() => {

        if(props.content.length > 0){
            setStep1(props.content[0].content[0].name);
            setStep2(props.content[0].content[1].name);
            setStep3(props.content[0].content[2].name);
            setStep4(props.content[0].content[3].name);
        }

    }, [props.content]) 


    return (
        <div className='row px-5 mx-5 mt-5'>
            <label className='col-md-12'>
                <div className='mb-3'>Step 1</div>
                <input className='textField'  value={step1}  onChange={(e)=>{setStep1(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div className='mb-3'>Step 2</div>
                <input className='textField' value={step2}  onChange={(e)=>{setStep2(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div className='mb-3'>Step 3.1</div>
                <input className='textField' value={step3}  onChange={(e)=>{setStep3(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div className='mb-3'>Step 3.2</div>
                <input className='textField' value={step4}  onChange={(e)=>{setStep4(e.target.value)}}/>
            </label>
            <div className='col-12 d-flex justify-content-end'>
                <button className='mx-1 myBtn active sm' onClick={()=> {
                    props.uploadContent({type:"IMAGE ",content:[
                        {name:step1},
                        {name:step2},
                        {name:step3},
                        {name:step4},
                    ]})}
                }>Update</button>
            </div>
        </div>
    )
} 

export default Image