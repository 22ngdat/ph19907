import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./item/Item";
import { useIsFocused } from "@react-navigation/native";

const Friend = () => {
  const [follower, setfollower] = useState([]);
  const postPersonImage = require("../assets/profile-icon.png");
  const isFocused = useIsFocused();
  const url = "http://10.24.57.87:3000/follow";

  const getFollowers = async () => {
    try {
      const res = await axios.get(url);
      setfollower(res.data);
      console.log(res.data);
    } catch (error) {}
  };
  const unfollow = async (friendId) => {
    try {
      // Thực hiện yêu cầu unfollow với id của người dùng cần unfollow
      const response = await axios.delete(`${url}/${friendId}`);
      getFollowers();

      console.log("Unfollow successful:", response.data);
    } catch (error) {
      console.error("Error unfollowing:", error);
    }
  };

  useEffect(() => {
    getFollowers();
  }, [isFocused]);

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
          onPress={getFollowers}
        >
          Following
        </Text>
      </View>
      <FlatList
        data={follower}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={postPersonImage} style={styles.avatar} />
            <Text style={styles.name}>{item.username}</Text>
            <View>
              <TouchableOpacity
                style={styles.followButton}
                onPress={() => unfollow(item.id)}
              >
                <Text style={styles.followButtonText}>Unfollow</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Friend;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  followButton: {
    backgroundColor: "gray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
