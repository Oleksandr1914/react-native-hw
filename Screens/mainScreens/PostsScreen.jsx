import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreenPost from "../nestedScreens/DefaultScreenPost";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultScreen"
        component={DefaultScreenPost}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="CommentsScreen"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="MapScreen"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
