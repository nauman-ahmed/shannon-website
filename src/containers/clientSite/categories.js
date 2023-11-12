import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_ROUTE } from "../../AxiosFunctions/Axiosfunctionality";
import { artistKeyword } from "../../redux/artistImageKeywordDataSlice";
import loading from "../../assets/loading.gif";

const images = window.location.origin + "/assets/images";

function Categories(props) {

  const [tempArtist, setTempArtist] = useState([]);
  const [filterCond, setFilterCond] = useState(true);
  const [filterHighlighted,setFilterHighlighted]= useState(null);

  const dispatch = useDispatch();
  const { artistImageKeywordDataSlice } = useSelector((state) => state);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  const filterChange = (filter) => {

    // let tempData = [...data];
    // setDataOriginal([...data])
    if (filter === "A-Z") {
      let temp = []
      let data = [...artistImageKeywordDataSlice.artistKeywordImages]
      
      setFilterCond(false)


      temp = data.sort((a, b) => a.keyword.normalize().localeCompare(b.keyword.normalize()));

      // artistImageKeywordDataSlice.artistKeywordImages.map((val, ind) => {
      //   let tempImage = [...val.ImageData]
      //   console.log(val,tempImage,artistImageKeywordDataSlice.artistKeywordImages)
      //   tempImage = tempImage.sort((a, b) => a.keyword.normalize().localeCompare(b.keyword.normalize()));
      //   temp.push({...val,ImageData:tempImage})
      // })
      setFilterHighlighted(2)
      setTempArtist(temp)
      // tempData = tempData.sort((a, b) => a.artistId.firstname.normalize().localeCompare(b.artistId.firstname.normalize()));
    }
    else {
      setFilterHighlighted(1)
      setFilterCond(true)
      // tempData = [...dataOriginal];
      // tempData = dataOriginal;
      // setData(tempData);

    }

  }

  const updateTempArtist = (e) => {
    if (artistImageKeywordDataSlice.artistKeywordImages.length) {
      const searchvalue = e.toLowerCase();
      let temp = []

      let tempImage = artistImageKeywordDataSlice.artistKeywordImages.filter(function (element) {
          let checker = false
          if (element.keyword.toLowerCase().includes(searchvalue)) {
            checker = true
          }
          return checker;
      })
      setFilterHighlighted(null)
      setTempArtist(tempImage)
    }
  }

  useEffect(() => {
    updateTempArtist(props.searchArtist)
  }, [artistImageKeywordDataSlice, props.searchArtist]);

  useEffect(() => {
    localStorage.setItem("Category","none")
    dispatch(artistKeyword({type:1}));
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
          {artistImageKeywordDataSlice.loading ? (
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              <img
                className="mb-2"
                alt="loading"
                src={loading}
              />
            </div> 
          ) : artistImageKeywordDataSlice.artistKeywordImages !== undefined ? (
            props.searchArtist === "" && filterCond ? (
              <div
              id="w-node-f734ee66-0b58-4c14-e08b-49ceded015c9-84f2d081"
              className="detail_card3 "
              // style={{ paddingTop: "10px" }}
            >
              {artistImageKeywordDataSlice.artistKeywordImages.map(
                (item, key) => (
                  item.ImageData.length > 0 && item.ImageData[0]?.mainImage[0]?.subImage[0]?.path ? 
                    <>
                      <>
                        <Link
                          key={key}
                          id="w-node-f734ee66-0b58-4c14-e08b-49ceded015ca-84f2d081"
                          to={item.keyword.includes("/") ?  "/categories/"+item.keyword.replace(/\//g, '_') : "/categories/"+item.keyword.replace(/\s/g, '_')}
                          className="artistcard w-inline-block"
                          
                        >
                          <img
                            src={String(
                              item.ImageData[0]?.mainImage[0]?.subImage[0]?.path
                            )}
                            loading="lazy"
                            alt=""
                            className="image"
                            onClick={()=>{localStorage.setItem("Category",item.keyword == '3D Rendering' ? "3D Rendering" : item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1) )}}
                          />
                          <div className="artistnamediv">
                              <div className="artistnametext-v3">
                              { item.keyword.toUpperCase() } 
                              </div>
                          </div>
                        </Link>
                      </>
                    </>
                    : null

                  
                )
              )}
              </div>

            ) : (
              <div
              id="w-node-f734ee66-0b58-4c14-e08b-49ceded015c9-84f2d081"
              className="detail_card3 "
              // style={{ paddingTop: "10px" }}
            >
              {tempArtist.map((item, key) => (
                item.ImageData.length > 0 && item.ImageData[0]?.mainImage[0]?.subImage[0]?.path ? 
                    <>
                    <>
                      <Link
                        key={key}
                        id="w-node-f734ee66-0b58-4c14-e08b-49ceded015ca-84f2d081"
                        to={item.keyword.includes("/") ?  "/categories/"+item.keyword.replace(/\//g, '_') : "/categories/"+item.keyword.replace(/\s/g, '_')}
                        className="artistcard w-inline-block"
                        
                      >
                        {/* <div className="detail_card4_h" style={{ position: "relative", overflow: "hidden" }}> */}
                        <img
                          src={String(
                            item.ImageData[0]?.mainImage[0]?.subImage[0]?.path
                          )}
                          loading="lazy"
                          alt=""
                          className="image"
                          // style={{ width:"100%", height:"100%"}}
                          onClick={()=>{localStorage.setItem("Category",item.keyword == '3D Rendering' ? "3D Rendering" : item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1) )}}
                        />
                        <div className="artistnamediv">
                            <div className="artistnametext-v3">
                            { item.keyword.toUpperCase()} 
                            </div>
                          </div>
                      {/* <p className="card_img_text2 pt-2">
                      
                            {item1.artistId.firstname}{" "}{item1.artistId.lastname}                                    
                      </p>   </div>  */}
                      </Link>
                    </>
                </>
                    : null
              ))}</div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div></>
  );
}

export default Categories;
