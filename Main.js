import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon from 'react-native-vector-icons/FontAwesome'

const FLOAT_DISTANCE = 20;

const FloatAnimation = () => {
    const floatAnim = new Animated.Value(0);

    React.useEffect(() => {
        const floatingAnim = Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: -1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );

        floatingAnim.start();
        return () => {
            floatingAnim.stop();
        };
    }, [floatAnim]);

    return (
        <Animated.View
            style={{
                transform: [{
                    translateY: floatAnim.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [-FLOAT_DISTANCE, 0, FLOAT_DISTANCE],
                    })
                }],
            }}>
            <Image source={require('./impact.png')} style={{ width: 200, height: 200 }} />
        </Animated.View>
    );
};

const IconButton = ({ icon, onPress }) => { // Add equal sign here
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={icon} size={20} color="black" />
        </TouchableOpacity>
    );
}

const handlePress = () => {
    // Define your handlePress function here or remove the reference to it
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    innerContainer: {
        marginLeft: 2,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
});

export default function Main() {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <IconButton icon="bars" onPress={handlePress} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
