import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GestureImages } from "@/components/Gestures/gestureImages";
import clsx from "clsx";
import {StyleSheet, Image, Platform, SafeAreaView, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import {GestureDescription} from "@/components/Gestures/gestureDescription";
import Animated, {useAnimatedProps, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const Header = () => (
    <View className="flex-row w-full border-b border-gray-200 justify-evenly items-center py-3">
        <TouchableOpacity className="items-center">
            <Text className="text-sm font-medium">Preferences</Text>
            <AntDesign name="caretdown" size={12} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
            <Image
                source={require('../../assets/images/favicon.png')}
                className="h-10 w-10"
            />
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
            <Text className="text-sm font-medium">Notification</Text>
            <AntDesign name="caretdown" size={12} color="black" />
        </TouchableOpacity>
    </View>
);

const TabOneScreen = () => {
    const offSetY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            offSetY.value = event.contentOffset.y;
        },
        onMomentumBegin: (e) => {
            console.log('The list is moving.');
        },
        onMomentumEnd: (e) => {
            console.log('The list stopped moving.');
        },
    });

    return (
        <SafeAreaView
            className={clsx("flex-1", {
                "pt-6": Platform.OS === "android"
            })}
        >
            <GestureHandlerRootView className="flex-1">

                <GestureImages />

            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

export default TabOneScreen;

const styles = StyleSheet.create({
    container: {
        width: 500,
        height: 350,
    },
    header: {
        backgroundColor: '#f8f9ff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        textAlign: 'center',
        fontFamily: 'Aeonik',
        color: '#001a72',
        marginTop: -1,
    },
    section: {
        height: 150,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 20,
    },
});