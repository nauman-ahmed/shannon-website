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
    const [formNo2, setFormNo2] = useState(0)
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
            setHolder(false)
            if(res == "ERROR"){
                setSelectedImages([]);
            }else if(res.length > 0){
                setSelectedImages(res[0]);
            }
        })
    }
    const formChangeEvent = (data,state=false) => {
        props.setFormNo(1)
        if(state){
            setFormNo2(1)
        }else{
            setFormNo2(0)
        }
        populateImageArtist(data);
        setSelectedArtist(data);
        setSelectedBio(data.bio);
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
            return element.firstname.toLowerCase().includes(searchvalue) || (element.status === 1 && searchvalue.includes("active")) || (element.status === 0 && searchvalue.includes("inactive"));
        }));

    }
    
    const handleChangeText = (text)=>{
        text = text !== "<p><br></p>" ? text : "";
        setSelectedBio(text);
    }

    useEffect(()=>{
        if(historyCurrent.location.state){
            formChangeEvent(historyCurrent.location.state,true)           
            return
        }
        const curr = JSON.parse(localStorage.getItem("currentArtist"));
        if(curr){
            populateImageArtist(curr);
            setSelectedArtist(curr);
            setSelectedBio(curr.bio);
        }
    },[])

    return (
        <div className='px-xl-5 mx-xl-5'>
            
        <div className={'mx-lg-5 px-lg-3 py-4 mt-3 ml-5 d-flex flex-column'+(props.formNo === 1?" align-items-center":"")}>
            {
            props.formNo === 1?
            <>
                <h4>
                    {selectedArtist.lastname} {selectedArtist.firstname}
                </h4>
                {/* <p className='text-center'>
                    {selectedArtist.address}
                </p> */}
                <div className='col-6 p-0 subNavBar d-flex justify-content-between'>
                    <button onClick={()=>setFormNo2(0)} className={'btn'+(formNo2 === 0? " active": "")}>Bio</button>
                    <button onClick={()=>setFormNo2(1)} className={'btn'+(formNo2 === 1? " active": "")}>Image Submissions</button>
                    <button onClick={()=>setFormNo2(2)} className={'btn'+(formNo2 === 2? " active": "")}>Portfolio</button>
                    <button onClick={()=>setFormNo2(3)} className={'btn'+(formNo2 === 3? " active": "")}>Edit</button>
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
        <div className='px-5 mx-5'>
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
                    />
                :formNo2 === 3?
                <Edit
                holder={holder}
                selectedArtist = {selectedArtist} 
                setFormNo={(e)=>props.setFormNo(e)} 
                setFormNo2={(e)=>setFormNo2(e)}
                updateArtist={updateArtist}
                />
                : 
                // https://www.npmjs.com/package/react-quill
                <>
                <ReactQuill 
                    value={seletedBio} 
                    onChange={handleChangeText}
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