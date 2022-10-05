import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory, getCategory } from '../../AxiosFunctions/Axiosfunctionality'
import MyPopup from '../../components/myPopup/myPopup'
import { updateMessage, updateOpen } from '../../redux/message'
import "./admin.css"
import loading from '../../assets/loading.gif';

function Categories() {
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [categories,setCategories] = useState([]);
  const [type,setType]= useState(0);
  const [keyword,setKeyword]= useState("");
  const [holder,setHolder] = useState(false);
  const populateCategory = ()=>{
    let data = {};
        getCategory(data).then((res)=>{
          setCategories(res)
        })
  }

  const AddCategory = (e)=>{
    if(keyword !== "" && type !== 0){
    let data = {
      keyword:keyword,
      type:type
    };
    setHolder(true)
      addCategory(data).then((res)=>{
        setHolder(false)
        dispatch(updateOpen(true))
        dispatch(updateMessage(res));
        populateCategory();
      })
    }
    else{
      dispatch(updateMessage("Check Your Fields"));
    }
  }
  useEffect(() => {
    populateCategory();
  }, [])

  return (
  <div className='px-xl-5 mx-xl-5'>
    <div className='mx-lg-5 px-lg-3 py-3 mt-3 ml-5 d-flex justify-content-between'>
        <h4>CATEGORIES</h4>
    </div>
    <div className='row scrollerOn py-5'>
      <div className='col-lg-6'>
        <h4 className='mb-4 text-center'>KEYWORD LISTING</h4>
        <div className='column-3'>
        {categories.length >0?categories.map((item,key)=>(
          item.type === 1? <div key={key}>{item.keyword}</div>:""
        )):""}
        </div>
        <button onClick={()=>{setIsPopupOpen(true);setType(1)}} className='myBtn mt-5 float-right'>ADD KEYWORD</button>
      </div>
      <div className='col-lg-6'>
        <h4 className='mb-4 text-center'>KEYWORD LISTING KIDS</h4>
        <div className='column-2'>
        {categories.length >0?categories.map((item,key)=>(
          item.type === 2? <div key={key}>{item.keyword}</div>:""
        )):""}
        </div>
        <button onClick={()=>{setIsPopupOpen(true);setType(2);}} className='myBtn mt-5 float-right'>ADD KEYWORD</button>
      </div>
    </div>
    {isPopupOpen?
      <MyPopup BackClose CloseBtn onClose={()=>{setIsPopupOpen(false);setType(0)}}>
        <div className='my-4 p-0' style={{minWidth: 300, width: "25vw"}}>
            <label className='d-flex'>
                <div style={{minWidth:80, marginTop:10}}>Keyword</div>
                <input className='textField dark' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}}/>
            </label>
            {holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button onClick={(e)=>{setIsPopupOpen(false);setKeyword("");AddCategory();}} className='myBtn dark mt-2 float-right'>ADD</button>}
        </div>
      </MyPopup>:null
    }
  </div>
  )
}

export default Categories