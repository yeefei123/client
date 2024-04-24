import React, { useState } from 'react';
import { Keyboard, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Campaign from './Campaign';

const IconButton = ({ icon, onPress, focused }) => {
    return (
        <TouchableOpacity style={[styles.button, focused && styles.focusedButton]} onPress={onPress}>
            <Icon name={icon} size={20} color={focused ? 'blue' : 'white'} />
        </TouchableOpacity>
    );
}

const Main = () => {
    const [focusedIcon, setFocusedIcon] = useState('home');
    const [isCampaignPageActive, setIsCampaignPageActive] = useState(true);
    const [isSettingPageActive, setIsSettingPageActive] = useState(false);

    const handlePress = (iconName) => {
        if (iconName === 'home') {
            setFocusedIcon(iconName);
            setIsCampaignPageActive(true);
            setIsSettingPageActive(false);
        }
        if (iconName === 'bars') {
            setFocusedIcon(iconName);
            setIsCampaignPageActive(false); // Ensure campaign page is inactive
            setIsSettingPageActive(true);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    {/* Conditionally render Campaign component based on isCampaignPageActive */}
                    {isCampaignPageActive && (
                        <>
                            <Text style={styles.campaignType}>All Campaigns</Text>
                            <Campaign />
                        </>
                    )}
                </View>

                <View style={styles.navigationBar}>
                    <View style={[styles.bottomBar, styles.rounded]}>
                        <IconButton icon="heart" onPress={() => handlePress('heart')} focused={focusedIcon === 'heart'} />
                        <IconButton icon="home" onPress={() => handlePress('home')} focused={focusedIcon === 'home'} />
                        <IconButton icon="user" onPress={() => handlePress('user')} focused={focusedIcon === 'user'} />
                        <IconButton icon="bars" onPress={() => handlePress('bars')} focused={focusedIcon === 'bars'} />
                    </View>
                </View>
                <StatusBar style='auto' />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    navigationBar: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '90%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    focusedButton: {
        backgroundColor: 'lightgrey',
        borderRadius: 30,
    },
    rounded: {
        borderRadius: 30,
    },
    statusBar: {
        height: 50
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 20,
        width: '70%'
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        padding: 10,
        fontSize: 20,
    },
    campaignType: {
        fontSize: 20,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 20,
        fontWeight: 'bold'
    }
});

export default Main;
