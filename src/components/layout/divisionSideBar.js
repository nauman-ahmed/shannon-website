import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCategoryTypeOne } from '../../AxiosFunctions/Axiosfunctionality';

function DivisionSideBar(props) {

  const dispatch = useDispatch();
  // const  {keywordReducer} = useSelector(state=>state);
  const  [keywordReducer,setKeywordReducer] = useState([]);
  useEffect(()=>{
    getCategoryTypeOne().then(res => setKeywordReducer(res))
  },[])

  return (
    <div id="w-node-_783b3b4a-9daa-ecbf-356e-d84dbb36f4cc-bb36f4cc" className="respdivhide">
      {console.log(keywordReducer)}
      <h3 className="homeh3">DIVISIONS</h3>
      <div className="allartist v2">
        <Link to="/illustration-artists" className={"divisionslink"+(props.activeBtn === "illustration-artists"?" w--current":"")}><span className="sidebarlink">ILLUSTRATION<br /></span></Link>
        <Link to="/bipoc" className={"divisionslink"+(props.activeBtn === "bipoc"?" w--current":"")}><span className="sidebarlink">BIPOC<br /></span></Link>
        <Link to="/cgi" className={"divisionslink"+(props.activeBtn === "cgi"?" w--current":"")}><span className="sidebarlink">CGI</span></Link>
        <span className="sidebarlink"><br /></span>
        <span className="sidebarlink">KIDSHANNON<br /></span>
        <span className="sidebarlink">MOTION<br /></span>
        <span className="sidebarlink">MEDICAL</span>

       {keywordReducer.length > 0 ? keywordReducer.map((item,key)=>(
          <div key={key}>
          {item.type === 2?(<Link to={"/divisions/"+item.keyword}  className={"divisionslink"+(props.activeBtn === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
          
          </div>
       )):""}
        
        {keywordReducer.length > 0 ? keywordReducer.map((item,key)=>(
          <div key={key}>
          {item.type === 1?(<Link to={"/divisions/"+item.keyword} className={"divisionslink"+(props.activeBtn === item.keyword?" w--current":"")}><span className="sidebarlink">{item.keyword.toUpperCase()}<br /></span></Link>):""}
          
          </div>
       )):""}
        <br />
      </div>
    </div>
  )
}

export default DivisionSideBar