import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./comp/Login";
import SignUp from "./comp/SignUp";
import TabNav from "./TabNav";

const StackMain = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StackMain.Navigator screenOptions={{ headerShown: false }}>
        <StackMain.Screen name="Login" component={Login} />
        <StackMain.Screen name="SignUp" component={SignUp} />
        <StackMain.Screen name="TabNav" component={TabNav} />
      </StackMain.Navigator>
    </NavigationContainer>
  );
}

export default App;
