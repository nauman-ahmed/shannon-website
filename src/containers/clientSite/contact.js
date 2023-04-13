import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../AxiosFunctions/Axiosfunctionality";
import { updateMessage, updateOpen } from "../../redux/message";
import loading from "../../assets/loading.gif";
import { Redirect, Link, useHistory } from "react-router-dom";
import { addCart, removeCartItem } from "../../redux/addToCart";
import SnackbarCustom from "../../components/snackBar/SnackbarCustom";
import { ArtistDataAPI } from "../../redux/artistDataSlice";
import { ArtistImageSliceData } from "../../redux/artistImageDataSlice";
import { IMAGE_ROUTE } from "../../AxiosFunctions/Axiosfunctionality";
import MyPopup from "../../components/myPopup/myPopup";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const images = window.location.origin + "/assets/images"; 

function Contact() {
  const number = [1, 2, 3, 4, 5, , 6, 7, 78, 99, 0, 0];
  let history = useHistory();
  const dispatch = useDispatch();

  const [isPopupShow, setIsPopupShow] = useState(false);
  const [artistImages, setArtistImages] = useState("");
  const [totalArtistImages, setTotalArtistImages] = useState(undefined);
  const [Name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [purposeOfInquiry, setPurposeOfInquiry] = useState("");
  const [findUs, setFindUs] = useState("");
  const [message, setMessage] = useState("");
  const [holder, setHolder] = useState(false);
  const [dataViewed, setDataViewed] = useState({});
  const [isChecked, setIsChecked] = useState({});
  const [artistData, setArtistData] = useState({});
  const [msg, setMsg] = useState("");
  const [isCheckedArtist, setIsCheckedArtist] = useState({});
  const [filterCond,setFilterCond]= useState(true);
  const [deletedImages,setDeletedImages]= useState([]);
  const [tempArtist,setTempArtist]= useState([]);
  const [filterHighlighted,setFilterHighlighted]= useState(null);

  const { AddToCart } = useSelector((state) => state);
  const { artistImageDataSlice } = useSelector((state) => state);


  const filterChange= (filter) => {


    if(filter==="A-Z"){
      let temp = []
      setFilterCond(false)
      let tempImage = [...artistImageDataSlice.artistImages]
      temp = tempImage.sort((a, b) => a.artistId.lastname.normalize().localeCompare(b.artistId.lastname.normalize()));
      setFilterHighlighted(2)
      setTempArtist(temp)
    }
    else{
      setFilterHighlighted(1)
      setFilterCond(true)
    }

  }

  const contactCreate = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let Id = [];
    Object.keys(AddToCart.cartInfo).forEach((key, value) => {
      if(key !== "messageShow" && key !== "count" ){
        Id.push(AddToCart.cartInfo[key].id);
      }
    }); 
    if (Id.length > 0) {
      if (email == "" || Name == "") {
        setIsPopupShow(true);
        setMsg("Please Fill Required Fields");
        // dispatch(updateOpen(true))
        // dispatch(updateMessage("Please Fill Required Fields"));
      } else {
        let data = {
          Name: Name,
          company: company,
          email: email,
          phone: phone,
          address: address,
          city: city,
          state: state,
          purposeOfInquiry: purposeOfInquiry,
          findUs: findUs,
          message: message,
          zip:zip,
          artistId: Id,
        };
        setHolder(true);
        let tempMsg = `Thank you ${data.Name}. A Shannon Associates representative will be responding to your inquiry as soon as possible.`
        if (data.purposeOfInquiry) {
          if (data.purposeOfInquiry == "Looking for representation") {
            tempMsg = <p> Hi {data.Name}, Thank you for your submission. <br></br><br></br> We appreciate your interest in Shannon Associates. Due to the extremely high volume of applicants we receive, we are unfortunately unable to reply to all. Please feel free to try again if you have new samples to present. We hope you understand and wish you the best in all that is ahead.<br></br><br></br> Your Friends at Shannon Associates</p>
          } 
        }
        createContact(data).then((res) => {
          if(res == "Email is an Issue"){
            tempMsg = <p> ERROR IN CONTACT DETAILS SUBMISSION</p>
            setMsg(tempMsg);
          }else{
            setHolder(false);
            setIsPopupShow(true);
            setMsg(tempMsg);
          }
        });
      }
    } else {
      setIsPopupShow(true);
      setMsg("select atleast one artist");
      // dispatch(updateOpen(true))
      // dispatch(updateMessage("select atleast one artist"));
    }
  };
  const removeKey = (id) => {
    dispatch(removeCartItem(id));

    setIsChecked((preState) => ({ ...preState, [id]: false }));
    setIsCheckedArtist((preState) => ({ ...preState, [id]: false }));
  };

  const handleChange = (e, data) => {
    
    if (isChecked[data.id] !== true) {
      dispatch(
        addCart({ key: data.id, data: { id: data.id, Name: data.title } })
      );
    } else {
      dispatch(removeCartItem(data.id));
    }

    setIsChecked((preState) => ({
      ...preState,
      [data.id]: !preState[data.id],
    }));
    dispatch(updateOpen(true));
    dispatch(updateMessage("Add Artist in Cart"));
  };

  const handleChangeArtist = (e, data, key) => {
    var slick = document.getElementsByClassName('slick-list')[0];

    if(slick){
      console.log(slick.style)
      slick.style.padding = "3px"
    }
    
    if (isCheckedArtist[key] !== true) {
      dispatch(addCart({ key: key, data: { id: key, Name: data } }));
    } else {
      dispatch(removeCartItem(key));
    }

    setIsCheckedArtist((preState) => ({ ...preState, [key]: !preState[key] }));
    dispatch(updateOpen(true));
    dispatch(updateMessage("Add Artist in Cart"));
  };


  useEffect(() => {
    
    function getLocalStorage() {
      if (localStorage.getItem("artistViewed_V1") !== null) {
        setDataViewed(JSON.parse(localStorage.getItem("artistViewed_V1")));
      }
    }

    const tempval = JSON.parse(localStorage.getItem("artistViewed_V1"));
    let tempChecker = {};
    tempval &&
      Object.keys(tempval).forEach((key) => {
        tempChecker[tempval[key]?.id] = false;
      });

    AddToCart?.cartInfo &&
      Object.keys(AddToCart?.cartInfo).forEach((oneKey, i) => {
        tempval &&
          Object.keys(tempval).forEach((key) => {
            if (AddToCart?.cartInfo[oneKey]?.id === tempval[key]?.id) {
              tempChecker[AddToCart?.cartInfo[oneKey]?.id] = true;
            }
          });
      });

    dispatch(ArtistDataAPI()).then((res) => {
      let temp = {};
      let tempchecked = {};
      let keyChecker = true;
      res?.payload?.forEach((item, key1) => {
          if (tempval && tempval[item?._id] === undefined) {
            temp[item?._id] = item?.firstname + " " + item?.lastname;
            tempchecked[item?._id] = false;
            keyChecker = false;
          }
      });
      if (keyChecker) {
        res?.payload?.forEach((item, key1) => {
          if (key1 <= 12) {
            temp[item?._id] = item?.firstname + " " + item?.lastname;
            tempchecked[item?._id] = false;
          }
        });
      }
      AddToCart?.cartInfo &&
        Object.keys(AddToCart?.cartInfo).forEach((oneKey, i) => {
          res?.payload?.forEach((item, key1) => {
            if (AddToCart?.cartInfo[oneKey]?.id === item?._id) {
              tempchecked[item?._id] = true;
            }
          });
        });
      setIsCheckedArtist(tempchecked);
      setArtistData(temp);

      //For Images
      let tempArtistImagesData = {};
      let tempLocalData = JSON.parse(localStorage.getItem("artistViewed_V1"));
      if(artistImageDataSlice.artistImages.length == 0){
        dispatch(ArtistImageSliceData()).then((res) => {
          res?.payload?.map((val, ind) => {
            tempArtistImagesData[val?.artistId?._id] = val?.mainImage[0]?.subImage[1]?.path;
          });
          
          setArtistImages(tempArtistImagesData);
        });
      }else{
        artistImageDataSlice.artistImages.map((val, ind) => {
          tempArtistImagesData[val?.artistId?._id] = val?.mainImage[0]?.subImage[1]?.path;
        });
        setArtistImages(tempArtistImagesData);
      }
    });

    setIsChecked(tempChecker);
    getLocalStorage();
    return () => console.log("NAUMAN");
  }, []);

  return (
    <>
      <div className="row mx-0 pr-0 mt-0 pt-0" style={{
        maxWidth: "100%",
      }}>
        <div className=" pl-2 left_content contact_w"
          style={{ paddingRight: "0.8vw" }}
        >
          <div >
            <h2 className="contacth2 hide">CONTACT</h2>
            <div className="row mr-0 ">
              <div className="col">
                <div
                  id="w-node-_0fb692da-7bfd-42b2-746a-f1ed5ebdb01b-85f2d07d"
                  className="div-block-2 " style={{ paddingTop: '5vh' }}>
                  <div className="form-block w-form">
                    <div
                      id="email-form"
                      name="email-form"
                      data-name="Email Form"
                      method="get"
                      className="form"
                    >
                      <div className="row mr-0  ">
                        <div className="col-sm-6 mr-0 pr-0">
                          <label htmlFor="name" className="contactformlabel ">
                            Name<span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="text-field text_h w-100 w-input"
                            value={Name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            maxLength="256"
                            name="name"
                            data-name="Name"
                            placeholder=""
                            id="name"
                            required
                          />
                        </div>
                        <div className="col-sm-6 mr-0 pr-0">
                          <label htmlFor="Company" className="contactformlabel ">
                            Company
                          </label>
                          <input
                            type="text"
                            className="text-field text_h  w-input w-100"
                            maxLength="256"
                            name="Company"
                            value={company}
                            onChange={(e) => {
                              setCompany(e.target.value);
                            }}
                            data-name="Company"
                            placeholder=""
                            id="Company"
                          />
                        </div>
                      </div>

                      <div className="row mr-0">
                        <div className="col-sm-6 mr-0 pr-0">
                          <label htmlFor="Email" className="contactformlabel ">
                            Email<span className="required">*</span>
                          </label>
                          <input
                            type="email"
                            className="text-field text_h  w-input w-100"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            maxLength="256"
                            name="Email"
                            data-name="Email"
                            placeholder=""
                            id="Email"
                            required
                          />
                        </div>
                        <div className="col-sm-6 mr-0 pr-0">

                          <label htmlFor="Phone" className="contactformlabel ">
                            Phone
                          </label>
                          <input
                            type="text"
                            className="text-field text_h  w-input w-100"
                            maxLength="256"
                            name="Phone"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            data-name="Phone"
                            placeholder=""
                            id="Phone"
                          />
                        </div>
                      </div>

                      <div className="row mr-0">
                        <div className="col-sm-6 mr-0 pr-0">
                          <label htmlFor="Address" className="contactformlabel ">
                            Address:
                          </label>
                          <input
                            type="text"
                            className="text-field text_h  w-input w-100"
                            maxLength="256"
                            name="Address"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            data-name="Address"
                            placeholder=""
                            id="Address"
                          />
                        </div>
                        <div className="col-sm-6 mr-0 pr-0">
                          <label htmlFor="City" className="contactformlabel ">
                            City:
                          </label>
                          <input
                            type="text"
                            className="text-field text_h  w-input w-100"
                            maxLength="256"
                            name="City"
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            data-name="City"
                            placeholder=""
                            id="City"
                          />
                        </div>
                      </div>

                      <div className="row mr-0">
                        <div className="col-sm-6 mr-0 pr-0">
                          <label htmlFor="State" className="contactformlabel ">
                            State
                          </label>
                          <select
                            id="State"
                            name="State"
                            data-name="State"
                            value={state}
                            onChange={(e) => {
                              setState(e.target.value);
                            }}
                            className="text-field text_h w-100 w-select"

                          >
                            <option value="">Select</option>
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="District Of Columbia">
                              District Of Columbia
                            </option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Maryland">Maryland</option>
                          </select>
                        </div>
                        <div className="col-sm-6 mr-0 pr-0">
                          <label htmlFor="City" className="contactformlabel ">
                            Zip
                          </label>
                          <input
                            type="text"
                            className="text-field text_h  w-input w-100"
                            maxLength="256"
                            name="zip"
                            value={zip}
                            onChange={(e) => {
                              setZip(e.target.value);
                            }}
                            data-name="Zip"
                            placeholder=""
                            id="Zip"
                          />
                        </div>
                      </div>

                      <div className="row mr-0">
                        <div className="col-sm-6 mr-0 pr-0">

                          <label
                            htmlFor="Purpose-of-Inquiry"
                            className="contactformlabel  "
                          >
                            Purpose of inquiry
                          </label>
                          <select
                            id="Purpose-of-Inquiry"
                            name="Purpose-of-Inquiry"
                            value={purposeOfInquiry}

                            onChange={(e) => {
                              setPurposeOfInquiry(e.target.value);
                            }}
                            data-name="Purpose of Inquiry"
                            className="text-field text_h w-100 w-select"
                          >
                            <option value="">Select</option>
                            <option value="Get an estimate">Get an estimate</option>
                            <option value="Commission an artist">
                              Commission an artist
                            </option>
                            <option value="Looking for representation">
                              Looking for representation
                            </option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-sm-6 mr-0 pr-0">
                          <label
                            htmlFor="How-did-you-find-us"
                            className="contactformlabel "
                          >
                            How did you find us?
                          </label>
                          <select
                            id="How-did-you-find-us"
                            name="How-did-you-find-us"
                            value={findUs}
                            onChange={(e) => {
                              setFindUs(e.target.value);
                            }}
                            data-name="How did you find us"
                            className="text-field text_h w-100 w-select"
                          >
                            <option value="">Select</option>
                            <option value="Google">Google</option>
                            <option value="Workbook">Workbook</option>
                            <option value="Directory of Illustration">
                              Directory of Illustration
                            </option>
                            <option value="Contact">Contact</option>
                            <option value="Picturebook">Picturebook</option>
                            <option value="Folioplanet">Folioplanet</option>
                            <option value="Award Book/Illustration Annual">
                              Award Book/Illustration Annual
                            </option>
                            <option value="Postcard/promotional">
                              Postcard/promotional
                            </option>
                            <option value="Previous Client">Previous Client</option>
                            <option value="Referral">Referral</option>
                            <option value="Previous Client">Previous Client</option>
                            <option value="General Web">General Web</option>
                            <option value="Email Promo">Email Promo</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className=" row mr-0 ">
                        <div className="col-12 mr-0 pr-0">

                          <label htmlFor="field" className="contactformlabel ">
                            Message
                          </label>
                          <textarea
                            placeholder=""
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                            maxLength="5000"
                            id="field"
                            rows="8"
                            name="field"
                            data-name="field"
                            className="textarea w-input w-100"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div> 
        </div>
        <div className="right_content mt-0 mx-0 contact_w"
          style={{ paddingTop: "24px", paddingRight: "0", paddingLef: "1vw" }}>
          <h2 className="contactLabel hide">MY LIST</h2>
          <p className=" hide">Selected favorites from portfolio pages and/or below</p>
          <div className="" style={{ paddingTop: "5.4vh" }} >
          {/* {AddToCart.cartInfo && Object.keys(AddToCart.cartInfo).length > 0 &&
              <div className="detail_card_6 w-inline-block artist_card_h"
              style={{overflowY:"initial"}}
              >
                {
                  Object.keys(AddToCart.cartInfo).map((oneKey, i) => {
                    if(oneKey !== "messageShow" && oneKey !== "count" ){
                      return (
                       
                          <Link
                            to="#"
                          >
                             <div className="detail_card_contact"
                             style={{ position: "relative"}}
                             >
                              {console.log(artistImages, artistImages[AddToCart.cartInfo[oneKey].id])}
                              <div className="cartBadgeContact"
                                onClick={(e) => {
                                  handleChangeArtist(e, AddToCart.cartInfo[oneKey].Name, AddToCart.cartInfo[oneKey].id);
                                }}
                                >x</div>
                              <img loading="lazy" src={artistImages[AddToCart.cartInfo[oneKey].id]} className="w-100 h-100" style={{ objectFit: "cover" }}></img>
                              <div className="artistnamediv">
                                <div className="artistnametext-v3" style={{ padding: "6px 0px" }}>
                                {AddToCart.cartInfo[oneKey].Name}
                                </div>
                              </div>
                            </div>
                          </Link>
                      );
                    }
                  })
                }                
             </div>                
            } */}
          <Slider className="detail_card_6 w-inline-block" {...{
                  dots: false,
                  infinite: false,
                  speed: 500,
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />
                }}>
          {AddToCart.cartInfo && Object.keys(AddToCart.cartInfo).length > 0 &&
                  Object.keys(AddToCart.cartInfo).map((oneKey, i) => {
                    if(oneKey !== "messageShow" && oneKey !== "count" ){
                      return (
                       
                          <Link
                            to="#"
                          >
                             <div className="detail_card_contact"
                             style={{ position: "relative", margin: "3px"}}
                             >
                              <div className="cartBadgeContact"
                                onClick={(e) => {
                                  handleChangeArtist(e, AddToCart.cartInfo[oneKey].Name, AddToCart.cartInfo[oneKey].id);
                                }}
                                >x</div>
                              <img loading="lazy" src={artistImages[AddToCart.cartInfo[oneKey].id]} className="w-100 h-100" style={{ objectFit: "cover" }}></img>
                              <div className="artistnamediv">
                                <div className="artistnametext-v3" style={{ padding: "6px 0px" }}>
                                {AddToCart.cartInfo[oneKey].Name}
                                </div>
                              </div>
                            </div>
                          </Link>
                      );
                    }
                  })
            }
        </Slider>
            <div style={{ marginTop: "2vh" }} className="" >
              <h5 style={{ float: "left" }} >Additional Artists</h5>
              <div className="sortingcont right mt-0 pt-0  me-0 ">
                <a class={filterHighlighted == 1 ? "filter-button sort-active w-inline-block  mt-0" : "filter-button w-inline-block  mt-0"} onClick={()=>filterChange("Default")}>
                  <div >DEFAULT</div>
                </a>
                <a class={filterHighlighted == 2 ? "filter-button sort-active mt-0 me-0" : "filter-button mt-0 me-0"} onClick={()=>filterChange("A-Z")}>
                  <div >ALPHABETICAL A-Z</div>
                </a>
              </div>
                {
                  artistImageDataSlice.loading ? (
                    <div style={{ position: "relative", top: "50%", left: "50%" }}>
                      <img
                        className="mb-3"
                        alt="loading"
                        src={loading}
                        style={{ width: "50px" }}
                      />
                    </div>
              
              ) : artistImageDataSlice.artistImages && filterCond ?
              <div className="detail_card_6  w-inline-block artist_card_h">
              {
               artistImageDataSlice.artistImages.map((val, ind) =>  {
                if( isCheckedArtist[val.artistId._id] == false || isCheckedArtist[val.artistId._id] == undefined ){
                  return (
                    <Link className="detail_card5_h "
                  style={{ position: "relative", overflow: "hidden", cursor:"pointer" }}
                  to="#"
                  onClick={(e) => {
                    handleChangeArtist(e, val.artistId.firstname + " " + val.artistId.lastname, val.artistId._id);
                  }}
                >
                  <img src={String(val.mainImage[0].subImage[0].path)} className="w-100 h-100" style={{ objectFit: "cover" }}></img>
                  <div className="artistnamediv">
                    <div className="artistnametext-v3" style={{ padding: "6px 0px" }}>
                      {val.artistId.firstname}  {val.artistId.lastname} 
                    </div>
                  </div>
                </Link>
                  );
                }
               })
              }
              </div>
                : <div className="detail_card_6  w-inline-block artist_card_h">
                {
                 tempArtist.map((val, ind) =>  {
                if( isCheckedArtist[val.artistId._id] == false || isCheckedArtist[val.artistId._id] == undefined ){
                  return (
                     <Link className="detail_card5_h "
                   style={{ position: "relative", overflow: "hidden" }}
                   to="#"
                   onClick={(e) => {
                     handleChangeArtist(e, val.artistId.firstname + " " + val.artistId.lastname, val.artistId._id);
                   }}
                 >
                   <img src={String(val.mainImage[0].subImage[0].path)} className="w-100 h-100" style={{ objectFit: "cover" }}></img>
                   <div className="artistnamediv">
                     <div className="artistnametext-v3" style={{ padding: "6px 0px" }}>
                       {val.artistId.firstname}  {val.artistId.lastname} 
                     </div>
                   </div>
                 </Link>
                   );
                  }
                 })
                }
                </div>
                }
              <div className="formbuttonsbox mt-4">
                <div className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled g-recaptcha-invalid-key"></div>
                {holder ? (
                  <img
                    className="mt-1"
                    alt="loading"
                    src={loading}
                    style={{ width: "30px" }}
                  />
                ) : (
                  <input
                    type="submit"
                    value="SUBMIT"
                    onClick={() => {
                      contactCreate();
                    }}
                    data-wait="Please wait..."
                    className="submit-button mr-md-4"
                  />
                )}
              </div>
              <div className="w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div className="w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <div className="contactpage mt-5 pt-2" >
        {isPopupShow ? (
          <MyPopup
            BackClose
            onClose={() => {
              setIsPopupShow(false);
            }}
          >
            <div className="mx-5 my-4" style={{ wordWrap: "break-word", width: "500px" }}>{msg}</div>
          </MyPopup>
        ) : null}
      </div>
    </>
  );
}

export default Contact;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return ( <img
    src={images + "/contact_right.png"}
    style={{width:"auto"}}
    loading="lazy"
    alt=""
    className={className}
    onClick={onClick}
  />

  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
    src={images + "/contact_left.png"}
    style={{width:"auto"}}
    loading="lazy"
    alt=""
    className={className}
    onClick={onClick}
  />
  );
}
