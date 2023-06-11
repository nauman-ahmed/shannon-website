import React, { useEffect, useState } from 'react'
import loading from '../../../assets/loading.gif';
import { allCityGetter,allStateGetter } from '../../../redux/StateCity'

function Shannon(props) {

    const [contact, setContact] = useState("")
    const [company, setCompany] = useState("")


    useEffect(() => {

        if(props.content.length > 0){
            setContact(props.content[0].content[0].name);
            setCompany(props.content[0].content[1].name);
        }

    }, [props.content]) 

    return (
        <div className='row px-5 mx-5 mt-5'>
            <label className='col-md-12'>
                <div className='mb-3'>Contact Info</div>
                <input className='textField'  value={contact} onChange={(e)=>{setContact(e.target.value)}}/>
            </label>
            <label className='col-md-12'>
                <div className='mb-3'>Company Info</div>
                <input className='textField' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            </label>
            <div className='col-12 d-flex justify-content-end'>
                <button className='mx-1 myBtn active sm' onClick={()=> props.uploadContent({type:"SHANNON",content:[{name:contact},{name:company}]})}>Update</button>
            </div>
        </div>
    )
} 

export default Shannon