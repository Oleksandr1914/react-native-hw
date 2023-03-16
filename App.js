import { View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Reactotron from "reactotron-react-native";

SplashScreen.preventAutoHideAsync();

Reactotron.configure().connect();
export default function App() {
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
    <View onLayout={onLayoutRootView}>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </View>
  );
}
