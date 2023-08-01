import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "./homeScreen/Home";
import Friends from "./homeScreen/Friend";
import Notifi from "./homeScreen/Notifi";
import Profile from "./homeScreen/Profile";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();
const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconname;
          if (route.name === "Home") {
            iconname = focused ? "home" : "home";
          } else if (route.name === "Following") {
            iconname = focused ? "users" : "users";
          } else if (route.name === "Notifi") {
            iconname = focused ? "bell" : "bell";
          } else if (route.name === "Profile") {
            iconname = focused ? "user-circle" : "user-circle";
          }
          return <FontAwesome name={iconname} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#E66C2C",
        tabBarInactiveTintColor: "black",
        tabBarStyle: [
          {
            height: 50,
            padding: 5,
          },
        ],
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Following" component={Friends} />
      <Tab.Screen name="Notifi" component={Notifi} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNav;
