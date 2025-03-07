import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
});

var Greeting = props => {
    return (
        <View style={styles.center}>
            <Text>Hello {props.name}</Text>
        </View>
    )
}

var Greetings = () =>{
    return(
        <View style={[styles.center, {top:50}]}>
            <Greeting name="Callum"/>
            <Greeting name="Tom"/>
            <Greeting name="Ollie"/>
        </View>
    )
}

export default Greetings;

