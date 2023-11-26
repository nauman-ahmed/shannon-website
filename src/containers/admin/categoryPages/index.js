import 'react-quill/dist/quill.snow.css';
import "../admin.css"

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Categories from './categories'
import CategoriesGraphicNovel from './graphicNovel'


function Artists(props) {


    const dispatch = useDispatch();
    const [formNo2, setFormNo2] = useState(1)
    

    useEffect(()=>{

    },[])

    

    return (
        <div className='px-xl-1'>
            <div className={'p-lg-3 ml-5 mt-3 d-flex flex-column align-items-center'}>
                <div className='col-6 p-0 subNavBar d-flex justify-content-between'>
                    <button onClick={()=>setFormNo2(1)} className={'btn'+(formNo2 === 1? " active": "")}>Keywords</button>
                    <button onClick={()=>setFormNo2(2)} className={'btn'+(formNo2 === 2? " active": "")}>Graphic Novel Keywords</button>
                </div>
            </div>
        <div className='px-1'>
        {
            formNo2 == 2 ?
                <CategoriesGraphicNovel/>
            :
                <Categories/>
        }
        </div>
    </div>
  )
}

export default Artists