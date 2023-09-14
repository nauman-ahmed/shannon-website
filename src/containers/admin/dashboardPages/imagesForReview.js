import React from 'react'
import Table, { TBody, Td, Th, THead, Tr } from '../../../components/table/table'
import { changeArtistImageViewed } from '../../../AxiosFunctions/Axiosfunctionality'
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import { getDifferenceOfDates } from "../../../UserServices/Services"

function ImagesForReview(props) {
    const historyCurrent = useHistory()


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
        // changeArtistImageViewed(data)
        localStorage.removeItem("currentArtist")
        historyCurrent.push({
            pathname:"/admin/artists",
            state:data
        })
    }

  return (
    <div className='col'>
    <Table height="calc(100vh - 350px)">
        
        <THead>
            <Th minWidth="120">Name</Th>
            <Th minWidth="120">Date Last Modified</Th>
            <Th minWidth="120"># of images for review</Th>
            <Th width="110"></Th>
        </THead>
        <TBody>
            {props.artistImages.map((item,key)=>( 
                findStatusCount(item) > 0 ?
            <Tr key={key}>
                <Td>{item.artistId !== null?item.artistId.lastname+" "+item.artistId.firstname:""}</Td>
                <Td>{moment(item.artistId.imageLastModified).format('MM/DD/YYYY')}</Td>
                <Td>{findStatusCount(item)}</Td>
                <Td className="d-flex">
                    <button 
                        className='mx-1 myBtn active' 
                        style={{width: 130}} type="text"
                        onClick={()=>redirectToArtistSubmission(item.artistId)}
                        >VIEW PROFILE</button>
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