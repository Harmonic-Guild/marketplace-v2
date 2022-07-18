import {parseNearAmount} from 'near-api-js/lib/utils/format'

function QueryFilters(filters: any) {
    
    const {range, type} = filters;

    const prices = handlePriceRange(range)
    const types =  handleTypeFilter(type)
    
        
    return {prices, types};
    }

   



const handlePriceRange = (range: string) => {
    let priceRangeFilter = {};

    switch (range) {
        case '1-5':
            priceRangeFilter = {lt: parseNearAmount("5"), gt: parseNearAmount("0")}
            
            break;
        case '5-10':   
            priceRangeFilter =  {lt: parseNearAmount("10"), gt: parseNearAmount("5")}

            break;
        case '10-100':
            priceRangeFilter = {lt: parseNearAmount("100"), gt: parseNearAmount("10")}

            break;

        case '100+':
            priceRangeFilter =  {lt: parseNearAmount("9999999999"), gt: parseNearAmount("100")}

            break;
        default: 
            priceRangeFilter = {lt:parseNearAmount("999999999"), gt: parseNearAmount("0")}
    }

    return priceRangeFilter;

}

const handleTypeFilter = (type:string)=> {
    let typeFilter: string[] = [];

    switch (type) {
        case 'video':
            typeFilter = ["video/mp4", "video/ogg"]

            break;
        case 'audio': 
            typeFilter = ["audio/mpeg", "audio/mp3", "audio/ogg"]
        
            break;
        case 'image': 
            typeFilter = ["image/jpeg", "image/png", ]

            break;
        case 'gif': 
            typeFilter= ["image/gif"]

            break;
        default: 
            typeFilter= ["video/mp4", "video/ogg", "audio/mpeg", "audio/mp3", "audio/ogg", "image/gif", "image/jpeg", "image/png", "image/gif"];
    }

    return typeFilter;  
}


export default QueryFilters;

