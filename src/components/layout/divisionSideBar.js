import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getCategoryTypeOne, getArtistCategoryTypeOne } from '../../AxiosFunctions/Axiosfunctionality';
import { sortAlphaOrder } from '../../UserServices/Services'

function DivisionSideBar(props) {

  const { pages } = useParams()
  const { search } = useParams()

  const dispatch = useDispatch();
  // const  {keywordReducer} = useSelector(state=>state);
  const  [keywordReducer,setKeywordReducer] = useState([]);
  const [artistData, setArtistData]  = useState([])
  let alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  
  useEffect(()=>{
    if(props.activeBtn === "illustration-artists" || props.activeBtn === "divisions"){
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
    }
    getCategoryTypeOne().then(res => {
      setKeywordReducer(res)})
  },[])

  return (
    <div id="w-node-_783b3b4a-9daa-ecbf-356e-d84dbb36f4cc-bb36f4cc" className="respdivhide">
      <h3 className="homeh3" style={{color:"#C82E2E"}}>{
        props.activeBtn === "illustration-artists" ? "ILLUSTRATION" 
        : props.activeBtn === "cgi" ? "CGI" 
        : props.activeBtn === "photography" ? "PHOTOGRAPHY" 
        : props.activeBtn === "medical" ? "MEDICAL" 
        : props.activeBtn === "motion" ? "MOTION" 
        : props.activeBtn === "categories" ? "CATEGORIES" 
        : "DIVISIONS"
        }</h3>
      {pages == "categories"? 
      keywordReducer?.length > 0 ? keywordReducer?.map((item,key)=>(
        <div key={key}>

        {item.type === 1?(<Link to={"/divisions/"+item.keyword}  className={"divisionslink"+(props.activeBtn === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
        
        </div>
     )):"" 
      :
      <div className="allartist v2">
        <Link to="/illustration-artists" className={"divisionslink"+(props.activeBtn === "illustration-artists"?" w--current":"")}><span className="sidebarlink">ILLUSTRATION<br /></span></Link>
        <Link to="/bipoc" className={"divisionslink"+(props.activeBtn === "bipoc"?" w--current":"")}><span className="sidebarlink">BIPOC<br /></span></Link>
        <Link to="/cgi" className={"divisionslink"+(props.activeBtn === "cgi"?" w--current":"")}><span className="sidebarlink">CGI</span></Link>
        <span className="sidebarlink"><br /></span>
        <span className="sidebarlink">KIDSHANNON<br /></span>
        <Link to="/medical" className={"divisionslink"+(props.activeBtn === "medical"?" w--current":"")}><span className="sidebarlink">MEDICAL<br /></span></Link>
        <Link to="/motion" className={"divisionslink"+(props.activeBtn === "motion"?" w--current":"")}><span className="sidebarlink">MOTION</span></Link>
        <br /><br /><br /><br />
       {keywordReducer?.length > 0 ? keywordReducer?.map((item,key)=>(
          <div key={key}>
          {item.type === 2?(<Link to={"/divisions/"+item.keyword}  className={"divisionslink"+(props.activeBtn === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
          
          </div>
       )):""}
       <h3 className="homeh3" style={{textDecorationLine:"none"}}>SELECT BY ARTIST</h3>
        {alpha.map((item,key)=>
       (
        <div key={key}>
          {artistData[item] !== undefined ? (
          <div key={key}>
            {item}<br/>
            {artistData[item].map((item1,key1)=>(
              <div key={key1}>
               <Link to={"/artists/"+item1._id} className="sidebarlink">{item1.firstname.toUpperCase()} {item1.lastname.toUpperCase()}<br/></Link>
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