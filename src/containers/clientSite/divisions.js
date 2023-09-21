import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_ROUTE } from "../../AxiosFunctions/Axiosfunctionality";
import { artistDivision } from "../../redux/artistImageDivisionDataSlice";
import loading from "../../assets/loading.gif";

const images = window.location.origin + "/assets/images";

 function Divisions(props) {

  const [tempArtist,setTempArtist]= useState([]);
  const [filterCond,setFilterCond]= useState(true);
  const [filterHighlighted,setFilterHighlighted]= useState(null);


  const dispatch = useDispatch();
  const { artistImageDivisionDataSlice } = useSelector((state) => state);
  
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const filterChange= (filter) => {

    // let tempData = [...data];
    // setDataOriginal([...data])

    if(filter==="A-Z"){
      let temp = []
      setFilterCond(false)
      artistImageDivisionDataSlice.artistKeywordImages.map((val,ind) => {
        let tempImage = [...val.ImageData]
        tempImage = tempImage.sort((a, b) => {
          if(a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize()) === 0){
            console.log(a.artistId.firstname);
            console.log(b.artistId.firstname);
            return a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize())
          }else{
            return a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize());
          }
        });
        temp.push({...val,ImageData:tempImage})
      })
      setFilterHighlighted(2)
      setTempArtist(temp)
      // tempData = tempData.sort((a, b) => a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize()));
    }
    else{
      setFilterHighlighted(1)
      setFilterCond(true)
      // tempData = [...dataOriginal];
      // tempData = dataOriginal;
      // setData(tempData);

    }

  }

  const updateTempArtist = (e) => {
    if(artistImageDivisionDataSlice.artistKeywordImages.length){

      const searchvalue = e.toLowerCase();
      let temp = []

      artistImageDivisionDataSlice.artistKeywordImages.map((val,ind) => {
        let tempImage = val.ImageData.filter(function (element) {
          let checker = false
          if(element.artistId.firstname.toLowerCase().includes(searchvalue) || element.artistId.lastname.toLowerCase().includes(searchvalue)){
              checker = true
          }
          return checker;
      })
      temp.push({...val,ImageData:tempImage})
    })
    setFilterHighlighted(null)
    setTempArtist(temp)
    }
  }

  useEffect(() => {
    updateTempArtist(props.searchArtist)
  }, [artistImageDivisionDataSlice,props.searchArtist]);

  useEffect(() => { 
    localStorage.setItem("Category","none")
    dispatch(artistDivision({}));
  }, []);


  return (<>
      <div class="sortingcont right pt-0  me-0 ">
        <div className="d-flex right-filter-button">
              <a class={filterHighlighted == 1 ? "filter-button sort-active w-inline-block  mt-0" : (filterHighlighted == 2)? "filter-button w-inline-block  mt-0" : "filter-button sort-active w-inline-block  mt-0"} style={{ marginLeft: "0px" }} onClick={()=>filterChange("Default")}>
                <div >FEATURED</div>
              </a>
              <a class={filterHighlighted == 2 ? "filter-button sort-active mt-0 me-0" : "filter-button mt-0 me-0"} onClick={()=>filterChange("A-Z")}>
                <div >ALPHABETICAL A-Z</div>
              </a>
        </div>
      </div>
    <div className="_2cols2_">
      {props.children}
      <div
        id="w-node-_6f42e407-456f-5b2f-82e4-417072db3669-84f2d081"
        className="divisionscolumn"
      >
        <div
          id="w-node-_429c632c-0632-16be-f5b5-f2b7200da64a-84f2d081"
          className="divisioncontainer"
        >
          {artistImageDivisionDataSlice.loading ? (
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              <img
                className="mb-0"
                alt="loading"
                src={loading}
                style={{ width: "50px" }}
              />
            </div>
          ) : artistImageDivisionDataSlice.artistKeywordImages !== undefined ? (
            props.searchArtist === "" && filterCond ? (
              artistImageDivisionDataSlice.artistKeywordImages.map(
                (item, key) => (
                  <>
                    {item.ImageData.length > 0 && item.keyword != '3D Rendering' ? (
                      <>
                        <div className="d-flex mt-0 mb-2">
                          <h5 className="divisionHeading mt-0">
                            {
                              item.keyword == '3D Rendering' ? "CGI" 
                            :
                              item.keyword.toUpperCase()
                            } 
                          </h5> 
                          {/* <span style={{width:"100%", height:"1px", color:"#ce651e", border:"1px solid #ce651e", marginTop:"5.5px",marginLeft:6}}></span> */}
                        </div>
                        <div
                         id="w-node-a284be2a-4b91-3177-03eb-6614b24879c1-4bf2d022"
                         className="_4cols-v2div"
                          // style={{ paddingTop: "10px" }}
                        >
                          {item?.ImageData.map((item1, key1) => item1.artistId.status == 1 ?(
                            <>
                              <Link
                                key={key1}
                                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                                to={"/artists/" + item1.artistId._id}
                                className="artistcard w-inline-block"
                                onClick={()=> localStorage.setItem("Category",item.keyword)}
                              >
                                {/* <div className="detail_card4_h" style={{ position: "relative", overflow: "hidden" }}> */}
                                <img
                                  src={String(
                                    item1?.mainImage[0]?.subImage[0]?.path
                                  )}
                                  loading="lazy"
                                  alt=""
                                  className="image" 
                                // style={{ width: "100%", height: "100%" }}
                                />
                                  <div className="artistnamediv">
                                  <div className="artistnametext-v3">
                                  {item1.artistId.firstname}  {item1.artistId.lastname} 
                                  </div>
                                </div>
                              {/* <p className="card_img_text2 pt-2">
                              
                                    {item1.artistId.firstname}{" "}{item1.artistId.lastname}
                                    
                                  </p> */}
                                  {/* </div> */}
                              </Link>
                            </>
                          ):null)}
                        </div>
                        <div className="divisionbuttoncontainer" style={{ justifyContent: "flex-end" }}>
                          <Link
                            to={ 
                              item.keyword == "Illustration" ? "illustration-artists"
                              : item.keyword == "3D Rendering" ? "cgi"
                              : item.keyword == "Photography" ? "photography"
                              : item.keyword == "Medical" ? "medical"
                              : null
                            }
                            className="talentbuttonSeeMore"
                            style={{ textDecoration: "none" }}
                          >
                            SEE MORE <div className="mx-2"> <img src={images+"/seeMore.svg"} style={{width:"6px"}}/> </div>
                          </Link>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )
              )
            ) : (
              tempArtist.map((item, key) => ( 
                <>
                  {item.ImageData.length > 0 && item.keyword != '3D Rendering'? (
                    <>
                      <div className="d-flex mt-0 mb-2">
                          <h5 className="divisionHeading mt-0">
                            {
                              item.keyword == '3D Rendering' ? "CGI" 
                            :
                              item.keyword.toUpperCase()
                            } 
                          </h5> 
                          {/* <span style={{width:"100%", height:"1px", color:"#ce651e", border:"1px solid #ce651e", marginTop:"5.5px", marginLeft:6}}></span> */}
                        </div>
                      <div
                        id="w-node-f734ee66-0b58-4c14-e08b-49ceded015c9-84f2d081"
                        className="detail_card3"
                        // style={{ paddingTop: "10px" }}
                      >
                        {item.ImageData.map((item1, key1) => item1.artistId.status!=0?(
                          <>
                            <Link
                                key={key1}
                                id="w-node-a284be2a-4b91-3177-03eb-6614b24879c7-4bf2d022"
                                data-w-id="a284be2a-4b91-3177-03eb-6614b24879c7"
                                to={"/artists/" + item1.artistId._id}
                                className="artistcard w-inline-block"
                                onClick={()=> localStorage.setItem("Category",item.keyword)}
                              >
                                {/* <div className="detail_card4_h" style={{ position: "relative", overflow: "hidden" }}> */}
                                <img
                                  src={String(
                                    item1?.mainImage[0]?.subImage[0]?.path
                                  )}
                                  loading="lazy"
                                  alt=""
                                  className="image" 
                                // style={{ width: "100%", height: "100%" }}
                                />
                                  <div className="artistnamediv">
                                  <div className="artistnametext-v3">
                                  {item1.artistId.firstname}  {item1.artistId.lastname} 
                                  </div>
                                </div>
                              {/* <p className="card_img_text2 pt-2">
                              
                                    {item1.artistId.firstname}{" "}{item1.artistId.lastname}
                                    
                                  </p> */}
                                  {/* </div> */}
                              </Link>
                          </>
                        ):null)}
                      </div>
                      <div className="divisionbuttoncontainer" style={{ justifyContent: "flex-end" }}>
                        <Link
                          to={ 
                            item.keyword == "Illustration" ? "illustration-artists"
                            : item.keyword == "3D Rendering" ? "cgi"
                            : item.keyword == "Photography" ? "photography"
                            : item.keyword == "Medical" ? "medical"
                            : null
                          }
                          className="talentbuttonSeeMore"
                          style={{ textDecoration: "none" }}
                        >
                          SEE MORE <div className="mx-2"> <img src={images+"/seeMore.svg"} style={{width:"6px"}}/> </div>
                        </Link>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ))
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div></>
  );
}

export default Divisions;
