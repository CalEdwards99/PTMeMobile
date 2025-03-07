import React from 'react';
import { Text, View } from 'react-native';

var hello = function Hello() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Text>Imported file</Text>
        </View>
    )
}

export default hello;