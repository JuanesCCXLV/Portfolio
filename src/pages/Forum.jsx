import { useState, useEffect } from "react";
import "./Forum.css";
import { db, auth, provider } from "../database/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    doc,
    arrayUnion,
    serverTimestamp,
} from "firebase/firestore";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newComments, setNewComments] = useState({});
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Detectar sesión activa
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Escucha los posts en tiempo real
    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                setPosts(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        comments: doc.data().comments || [],
                    }))
                );
            },
            () => setError("Error al cargar los posts")
        );
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch {
            setError("Error al iniciar sesión.");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch {
            setError("Error al cerrar sesión.");
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        setError(null);
        if (newPost.trim() && user) {
            try {
                await addDoc(collection(db, "posts"), {
                    content: newPost,
                    comments: [],
                    createdAt: serverTimestamp(),
                    authorId: user.uid,
                });
                setNewPost("");
            } catch {
                setError("No se pudo publicar el post.");
            }
        }
    };

    const handleAddComment = async (postId, e) => {
        e.preventDefault();
        setError(null);
        const commentText = newComments[postId];
        if (commentText && commentText.trim()) {
            try {
                const postRef = doc(db, "posts", postId);
                await updateDoc(postRef, {
                    comments: arrayUnion({
                        id: Date.now(),
                        content: commentText,
                        createdAt: new Date().toISOString(),
                    }),
                });
                setNewComments((prev) => ({
                    ...prev,
                    [postId]: "",
                }));
            } catch {
                setError("No se pudo agregar el comentario.");
            }
        }
    };

    const handleCommentChange = (postId, text) => {
        setNewComments((prev) => ({
            ...prev,
            [postId]: text,
        }));
    };

    const formatDate = (date) => {
        if (!date) return "";
        if (date.seconds) return new Date(date.seconds * 1000).toLocaleString();
        return new Date(date).toLocaleString();
    };

    if (!user) {
        return (
            <section className="forum-section">
                <h2>Blog / Foro</h2>
                <p>Debes iniciar sesión para publicar o comentar.</p>
                <button onClick={handleLogin}>Iniciar sesión con Google</button>
            </section>
        );
    }

    return (
        <section className="forum-section">
            <h2>Blog / Foro</h2>

            <button onClick={handleLogout}>Cerrar sesión</button>

            {error && <div className="forum-error">{error}</div>}

            <form onSubmit={handleSubmitPost} className="post-form">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Escribe algo interesante aquí..."
                    required
                />
                <button type="submit">Publicar Post</button>
            </form>

            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <div className="post-content">
                            <p>{post.content}</p>
                            <small>{formatDate(post.createdAt)}</small>
                        </div>

                        <div className="comments-container">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="comment">
                                    <p>{comment.content}</p>
                                    <small>{formatDate(comment.createdAt)}</small>
                                </div>
                            ))}
                        </div>

                        <form
                            onSubmit={(e) => handleAddComment(post.id, e)}
                            className="comment-form"
                        >
                            <textarea
                                value={newComments[post.id] || ""}
                                onChange={(e) =>
                                    handleCommentChange(post.id, e.target.value)
                                }
                                placeholder="Añade un comentario..."
                            />
                            <button type="submit">Comentar</button>
                        </form>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Forum;
