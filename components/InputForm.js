import React from "react";
import { StyleSheet, Button, TextInput, Text } from "react-native";

export default function InputForm(props) {
  return (
    <>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={props.username}
        onChangeText={value => props.handleUsernameChange(value)}
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={props.description}
        onChangeText={value => props.handleDescriptionChange(value)}
      />

      {props.isEdditing ? (
        <Button title="Update" onPress={props.onSubmit} />
      ) : (
        <Button title="Add" onPress={props.onSubmit} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10
  }
});
