import { View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

import Reactotron from "reactotron-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRouts } from "./routs";

SplashScreen.preventAutoHideAsync();

Reactotron.configure().connect();

export default function App() {
  const routing = useRouts({});

  const [fontsLoaded] = useFonts({
    medium: require("./fonts/Roboto-Medium.ttf"),
    normal: require("./fonts/Roboto-Regular.ttf"),
    bold: require("./fonts/Roboto-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#fff" }}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}
