const express = require("express");
const router = express.Router();
const { registerUser, login, updateUser, deleteUser, deleteUserid, getUsers } = require("./Controllers/usercontroller");
const authMiddleware = require("./Middleware/authMiddleware");
const { createPost, getPosts, updatePost, getPostByUserId, deletePost } = require("./Controllers/postController");


// Routes pour les utilisateurs
router.post("/users", registerUser); // Créer un utilisateur
router.post("/login", login); // Connexion d'un utilisateur
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);
router.delete("/delete/:id", authMiddleware, deleteUserid);
router.get("/users", authMiddleware, getUsers);

// Routes pour les annonces (posts)
router.post("/post", authMiddleware, createPost); // Créer un post
router.get("/posts", authMiddleware, getPosts); // Obtenir tous les posts
router.put("/post/:postId", authMiddleware, updatePost); // Mettre à jour un post
router.get("/post/:userId", authMiddleware, getPostByUserId); // Obtenir les posts d'un utilisateur
router.delete("/post/:postId", authMiddleware, deletePost); // Supprimer un post


// Exporter le routeur, pas les fonctions
module.exports = router;
