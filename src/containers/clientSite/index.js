import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import ArtistSideBar from '../../components/layout/artistSideBar'
import DivisionSideBar from '../../components/layout/divisionSideBar'
import Footer from '../../components/layout/footer'
import Header from '../../components/layout/header'
import Navbar from '../../components/layout/navbar'
import About from './about'
import Artists from './artists'
import Bipoc from './bipoc'
import CGI from './cgi'
import Contact from './contact'
import Divisions from './divisions'
import IllustrationArtists from './illustration-artists'
import Photography from './photography'
import SearchByArtist from './searchPages/searchByArtist'
import SearchByDivision from './searchPages/searchByDivision'


import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SnackbarCustom from '../../components/snackBar/SnackbarCustom'
import { ArtistDataAPI } from '../../redux/artistDataSlice'
import { ArtistImageSliceData } from '../../redux/artistImageDataSlice'
import { keywordDataApi } from '../../redux/keywordSlice'

function Index(props) {
    const { pages } = useParams()
    const { search } = useParams()


    const dispatch = useDispatch();
    const  {artistImageDataSlice} = useSelector(state=>state);
    const  {artistImageKeywordDataSlice} = useSelector(state=>state);


    const [searchArtist,setSearchArtist] = useState("");
    const [tempArtist,setTempArtist]= useState([]);

    const [searchDivision,setSearchDivision] = useState("");
    const [tempDivision,setTempDivision]= useState([]);


    const updateTempArtist = (e)=>{
        setSearchArtist(e.target.value);
        const searchvalue = e.target.value.toLowerCase();
        setTempArtist( artistImageDataSlice !== undefined ?artistImageDataSlice.artistImages.filter(function (element) {
            return element.artistId.firstname.toLowerCase().includes(searchvalue);
        }):[]);

    }
    const updateTempDivision = (e)=>{
        setSearchDivision(e.target.value);
        const searchvalue = e.target.value.toLowerCase();
        setTempDivision( artistImageKeywordDataSlice !== undefined ?artistImageKeywordDataSlice.artistKeywordImages.filter(function (element) {
            return element.keyword.toLowerCase().includes(searchvalue);
        }):[]);

    }
 
    

    useEffect(() => {
        dispatch(ArtistDataAPI());
        dispatch(keywordDataApi());
    }, [])


    return (
        <>
            <Header aciveBtn={pages} />
            <div className={(pages === "artists"?"talentsection":"homesection")+" wf-section "+(pages?"divisions":"")}>
                <div className={"containerhome "+(pages !== "artists"?"home":"")}>
                    {pages === "artists" && search?null: <Navbar aciveBtn={pages} searchBar={pages?false:true}  searchArtist={searchArtist} updateTempArtist={updateTempArtist}/>}
                    {pages?
                    pages === "divisions"?
                        search?
                        <SearchByDivision>
                            <DivisionSideBar activeBtn={search}/>
                        </SearchByDivision>
                        :<Divisions searchDivision={searchDivision} updateTempDivision={updateTempDivision} tempDivision={tempDivision}>
                            <DivisionSideBar activeBtn={pages}/>
                        </Divisions>
                    :pages === "artists"?
                        search?
                        <SearchByArtist/>
                        :<Artists>
                            <ArtistSideBar/>
                        </Artists>
                    :pages === "illustration-artists"?
                        <IllustrationArtists>
                            <DivisionSideBar activeBtn={pages}/>
                        </IllustrationArtists>
                    :pages === "cgi"?
                        <CGI>
                            <DivisionSideBar activeBtn={pages}/>
                        </CGI>
                    :pages === "photography"?
                        <Photography>
                            <DivisionSideBar activeBtn={pages}/>
                        </Photography>
                    :pages === "about"?
                        <About/>
                    :pages === "contact"?
                        <Contact/>
                    :pages === "bipoc"?
                        <Bipoc/>
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