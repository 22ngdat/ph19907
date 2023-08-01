import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isSelected, setSelection] = useState(false);

  const handleLogin = () => {
    let valid = true;
    if (username == "") {
      Alert.alert("Thông báo!", "Không được để trống tên đăng nhập");
      valid = false;
    }
    if (password == "") {
      Alert.alert("Thông báo!", "Không được để trống mật khẩu");
      valid = false;
    }
    // kiểm tra thông tin có tồn tài hay không ?
    if (valid) {
      let check = true;
      let url = "http://10.24.57.87:3000/users?username=" + username;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then(async (resLog) => {
          if (resLog.length != 1) {
            check = false;
          } else {
            let objU = resLog[0];
            if (objU.password != password) {
              check = false;
            } else {
              // Đẩy lại thông tin User lên server
              try {
                await AsyncStorage.setItem("loginInfo", JSON.stringify(objU));
              } catch (e) {
                console.log(e);
              }
            }
            if (!check) {
              Alert.alert(
                "Thông báo!",
                "Tên đăng nhập hoặc mật khẩu không chính xác"
              );
            } else {
              Alert.alert("Thông báo!", "Đăng nhập thành công");
              navigation.navigate("TabNav");
              // saveCredentials(username, password)
            }
          }
        });
    }
  };

  // const saveCredentials = async (username, password) => {
  //   try {
  //     await AsyncStorage.setItem("username", username);
  //     await AsyncStorage.setItem("password", password);
  //     console.log("Lưu mật khẩu thành công");
  //   } catch (error) {
  //     console.log("Error saving credentials:", error);
  //   }
  // };
  // const checkSavedCredentials = async () => {
  //   try {
  //     const savedUsername = await AsyncStorage.getItem("username");
  //     const savedPassword = await AsyncStorage.getItem("password");
  //     if (savedUsername && savedPassword) {
  //       // Tài khoản và mật khẩu đã được lưu, thực hiện đăng nhập tự động
  //       setUsername(savedUsername);
  //       setPassword(savedPassword);
  //       setSelection(true);
  //       handleLogin();
  //     }
  //   } catch (error) {
  //     console.log("Error retrieving saved credentials:", error);
  //   }
  // };
  // useEffect(() => {
  //   checkSavedCredentials();
  //   // navigation.navigate("TabNav");
  // }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Text style={styles.title}>Chào mừng bạn đã đến với chúng tôi !</Text>
      <Text
        style={{
          fontSize: 22,
          color: "#d55400",
          marginBottom: 20,
        }}
      >
        Đăng nhập
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Tên đăng nhập"
          placeholderTextColor="white"
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mật khẩu."
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={{ color: "white" }}>Đăng nhập</Text>
      </TouchableOpacity>
      <View
        style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
      >
        <TouchableOpacity
          style={styles.checkBox}
          // onPress={() => setSelection(!isSelected)}
        >
          {/* {!isSelected ? (
            <Text style={{ alignSelf: "center" }}>✔️</Text>
          ) : (
            <Text style={{ alignSelf: "center" }}></Text>
          )} */}
        </TouchableOpacity>
        <Text style={{ marginLeft: 10 }}>Lưu mật khẩu</Text>
      </View>

      <View>
        <Text style={{ fontSize: 15, marginStart: 100, marginTop: 70 }}>
          Bạn chưa có tài khoản ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <View style={styles.textRegister}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginStart: 100,
                color: "green",
              }}
            >
              Đăng kí
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  checkBox: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: "gray",
  },
  textRegister: {
    marginTop: 5,
    marginStart: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#acacac",
    borderRadius: 30,
    width: "70%",
    height: 50,
    marginBottom: 20,
  },
  TextInput: {
    height: 45,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
  },
  image: {
    height: 300,
    width: 300,
  },
  login: {
    height: 70,
  },
  title: {
    fontSize: 18,
    color: "black",
  },
  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E66C2C",
  },
});
