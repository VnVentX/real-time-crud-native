import React from "react";
import { Button, Text, StyleSheet, View } from "react-native";

export default class DataList extends React.Component {
  render() {
    return (
      <View style={styles.data}>
        <Text style={styles.data}>
          {this.props.user.username} : {this.props.user.description}
        </Text>
        <Button onPress={this.props.onDelete} title="Delete" />
        <Button onPress={this.props.onEdit} title="Edit" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  data: {
    justifyContent: "center",
    alignItems: "center",
  }
});
