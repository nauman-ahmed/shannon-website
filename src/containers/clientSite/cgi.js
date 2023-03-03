import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCgi } from '../../AxiosFunctions/Axiosfunctionality'
import loading from '../../assets/loading.gif';
import { IMAGE_ROUTE } from '../../AxiosFunctions/Axiosfunctionality';

const images = window.location.origin+"/assets/images"

function CGI(props) {

  
  const [data,setData] = useState(null)
  const [dataOriginal,setDataOriginal] = useState(null)
  const [tempArtist,setTempArtist]= useState([]);

  const filterChange= (filter) => {

    let tempData = [...data];
    setDataOriginal([...data])
    if(filter==="A-Z"){
      tempData = tempData.sort((a, b) => a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize()));
    }
    else if (dataOriginal){
      tempData = [...dataOriginal];
      // tempData = dataOriginal;
    }

    setData(tempData);

  }
  useEffect(()=>{
    getCgi().then((res)=>{
      setData(res)
    })
  },[])

  const updateTempArtist = (e)=>{
    if(data){
      console.log(e)
      const searchvalue = e.toLowerCase();
      setTempArtist( data !== undefined ? data.filter(function (element) {
          let checker = false
          if(element.artistId.firstname.toLowerCase().includes(searchvalue) || element.artistId.lastname.toLowerCase().includes(searchvalue)){
              checker = true
          }
          return checker;
  
      }):[]);
    }
}

  useEffect(() => {
    updateTempArtist(props.searchArtist)
  }, [props.searchArtist]);


  return (
    <>
     <div class="sortingcont right mt-0 me-0">
    <a sort-by=".order" href="#" class="filter-button w-inline-block" onClick={()=>filterChange("Default")}>
      <div>DEFAULT</div>
    </a>
    <a sort-by=".name" href="#" class="filter-button w-inline-block" onClick={()=>filterChange("A-Z")}>
      <div>ALPHABETICAL A-Z</div>
    </a>
  </div>
<div className="_2cols" style={{clear:"both"}}>
{props.children}
<div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403e-576fcec6" className="divisionscolumn">
<div id="w-node-_4a165d69-02be-f2c1-10f5-69fa4946403f-576fcec6" className="divisioncontainer">

 
  <div id="w-node-_4a165d69-02be-f2c1-10f5-69fa49464043-576fcec6" className="_4cols-v2">
  { data == null && props.searchArtist === "" ?
        (
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            <img
              className="mb-3"
              alt="loading"
              src={loading}
              style={{ width: "50px" }}
            />
          </div>
        ) :
        data && props.searchArtist === "" ?  (
          data.map((val, ind) => (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={"/artists/" + val.artistId._id}
                className="artistcard  w-inline-block"
              >
                <img
                  src={String(val.ImageData[0].mainImage[0].subImage[0].path)}
                  loading="lazy"
                  alt=""
                  className="image"
                />
                {/* <p className="card_img_text2">
                {val.artistId.firstname} {val.artistId.lastname} </p> */}
                {/* <div className="artistnamediv">
                  <div className="artistnametext">
                    {val.artistId.firstname} {val.artistId.lastname} 
                  </div>
                </div> */}
                <div className="artistnamediv">
                  <div className="artistnametext-v3">
                  {val.artistId.firstname}  {val.artistId.lastname} 
                  </div>
                </div>
              </Link>
              </>
        )))
        : 
        (
          tempArtist.map((val, ind) => (
            <>
              <Link
                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                to={"/artists/" + val.artistId._id}
                className="artistcard  w-inline-block"
              >
                <img
                  src={String(val.ImageData[0].mainImage[0].subImage[0].path)}
                  loading="lazy"
                  alt=""
                  className="image"
                />
                {/* <p className="card_img_text2 pt-2"> 
                {val.artistId.firstname} {val.artistId.lastname} </p> */}
                {/* <div className="artistnamediv">
                  <div className="artistnametext">
                    {val.artistId.firstname} {val.artistId.lastname} 
                  </div>
                </div> */}
                <div className="artistnamediv">
                  <div className="artistnametext-v3">
                  {val.artistId.firstname}  {val.artistId.lastname} 
                  </div>
                </div>
              </Link>
              </>
        )))
        
        }
    
  </div>
</div>
</div>
</div></>
  )
}

export default CGI