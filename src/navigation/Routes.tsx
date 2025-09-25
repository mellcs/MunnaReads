import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import WelcomeScreen from "../screens/WelcomeScreen";
import MainScreen from "../screens/MainScreen";
import Shelf from "../screens/Shelf";
import AddBook from "../screens/AddBook";
import Quotes from "../screens/Quotes";
import Profile from "../screens/Profile";
import IndividualBook from "../screens/IndividualBook"
import Recommendations from "../screens/Recommendations"
import FavoritesScreen from "../screens/FavoritesScreen"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 100,
          elevation: 5,
        },
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "book-outline";

          if (route.name === "Quotes") {
            iconName = "star-outline";
          } else if (route.name === "MainScreen") {
            iconName = "book-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? "#FFD18C" : "black"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Quotes" component={Quotes} />
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome" 
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} /> 
        <Stack.Screen name="Tabs" component={TabRoutes} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="Shelf" component={Shelf}/>
        <Stack.Screen name="IndividualBook" component={IndividualBook} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Quotes" component={Quotes} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Recommendations" component={Recommendations} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
