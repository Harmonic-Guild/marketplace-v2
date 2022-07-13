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
    let typeFilter = {};

    switch (type) {
        case 'video':
            typeFilter = { thing:{ metadata: { animation_type: { _eq: "video/mp4" }}}}

            break;
        case 'audio': 
            typeFilter = { thing:{ metadata: { animation_type: { _eq: "audio/mpeg" }}}}
        
            break;
        case 'image': 
            typeFilter = { thing:{ metadata: { animation_type: {_nin: ["video/mp4", "audio/mpeg", "image/gif"]}}}}

            break;
        case 'gif': 
            typeFilter= { thing:{ metadata: { animation_type: { _eq: "image/gif" }}}}

            break;
        default: 
            typeFilter= {};
    }

    return typeFilter;  
}


export default QueryFilters;

