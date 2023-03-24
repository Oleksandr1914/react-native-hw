import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/mainScreens/PostsScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";
import CreatePostsScreen from "./Screens/mainScreens/CreatePostsScreen";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "./redux/auth/authOperation";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRouts = (isAuth) => {
  const dispatch = useDispatch();

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{ tabBarShowLabel: false, tabBarStyle: { height: 83 } }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: () => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),

          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              style={{ paddingRight: 12 }}
              onPress={() => dispatch(logoutUser())}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Create Post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
