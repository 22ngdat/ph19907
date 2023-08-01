import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";

const Notifi = () => {
  const notifications = [
    {
      id: 1,
      title: "Nguyễn Đạt",
      content:
        "Lưu ý rằng danh sách thông báo trong ví dụ trên chỉ là một mảng cứng được định nghĩa trực tiếp trong màn hình chính. Trong thực tế, bạn sẽ lấy danh sách thông báo từ nguồn dữ liệu hoặc Redux store của bạn và truyền nó vào component NotificationList",
    },
    {
      id: 2,
      title: "Nguyễn Đạt",
      content:
        "Lưu ý rằng danh sách thông báo trong ví dụ trên chỉ là một mảng cứng được định nghĩa trực tiếp trong màn hình chính. Trong thực tế, bạn sẽ lấy danh sách thông báo từ nguồn dữ liệu hoặc Redux store của bạn và truyền nó vào component NotificationList",
    },
    {
      id: 3,
      title: "Nguyễn Đạt",
      content:
        "Lưu ý rằng danh sách thông báo trong ví dụ trên chỉ là một mảng cứng được định nghĩa trực tiếp trong màn hình chính. Trong thực tế, bạn sẽ lấy danh sách thông báo từ nguồn dữ liệu hoặc Redux store của bạn và truyền nó vào component NotificationList",
    },
    {
      id: 4,
      title: "Nguyễn Đạt",
      content:
        "Lưu ý rằng danh sách thông báo trong ví dụ trên chỉ là một mảng cứng được định nghĩa trực tiếp trong màn hình chính. Trong thực tế, bạn sẽ lấy danh sách thông báo từ nguồn dữ liệu hoặc Redux store của bạn và truyền nó vào component NotificationList",
    },
  ];
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Notifications
        </Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notifiContainer}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationContent}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Notifi;

const styles = StyleSheet.create({
  notifiContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 20,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  notificationContent: {
    fontSize: 16,
  },
});
