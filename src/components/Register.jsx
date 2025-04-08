import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useUserContext } from '../context/UserContext.jsx';
import styles from '../styles/style.jsx';


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch } = useUserContext();

    const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch({
      type: "REGISTER_USER",
      payload: { email, password }
    });

    //dispatch({ type: "TOGGLE_SIGNED_IN" }); // optional auto-login after registration
  };

    function closeSignUp() {
        dispatch({ type: "TOGGLE_SIGN_UP" })
    };

    return(
    <View style={styles.container}>
        <Text style={[styles.textCenter, { fontSize: 30, fontWeight: 'bold', color: '#1D4ED8', marginBottom: 20 }]}>Register</Text>

        {/* Register Form */}
        <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
        />

        <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
        />

        <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
        />

        {/* Create User */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Forgot Password and Sign Up Links */}
        <TouchableOpacity onPress={closeSignUp}>
            <Text style={[styles.textCenter, styles.linkText]}>Back to Login</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Register