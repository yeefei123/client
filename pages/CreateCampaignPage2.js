import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';

const FormField = ({ title, inputType, control }) => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [image, setImage] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const selectImage = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if (!response.didCancel && !response.error) {
                setImage(response.uri);
            }
        });
    };

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>{title}</Text>
            {inputType === 'date' ? (
                <TouchableOpacity onPress={showDatepicker}>
                    <Text style={styles.input}>{date.toDateString()}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={selectImage}>
                    <Text style={styles.input}>{image ? 'Image Selected' : 'Select Image'}</Text>
                </TouchableOpacity>
            )}
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode='datetime'
                    display='default'
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const CreateCampaignPage2 = () => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Start a Crowdfunding Campaign</Text>
                </View>
                <Progress.Bar progress={1.0} width={200} marginBottom={20} />
                <FormField title="End Date" inputType="date" control={control} />
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Campaign image</Text>
                </View>
                <View style={styles.submitButton}>
                    <Button title="Submit" color="white" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
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
    submitButton: {
        backgroundColor: 'blue',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
    },
});

export default CreateCampaignPage2;
