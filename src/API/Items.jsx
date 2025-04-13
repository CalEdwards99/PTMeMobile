//import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'https://ptme-api.onrender.com/api';

export const getItems = async () => {
        try {

            const token = await AsyncStorage.getItem('token');

            const result = await fetch(`${API_BASE}/items`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await result.json();

            if (Array.isArray(data) && data.length > 0) {
                console.log("API Data:", data);
                return data;
                //setItems(data);
            } else {
                console.log("No items returned from API");
                //setItems([]);
                return [];
            }

        } catch (error) {
            console.error("Error fetching items:", error);
            //setItems([]);
            return [];
        }

};