import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const Input = props => {
    return <TextInput {...props} style={{...styles.input, ...props.styles}}/>
};

const styles = StyleSheet.create({
    input: {
        height: 25,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
        textAlign: 'center',
    }
})

export default Input;