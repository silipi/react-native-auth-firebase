import { useScrollToTop } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import PostItem from '../components/PostItem';

import firebase from '../database/firebase';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    firebase.firestore().collection('posts').onSnapshot(querySnapshot => {
      const posts = [];

      querySnapshot.docs.forEach(doc => {
        const { post, userId } = doc.data();

        const postDate = doc.data() && doc.data().postedAt && doc.data().postedAt.toDate();

        posts.push({id: doc.id, userId: userId, postText: post, postedAt: postDate});
      });

      // Método para ordenar post por mais atual;
      posts.sort((x, y) => {
        const d1 = new Date(x.postedAt);
        const d2 = new Date(y.postedAt);

        return d2 - d1;
      })

      setPosts(posts);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bem vindo, {user.displayName}!</Text>

      {posts.length > 0 ? 
        <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.ctnScrollView}>        
          {posts.map((post, i) => 
            <PostItem 
              key={i} 
              postData={post}
              isLast={i === posts.length - 1}
            />
          )}
        </ScrollView> :
        <Text>Nenhuma postagem encontrada.</Text>
      }
      
      <View style={styles.ctnBtnCreate}>
        <Button     
          title="Novo post"
          onPress={() => navigation.navigate('CreatePost')}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ctnScrollView: {
    alignItems: "center",
    flexDirection: "column",
    padding: 8,
    flexGrow: 1
  },
  ctnBtnCreate: {
    position: 'absolute',
    zIndex: 5,
    bottom: 40,
    right: 25
  }
});
