import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
//import Modal from '../components/modals/TestModal.jsx'

import styles from '../styles/style.jsx';

import Modal from '../components/modals/Set.jsx';


const Settings = ({ navigation }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (

        <View >
            <Modal isModalVisible={isModalVisible}
                toggleModal={toggleModal} />
        </View>
    )
}

export default Settings