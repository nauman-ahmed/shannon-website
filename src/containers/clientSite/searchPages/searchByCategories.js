import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IMAGE_ROUTE } from "../../../AxiosFunctions/Axiosfunctionality";
import { artistKeyword } from "../../../redux/artistImageKeywordDataSlice";
import loading from "../../../assets/loading.gif";

const images = window.location.origin + "/assets/images";

function Categories(props) {

  const [tempArtist, setTempArtist] = useState([]);
  const [filterCond, setFilterCond] = useState(true);
  const { search } = useParams();
  const dispatch = useDispatch();
  const { artistImageKeywordDataSlice } = useSelector((state) => state);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const filterChange = (filter) => {
    if (filter === "A-Z") {
      let temp = []
      setFilterCond(false)
      artistImageKeywordDataSlice.artistKeywordImages.map((val, ind) => {
        let tempImage = [...val.ImageData]
        tempImage = tempImage.sort((a, b) => a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize()));
        temp.push({ ...val, ImageData: tempImage })
      })
      setTempArtist(temp)
    }
    else {
      setFilterCond(true)
    }
  }

  const updateTempArtist = (e) => {
    if (artistImageKeywordDataSlice.artistKeywordImages.length) {
      const searchvalue = e.toLowerCase();
      let temp = []
      artistImageKeywordDataSlice.artistKeywordImages.map((val, ind) => {
        if(val.ImageData){
          let tempImage = val.ImageData.filter(function (element) {
            let checker = false
            if (element.artistId.firstname.toLowerCase().includes(searchvalue) || element.artistId.lastname.toLowerCase().includes(searchvalue)) {
              checker = true
            }
            return checker;
          })
          temp.push({ ...val, ImageData: tempImage })
        }
      })
      setTempArtist(temp)
    }
  }

  useEffect(() => {
    updateTempArtist(props.searchArtist)
  }, [artistImageKeywordDataSlice, props.searchArtist]);

  useEffect(() => {
    console.log(localStorage.getItem("Category") )
    dispatch(artistKeyword({ keyword: localStorage.getItem("Category") }));
  }, [search]);

  return (
    <div className="_2cols mt-5">
      {props.children}
      <div id="w-node-_6f42e407-456f-5b2f-82e4-417072db3669-84f2d081" className="divisionscolumn">
        <div id="w-node-_429c632c-0632-16be-f5b5-f2b7200da64a-84f2d081" className="divisioncontainer">
          
          {artistImageKeywordDataSlice.loading ? ( 
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              <img className="mb-3" alt="loading" src={loading}/>
            </div>
          ) : artistImageKeywordDataSlice.artistKeywordImages !== undefined ? (
            props.searchArtist === "" && filterCond ? (
              artistImageKeywordDataSlice.artistKeywordImages.map(
                (item, key) =>(
                    <>
                      {item.ImageData?.length > 0 && item.type === 1 ? (
                        <>
                          <div id="w-node-f734ee66-0b58-4c14-e08b-49ceded015c9-84f2d081" className="detail_card3_bipoc">
                            {item?.ImageData.map((item1, key1) => {
                              if(item1.artistId.status === 1){
                                return (
                                  <>
                                    <Link key={key1} id="w-node-f734ee66-0b58-4c14-e08b-49ceded015ca-84f2d081" to={"/"+item1.artistId.fullName} className="artistcard w-inline-block">
                                      <img
                                        src={String(
                                          item1?.mainImage[0]?.subImage[0]?.path
                                        )}
                                        loading="lazy"
                                        alt=""
                                        className="image"/>
  
                                      <div className="artistnamediv">
                                        <div className="artistnametext-v3">
                                        {item1.artistId.firstname}  {item1.artistId.lastname} 
                                        </div>
                                      </div>
                                    </Link>
                                  </>
                                ) 
                              }
                            })}
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
                  {item.ImageData?.length > 0 ? (
                    <>
                      <div id="w-node-f734ee66-0b58-4c14-e08b-49ceded015c9-84f2d081" className="detail_card3_bipoc">
                        {item.ImageData.map((item1, key1) => {
                          if(item1.artistId.status === 1){
                            return (
                              <>
                                <Link key={key1} id="w-node-f734ee66-0b58-4c14-e08b-49ceded015ca-84f2d081" to={"/"+item1.artistId.fullName} className="artistcard w-inline-block">
                                    <img
                                      src={String(
                                        item1?.mainImage[0]?.subImage[0]?.path
                                      )}
                                      loading="lazy"
                                      alt=""
                                      className="image"/>
                                    <div className="artistnamediv">
                                      <div className="artistnametext-v3">
                                      {item1.artistId.firstname}  {item1.artistId.lastname} 
                                      </div>
                                    </div>
                                  </Link>
                              </>
                            )
                          }
                        })}
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
    </div>
  );
}

export default Categories;
