import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

const FormField = ({ title, inputType, control }) => {
    const keyboardType = inputType === 'targetAmount' ? 'numeric' : 'default';

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>{title}</Text>
            <Controller
                control={control}
                name={title}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        style={styles.input}
                        placeholder={`Enter your ${title}`}
                        placeholderTextColor="#999"
                        keyboardType={keyboardType}
                    />
                )}
            />
        </View>
    );
};

const CreateCampaign = ({ navigation }) => {
    const { control, handleSubmit, formState } = useForm();
    const [confirmNavigation, setConfirmNavigation] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (formState.isDirty) {
                e.preventDefault();
                setConfirmNavigation(true);
            }
        });

        return unsubscribe;
    }, [navigation, formState]);

    const onSubmit = (data) => {
        console.log(data);
        // Add logic to handle form submission
    };

    const handleBackNavigation = () => {
        if (formState.isDirty) {
            setConfirmNavigation(true);
        } else {
            navigation.goBack();
        }
    };

    const handleConfirmNavigation = () => {
        setConfirmNavigation(false);
        navigation.goBack();
    };

    const handleCancelNavigation = () => {
        setConfirmNavigation(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Start a Crowdfunding Campaign</Text>
                </View>
                <Progress.Bar progress={0.3} width={200} marginBottom={20} />
                <FormField title="Campaign Name" inputType="string" control={control} />
                <FormField title="Main Purpose" inputType="string" control={control} />
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Description</Text>
                    <TextInput
                        editable
                        numberOfLines={4}
                        style={styles.descriptionInput}
                        placeholder="Enter your campaign description (max 300 words)"
                        placeholderTextColor="#999"
                    />
                </View>
                <FormField title="Target Amount" inputType="targetAmount" control={control} />
                <View style={styles.submitButton}>
                    <Button title="Next" color="white" onPress={handleSubmit(onSubmit)} />
                </View>
                {confirmNavigation && (
                    <View style={styles.confirmationContainer}>
                        <Text style={styles.confirmationText}>Discard changes and go back?</Text>
                        <View style={styles.confirmationButtons}>
                            <Button title="Cancel" onPress={handleCancelNavigation} />
                            <Button title="Confirm" onPress={handleConfirmNavigation} />
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 20,
        width: '100%',
    },
    fieldTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        color: '#333',
    },
    descriptionInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 5,
        height: 4 * 22,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: 'blue',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
    },
    confirmationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmationText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#fff',
    },
    confirmationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
});

export default CreateCampaign;
