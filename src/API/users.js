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
    throw new Error(resJson.error || resJson.message || 'Login Failed');
  }

  return resJson;
};

export const Register = async (email, password) => {
    const result = await fetch(`${API_BASE}/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!result.ok) {
        const error = await result.json();
        throw new Error(error.message || 'Registraion failed')
    }

    return result.json();
}