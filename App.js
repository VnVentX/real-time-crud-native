import React from "react";
import axios from "axios";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import InputForm from "./components/InputForm";
import DataList from "./components/DataList";

export default class App extends React.Component {
  state = {
    user: [],
    username: "",
    description: "",
    id: "",
    isEdditing: false
  };

  retrieveData = async () => {
    await axios
      .get("https://anhtt-mern-stack-server.herokuapp.com/user/")
      .then(res => {
        const user = res.data;
        this.setState({ user });
      });
  };

  componentDidMount() {
    this.retrieveData();
  }

  handleUsernameChange = value => {
    this.setState({ username: value });
  };

  handleDescriptionChange = value => {
    this.setState({ description: value });
  };

  delete(currentUser) {
    let id = currentUser._id;
    let username = currentUser.username;
    axios
      .delete("https://anhtt-mern-stack-server.herokuapp.com/user/" + id)
      .then(res => {
        this.retrieveData();
        console.log("Deleted user: " + username);
      })
      .catch(err => alert(err));
  }

  edit(currentUser) {
    let username = currentUser.username;
    let description = currentUser.description;
    let id = currentUser._id;
    this.setState({
      username,
      description,
      id,
      isEdditing: true
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const detail = {
      username: this.state.username,
      description: this.state.description,
      id: this.state.id
    };
    console.log(detail);
    if (this.state.isEdditing) {
      const updateValue = {
        username: this.state.username,
        description: this.state.description
      };
      axios
        .patch(
          "https://anhtt-mern-stack-server.herokuapp.com/user/" + detail.id,
          updateValue
        )
        .then(res => {
          console.log(res);
          console.log(`Edited user ${updateValue.username}`);
          this.retrieveData();
        });
      this.setState({
        username: "",
        description: "",
        id: "",
        isEdditing: false
      });
    } else {
      axios
        .post("https://anhtt-mern-stack-server.herokuapp.com/user/", detail)
        .then(res => {
          console.log(res);
          console.log(`Updated user ${detail.username}`);
          this.retrieveData();
        });
      this.setState({
        username: "",
        description: ""
      });
    }
  };

  userList = () => {
    return this.state.user.map((currentUser, i) => {
      return (
        <DataList
          retrieveData={this.retrieveData}
          user={currentUser}
          key={i}
          onDelete={() => {
            this.delete(currentUser);
          }}
          onEdit={() => {
            this.edit(currentUser);
          }}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <InputForm
          delete={this.delete}
          handleUsernameChange={this.handleUsernameChange}
          username={this.state.username}
          handleDescriptionChange={this.handleDescriptionChange}
          description={this.state.description}
          onSubmit={this.onSubmit}
          isEdditing={this.state.isEdditing}
        />
        {this.userList().length > 0 ? (
          <ScrollView>{this.userList()}</ScrollView>
        ) : (
          <Text>This List is currently empty!!!</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight
  }
});
