export const findBook = async(keyword:string, theme:string)=> {
    const url = `https://reststop.randomhouse.com/resources/titles?keyword=${keyword}&theme=${theme}`
    const options:RequestInit = {
        headers: {
            Accept: 'application/json',
            Authorization:'Basic ' + btoa("testuser:testpassword"),
        },
        mode: 'no-cors'
        
    }
    
    return await fetch(url, options).then(res=>res.json());

}