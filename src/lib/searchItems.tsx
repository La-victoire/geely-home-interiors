const searchItems = (items:any, query:any,fields:any) => {
  const lowerQuery = query.toLowerCase();
    return items.filter((item:any) => fields.some((field:any) => String(item[field])?.toLowerCase().includes(lowerQuery)))
}

export default searchItems