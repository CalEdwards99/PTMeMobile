import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'https://ptme-api.onrender.com/api/Workouts';
//const API_BASE = 'http://localhost:5000/api/Workouts';

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

export const addWorkout = async (name, description) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/AddWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description }),
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

export const updateWorkout = async (Id, name, description) => {
    try {
        const token = await AsyncStorage.getItem('token');

        console.log("Workout updated id = " + Id);

        const result = await fetch(`${API_BASE}/UpdateWorkout/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description }),
        });

        const json = await result.json();

        //console.log("update workout result = " + result)

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

export const deleteWorkout = async (workoutId) => {
    try {
        console.log("deleting working in js file")
        const token = await AsyncStorage.getItem('token');

        const result = await fetch(`${API_BASE}/DeleteWorkout?workoutId=${workoutId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const json = await result.json();

        if (!result.ok) {
            console.warn('Delete failed:', json.message || 'Unknown error');
            return;
        }

        console.log(json.message);

        return json.success;

    } catch (error) {
        console.error("Error deleting workout:", error);
        return [];
    }

};