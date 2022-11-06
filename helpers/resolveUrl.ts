export const resolveUrl = (media: string, media_hash: string ): string => {
    if(!media && !media_hash) null
    if(media) {
        return `${media?.startsWith('https://')? media : `https://arweave.net/${media}`}`
    } 
    else {
        return `${media_hash?.startsWith('https://')? media_hash : `https://arweave.net/${media_hash}`}`
    }
}