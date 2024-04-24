import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import Main from './Main';

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

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontFamily: 'MarkerFelt-Thin',
  }
});

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('GameFund');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View className='h-full justify-center items-center bg-white'>
      <FloatAnimation />
      <Text style={styles.text}>GameFund</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen
          name="Home"
          component={HomeScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="GameFund" component={Main} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
