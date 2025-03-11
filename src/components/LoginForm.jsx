// src/components/LoginForm.js
import React from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/style.jsx';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <>
      <Text style={[styles.textCenter, { fontSize: 30, fontWeight: 'bold', color: '#1D4ED8', marginBottom: 20 }]}>Login</Text>

      {/* Login Form */}
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

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password and Sign Up Links */}
      <TouchableOpacity>
        <Text style={[styles.textCenter, styles.linkText]}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={[styles.textCenter, { color: '#4B5563' }]}>
          Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default LoginForm;
