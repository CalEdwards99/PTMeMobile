import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'https://ptme-api.onrender.com/api/WorkoutSession';
//const API_BASE = 'http://localhost:5000/api/WorkoutSession';

export const addWorkoutSession = async (session) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/SaveWorkoutSession`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(session),
        });

        const json = await result.json();

        if (json.success) {
            console.log("API Data:", json.message);
            return json.success;
        } else {
            console.warn("API responded with success=false or no data:", json.message);
            return [];
        }

    } catch (error) {
        console.error("Error saving workout:", error);
        return [];
    }

};

export const getWorkoutsSessionFeed = async () => {
    try {

        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/GetWorkoutFeed`, {
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
        console.error("Error getting workout sessions:", error);
        return [];
    }

};