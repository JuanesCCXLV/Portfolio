import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiArrowLeft, FiLogOut, FiMessageCircle, FiSend } from "react-icons/fi";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
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
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newComments, setNewComments] = useState({});
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Detectar sesión activa
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthReady(true);
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
                    querySnapshot.docs.map((d) => ({
                        id: d.id,
                        ...d.data(),
                        comments: d.data().comments || [],
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
                setNewComments((prev) => ({ ...prev, [postId]: "" }));
            } catch {
                setError("No se pudo agregar el comentario.");
            }
        }
    };

    const handleCommentChange = (postId, text) => {
        setNewComments((prev) => ({ ...prev, [postId]: text }));
    };

    const formatDate = (date) => {
        if (!date) return "";
        const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
        return d.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
    };

    return (
        <>
            <Navbar />
            <main className="forum">
                <div className="container forum__container">
                    <Link to="/" className="forum__back">
                        <FiArrowLeft /> Volver al portafolio
                    </Link>

                    <header className="forum__head">
                        <span className="section-label">// foro</span>
                        <h1 className="section-title">Blog / Foro</h1>
                        <p className="section-sub">
                            Un espacio para dejar ideas, preguntas o comentarios.
                        </p>
                    </header>

                    {error && <div className="forum__error">⚠ {error}</div>}

                    {!authReady ? (
                        <div className="forum__panel card forum__loading">Cargando…</div>
                    ) : !user ? (
                        <div className="forum__panel card forum__login">
                            <FiMessageCircle className="forum__login-icon" />
                            <h2>Inicia sesión para participar</h2>
                            <p>Necesitas una cuenta de Google para publicar o comentar.</p>
                            <button className="btn btn-ghost forum__google" onClick={handleLogin}>
                                <FcGoogle /> Iniciar sesión con Google
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="forum__user card">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        className="forum__avatar"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <span className="forum__avatar forum__avatar--fallback">
                                        {(user.displayName || user.email || "?")[0].toUpperCase()}
                                    </span>
                                )}
                                <div className="forum__user-info">
                                    <span className="forum__user-label">Sesión iniciada como</span>
                                    <strong>{user.displayName || user.email}</strong>
                                </div>
                                <button className="btn btn-ghost forum__logout" onClick={handleLogout}>
                                    <FiLogOut /> Salir
                                </button>
                            </div>

                            <form onSubmit={handleSubmitPost} className="forum__composer card">
                                <label htmlFor="new-post" className="forum__composer-label">
                                    <span>$</span> nuevo_post
                                </label>
                                <textarea
                                    id="new-post"
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                    placeholder="Escribe algo interesante aquí..."
                                    required
                                />
                                <div className="forum__composer-actions">
                                    <button type="submit" className="btn btn-primary" disabled={!newPost.trim()}>
                                        Publicar <FiSend />
                                    </button>
                                </div>
                            </form>

                            <div className="forum__posts">
                                {posts.length === 0 && (
                                    <p className="forum__empty">Aún no hay publicaciones. ¡Sé el primero!</p>
                                )}

                                {posts.map((post) => (
                                    <article key={post.id} className="post card">
                                        <div className="post__body">
                                            <p className="post__content">{post.content}</p>
                                            <time className="post__date">{formatDate(post.createdAt)}</time>
                                        </div>

                                        {post.comments.length > 0 && (
                                            <div className="post__comments">
                                                <span className="post__comments-count">
                                                    {post.comments.length}{" "}
                                                    {post.comments.length === 1 ? "comentario" : "comentarios"}
                                                </span>
                                                {post.comments.map((comment) => (
                                                    <div key={comment.id} className="comment">
                                                        <p>{comment.content}</p>
                                                        <time>{formatDate(comment.createdAt)}</time>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <form
                                            onSubmit={(e) => handleAddComment(post.id, e)}
                                            className="post__comment-form"
                                        >
                                            <input
                                                type="text"
                                                value={newComments[post.id] || ""}
                                                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                                placeholder="Añade un comentario..."
                                                aria-label="Añade un comentario"
                                            />
                                            <button type="submit" aria-label="Comentar">
                                                <FiSend />
                                            </button>
                                        </form>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Forum;
