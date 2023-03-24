import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Textarea = ({
  handleChangeText,
  value,
  placeholder,
  onFocus,
  onBlur,
  onPressBtn,
  customStyle,
}) => {
  const [borderColorInput, setBorderColorInput] = useState("#E8E8E8");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#F6F6F6");

  const customOnFocus = () => {
    setBorderColorInput("#FF6C00");
    setBackgroundColorInput("#ffffff");
    if (onFocus) {
      onFocus();
    }
  };

  const customOnBlur = () => {
    setBorderColorInput("#E8E8E8");
    setBackgroundColorInput("#F6F6F6");
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        marginTop: 31,
        // ...customStyle,
      }}
    >
      <TextInput
        editable
        multiline
        style={{
          ...styles.input,
          borderColor: borderColorInput,
          backgroundColor: backgroundColorInput,
        }}
        numberOfLines={4}
        placeholder={placeholder}
        placeholderTextColor={"#BDBDBD"}
        maxLength={140}
        onFocus={customOnFocus}
        onBlur={customOnBlur}
        value={value}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={onPressBtn}
      >
        <Ionicons name="md-arrow-up" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 42,
    paddingTop: 14,
    height: 50,
    alignItems: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    marginBottom: 16,
    width: "100%",
  },
  btn: {
    position: "absolute",
    zIndex: 1,
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: "50%",
  },
});
