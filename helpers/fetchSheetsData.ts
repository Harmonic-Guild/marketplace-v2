const url: string = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL!

export const getData = async ()=> {
    if(!url) return;
  const res= await fetch(url);
  const result = await res.text();
  const data =  JSON.parse(result.substring(47).slice(0, -2))
  return data.table;
}


