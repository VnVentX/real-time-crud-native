import React from "react";
import { Button, Text, StyleSheet, View } from "react-native";

export const UserList = props => {
  return (
    <View style={styles.data}>
      <Text style={styles.data}>
        {props.user.username} : {props.user.description}
      </Text>
      {props.isSearching ? null : (
        <>
          <Button onPress={() => props.onEdit(props.user)} title="Edit" />
          <Button onPress={() => props.onDelete(props.user)} title="Delete" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  data: {
    justifyContent: "center",
    alignItems: "center"
  }
});
