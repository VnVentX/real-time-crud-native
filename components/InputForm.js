import React from "react";
import { StyleSheet, Button, TextInput, Text } from "react-native";

export default class InputForm extends React.Component {
  render() {
    return (
      <>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={this.props.username}
          onChangeText={value => this.props.handleUsernameChange(value)}
        />
        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={this.props.description}
          onChangeText={value => this.props.handleDescriptionChange(value)}
        />

        {this.props.isEdditing ? (
          <Button title="Update" onPress={this.props.onSubmit} />
        ) : (
          <Button title="Add" onPress={this.props.onSubmit} />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10
  }
});
