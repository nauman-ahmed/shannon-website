import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { artistDataId, updateArtistBio, updateArtistData } from '../../AxiosFunctions/Axiosfunctionality';
import Input from '../../components/input/input'
import { updateMessage, updateOpen } from '../../redux/message';
import "./admin.css"
import ArtistsList from './artistsPages/artistsList';
import Edit from './artistsPages/edit';
import ImgSubmission from './artistsPages/imgSubmission';
import Portfolio from './artistsPages/portfolio';
import loading from './../../assets/loading.gif';

function Artists(props) {

    const historyCurrent = useHistory()

    const dispatch = useDispatch();
    const [formNo2, setFormNo2] = useState(2)
    const [search, setSearch] = useState("")
    const [selectedArtist,setSelectedArtist] = useState({});
    const [selectedImages,setSelectedImages] = useState({});
    const [seletedBio,setSelectedBio] = useState("");
    const [holder,setHolder]= useState(false);
    const [tempArtist,setTempArtist] = useState([]);

    const populateImageArtist = (data) =>{
        let params = {
            artistId : data._id
        }
        setHolder(true)
        artistDataId(params).then((res)=>{
            if(res == "ERROR"){
                setSelectedImages([]);
            }else if(res.length > 0){
                setSelectedImages(res[0]);
            }
            setHolder(false)
        })
    }

    useEffect(()=>{

        if(historyCurrent.location.state){
            checkCurrentUserLocalStorage()
            formChangeEvent(historyCurrent.location.state,true)           
            return
        }
        checkCurrentUserLocalStorage()
    },[])

    const checkCurrentUserLocalStorage = () => {

        const curr = JSON.parse(localStorage.getItem("currentArtist"));
        if(curr){
            populateImageArtist(curr);
            setSelectedArtist(curr);
            setSelectedBio(curr.bio);
        }
    }

    const formChangeEvent = (data,state=false) => {

        props.setFormNo(1)
        if(state){
            setFormNo2(2)
        }else{
            setFormNo2(2)
        }
        if(!data._id){
            checkCurrentUserLocalStorage()
            return
        }
        localStorage.setItem('currentArtist',JSON.stringify(data))
        setSelectedImages([])
        populateImageArtist(data);
        setSelectedArtist(data);
        setSelectedBio(data.bio);
        setSearch("")
    }

    const updateArtistBioData = (e,data)=>{

        setHolder(true)
        updateArtistBio(data).then((res)=>{
            setHolder(false)
            dispatch(updateOpen(true))
            dispatch(updateMessage(res));
            props.populateArtistUsers();
        })
    }

    const updateArtist = (e,data)=>{

        setHolder(true)
        updateArtistData(data).then((res)=>{
            console.log("PRODUCTION 1",res)
            setHolder(false)
            dispatch(updateOpen(true))
            dispatch(updateMessage(res));
            props.populateArtistUsers();
            props.setFormNo(0); 
            setFormNo2(0);
        })
    }
    const changeArtistData = (e)=>{

        setSearch(e.target.value);
        const searchvalue = e.target.value.toLowerCase();
        setTempArtist(props.artistUsers.filter(function (element) {
            return element.firstname.toLowerCase().includes(searchvalue) || element.lastname.toLowerCase().includes(searchvalue) || (element.status === 1 && searchvalue.includes("active")) || (element.status === 0 && searchvalue.includes("inactive"));
        }));
 
    }
    
    const handleChangeText = (text)=>{
        text = text !== "<p><br></p>" ? text : "";
        setSelectedBio(text);
    }

    const  modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'},{'color':["black","red","blue","green"]}],
          ['link'],
          ['clean']
        ],
      }

    const updateSelectedImagesArray = (data) => {
        let temp = {...selectedImages}
        temp.mainImage = data
        setSelectedImages(temp)
    }

    return (
        <div className='px-xl-5 mx-xl-5'>
        <div className={'mx-lg-5 px-lg-3 pb-4 ml-5 d-flex flex-column'+(props.formNo === 1?" align-items-center":"")}>
        
            {
            props.formNo === 1?
            <>
                {/* {formNo2 == 4 ?
                    <div className='mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex justify-content-end w-100'>
                        <Input
                        type="search"
                        label="Search"
                        value={search}
                        onChange={(e)=>{changeArtistData(e)}}/>
                    </div>
                    :
                    null
                } */}
                <h4>
                    {selectedArtist.lastname} {selectedArtist.firstname}
                </h4>
                <div className='col-6 p-0 subNavBar d-flex justify-content-between'>
                    <button onClick={()=>setFormNo2(0)} className={'btn'+(formNo2 === 0? " active": "")}>Bio</button>
                    {/* <button onClick={()=>setFormNo2(1)} className={'btn'+(formNo2 === 1? " active": "")}>Image Submissions</button> */}
                    <button onClick={()=>setFormNo2(2)} className={'btn'+(formNo2 === 2? " active": "")}>Portfolio</button>
                    <button onClick={()=>setFormNo2(3)} className={'btn'+(formNo2 === 3? " active": "")}>Edit</button>
                    <button onClick={()=>setFormNo2(4)} className={'btn'+(formNo2 === 4? " active": "")}>Similar Artists</button>
                </div>
            </>
            :
            <div className='mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex justify-content-between'>
                <h4>ARTISTS</h4>
                <Input
                type="search"
                label="Search"
                value={search}
                onChange={(e)=>{changeArtistData(e)}}/>
            </div>
            }
            
        </div>
        <div className='px-3 mx-5'>
        {
            props.formNo === 1?
                formNo2 === 1?
                <ImgSubmission 
                    holder = {holder}
                    history={props.history} 
                    selectedArtist = {selectedArtist}
                    selectedImages = {selectedImages}
                />
                :formNo2 === 2?
                <Portfolio 
                    history={props.history}
                    selectedArtist = {selectedArtist}
                    selectedImages = {selectedImages}
                    updateSelectedImagesArray = {updateSelectedImagesArray}
                    holder = {holder}
                />
                :formNo2 === 3?
                <Edit 
                holder={holder}
                selectedArtist = {selectedArtist} 
                setFormNo={(e)=>props.setFormNo(e)} 
                setFormNo2={(e)=>setFormNo2(e)}
                updateArtist={updateArtist}
                />
                :formNo2 === 4?
                    <ArtistsList 
                        search = {search}
                        tempArtist = {tempArtist}
                        holder = {holder}
                        artistUsers={props.artistUsers}
                        deleteArtistUser={props.deleteArtistUser}
                        formChangeEvent={(e)=>formChangeEvent(e)}
                        reorderArtistHandler={props.reorderArtistHandler}
                        similarArtist={true}
                        selectedArtist = {selectedArtist}
                    />
                : 
                // https://www.npmjs.com/package/react-quill
                <>
                <ReactQuill 
                    value={seletedBio} 
                    onChange={handleChangeText}
                    modules={modules}
                    />
                    <div className='col-12 d-flex justify-content-end'>
                        {holder?<img className='my-5' alt="loading" src={loading} style={{width:"30px"}}/>:<button className='my-5 myBtn active' onClick={(e)=>{updateArtistBioData(e,{_id:selectedArtist._id,bio:seletedBio})}}>UPDATE</button>}
                    </div>
                    </>
            : <ArtistsList 
            search = {search}
            tempArtist = {tempArtist}
            holder = {holder}
            artistUsers={props.artistUsers}
            deleteArtistUser={props.deleteArtistUser}
            formChangeEvent={(e)=>formChangeEvent(e)}
            reorderArtistHandler={props.reorderArtistHandler}
             />
        }
        </div>
    </div>
  )
}

export default Artists