import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [onPassword, setOnPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loginFocus, setloginFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  console.log(isShowKeyboard);

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
              ...styles.registerBox,
              paddingBottom: !isShowKeyboard ? 78 : 32,
            }}
          >
            <View style={styles.avatarBox}>
              <Image
                style={styles.avatar}
                source={require("../assets/avatar.png")}
              />
              <TouchableOpacity activeOpacity={0.6} style={styles.btnAdd}>
                <Image
                  style={{ width: "100%" }}
                  source={require("../assets/add.png")}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Регистрация</Text>
            <KeyboardAvoidingView
              style={styles.form}
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <View style={styles.form}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: loginFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: loginFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Логин"
                  onFocus={() => {
                    if (!isShowKeyboard) {
                      setloginFocus(true);
                      setIsShowKeyboard(true);
                    }
                  }}
                  onEndEditing={() => {
                    setloginFocus(false);
                    setIsShowKeyboard(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  value={state.login}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: emailFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: emailFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholder="Адрес электронной почты"
                  onFocus={() => {
                    if (!isShowKeyboard) {
                      setEmailFocus(true);
                      setIsShowKeyboard(true);
                    }
                  }}
                  onEndEditing={() => {
                    setEmailFocus(false);
                    setIsShowKeyboard(false);
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
                    if (!isShowKeyboard) {
                      setPasswordFocus(true);
                      setIsShowKeyboard(true);
                    }
                  }}
                  onEndEditing={() => {
                    setPasswordFocus(false);
                    setIsShowKeyboard(false);
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
                  style={styles.btnRegister}
                >
                  <Text style={styles.btnRegisterText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.btnLogin}>
                  <Text style={styles.btnLoginText}>
                    Уже есть аккаунт? Войти
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
  registerBox: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  btnAdd: {
    position: "absolute",
    top: 81,
    left: 107,
    width: 25,
    height: 25,
  },
  title: {
    marginTop: 92,
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
  btnRegister: {
    padding: 16,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnRegisterText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  btnLogin: {
    marginTop: 16,
  },
  btnLoginText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
