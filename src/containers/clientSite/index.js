import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useHistory } from 'react-router-dom'
import ArtistSideBar from '../../components/layout/artistSideBar'
import DivisionSideBar from '../../components/layout/divisionSideBar'
import Footer from '../../components/layout/footer'
import Header from '../../components/layout/header'
import Navbar from '../../components/layout/navbar'
import NewestArtists from './newestArtists'
import UpdatedArtists from './updatedArtists'
import About from './about'
import Artists from './artists'
import Bipoc from './bipoc'
import CGI from './cgi'
import MEDICAL from './medical'
import MOTION from './motion'
import Contact from './contact'
import Divisions from './divisions'
import Categories from './categories'
import IllustrationArtists from './illustration-artists'
import Photography from './photography'
import SearchByArtist from './searchPages/searchByArtist'
import SearchByDivision from './searchPages/searchByDivision'
import SearchByCategories from './searchPages/searchByCategories'
import BlackArtist from './bipocSubPages/blackArtist'
import AsianArtist from './bipocSubPages/asianArtist'
import CentralAsianArtist from './bipocSubPages/centralAsianArtist'
import LatinoArtist from './bipocSubPages/latinoArtist'
import IndigenousArtist from './bipocSubPages/indigenousArtist'
import { artistIfExist } from "../../AxiosFunctions/Axiosfunctionality"

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SnackbarCustom from '../../components/snackBar/SnackbarCustom'
import { ArtistDataAPI } from '../../redux/artistDataSlice'
import { ArtistImageSliceData } from '../../redux/artistImageDataSlice'
import { keywordDataApi } from '../../redux/keywordSlice'
import { RecentlyArtistImageSliceData } from "../../redux/recentlyArtistImageDataSlice";


function Index(props) {
    const { pages } = useParams()
    const { search } = useParams()
    const history = useHistory()

    const dispatch = useDispatch();
    const  {artistImageDataSlice, recentlyArtistImageDataSlice} = useSelector(state=>state);
    const  {artistImageKeywordDataSlice} = useSelector(state=>state);


    const [searchArtist,setSearchArtist] = useState("");
    const [tempArtist,setTempArtist]= useState([]);

    const [searchDivision,setSearchDivision] = useState("");
    const [tempDivision,setTempDivision]= useState([]);

    const divisions = ["illustration-artists","cgi","medical","motion","photography"]

    const updateTempArtist = (e)=>{
        setSearchArtist(e.target.value);
        const searchvalue = e.target.value.toLowerCase();
        setTempArtist( artistImageDataSlice !== undefined ?artistImageDataSlice.artistImages.filter(function (element) {
            let checker = false
            if(element.artistId.firstname.toLowerCase().includes(searchvalue) || element.artistId.lastname.toLowerCase().includes(searchvalue)){
                checker = true
            }
            return checker;

        }):[]);
    }

    const updateTempDivision = (e)=>{
        setSearchDivision(e.target.value);
        const searchvalue = e.target.value.toLowerCase();
        setTempDivision( artistImageKeywordDataSlice !== undefined ?artistImageKeywordDataSlice.artistKeywordImages.filter(function (element) {
            return element.keyword.toLowerCase().includes(searchvalue);
        }):[]);

    }
 
    const artistIfExistHandler = async () => {
        await artistIfExist({fullName: pages}).then((res) => {
            if(res.length > 0){
                return true
            }else if(res.length == 0){
                return false
            }else{
                history.push("/404")
            }
        })
    }

    useEffect(() => { 
        dispatch(ArtistDataAPI());
        dispatch(keywordDataApi());
        dispatch(RecentlyArtistImageSliceData());

    }, [])

    useEffect(() => {
        setSearchArtist("")

        if(!localStorage.getItem("routePaths")){
            const route = ["Home"]
            localStorage.setItem("routePaths",JSON.stringify(route))
        }

        if(pages == "divisions"){
            const route = ["Home","Division"]
            localStorage.setItem("routePaths",JSON.stringify(route))
        }
        if(divisions.includes(pages)){
            if(pages == "illustration-artists"){
                const route = ["Home","Division","Illustration"]
                localStorage.setItem("routePaths",JSON.stringify(route))
            }else{
                const letter = pages.charAt(0).toUpperCase() + pages.slice(1);
                const route = ["Home","Division",letter]
                localStorage.setItem("routePaths",JSON.stringify(route))
            }
        }

        if(pages == "categories"){
            const route = ["Home","Categories"]
            localStorage.setItem("routePaths",JSON.stringify(route))
            if(search){
                const path = localStorage.getItem("Category")
                const route = ["Home","Categories",path]
                localStorage.setItem("routePaths",JSON.stringify(route))
            }
        }

        if(pages == "bipoc"){
            const route = ["Home","Bipoc"]
            localStorage.setItem("routePaths",JSON.stringify(route))
            if(search){
                const letter = search.charAt(0).toUpperCase() + search.slice(1);
                const route = ["Home","Bipoc",letter]
                localStorage.setItem("routePaths",JSON.stringify(route))
            }
        }

        if(pages == "newest"){
            const route = ["Home","Newest Artists"]
            localStorage.setItem("routePaths",JSON.stringify(route))
        }

        if(pages == "recentlyUpdated"){
            const route = ["Home","Recently Updated Artists"]
            localStorage.setItem("routePaths",JSON.stringify(route))
        }

    }, [pages,search])

    return (
        <>
            <Header aciveBtn={pages} />
            <div className={(artistIfExistHandler()?"talentsection":"homesection")+" wf-section "+(pages?"divisions":"")}>
                <div className={"containerhome "+(artistIfExistHandler()?"":"home")}>
                    <Navbar aciveBtn={pages} searchBar={true}  searchArtist={searchArtist}  updateTempArtist={updateTempArtist} />
                    {pages?
                    pages === "categories"?
                        search?
                        <SearchByCategories searchArtist={searchArtist}  searchDivision={searchDivision} updateTempDivision={updateTempDivision} tempDivision={tempDivision}>
                            <DivisionSideBar activeBtn={pages}/>
                        </SearchByCategories>
                        :<Categories searchArtist={searchArtist}  searchDivision={searchDivision} updateTempDivision={updateTempDivision} tempDivision={tempDivision}>
                            <DivisionSideBar activeBtn={pages}/>
                        </Categories>
                    :pages === "divisions"?
                    search?
                    <SearchByDivision>
                        <DivisionSideBar activeBtn={search}/> 
                    </SearchByDivision>
                    :<Divisions searchArtist={searchArtist} searchDivision={searchDivision} updateTempDivision={updateTempDivision} tempDivision={tempDivision}>
                        <DivisionSideBar activeBtn={pages}/>
                    </Divisions>
                    :pages === "artist"?
                        // search?
                        // <SearchByArtist>
                        //     <DivisionSideBar activeBtn="detailedPage"/>
                        // </SearchByArtist>
                        // :
                        <Artists>
                            <ArtistSideBar/>
                        </Artists>
                    :pages === "illustration-artists"?
                        <IllustrationArtists searchArtist={searchArtist}>
                            <DivisionSideBar activeBtn={pages}/>
                        </IllustrationArtists>
                    :pages === "cgi"?
                        <CGI searchArtist={searchArtist}>
                            <DivisionSideBar activeBtn={pages}/>
                        </CGI>
                    :pages === "medical"?
                        <MEDICAL searchArtist={searchArtist}>
                            <DivisionSideBar activeBtn={pages}/>
                        </MEDICAL>
                    :pages === "motion"?
                        <MOTION searchArtist={searchArtist}>
                            <DivisionSideBar activeBtn={pages}/>
                        </MOTION>                    
                    :pages === "photography"?
                        <Photography searchArtist={searchArtist}>
                            <DivisionSideBar activeBtn={pages}/>
                        </Photography>
                    :pages === 'newest'?
                        <NewestArtists searchArtist={searchArtist}>
                            <ArtistSideBar  activeBtn={pages}/>
                        </NewestArtists>
                    :pages === 'recentlyUpdated'?
                        <UpdatedArtists searchArtist={searchArtist}>
                            <ArtistSideBar activeBtn={pages}/>
                        </UpdatedArtists>
                    :pages === "about"?
                        <About/>
                    :pages === "contact"?
                        <Contact/>
                    :pages === "bipoc" && search === "black" ?
                        <BlackArtist/>
                    :pages === "bipoc" && search === "asianArtist" ? 
                        <AsianArtist/>
                    :pages === "bipoc" && search === "latinoArtist" ? 
                        <LatinoArtist/>
                    :pages === "bipoc" && search === "centralAsianArtist" ? 
                        <CentralAsianArtist/>
                    :pages === "bipoc" && search === "indigenousArtist" ? 
                        <IndigenousArtist/>
                    :pages === "bipoc"?
                        <Bipoc/>
                    :artistIfExistHandler()?
                        <SearchByArtist>
                            <DivisionSideBar activeBtn="detailedPage" currentArtist={pages} />
                        </SearchByArtist>
                    :<Redirect to="/404"/>
                    :<Artists  tempArtist={tempArtist} searchArtist={searchArtist}>
                        <ArtistSideBar activeBtn={pages}/>
                    </Artists>
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index