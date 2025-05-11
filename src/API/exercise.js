import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE = 'https://ptme-api.onrender.com/api/Exercise';

export const getExercises = async (workoutId) => {
    try {

        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/GetExercises`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const json = await result.json();

        if (json.success && Array.isArray(json.data)) {
            console.log("API Data:", json.data);
            return json.data;
        } else {
            console.warn("API responded with success=false or no data:", json.message);
            return [];
        }


    } catch (error) {
        console.error("Error getting exercises:", error);
        return [];
    }

};