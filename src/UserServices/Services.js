export const findCountOfReviewArtist = (res) => {
    var Counter = 0;
    res.forEach((item, key) => {
        if (item.mainImage.length > 0) {
            item.mainImage.forEach((item1, key1) => {
                if (item1["statusViewed"] === 0 && item1["statusSubmit"] === 1 && item.artistId) {
                    Counter++;
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
