import React, { useEffect, useState } from 'react' 
import { Link } from 'react-router-dom'
import { getAllContents } from '../../AxiosFunctions/Axiosfunctionality'

const facebook = window.location.origin+"/assets/images/brandico_facebook-rect.svg"
const facebookColored = window.location.origin+"/assets/images/brandico_facebook-rect_colored.png"

const twitter = window.location.origin+"/assets/images/fa_twitter-square.svg"
const twitterColored = window.location.origin+"/assets/images/fa_twitter-square_colored.png"

const instagram = window.location.origin+"/assets/images/Frame-6.svg"
const instagramColored = window.location.origin+"/assets/images/Frame 6_colored.png"

const tumblr = window.location.origin+"/assets/images/brandico_tumblr-rect.svg"
const tumblrColored = window.location.origin+"/assets/images/brandico_tumblr-rect_colored.png"

const behance = window.location.origin+"/assets/images/wpf_behance.svg"
const behanceColored = window.location.origin+"/assets/images/wpf_behance_colored.png"

const linkedin = window.location.origin+"/assets/images/brandico_linkedin-rect.svg"
const linkedinColored = window.location.origin+"/assets/images/brandico_linkedin-rect_colored.png"

function Footer() {
    const [shannonContent,setShannonContent] = useState([])

    const getAllContent = ()=>{
        getAllContents({type: "SHANNON"}).then((res)=>{
            let shannon = res[0].content
            console.log(shannon[0])
            setShannonContent(shannon)
        })
    }

    useEffect(()=>{
        getAllContent();
    },[])
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
                    <a href="https://www.facebook.com/shannonassociates/" className="mediafooterlink w-inline-block"><img src={facebook} width="30px" onMouseOver={(props) => props.target.src = facebookColored} onMouseOut={(props) => props.target.src = facebook} loading="lazy" alt=""/></a>
                    <a href="https://twitter.com/shannonassoc" className="mediafooterlink w-inline-block"><img src={twitter} width="30px" onMouseOver={(props) => props.target.src = twitterColored} onMouseOut={(props) => props.target.src = twitter} loading="lazy" alt=""/></a>
                    <a href="https://www.instagram.com/shannonassociates/" className="mediafooterlink w-inline-block"><img src={instagram} width="30px" onMouseOver={(props) => props.target.src = instagramColored} onMouseOut={(props) => props.target.src = instagram} loading="lazy" alt=""/></a>
                    <a href="https://shannonassociates.tumblr.com/" className="mediafooterlink w-inline-block"><img src={tumblr} width="30px" onMouseOver={(props) => props.target.src = tumblrColored} onMouseOut={(props) => props.target.src = tumblr} loading="lazy" alt=""/></a>
                    <a href="https://www.behance.net/shannonassociates" className="mediafooterlink w-inline-block"><img src={behance} width="30px" onMouseOver={(props) => props.target.src = behanceColored} onMouseOut={(props) => props.target.src = behance} loading="lazy" alt=""/></a>
                    <a href="http://www.linkedin.com/in/shannonassociates" className="mediafooterlink w-inline-block"><img src={linkedin} width="30px" onMouseOver={(props) => props.target.src = linkedinColored} onMouseOut={(props) => props.target.src = linkedin} loading="lazy" alt=""/></a>
                 </div>
                 <div className="footertext">
                    {  
                        shannonContent.length > 0 ? 
                        shannonContent[1].name : 
                        "© 1995-2021 SHANNON ASSOCIATES, LLC · 333 West 57th Street, Suite 809 · New York, New York 10019 · 212-333-2551"
                    }
                </div>
                {/* <div className="footertext">© 1995-2021 SHANNON ASSOCIATES, LLC · 333 West 57th Street, Suite 809 · New York, New York 10019 · 212-333-2551</div> */}
            </div>
        </div>
    )
}

export default Footer