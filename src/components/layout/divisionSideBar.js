import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getCategoryTypeOne, getArtistCategoryTypeOne } from '../../AxiosFunctions/Axiosfunctionality';
import { sortAlphaOrder, sortAlphaOrderKeyword } from '../../UserServices/Services'
import { useHistory } from 'react-router-dom'

function DivisionSideBar(props) {

  const { pages,search:search2 } = useParams()
  const { search } = useParams()
  const history = useHistory();

  const dispatch = useDispatch();
  const  {ArtistDataAPI} = useSelector(state=>state);
  const  [keywordReducer,setKeywordReducer] = useState([]);
  const [artistData, setArtistData]  = useState([])
  const currentArtist = useRef(0);
  let currArtist = "";

  let alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  
  useEffect(()=>{
    if(props.activeBtn === "illustration-artists" || props.activeBtn === "divisions"){ //|| props.activeBtn === "detailedPage"
      getArtistCategoryTypeOne({keyword:"ILLUSTRATION"}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }
    else if(props.activeBtn === "cgi"){
      getArtistCategoryTypeOne({keyword:"3D Rendering",type:1}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }
    else if(props.activeBtn === "photography"){
      getArtistCategoryTypeOne({keyword:"Photography",type:1}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }else if(props.activeBtn === "medical"){
      getArtistCategoryTypeOne({keyword:"Medical",type:1}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }else if(props.activeBtn === "motion"){
      getArtistCategoryTypeOne({keyword:"3D Rendering",type:1}).then(res => {
        setArtistData(
          sortAlphaOrder(res!==undefined?res.length>0?res:[]:[])
          )
        }
      )
    }else if(props.activeBtn === "detailedPage"){
      console.log(props.activeBtn);
      setArtistData(sortAlphaOrder(ArtistDataAPI.artistData!==undefined?ArtistDataAPI.artistData.length>0?ArtistDataAPI.artistData:[]:[]))
    }
    getCategoryTypeOne().then(res => { 
      setKeywordReducer(sortAlphaOrderKeyword(res!==undefined?res.length>0?res:[]:[]))})

    currArtist = ArtistDataAPI.artistData.filter(artist=> artist.firstname.toLowerCase() + artist.lastname.toLowerCase() === props.currentArtist);

  },[])

  useEffect(() => {
    
      let category = "";

      if(search2 === 'Action_Adventure' || search2 === "Children's Books_Products" || search2 === 'Vintage_Retro'){
        
        category = search2.replace("_",'/');

      }else{
        category = search2.replace("_"," ");
      }

      console.log(category);

      localStorage.setItem("Category",category);
    
  }, [search2])
  

  return (
    <div id="w-node-_783b3b4a-9daa-ecbf-356e-d84dbb36f4cc-bb36f4cc" className="respdivhide"> 
      <h3 className="homeh3" style={props.activeBtn === "detailedPage" ? {textDecorationLine:"none"} : { color:"#000000", fontFamily: "Montserrat, sans-serif", textUnderlineOffset : "5px", fontWeight: 800 }}>{
        props.activeBtn === "illustration-artists" ? "ILLUSTRATION" 
        : props.activeBtn === "cgi" ? "CGI" 
        : props.activeBtn === "photography" ? "PHOTOGRAPHY" 
        : props.activeBtn === "medical" ? "MEDICAL" 
        : props.activeBtn === "motion" ? "MOTION" 
        : props.activeBtn === "categories" ? "CATEGORIES" 
        : props.activeBtn === "detailedPage" ? "SELECT BY CATEGORY" 
        : "DIVISIONS"
        }</h3>
      {pages == "categories"? 
      keywordReducer?.length > 0 ? keywordReducer?.map((item,key)=>(
        <div key={key}>
          {item.type === 1?(<Link to={item.keyword.includes("/") ?  "/categories/"+item.keyword.replace(/\//g, '_') : "/categories/"+item.keyword.replace(/\s/g, '_')}  onClick={()=>{localStorage.setItem("Category",item.keyword == '3D Rendering' ? "3D Rendering" : item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1) )}} className={"divisionslink"+(localStorage.getItem("Category") === item.keyword && search2 ?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
        </div> 
     )):"" 
      : 
      <div className="allartist v2">
        <Link to="/illustration-artists" className={"divisionslink"+(props.activeBtn === "illustration-artists" ?" w--current":"")}><span className="sidebarlink">ILLUSTRATION<br /></span></Link>
        <Link to="/bipoc" className={"divisionslink"+(props.activeBtn === "bipoc"?" w--current":"")}><span className="sidebarlink">BIPOC<br /></span></Link>
        {/* <Link to="/cgi" className={"divisionslink"+(props.activeBtn === "cgi" || localStorage.getItem("Category") == "cgi" ?" w--current":"")}><span className="sidebarlink">CGI</span></Link> */}
        {/* <span className="sidebarlink"><br /></span> */}
        <a href="https://kidshannon.com" target="_blank" className="sidebarlink">KIDSHANNON<br /></a>
        <Link to="/medical" className={"divisionslink"+(props.activeBtn === "medical" || localStorage.getItem("Category") == "Medical" ?" w--current":"")}><span className="sidebarlink">MEDICAL<br /></span></Link>
        <Link to="/motion" className={"divisionslink"+(props.activeBtn === "motion" || localStorage.getItem("Category") == "motion" ? " w--current":"")}><span className="sidebarlink">MOTION</span></Link>
        <br /><br /><br /><br />
       {pages == "categories" && keywordReducer?.length > 0 ? keywordReducer?.map((item,key)=>(
          <div key={key}>
          {item.type === 1?(<Link to={"/divisions/"+item.keyword}  className={"divisionslink"+(props.activeBtn === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
          
          </div>
       )):""}
       <h3 className="homeh3" style={{textDecorationLine:"none"}}>SELECT BY ARTIST</h3>
        {alpha.map((item,key)=>
       (
        <div key={key}>
          {artistData[item] !== undefined ? (
          <div key={key} className="alphabets" >
            {item}<br/>
            {artistData[item].map((item1,key1)=>(
                <div key={key1}>
                 <Link 
                    to={item1.fullName}
                    className={"sidebarlink " + (item1.firstname.toLowerCase()+item1.lastname.toLowerCase() === props.currentArtist? "currentSidebar":"") } 
                    style={search === item1.fullName ? {color: "#fa8e37"} : {}}>
                    {item1.firstname.toUpperCase()} {item1.lastname.toUpperCase()}<br/>
                </Link>
                </div>
              ))}
            <br/>
          </div>
          ): ""}
       </div>
      ) 
      )}
        <br />
      </div>
      }
    </div>
  )
}

export default DivisionSideBar 