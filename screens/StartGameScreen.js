import React, {useState, useEffect} from "react";
import {
    View,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";


import Card from "../components/Card";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    });

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };
    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (
            isNaN(chosenNumber) ||
            chosenNumber <= 0 ||
            chosenNumber > 99 ||
            chosenNumber === undefined
        ) {
            Alert.alert(
                "Invalid number!",
                "Number has to be a number between 1 and 99.",
                [
                    {
                        text: "Ok",
                        style: "default",
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        }
        setConfirmed(true);
        setEnteredValue("");
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a new Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                styles={styles.input}
                                keyboardType={"number-pad"}
                                autoCorrect={false}
                                autoCapitalize={"none"}
                                maxLength={2}
                                blurOnSubmit={true}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button
                                        title={"Reset"}
                                        onPress={resetInputHandler}
                                        color={Colors.accent}
                                    />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button
                                        title={"Confirm"}
                                        onPress={confirmInputHandler}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: '90%',

        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    summaryContainer: {
        marginTop: 25,
        alignItems: 'center',

    },
    // button: {
    //     width: Dimensions.get('window').width / 3,
    // },
    input: {
        width: 50,
        alignItems: "center",
    },
});

export default StartGameScreen;
