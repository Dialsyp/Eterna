import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Octicons from '@expo/vector-icons/Octicons';
function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel:false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: useClientOnlyValue(false, true),
                tabBarStyle: { paddingBottom: 5, height: 60 },
            }}>


            <Tabs.Screen
                name="index"
                options={{
                    title: 'Profils',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Octicons name="flame" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explorer',
                    tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
                }}
            />
            <Tabs.Screen
                name="likes"
                options={{
                    title: 'J\'aime',
                    tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    title: 'Messages',
                    tabBarIcon: ({ color }) => <TabBarIcon name="chatbubble" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => <TabBarIcon name="person-circle" color={color} />,
                }}
            />

        </Tabs>
    );
}
