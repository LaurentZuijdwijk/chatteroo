import axios from "axios";

const dotenv = require("dotenv");

type ISearchCriteria = {
  JobTitle: string;
  Location: string;
  Salary: number;
};

export const findJobs = async (
  searchCriteria: ISearchCriteria
): Promise<any> => {
  try {
    const { JobTitle, Location, Salary } = searchCriteria;
    
    const result = await axios.get(
      `${process.env.OFFER_BASE_URL}/listings/details?Offset=0&Limit=5&What=${JobTitle}&Where=${Location}&Radius=10&Salary=${Salary}&Lang=en&JobType=10`
    );

    const offersSimplified = result.data.listings.map((offer: any) => ({
      title: offer.title,
      location: offer.location,
      salaryDescription: offer.salaryDescription,
      datePosted: offer.datePosted,
      url: offer.url,
    }));

    return offersSimplified;
  } catch (e) {
    console.error("Error in findJobs request: ", e);
  }
};
