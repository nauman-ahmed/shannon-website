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

const images = window.location.origin + "/assets/images";

function Contact() {
  const number = [1, 2, 3, 4, 5, , 6, 7, 78, 99, 0, 0];
  let history = useHistory();
  const dispatch = useDispatch();

  const [isPopupShow, setIsPopupShow] = useState(false);
  const [artistImages, setArtistImages] = useState("");
  const [Name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
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

  // const [artistId,setArtistId] = useState([]);
  // const [status,setStatus] = useState("");
  const { AddToCart } = useSelector((state) => state);
  const { artistImageDataSlice } = useSelector((state) => state);

  const contactCreate = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let Id = [];
    Object.keys(AddToCart.cartInfo).forEach((key, value) => {
      Id.push(AddToCart.cartInfo[key].id);
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
          artistId: Id,
        };
        setHolder(true);
        let tempMsg = "Thank you! Your submission has been received!"
        if (data.purposeOfInquiry) {
          if (data.purposeOfInquiry == "Looking for representation") {
            tempMsg = `Thank you ${data.Name}. A Shannon Associates representative will be responding to your inquiry as soon as possible.`
          } else {
            tempMsg = `Hi ${data.Name}, Thank you for your submission. We appreciate your interest in Shannon Associates. Due to the extremely high volume of applicants we receive, we are unfortunately unable to reply to all. Please feel free to try again if you have new samples to present. We hope you understand and wish you the best in all that is ahead. Your Friends at Shannon Associates`
          }
        }
        createContact(data).then((res) => {
          setHolder(false);
          // dispatch(updateOpen(true))
          setIsPopupShow(true);
          setMsg(tempMsg);
          // dispatch(updateMessage(res));
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
        if (key1 <= 12) {
          if (tempval && tempval[item?._id] === undefined) {
            temp[item?._id] = item?.firstname + " " + item?.lastname;
            tempchecked[item?._id] = false;
            keyChecker = false;
          }
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
      dispatch(ArtistImageSliceData()).then((res) => {
        res?.payload?.map((val, ind) => {
          // if (temp[val?.artistId?._id] || tempLocalData[val?.artistId?._id]) {
            tempArtistImagesData[val?.artistId?._id] =
              val?.mainImage[0]?.subImage[1]?.path;
          // }
        });
        setArtistImages(tempArtistImagesData);
      });
    });

    setIsChecked(tempChecker);
    getLocalStorage();
  }, []);

  return (
    <>
      {/* <h2 className="contacth2 h2">CONTACT</h2> */}
      {/* <div className="_3cols"> */}
      <div className="contactpage mt-5 pt-2" >
        {/*  <div id="w-node-_5057f7a3-8aa5-6180-66c7-59cfff8172a6-85f2d07d" className="div-block-9"> */}
        <div className="contact_padd">
          <h2 className="contacth2 hide">CONTACT</h2>
          <div
            id="w-node-_0fb692da-7bfd-42b2-746a-f1ed5ebdb01b-85f2d07d"
            className="div-block-2 mt-5 " style={{ paddingTop: '12px' }}>
            <div className="form-block w-form">
              <div
                id="email-form"
                name="email-form"
                data-name="Email Form"
                method="get"
                className="form"
              >
                <div className="formdisplay2  ">
                  <label htmlFor="name" className="contactformlabel ">
                    Name<span className="required">*</span>:
                  </label>
                  <input
                    type="text"
                    className="text-field w-100 w-input"
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
                <div className="formdisplay2">
                  <label htmlFor="Company" className="contactformlabel ">
                    Company:
                  </label>
                  <input
                    type="text"
                    className="text-field  w-input w-100"
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
                <div className="formdisplay2">
                  <label htmlFor="Email" className="contactformlabel ">
                    Email<span className="required">*</span>:
                  </label>
                  <input
                    type="email"
                    className="text-field  w-input w-100"
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
                <div className="formdisplay2">
                  <label htmlFor="Phone" className="contactformlabel ">
                    Phone:
                  </label>
                  <input
                    type="text"
                    className="text-field  w-input w-100"
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
                <div className="formdisplay2">
                  <label htmlFor="Address" className="contactformlabel ">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="text-field  w-input w-100"
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
                <div className="formdisplay2">
                  <label htmlFor="City" className="contactformlabel ">
                    City:
                  </label>
                  <input
                    type="text"
                    className="text-field  w-input w-100"
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
                <div className="formdisplay2">
                  <label htmlFor="State" className="contactformlabel ">
                    State:
                  </label>
                  <select
                    id="State"
                    name="State"
                    data-name="State"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    className="text-field w-100 w-select"

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
                <div className="formdisplay2">
                  <label
                    htmlFor="Purpose-of-Inquiry"
                    className="contactformlabel  "
                  >
                    Purpose of inquiry:
                  </label>
                  <select
                    id="Purpose-of-Inquiry"
                    name="Purpose-of-Inquiry"
                    value={purposeOfInquiry}

                    onChange={(e) => {
                      setPurposeOfInquiry(e.target.value);
                    }}
                    data-name="Purpose of Inquiry"
                    className="text-field w-100  long w-select"
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
                <div className="formdisplay2">
                  <label
                    htmlFor="How-did-you-find-us"
                    className="contactformlabel "
                  >
                    How did you find us:
                  </label>
                  <select
                    id="How-did-you-find-us"
                    name="How-did-you-find-us"
                    value={findUs}
                    onChange={(e) => {
                      setFindUs(e.target.value);
                    }}
                    data-name="How did you find us"
                    className="text-field w-100 long w-select"
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
                    <option value="Referral">Referral</option>
                    <option value="Previous Client">Previous Client</option>
                    <option value="General Web">General Web</option>
                    <option value="Email Promo">Email Promo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="formdisplay2 message inv2">
                  <label htmlFor="field" className="contactformlabel ">
                    Message:
                  </label>
                  <textarea
                    placeholder=""
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    maxLength="5000"
                    id="field"
                    name="field"
                    data-name="field"
                    className="textarea w-input w-100"
                  ></textarea>
                </div>
                <div className="formbuttonsbox">
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
                      className="filter-button mr-md-4"

                    />
                  )}
                </div>
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
        {/*  <div
          id="w-node-_8490408e-ad22-b194-846b-3bfd23bb2d1e-85f2d07d"
          className="div-block-10"> */}
        <div className=" ">
          <h2 className="contacth2 hide">MY LIST</h2>
          <div className="artistcont4" >
            <div>
              <div className="pl-3">
                <div
                  id="artistCont"
                  className="artistcont2 w-node-_3ea1885f-5610-a267-b100-5eb12e177818-85f2d07d">
                  <h3 className="artistconth pt-2 ">Interested in one of our Illustrators</h3>
                  <div className="w-form">
                    <div className="contactpartist">Previously Viewed Artists</div>

                    {dataViewed !== null
                      ? Object.keys(dataViewed).map((key) => (
                        <label
                          className="w-checkbox artistcheckbox"
                          style={{ textTransform: "uppercase" }}
                        >
                          <input
                            type="checkbox"
                            className="w-checkbox-input checkbox-2"
                            checked={isChecked[key]}
                            onChange={(e) => {
                              handleChange(e, dataViewed[key]);
                            }}
                          />
                          <span
                            className="checkbox-label w-form-label"
                            htmlFor="SHEYDA-ABVABI"
                          >
                            {dataViewed[key].title}
                          </span>
                        </label>
                      ))
                      : ""}

                    <div className="contactpartist">More Artists</div>
                    {artistData !== null
                      ? Object.keys(artistData).map((key) => (
                        <label
                          className="w-checkbox artistcheckbox"
                          style={{ textTransform: "uppercase" }}
                        >
                          <input
                            type="checkbox"
                            checked={isCheckedArtist[key]}
                            onChange={(e) => {
                              handleChangeArtist(e, artistData[key], key);
                            }}
                            className="w-checkbox-input checkbox-2"
                          />
                          <span
                            className="checkbox-label w-form-label"
                            htmlFor="NICK-APONTE"
                          >
                            {artistData[key]}
                          </span>
                        </label>
                      ))
                      : ""}

                    <div className="w-form-done">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail">
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  </div>
                </div>

                <div className="imagescontainer">
                  <div className="w-dyn-list">
                    <div role="list" className="collection-list w-dyn-items">
                      <div role="listitem" className="w-dyn-item"></div>
                    </div>
                    <div className="w-dyn-empty">
                      <div>No items found.</div>
                    </div>
                  </div>
                  <div id="cover" className="cover"></div>
                </div>
              </div>
            </div>
            <div className="collection-list-5" >
              {AddToCart.cartInfo &&
                Object.keys(AddToCart.cartInfo).map((oneKey, i) => {
                  return (


                    <Link
                      id="w-node-f734ee66-0b58-4c14-e08b-49ceded015ca-84f2d081"
                      to={"/artists/" + AddToCart.cartInfo[oneKey].id}
                      className="card_img " >
                      <div className="artistimagethumb" style={{ position: "relative", overflow: "hidden" }}>
                      
                        <img
                          src={artistImages[AddToCart.cartInfo[oneKey].id]}
                          loading="lazy"
                          alt=""
                          style={{ width:"100%", height:"100%"}}
                          className=""
                        />

                        <div className="nameartistmini">
                          <div className="artistnametxt">{AddToCart.cartInfo[oneKey].Name}</div>
                        </div> {console.log(AddToCart.cartInfo[oneKey].Name)}
                        {/* <h5>{ AddToCart.cartInfo[oneKey].Name.toUpperCase()}</h5> 
                    <button onClick={()=>{removeKey( AddToCart.cartInfo[oneKey].id)}}>Remove Artist</button> */}
                    </div>
                    </Link>

                  );
                })}

            </div>
          </div>
        </div>

        <p
          className="contactp">
          <strong className="addres">
            Shannon Associates - USA
            <br />
          </strong>
          <span className="addres2">333 West 57th Street New York, NY 10019
            <br />
            info@shannonassociates.com</span>
        </p>
        {/* <div
          id="w-node-_0fb692da-7bfd-42b2-746a-f1ed5ebdb01b-85f2d07d"
          className="div-block-2">
          <div className="form-block w-form">
            <div
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="get"
              className="form"
            >
              <div className="formdisplay">
                <label htmlFor="name" className="contactformlabel">
                  Name<span className="required">*</span>:
                </label>
                <input
                  type="text"
                  className="text-field w-input"
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
              <div className="formdisplay">
                <label htmlFor="Company" className="contactformlabel">
                  Company:
                </label>
                <input
                  type="text"
                  className="text-field w-input"
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
              <div className="formdisplay">
                <label htmlFor="Email" className="contactformlabel">
                  Email<span className="required">*</span>:
                </label>
                <input
                  type="email"
                  className="text-field w-input"
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
              <div className="formdisplay">
                <label htmlFor="Phone" className="contactformlabel">
                  Phone:
                </label>
                <input
                  type="text"
                  className="text-field w-input"
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
              <div className="formdisplay">
                <label htmlFor="Address" className="contactformlabel">
                  Address:
                </label>
                <input
                  type="text"
                  className="text-field w-input"
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
              <div className="formdisplay">
                <label htmlFor="City" className="contactformlabel">
                  City:
                </label>
                <input
                  type="text"
                  className="text-field w-input"
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
              <div className="formdisplay">
                <label htmlFor="State" className="contactformlabel">
                  State:
                </label>
                <select
                  id="State"
                  name="State"
                  data-name="State"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  className="text-field w-select"
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
              <div className="formdisplay">
                <label
                  htmlFor="Purpose-of-Inquiry"
                  className="contactformlabel"
                >
                  Purpose of inquiry:
                </label>
                <select
                  id="Purpose-of-Inquiry"
                  name="Purpose-of-Inquiry"
                  value={purposeOfInquiry}
                  onChange={(e) => {
                    setPurposeOfInquiry(e.target.value);
                  }}
                  data-name="Purpose of Inquiry"
                  className="text-field long w-select"
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
              <div className="formdisplay">
                <label
                  htmlFor="How-did-you-find-us"
                  className="contactformlabel"
                >
                  How did you find us:
                </label>
                <select
                  id="How-did-you-find-us"
                  name="How-did-you-find-us"
                  value={findUs}
                  onChange={(e) => {
                    setFindUs(e.target.value);
                  }}
                  data-name="How did you find us"
                  className="text-field long w-select"
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
                  <option value="Referral">Referral</option>
                  <option value="Previous Client">Previous Client</option>
                  <option value="General Web">General Web</option>
                  <option value="Email Promo">Email Promo</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="formdisplay message">
                <label htmlFor="field" className="contactformlabel">
                  Message:
                </label>
                <textarea
                  placeholder=""
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  maxLength="5000"
                  id="field"
                  name="field"
                  data-name="field"
                  className="textarea w-input"
                ></textarea>
              </div>
              <div className="formbuttonsbox">
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
                    className="talentbutton contactbutton w-button "
                    style={{ fontSize: "0.62vw" }}
                  />
                )}
              </div>
            </div>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div> */}
        {/* <div
          id="artistCont"
          className="artistcont w-node-_3ea1885f-5610-a267-b100-5eb12e177818-85f2d07d">
          <h3 className="artistconth pt-2">Interested in one of our Illustrators</h3>
          <div className="w-form">
            <div className="contactpartist">Previously Viewed Artists</div>

            {dataViewed !== null
              ? Object.keys(dataViewed).map((key) => (
                  <label
                    className="w-checkbox artistcheckbox"
                    style={{ textTransform: "uppercase" }}
                  >
                    <input
                      type="checkbox"
                      className="w-checkbox-input checkbox-2"
                      checked={isChecked[key]}
                      onChange={(e) => {
                        handleChange(e, dataViewed[key]);
                      }}
                    />
                    <span
                      className="checkbox-label w-form-label"
                      htmlFor="SHEYDA-ABVABI"
                    >
                      {dataViewed[key].title}
                    </span>
                  </label>
                ))
              : ""}

            <div className="contactpartist">More Artists</div>

            {artistData !== null
              ? Object.keys(artistData).map((key) => (
                  <label
                    className="w-checkbox artistcheckbox"
                    style={{ textTransform: "uppercase" }}
                  >
                    <input
                      type="checkbox"
                      checked={isCheckedArtist[key]}
                      onChange={(e) => {
                        handleChangeArtist(e, artistData[key], key);
                      }}
                      className="w-checkbox-input checkbox-2"
                    />
                    <span
                      className="checkbox-label w-form-label"
                      htmlFor="NICK-APONTE"
                    >
                      {artistData[key]}
                    </span>
                  </label>
                ))
              : ""}

            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div> */}
        {isPopupShow ? (
          <MyPopup
            BackClose
            onClose={() => {
              setIsPopupShow(false);
            }}
          >
            <div className="mx-5 my-4">{msg}</div>
          </MyPopup>
        ) : null}
      </div>
    </>
  );
}

export default Contact;
