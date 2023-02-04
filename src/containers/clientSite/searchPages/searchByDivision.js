import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { artistKeywordBased } from '../../../AxiosFunctions/Axiosfunctionality';
import loading from '../../../assets/loading.gif';

// const data = {
//     'action-adventure':{
//         title: "ACTION / ADVENTURE",
//         list: [
//             {href:"#",title:"LAURA CATRINELLA",imgSrc:"/Rectangle-152.2.png"},
//             {href:"#",title:"PETER BOLLINGER",imgSrc:"/Rectangle-153_1.png"},
//             {href:"#",title:"ANTONIO JAVIER CAPARO",imgSrc:"/IMG4.png"},
//             {href:"#",title:"SVETLA RADIVOEVA",imgSrc:"/Rectangle-155_1.png"},
//             {href:"#",title:"HOLLIE HIBBERT",imgSrc:"/Rectangle-160_2.png"},
//         ]
//     },
//     'book-cover':{
//         title: "BOOK COVER",
//         list: []
//     }
// }
function SearchByDivision(props) {
    const {search} = useParams();
    const [data,setData] =  useState({})
    const [loader,setLoading] = useState(false);
    useEffect(()=>{
        function dataLoader(){
            setLoading(true);
            artistKeywordBased({Id:search}).then((res)=>{

                if(res !== undefined){
                    let listData = [];
                    let tempData = {};
                    res.data.forEach((item,key)=>{
                        listData.push({href:item.mainImage[0].path,title:item.mainImage[0].title,imgSrc:item.mainImage[0].path})
                    })
                    tempData[search] = {title:res.keywordData[0].keyword,list:listData}
                    setData(tempData)
                }
                setLoading(false);
            })
    

    
        }
        dataLoader();
    },[])
  return (
    <div className="_2cols">
        {props.children}
        
        {loader ?
            <div style={{position:"absolute",top:"50%",left:"50%"}}><img className="mb-3" alt="loading" src={loading} style={{width:"50px"}}/></div>:
            data[search] !== undefined ?
         ( 
        <div id="w-node-_836ff364-6701-deed-80f1-e641575ae996-3cf2d075" className="divisionscolumn">
            <div id="w-node-_836ff364-6701-deed-80f1-e641575ae997-3cf2d075" className="divisioncontainer">
                <div className="divisiondivider grad">
                    <h2 className="divisionh2">{data[search].title}</h2>
                </div> 
                 <div id="w-node-_836ff364-6701-deed-80f1-e641575ae99b-3cf2d075" className="_4cols-v2">
                    {
                        data[search].list.map((row,key)=>
                  
                            <Link key={key} id="w-node-_836ff364-6701-deed-80f1-e641575ae99c-3cf2d075" to={row.href} className="artistcard w-inline-block"><img src={row.imgSrc} loading="lazy" alt="" className="image"/>
                                <div className="artistnamediv">
                                    <div className="artistnametext">{row.title}</div>
                                </div>
                            </Link>
                   
                        )
                    }
                </div>
            </div>
        </div>):("")}
       
    </div>
  )
}

export default SearchByDivision