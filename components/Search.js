import React from "react";
import { StyleSheet, Button, TextInput, Text } from "react-native";

export default function Search(props) {
  return (
    <>
      <Text>Search Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={props.username}
        onChangeText={value => props.handleUsernameChange(value)}
      />
      <Button title="Search" onPress={props.onSearch} />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10
  }
});
