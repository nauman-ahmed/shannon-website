import axios from "axios";

//for Contacts Functionality



// export const BASE_URL = "http://localhost:5001/api/"
// export const IMAGE_ROUTE = "http://localhost:5001/";


export const BASE_URL = "3.128.113.172/api/"
export const IMAGE_ROUTE = "3.128.113.172/";


export const logouter = () => {
    // localStorage.removeItem('authorization');
    // window.location.href = '/#/admin/signin/'
}

export const logouterArtist = () => {
    localStorage.removeItem('authorization');
    // window.location.href = '/#/artist/signin/'
}

export const artistImageDetailedSliceData = async (data) => {
    try {
        const response = await axios.post(BASE_URL+"artistImage/getAllStatusOneDetailed",data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const artistImageSliceData = async (data) => {
    try {
        const response = await axios.post(BASE_URL+"artistImage/getAllStatusOne",data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getImageBaseURL = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/base64', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getTypeTwoKeyword = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keywordKid/getTypeTwoKeywords', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getWorldData = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'worldData/getStateCity', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const getBipocBlack = async (data) => {
    try {
        const response = await axios.get(BASE_URL + 'bipoc/getAllBlack', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getBipocAsian = async (data) => {
    try {
        const response = await axios.get(BASE_URL + 'bipoc/getAllAsian', data);
        return response.data;
    } catch (error) {
        console.log('ERROR IN FETCHING API')
    }
}

export const getBipocLatino = async (data) => {
    try {
        const response = await axios.get(BASE_URL + 'bipoc/getAllLatino', data);
        return response.data;
    } catch (error) {
        console.log('ERROR IN FETCHING API')
    }
}

export const getBipocCentralAsia = async (data) => {
    try {
        const response = await axios.get(BASE_URL + 'bipoc/getAllCentralAsia', data);
        return response.data;
    } catch (error) {
        console.log('ERROR IN FETCHING API')
    }
}

export const getBipocIndigenous = async (data) => {
    try {
        const response = await axios.get(BASE_URL + 'bipoc/getAllIndigenous', data);
        return response.data;
    } catch (error) {
        console.log('ERROR IN FETCHING API')
    }
}


export const getIllustrations = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/getIllustration');
        return response.data;
    } catch (error) {
        logouter();
    }
}
export const getCgi = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/getCgi');
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getMedical = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/getMedical');
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getMotion = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/getMotion');
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getPhotography = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/getPhotography');
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const getContacts = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'contact/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const deleteContacts = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'contact/deleteId', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const updateKeyword = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/updateById', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const deleteKeyword = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/deleteId', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const createContact = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'contact/create', data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}


export const getArtImages = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getArtist = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistUser/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getActiveArtist = async (data) => {
    try {
        const response = await axios.post(BASE_URL+"artistUser/getAllClient",data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const updateSingleContact = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'contact/updateSingle', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const DArtistUser = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistUser/singleDelete', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const UArtistUser = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistUser/singleUpdate', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const AArtistUser = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistUser/create', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const AdminUsers = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'Admin/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const forgetAdmin = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'Admin/forgetPassword', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const UAdminUser = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'Admin/singleUpdate', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}



export const DAdminUser = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'Admin/singleDelete', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}



export const AAdminUser = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'Admin/register', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}




export const getCategory = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getCategoryTypeOne = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/getAllTypeOne', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getArtistCategoryTypeOne = async (keyword) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/artistCategory',keyword);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const addCategory = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'keyword/create', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const orderArtist = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistUser/orderArtist', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const similarArtistAdd = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'similarArtistUser/update', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const similarArtistGetAll = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'similarArtistUser/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const similarArtist = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'similarArtistUser/update', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const artistPortfolioOrder = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/orderPortfolio', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const artistImageCreate = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/CreateAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const artistImagedelete = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/deleteOne', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const artistImageToggleVisibility = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/toggleVisibility', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const artistDataId = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/findId', data);
        return response.data;
    } catch (error) {
        logouter();
    }
} 

export const updateArtistBio = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistUser/updateBio', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const forgetArtist = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistUser/forgetPassword', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}



export const getByImageId = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/getByImageId', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const changeArtistImageStatus = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/changeStatus', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}


export const updateArtistData = async (data) => {
    try { 
        const response = await axios.post(BASE_URL + 'artistUser/updateArtist', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}
export const LoginAdmin = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'Admin/login', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}
 

export const changeArtistImageDetails = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/updateData', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const changeArtistImageViewed = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/changeViewedData', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getAllBanner = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'banner/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const getAllContents = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'content/getAll', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const artistKeywordBased = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'artistImage/getKeywordBased', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const updateBannerImage = async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'banner/singleUpdate', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}

export const updateContents= async (data) => {
    try {
        const response = await axios.post(BASE_URL + 'content/singleUpdate', data);
        return response.data;
    } catch (error) {
        logouter();
    }
}