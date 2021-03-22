import React, {useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Button, Image} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";


const GameOverScreen = (props) => {

    return (
        <View style={styles.screen}>
            <TitleText>Game Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/images/success.png")}
                    // source={{uri:'https://miro.medium.com/max/700/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg' }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed
                    <Text style={styles.highlight}> {props.roundsNumber} </Text>
                    rounds to guess the number
                    <Text style={styles.highlight}> {props.userNumber} </Text>
                </BodyText>
            </View>

            <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    },
    resultContainer: {
        marginVertical: 10,
        marginHorizontal: 30,
    }
});

export default GameOverScreen;
