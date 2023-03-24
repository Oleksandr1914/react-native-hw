import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, Dimensions } from "react-native";

export const CommentCard = ({ item, photo, own, avatar }) => {
  const [formatDate, setFormatDate] = useState("");
  const { comment, date } = item;

  useEffect(() => {
    if (date) {
      setFormatDate(moment(date).format("DD MMMM, YYYY | h:mm"));
    } else {
      setFormatDate(moment(Date.now()).format("DD MMMM, YYYY | h:mm"));
    }
  }, [date]);

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: own ? "row-reverse" : "row",
      }}
    >
      <Image
        source={avatar}
        style={{
          ...styles.image,
          marginLeft: own && 16,
          marginRight: own ? 0 : 16,
        }}
      />
      <View
        style={{
          ...styles.commentBlock,
          width: Dimensions.get("window").width - 76,
          borderTopRightRadius: own ? 0 : 6,
          borderTopLeftRadius: own ? 6 : 0,
        }}
      >
        <Text style={styles.comment}>{comment}</Text>
        <Text
          style={{
            ...styles.date,
            textAlign: own ? "left" : "right",
          }}
        >
          {formatDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 24,
    maxWidth: "100%",
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    overflow: "hidden",
  },
  commentBlock: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  comment: {
    color: "#212121",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 9,
  },
  date: {
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
    width: "100%",
  },
});
