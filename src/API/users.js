import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'https://ptme-api.onrender.com/api';

export const Login = async (email, password) => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Payload:", JSON.stringify({ email, password }));

    const result = await fetch(`${API_BASE}/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const resJson = await result.json();
    console.log("Status:", result.status);
    console.log("Response body:", resJson);

    if (!result.ok) {
        // Handles both string messages and array of validation errors from backend
        const errorMessage = Array.isArray(resJson)
            ? resJson.map(err => err.description).join('\n')
            : resJson.error || resJson.message || 'Login Failed';

        throw new Error(errorMessage);
    }

    return resJson;

};

export const Register = async (email, password) => {
    const result = await fetch(`${API_BASE}/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const resJson = await result.json();
    console.log("Status:", result.status);
    console.log("Response body:", resJson);

    if (!result.ok) {
        
        // If it's an array of validation errors, format them
        const errorMessage = Array.isArray(resJson)
            ? resJson.map(err => err.description).join('\n')
            : resJson.error || resJson.message || 'Registration Failed';

        throw new Error(errorMessage);
    }

    return resJson;
}

 export const Logout = async () => {
     await AsyncStorage.removeItem('token');
     return;
   };