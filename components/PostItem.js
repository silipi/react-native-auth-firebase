import React from 'react';

import firebase from '../database/firebase';

import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import avatarImage from '../assets/avatar.jpg';

export default function PostItem({postData, isLast}) {
  const timeFromNowInMinutes = (time) => {
    if (time === null || time === undefined) {
      return "Criado há alguns segundos...";
    }

    const now = Date.now();
    const diffMilli = Math.abs(now - time);
    const diffMinutes = Math.ceil(diffMilli / (1000 * 60));

    if (diffMinutes <= 60) {
      return `${diffMinutes}min`
    } else if (diffMinutes > 60) {
      return `${Math.floor(diffMinutes / 60)}h`
    }
  }

  const deletePostFromDatabase = async () => {
    const dbRef = firebase.db.collection('posts').doc(postData.id);
    await dbRef.delete();
  }

  return (
    <View style={isLast ? styles.containerLast : styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatarImg}source={avatarImage} />
        <View style={styles.ctnInfo}>
          <Text style={styles.postName}>Gabriel Silipi</Text>
          <Text style={styles.postTime}>{`${timeFromNowInMinutes(postData.postedAt)}`}</Text>
        </View>
        <TouchableOpacity onPress={deletePostFromDatabase} style={styles.btnDelete}>
          <Text>X</Text>

        </TouchableOpacity>
      </View>
      
      <Text style={styles.postText}>{postData.postText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    shadowColor: "#bebebe",
    shadowOpacity: 0.5,
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 14
  },
  containerLast: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    shadowColor: "#bebebe",
    shadowOpacity: 0.5,
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 0
  },
  header: {
    flexDirection: "row"
  },
  btnDelete: {
    marginLeft: "auto", 
    backgroundColor: "tomato", 
    height: 30, 
    width: 30, 
    borderRadius: 50, 
    alignItems: "center", 
    justifyContent: "center",
  },
  avatarImg: {
    height: 55, 
    width: 55, 
    borderRadius: 50,
    marginRight: 10
  },
  postName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  postTime: {
    color: "rgba(0, 0, 0, 0.7)"
  },
  postText: {
    marginTop: 10
  }
});
