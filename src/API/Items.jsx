import axios from 'axios';

const API_URL = "http://172.20.10.3:5000/api/items";

export const getItems = async () => {
    console.log("fetching items");
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data;
};

export const createItem = async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data;
};