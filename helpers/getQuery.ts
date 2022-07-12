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
            priceRangeFilter = {list: {_or: {price: {_lte: parseNearAmount("5")}, offer: {price: {_lte: parseNearAmount("5")}}}}}
            
            break;
        case '5-10':   
            priceRangeFilter =  {list: {_or: {price: {_gte: parseNearAmount("5"), _lte: parseNearAmount("10")}, offer: {price: {_gte: parseNearAmount("5"), _lte: parseNearAmount("10")}}}}}

            break;
        case '10-100':
            priceRangeFilter = {list: {_or: {price: {_gte: parseNearAmount("10"), _lte: parseNearAmount("100")}, offer: {price: {_gte: parseNearAmount("10"), _lte: parseNearAmount("100")}}}}}

            break;

        case '100+':
            priceRangeFilter =  {list: {_or: {price: {_gt: parseNearAmount("100")}, offer: {price: {_gt: parseNearAmount("100")}}}}}

            break;
        default: 
            priceRangeFilter = {}
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

