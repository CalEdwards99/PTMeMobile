import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE = 'https://ptme-api.onrender.com/api/Workouts';

export const getWorkouts = async () => {
    try {

        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/GetUserWorkouts`, {
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
        console.error("Error getting workouts:", error);
        return [];
    }

};

export const saveWorkout = async (name, description) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/SaveWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description }),
        });

        const json = await result.json();

        if (json.success) {
            console.log("API Data:", json.data);
            return json.data;
        } else {
            console.warn("API responded with success=false or no data:", json.message);
            return [];
        }

    } catch (error) {
        console.error("Error saving workout:", error);
        return [];
    }

};

export const deleteWorkout = async (workoutId) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/DeleteWorkout?workoutId=${workoutId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const json = await result.json();

        if (json.success) {
            console.log("API Data:", json.data);
            return json.data;
        } else {
            console.warn("API responded with success=false or no data:", json.message);
            return [];
        }

    } catch (error) {
        console.error("Error deleting workout:", error);
        return [];
    }

};