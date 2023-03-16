import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [onPassword, setOnPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onBtnInput = () => {
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/background.jpg")}
        >
          <View
            style={{
              ...styles.loginBox,
              paddingBottom: !isShowKeyboard ? 78 : 32,
              width: dimensions,
            }}
          >
            <Text style={styles.title}>Войти</Text>
            <KeyboardAvoidingView
              style={styles.form}
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <View style={styles.form}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: emailFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: emailFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Адрес электронной почты"
                  onFocus={() => {
                    setEmailFocus(true);
                    setIsShowKeyboard(true);
                  }}
                  onEndEditing={() => {
                    setEmailFocus(false);
                    // setIsShowKeyboard(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  value={state.email}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: passwordFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: passwordFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Пароль"
                  onFocus={() => {
                    setPasswordFocus(true);
                    setIsShowKeyboard(true);
                  }}
                  onEndEditing={() => {
                    setPasswordFocus(false);
                    // setIsShowKeyboard(false);
                  }}
                  secureTextEntry={onPassword}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  value={state.password}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.btnPassword}
                  onPressIn={() => setOnPassword(false)}
                  onPressOut={() => setOnPassword(true)}
                >
                  <Text style={styles.btnPasswordText}>Показать</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            {!isShowKeyboard && (
              <View style={styles.boxBtn}>
                <TouchableOpacity
                  onPress={onBtnInput}
                  activeOpacity={0.6}
                  style={styles.btnLogin}
                >
                  <Text style={styles.btnLoginText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.btnRegistr}>
                  <Text style={styles.btnRegistrText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginBox: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    marginTop: 32,
    fontFamily: "medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  form: {
    position: "relative",
    marginTop: 17,
    gap: 16,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btnPassword: {
    position: "absolute",
    bottom: 32,
    right: 16,
  },
  btnPasswordText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  boxBtn: {
    marginTop: 27,
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
  btnLogin: {
    padding: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnLoginText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  btnRegistr: {
    marginTop: 16,
  },
  btnRegistrText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
