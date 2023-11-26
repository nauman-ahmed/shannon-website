import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory, getCategory, updateKeyword, deleteKeyword, keywordImageUpdate } from '../../../AxiosFunctions/Axiosfunctionality'
import MyPopup from '../../../components/myPopup/myPopup'
import { updateMessage, updateOpen } from '../../../redux/message'
import "../admin.css"
import loading from '../../../assets/loading.gif';
import DUMMY from '../../../assets/img/1695387962634--sub_image_0.jpg';

function Categories() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false)
  const [categories,setCategories] = useState([]);
  const [type,setType]= useState(0);
  const [updatekeyword,setUpdateKeyword]= useState("");
  const [keyword,setKeyword]= useState("");
  const [holder,setHolder] = useState(false);
  const [uploadImage,setUploadImage] = useState(false);

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


  const onChageUpdateKeywordHandler = (e) => {
    let tempKeyword = {...updatekeyword}
    tempKeyword.keyword = e.target.value
    setUpdateKeyword(tempKeyword)
  }

  const updateKeywordHandler = (op,data) => {
    if(op == "delete"){
      deleteKeyword({_id:data._id}).then((res)=>{
        if(res == "delete Successfully"){
          populateCategory();
        }
      })
    }else if(op == "update"){
      updateKeyword(data).then((res)=>{
        if(res == "Successfully Updated"){
          populateCategory();
        }
      })
    }
  }

  const changePageHandler = async (e,keyword) => {

    if(e.target.files.length > 0){
      setUploadImage(true)
      const imageCreate = new FormData()
      imageCreate.append('keywordImage',e.target.files[0])
      imageCreate.append('keywordId',keyword._id)
      setFile(e.target.files[0])
      console.log(keyword)
      let response = await keywordImageUpdate(imageCreate)
      if(response == "Error In Uploading/Updating"){
        setIsPopupOpen(false)
        setIsPopupOpenUpdate(false)
        dispatch(updateOpen(true))
        dispatch(updateMessage(response));
        setFile(null)
        setUploadImage(false)
        return
      }
      setIsPopupOpen(false)
      setIsPopupOpenUpdate(false)
      dispatch(updateOpen(true))
      dispatch(updateMessage(response));
      setUploadImage(false)
      setFile(null)
      populateCategory();
      console.log("changePageHandler",e.target.files,keyword)
    }


  }

  return (
  <div className='px-xl-5 mx-xl-5'>
    <div className='row scrollerOn py-5'>
      <div className='col-lg-12'>
        <div className='column-5'>
        {categories.length >0?categories.map((item,key)=>(
          item.type === 3? <p style={{cursor:"pointer"}} key={key} onClick={()=>{setUpdateKeyword(item);setIsPopupOpenUpdate(true);setIsPopupOpen(true);}}>{item.keyword}</p>:""
        )):""}
        </div>
        <button onClick={()=>{setIsPopupOpen(true);setType(3)}} className='myBtn mt-5 float-right'>ADD KEYWORD</button>
      </div>
    </div>
    {isPopupOpen?
      <MyPopup BackClose CloseBtn onClose={()=>{setIsPopupOpen(false); setIsPopupOpenUpdate(false); setType(3)}}>
        {isPopupOpenUpdate ? 
          <div className='my-4 p-0' style={{minWidth: 300, width: "25vw"}}>
            <label className='d-flex'>
                <div style={{minWidth:80, marginTop:10}}>Keyword</div>
                <input className='textField dark' value={updatekeyword.keyword} onChange={onChageUpdateKeywordHandler}/>
            </label>
            <div className='d-flex justify-content-end'>
              {holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button onClick={(e)=>{setIsPopupOpen(false);setKeyword("");updateKeywordHandler("update",updatekeyword);}} className='myBtn dark mt-2 float-right'>UPDATE</button>}
              {holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button  onClick={(e)=>{setIsPopupOpen(false);setKeyword("");updateKeywordHandler("delete",updatekeyword);}} className='myBtn dark mt-2 ml-3 float-right'>DELETE</button>}
            </div>
            <div className='d-flex justify-content-between my-3'  style={{marginLeft:10}}>
              <div className='artistcardAdmin w-inline-block'>
                <img style={{ objectFit: "contain", maxWidth: "300px"}} alt='' src={ file ? URL.createObjectURL(file) : updatekeyword.imagePath == "Dummy" ? DUMMY :  updatekeyword.imagePath } className="image"/>
              </div>
              <label className='d-flex justify-content-between align-items-end mx-2'>
                {uploadImage?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<a className="myBtn dark" style={{fontSize:"larger", cursor:"pointer"}}>Upload</a>}
                <input hidden type="file" onChange={(e)=>changePageHandler(e,updatekeyword)}/>
              </label>
            </div>
          </div>
          :
          <div className='my-4 p-0' style={{minWidth: 300, width: "25vw"}}>
            <label className='d-flex'>
                <div style={{minWidth:80, marginTop:10}}>Keyword</div>
                <input className='textField dark' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}}/>
            </label>
            {holder?<img className='mt-1' alt="loading" src={loading} style={{width:"30px"}}/>:<button onClick={(e)=>{setIsPopupOpen(false);setKeyword("");AddCategory();}} className='myBtn dark mt-2 float-right'>ADD</button>}
          </div>
        }
      </MyPopup>:null
    }
  </div>
  )
}

export default Categories