import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <div>
      <div>
        <div className="div-block-11 w-100 ">
          <div className='mobileViewNavbar'>
            <div className='w-100 d-flex flex-wrap justify-content-center '>
              <Link to="/illustration-artists" className={"filterhomelink v2 " + (props.aciveBtn === "illustration-artists" ? "w--current" : "")}>ILLUSTRATION</Link>
              <a href="http://18.191.86.110/#/" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")}>KIDSHANNON</a>
              <Link to="/cgi" className={"filterhomelink v2 " + (props.aciveBtn === "cgi" ? "w--current" : "")}>CGI</Link>
              <Link to="/photography" className={"filterhomelink v2 " + (props.aciveBtn === "photography" ? "w--current" : "")}>PHOTOGRAPHY</Link>
              <Link to="/bipoc" className={"filterhomelink v2 " + (props.aciveBtn === "bipoc" ? "w--current" : "")}>BIPOC</Link>
              <Link to="/medical" className={"filterhomelink v2 " + (props.aciveBtn === "MEDICAL" ? "w--current" : "")}>MEDICAL</Link>
              <Link to="/motion" className={"filterhomelink v2 " + (props.aciveBtn === "MOTION" ? "w--current" : "")}>MOTION</Link>
            </div>

            {props.searchBar ?
              <div className="form-block-2 search">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2">
                  <input onChange={(e) => { props.updateTempArtist(e) }} type="text" className="searchbarhome w-input" maxLength="256" name="Search" data-name="Search" placeholder="SEARCH" id="Search" />
                  <Link to="#" className="link-block-3 w-inline-block"></Link>
                </form>
              </div> : null}
          </div>
        </div>
      </div >

      <div className='fullViewNavbar'>
        <div className="filterhomebox v2">
          <Link to="/illustration-artists" className={"filterhomelink v2 " + (props.aciveBtn === "illustration-artists" ? "w--current" : "")}>ILLUSTRATION</Link>
          {/* <a href="http://localhost:3001/#/" target="_blank" className={"filterhomelink v2 "+(props.aciveBtn === "kidshannon"?"w--current":"")}>KIDSHANNON</a> */}
          <a href="http://18.191.86.110/#/" target="_blank" className={"filterhomelink v2 " + (props.aciveBtn === "kidshannon" ? "w--current" : "")}>KIDSHANNON</a>
          <Link to="/cgi" className={"filterhomelink v2 " + (props.aciveBtn === "cgi" ? "w--current" : "")}>CGI</Link>
          <Link to="/photography" className={"filterhomelink v2 " + (props.aciveBtn === "photography" ? "w--current" : "")}>PHOTOGRAPHY</Link>
          <Link to="/bipoc" className={"filterhomelink v2 " + (props.aciveBtn === "bipoc" ? "w--current" : "")}>BIPOC</Link>
          <Link to="/medical" className={"filterhomelink v2 " + (props.aciveBtn === "MEDICAL" ? "w--current" : "")}>MEDICAL</Link>
          <Link to="/motion" className={"filterhomelink v2 " + (props.aciveBtn === "MOTION" ? "w--current" : "")}>MOTION</Link>

          {
            props.searchBar ?
              <div className="form-block-2" style={{ marginLeft: "auto" }}>
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2">
                  <input onChange={(e) => { props.updateTempArtist(e) }} type="text" className="searchbarhome w-input" maxLength="256" name="Search" data-name="Search" placeholder="SEARCH" id="Search" />
                  <Link to="#" className="link-block-3 w-inline-block"></Link>
                </form>
              </div> : null
          }
        </div>
      </div>
    </div >
  )
}

export default Navbar