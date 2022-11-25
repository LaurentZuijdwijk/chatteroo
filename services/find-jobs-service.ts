const dotenv = require('dotenv');



export const findJobs = async (jobTitle, location, salary)=>{
    const result = await fetch(
        `${process.env.OFFER_BASE_URL}/listings/details?Offset=0&Limit=5&What=${jobTitle}&Where=${location}&Radius=10&Salary=${salary}&Lang=en&JobType=10`
        ).then(res=>res.json())
    return result;
}