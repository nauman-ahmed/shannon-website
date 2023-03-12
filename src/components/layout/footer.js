import React from 'react' 
import { Link } from 'react-router-dom'
const images = window.location.origin+"/assets/images"

function Footer() {
    return (
        <div className="footersection wf-section" >
            <div className="footerorange"></div>
            <div className="footer">
                <div className="footerdiv">
                    <Link to="/" aria-current="page" className="footerlink w--current">ARTISTS</Link>
                    <Link to="/divisions" className="footerlink">DIVISIONS</Link>
                    <Link to="/about" className="footerlink">ABOUT</Link>
                    <Link to="/contact" className="footerlink">CONTACT</Link>
                </div>
                <div className="mediafooterdiv">
                    <a href="https://www.facebook.com/shannonassociates/" className="mediafooterlink w-inline-block"><img src={images+"/brandico_facebook-rect.svg"} loading="lazy" alt=""/></a>
                    <a href="https://twitter.com/shannonassoc" className="mediafooterlink w-inline-block"><img src={images+"/fa_twitter-square.svg"} loading="lazy" alt=""/></a>
                    <a href="https://www.instagram.com/shannonassociates/" className="mediafooterlink w-inline-block"><img src={images+"/Frame-6.svg"} loading="lazy" alt=""/></a>
                    <a href="https://shannonassociates.tumblr.com/" className="mediafooterlink w-inline-block"><img src={images+"/brandico_tumblr-rect.svg"} loading="lazy" alt=""/></a>
                    <a href="https://www.behance.net/shannonassociates" className="mediafooterlink w-inline-block"><img src={images+"/wpf_behance.svg"} loading="lazy" alt=""/></a>
                    <a href="http://www.linkedin.com/in/shannonassociates" className="mediafooterlink w-inline-block"><img src={images+"/brandico_linkedin-rect.svg"} loading="lazy" alt=""/></a>
                </div>
                <div className="footertext">© 1995-2021 SHANNON ASSOCIATES, LLC · 333 West 57th Street, Suite 809 · New York, New York 10019 · 212-333-2551</div>
            </div>
        </div>
    )
}

export default Footer