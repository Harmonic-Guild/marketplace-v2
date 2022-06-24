function QueryFilters(pricaRange?: number, type?: string ) {
    
    let filter: string = ''
    
    if(pricaRange){
        filter+', {}'
    }

    if(type){
        filter+', {}'
    }

    return filter
}

export default QueryFilters;

