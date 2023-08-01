import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
//
const SignUp = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(false);
  const [items, setItems] = useState([
    { label: "User", value: 0 },
    { label: "Admin", value: 1 },
  ]);
  const [isAdmin, setisAdmin] = useState(false);
  const [secuCode, setsecuCode] = useState("");
  const [isSignIn, setisSignIn] = useState(false);

  ///

  const Register = () => {
    let isValid = true;

    // Kiểm tra trường fullname không được để trống
    if (fullname.trim() === "") {
      isValid = false;
    }

    // Kiểm tra trường username không được để trống
    if (username.trim() === "") {
      isValid = false;
    }

    // Kiểm tra trường passw không được để trống
    if (password.trim() === "") {
      isValid = false;
    }

    // Kiểm tra trường rePassw không được để trống và phải khớp với passw
    if (repass.trim() === "" || repass !== password) {
      isValid = false;
    }
    if (!isValid) {
      // Trống - Thông báo, yêu cầu nhập
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin!");
    } else if (value == 1) {
      // Kiểm tra quyền đăng ký

      // Kiểm tra Security Code
      if (secuCode !== "dat123") {
        Alert.alert("Thông báo", "Security Code sai!");
        setisSignIn(false);
      } else {
        setisSignIn(true);
      }
    } else {
      setisSignIn(true);
    }
    if (isSignIn) {
      let check = true;
      let objUser = {
        username: username,
        password: password,
        fullname: fullname,
        role: value,
      };
      let url = "http://192.168.0.179:3000/users?username=" + username;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then(async (resLog) => {
          if (resLog.length != 0) {
            Alert.alert("Thông báo", "Tên đăng nhập đã tồn tại!");
            check = false;
          } else {
            let urlRegiter = "http://192.168.0.179:3000/users";
            fetch(urlRegiter, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objUser),
            })
              .then((res) => {
                if (res.status == 201) {
                  Alert.alert("Thông báo!", "Đăng ký tài khoản thành công!");
                  navigation.navigate("Login");
                } else {
                  Alert.alert("Đăng kí thất bại!");
                  console.log(res.status);
                }
              })
              .catch((ex) => {
                console.log(ex);
              });
          }
        });

      // navigation.navigate("Login");
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          backgroundColor: "#E66C2C",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginTop: 50,
          marginLeft: 20,
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Icons name="arrow-back" style={{ color: "white", fontSize: 25 }} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/logo.png")} />
        <View style={styles.textBox}>
          <Text
            style={{
              width: "70%",
              fontSize: 18,
              color: "#8B8B8B",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            Tạo tài khoản của bạn ở đây!!
          </Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={setFullname}
            placeholder="Họ và tên"
            style={styles.textIput}
          ></TextInput>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={setUsername}
            placeholder="Tên đăng nhập"
            style={styles.textIput}
          ></TextInput>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={setPassword}
            placeholder="Mật khẩu"
            style={styles.textIput}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={setRepass}
            placeholder="Xác nhận mật khẩu"
            style={styles.textIput}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={{}}>
          <DropDownPicker
            style={styles.inputBox}
            items={items}
            setItems={setItems}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={value}
            setValue={setValue}
            maxHeight={200}
            autoScroll
            placeholder="Vai trò"
            placeholderStyle={{ color: "red" }}
            dropDownContainerStyle={styles.inputBox}
            disableBorderRadius={false}
            showTickIcon={true}
            onChangeValue={(value) => {
              console.log(value);
              value === 1 ? setisAdmin(true) : setisAdmin(false);
            }}
          />
        </View>
        <View
          style={{
            marginTop: isOpen ? 100 : 5,
            alignItems: "stretch",
            paddingHorizontal: 50,
            width: "100%",
          }}
        >
          {isAdmin ? (
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                placeholder="Mã bảo mật"
                onChangeText={setsecuCode}
                secureTextEntry={true}
              />
            </View>
          ) : (
            <View></View>
          )}
          <TouchableOpacity style={styles.btnSignIn} onPress={Register}>
            <View>
              <Text style={styles.textSignIn}>Xác nhận</Text>
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "flex-end", marginTop: 20 }}>
            <Text style={{ fontSize: 15 }}>Bạn đã có tài khoản ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Đăng nhập
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  textBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  inputBox: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#E66C2C",
    padding: 12,
    marginTop: 10,
  },
  textIput: {
    color: "black",
    fontSize: 15,
  },
  image: {
    height: 150,
    width: 150,
  },
  btnSignIn: {
    backgroundColor: "#E66C2C",
    borderRadius: 10,
    marginTop: 30,
  },
  textSignIn: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    padding: 10,
  },
});
