import axios from 'axios';
import type { Method } from 'axios';

export const propertyForRent = async (optionalParams = {}) => {
  const options = {
    method: 'GET' as Method,
    url: 'https://bayut.p.rapidapi.com/properties/list',
    params: {
      locationExternalIDs: '5002,6020',
      purpose: 'for-rent',
      hitsPerPage: '25',
      page: '0',
      lang: 'en',
      sort: 'city-level-score',
      rentFrequency: 'monthly',
      categoryExternalID: '4',
      ...optionalParams
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    let hits = response.data.hits;
    let data = [];
    for (let property of hits) {
      let obj = {
        title: property.title,
        price: property.price,
        rentFrequency: property.rentFrequency,
        area: property.area,
        rooms: property.rooms,
        baths:  property.baths
      }
      data.push(obj);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
