import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post : IPost,
}

interface Like {
    userId : string,
    likeId : string,
}

export const Post = (props : Props) => {

    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null)


    const likesRef = collection(db , "likes");

    const likesDoc = query(likesRef, where("postId" , "==" , post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId : doc.data().userId , likeId : doc.id})));
    }

    const addLike = async () => {
        try{
            const newDoc = await addDoc(likesRef , {userId: user?.uid, postId: post.id});
            if(user) {
                setLikes((prev) => prev ? [...prev , {userId: user.uid , likeId: newDoc.id}] : [{userId: user.uid , likeId: newDoc.id}])
            }
        } catch(err) {
            console.log(err);
        }
        
    }

    const removeLike = async () => {
        try{

            const deleteLikeQuery = query(likesRef, where("postId" , "==" , post.id), where("userId" , "==" , user?.uid))
            const deleteLikeData = await getDocs(deleteLikeQuery);
            const likeID = deleteLikeData.docs[0].id
            const deleteLike = doc(db , "likes" , likeID)

            await deleteDoc(deleteLike);
        
            if(user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeID)
            )
            }
        } catch(err) {
            console.log(err);
        }
        
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
        // eslint-disable-next-line
    },[])


    return (
        <div className="post">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <h4>@{post.username}</h4>
                <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
                {likes && <p>Likes: {likes?.length} </p>}
            </div>
        </div>
    )
}