
export const getDifferenceOfDates = (dateString1,dateString2) => {
   // Parse date strings into Date objects
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Calculate the difference in milliseconds
    const timeDifference = date2 - date1;

    // Convert milliseconds to days, hours, minutes, and seconds
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = 60 * millisecondsPerSecond;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;

    const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
    const hoursDifference = Math.floor((timeDifference % millisecondsPerDay) / millisecondsPerHour);
    const minutesDifference = Math.floor((timeDifference % millisecondsPerHour) / millisecondsPerMinute);
    const secondsDifference = Math.floor((timeDifference % millisecondsPerMinute) / millisecondsPerSecond);

    return daysDifference
}


export const findCountOfReviewArtist = (res) => {
    var Counter = 0;
    res.forEach((item, key) => {
        if (item.mainImage.length > 0) {
            item.mainImage.forEach((item1, key1) => {
                if(item.artistId){
                    if (item1["statusSubmit"] === 1 && item.artistId.status == 1 && item1["status"] === 0 && item.artistId.populateUnderImageReview) {
                        // console.log("ARTIST",item.artistId,item.mainImage.length)
                        Counter += 1;
                    }
                }
            })
        }
    })
    return Counter;
}

export const findCountOfArtistUsers = (res) => {
    var Counter = 0;
    res.forEach((item, key) => {

        if (item["accountRequest"] === 1) {
            Counter++;
        }

    })
    return Counter;
}

export const findSingleContact =(contacts,id) => {
    let singleContact = {};
    if(id !== ""){
        contacts.forEach((item,key)=>{
            if(item._id === id){
                singleContact = item
            }
        })
    }
    return singleContact
}

export const sortAlphaOrder=(Artist)=>{
    let arrayForSort = [...Artist]
    arrayForSort = arrayForSort.sort((a, b) => a.lastname.normalize().localeCompare(b.lastname.normalize()));
    let alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let tempArtist= {}
    alpha.forEach((item,key)=>{
        let tempList = [];
        arrayForSort.forEach((item1,key1)=>{
            if(item1.lastname[0].toUpperCase() === item){
                tempList.push(item1)
            }
        })
        if(tempList.length>0){
            tempArtist[item] = tempList;
        }
    })
   
    return tempArtist;
}

export const sortArrayOrder=(Artist)=>{
    let arrayForSort = [...Artist]
    let filtered = arrayForSort.filter((data)=> data.artistId)
    let filteredAndSorted = filtered.sort((a, b) => new Date(b.artistId.imageLastUploaded) - new Date(a.artistId.imageLastUploaded));
    return filteredAndSorted;
}

export const sortAlphaOrderKeyword=(Artist)=>{
    let arrayForSort = [...Artist]
    arrayForSort = arrayForSort.sort((a, b) => a.keyword.normalize().localeCompare(b.keyword.normalize()));
    return arrayForSort;
}

export const setImageRoute=(route)=>{
    let newRoute = ''
    let split = route.split("\\")
    split.map((val,ind)=>{
        if(split.length -1 == ind){
            newRoute = newRoute + val
        }else if(ind == 0){
            newRoute = val+"/"
        }else{
            newRoute = newRoute + val + "/"
        }
    })
    return newRoute       
}
