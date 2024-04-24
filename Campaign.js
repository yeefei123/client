import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

const Campaign = () => {
    return (
        <View style={styles.container}>
            <View style={styles.images}>
                <Image source={require('./impact.png')} style={{ width: 200, height: 200 }} />
            </View>
            <View style={styles.textBox}>
                <Text style={styles.title}>Title</Text>
                <Text style={styles.description}>Description</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderStyle: 'solid',
        backgroundColor: 'black',
        marginTop: 20,
        width: '80%'
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10
    },
    images: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBox: {
        paddingLeft: 20,
        paddingBottom: 20
    }
});

export default Campaign;
