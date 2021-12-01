import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Divider} from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {db, firebase} from "../../firebase";

//<AntDesign name="like2" size={24} color="black" />
//<FontAwesome5 name="comment-alt" size={24} color="black" />
// <Feather name="share" size={24} color="black" />
//<MaterialIcons name="save-alt" size={24} color="black" />

const Post = ({post}) => {

    const handleLike = (post) => {
        // console.log("Like");
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email,
        );

        db.collection('users').doc(post.owner_email).collection('posts').doc(post.id).update({
            likes_by_users: currentLikeStatus
                ? firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
                : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email),

        }).then(() => {
            console.log("Like updated");
        }).catch(err => {
            console.log(err);
        });

    }

    return (
        <View style={{marginTop: 15}}>
            <Divider width={1} orientation={'vertical'} />
            <PostHeader post={post} />
            <PostImage post={post} />
            <PostFooter post={post} handleLike={handleLike} />
        </View>
    );
};

export default Post;

const PostHeader = ({post}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{ uri: post.profile_picture }} style={styles.story} />
            <Text style={{color: 'white', marginLeft: 5, fontWeight: '700'}}>{post?.user}</Text>
        </View>

        <View>
            <Text style={{color: 'white', fontWeight: '900', marginRight: 5}}>...</Text>
        </View>


    </View>
);

const PostImage = ({post}) => (
    <View style={{width: '100%', height: 450,}}>
        <Image source={{ uri: post.imageUrl }} style={{height: '100%', resizeMode: 'cover'}} />
    </View>
);

const PostFooter = ({post, handleLike}) => (
    <Pressable style={{}}>
        <Icon />
        <Likes post={post} handleLike={handleLike} />
        <View style={{marginHorizontal: 12,}}>
            <Caption post={post} />
            <View style={{marginTop: 5,}}>
                <CommentsSection post={post} />
            </View>
            <Comments post={post} />
        </View>
    </Pressable>
);

const Icon = ({handleLike}) => (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleLike}>
                <AntDesign name="like2" size={22} color={handleLike ? 'red' : 'white'} style={{margin: 5,}}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                <FontAwesome5 name="comment-alt" size={22} color="white" style={{margin: 5,}}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                <Feather name="share" size={22} color="white" style={{margin: 5,}}/>
                    </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity activeOpacity={0.5}>
                <MaterialIcons name="save-alt" size={22} color="white" />
                    </TouchableOpacity>
            </View>
        </View>
);

const Likes = ({post}) => (
    <View style={{marginTop: -10}}>
        <Text style={{color: 'white', fontWeight: '600', marginLeft: 13}}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>
);

const Caption = ({post}) => (
    <View style={{marginTop: 5}}>
        <Text style={{color: 'white'}}>
            <Text style={{fontWeight: '600'}}>
                {post.user}
            </Text>
            <Text> {post.caption}</Text>
        </Text>

    </View>
);

const CommentsSection = ({post}) => (
    <View>
        {!!post.comments.length && (
            <Text style={{color: 'gray'}}>View {post.comments.length > 1 ? 'all' : ''} {post?.comments?.length} {post.comments.length > 1 ? 'comments' : 'comment'}</Text>
        )}
    </View>
);

const Comments = ({post}) => (
    <>
        {post.comments.map((comment, i) => (
            <View key={i} style={{marginTop: 5}}>
                <Text style={{color: 'white'}}>
                    <Text style={{fontWeight: '600'}}>
                        {comment?.user}
                    </Text>
                    <Text> {comment?.comment}</Text>
                </Text>

            </View>
        ))}
    </>
)


const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 10,
        borderWidth: 1.6,
        borderColor: '#ff8501',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    }
});
