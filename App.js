import React from "react";
import axios from "axios";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import Constants from "expo-constants";
import InputForm from "./components/InputForm";
import Search from "./components/Search";
import { UserList } from "./components/UserList";

export default class App extends React.Component {
  signal = axios.CancelToken.source();

  state = {
    isLoading: false,
    isEdditing: false,
    isSearching: false,
    user: [],
    searchUser: [],
    username: "",
    description: "",
    id: ""
  };

  retrieveData = async () => {
    this.setState({ isLoading: true });
    await axios
      .get("https://anhtt-mern-stack-server.herokuapp.com/user/", {
        cancelToken: this.signal.token
      })
      .then(res => {
        const user = res.data;
        this.setState({ user, isLoading: true });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log(err.message);
        } else {
          this.setState({ isLoading: false });
        }
      });
  };

  //React Lifecycle Method
  componentDidMount() {
    this.retrieveData();
  }

  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
  }

  handleUsernameChange = value => {
    this.setState({ username: value });
  };

  handleDescriptionChange = value => {
    this.setState({ description: value });
  };

  onDelete = async currentUser => {
    console.log("deleting");
    let id = currentUser._id;
    let username = currentUser.username;
    await axios
      .delete("https://anhtt-mern-stack-server.herokuapp.com/user/" + id)
      .then(res => {
        this.retrieveData();
        console.log("Deleted user: " + username);
      })
      .catch(err => alert(err));
  };

  onEdit = currentUser => {
    let username = currentUser.username;
    let description = currentUser.description;
    let id = currentUser._id;
    this.setState({
      username,
      description,
      id,
      isEdditing: true
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const detail = {
      username: this.state.username,
      description: this.state.description,
      id: this.state.id
    };
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
          this.retrieveData();
          this.setState({
            username: "",
            description: "",
            id: "",
            isEdditing: false
          });
        });
    } else {
      axios
        .post("https://anhtt-mern-stack-server.herokuapp.com/user/", detail)
        .then(res => {
          this.retrieveData();
          this.setState({
            username: "",
            description: ""
          });
        });
    }
  };

  onSearch = () => {
    if (this.state.isSearching) {
      axios
        .get(
          "https://anhtt-mern-stack-server.herokuapp.com/user/search/" +
            this.state.username
        )
        .then(res => {
          this.setState({ searchUser: res.data });
        });
      this.setState({
        username: ""
      });
    }
  };

  userList = () => {
    return this.state.user.map((currentUser, i) => {
      return (
        <UserList
          user={currentUser}
          key={i}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
          isSearching={this.state.isSearching}
        />
      );
    });
  };

  searchList = () => {
    return this.state.searchUser.map((currentUser, i) => {
      return (
        <UserList
          user={currentUser}
          key={i}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
          isSearching={this.state.isSearching}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        {this.state.isSearching ? (
          <>
            <Button
              title="Back To Add User"
              onPress={() =>
                this.setState({
                  isSearching: !this.state.isSearching
                })
              }
            />
            <Search
              handleUsernameChange={this.handleUsernameChange}
              username={this.state.username}
              onSearch={this.onSearch}
            />
            <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
              List User
            </Text>
            <ScrollView>{this.searchList()}</ScrollView>
          </>
        ) : (
          <>
            <Button
              title="Search A User"
              onPress={() => {
                this.setState({
                  isSearching: !this.state.isSearching,
                  searchUser: []
                });
              }}
            />
            <InputForm
              handleUsernameChange={this.handleUsernameChange}
              username={this.state.username}
              handleDescriptionChange={this.handleDescriptionChange}
              description={this.state.description}
              onSubmit={this.onSubmit}
              isEdditing={this.state.isEdditing}
            />
            <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
              List User
            </Text>
            {this.userList().length > 0 ? (
              <ScrollView>{this.userList()}</ScrollView>
            ) : (
              <Text>This List is currently empty!!!</Text>
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: "yellow"
  }
});
