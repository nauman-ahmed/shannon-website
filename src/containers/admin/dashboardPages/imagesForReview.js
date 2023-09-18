import React, { useEffect, useState } from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import { changeArtistImageViewed } from '../../../AxiosFunctions/Axiosfunctionality'
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import { getDifferenceOfDates, sortArrayOrder } from "../../../UserServices/Services"
import loading from '../../../assets/loading_trasnparent.gif'; 

function ImagesForReview(props) {
    const historyCurrent = useHistory()
    const [artistImage, setArtistImage] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setArtistImage(sortArrayOrder(props.artistImages))
    },[props.artistImages])

    const checkConditionHandler = (item) => {
        let count = findStatusCount(item)
        let difference = getDifferenceOfDates(item.artistId.imageLastModified,new Date())
        if(count == 0 && difference >30){
            return false
        }else if(item.artistId.populateUnderImageReview == false){
            return false
        }
        return true
    }

    const findStatusCount = (item)=>{
        var count = 0;
        item.mainImage.forEach((item1,key)=>{
            if(item.artistId){
                if(item1.statusSubmit === 1 && item1.status === 0 && item.artistId.status == 1) {
                    count++;
                }
            }
        })
        return count;
    } 

    const redirectToArtistSubmission = (data) => {
        localStorage.removeItem("currentArtist")
        historyCurrent.push({
            pathname:"/admin/artists",
            state:data
        })
    }

    const toggleArtistVisibility = async (data) => {
        setLoading(true)
        let res = await changeArtistImageViewed(data)
        if(res == "successfully updated"){
            props.populateArtistImages()
            props.populateArtistUsers()
        }
        setLoading(false)
    }

  return (
    <div className='col'>
    <Table height="calc(100vh - 350px)">
        
        <THead>
            <Th minWidth="120">Name</Th>
            <Th minWidth="120">Date Last Uploaded</Th>
            <Th minWidth="120">Date Last Modified</Th>
            <Th minWidth="120"># of images for review</Th>
            <Th width="110"></Th>
        </THead>
        <TBody>
            {artistImage.length > 0 && artistImage.map((item,key)=>( 
                item.artistId && checkConditionHandler(item) ?
            <Tr key={key}>
                <Td>{item.artistId !== null?item.artistId.lastname+" "+item.artistId.firstname:""}</Td>
                <Td>{moment(item.artistId.imageLastUploaded).format('MM/DD/YYYY')}</Td>
                <Td>{moment(item.artistId.imageLastModified).format('MM/DD/YYYY')}</Td>
                <Td>{findStatusCount(item)}</Td>
                <Td className="d-flex">
                    <button 
                        className='mx-1 myBtn active' 
                        style={{width: 130}} type="text"
                        onClick={()=>redirectToArtistSubmission(item.artistId)}
                        >VIEW PROFILE</button>
                    <button 
                        className='mx-1 myBtn active' 
                        style={{width: 130}} type="text"
                        onClick={()=>toggleArtistVisibility(item.artistId)}
                    >APPROVE</button>
                </Td>
            </Tr>:""
            )
            ) 
            }
        </TBody>
    </Table>
</div>
  )
}

export default ImagesForReview