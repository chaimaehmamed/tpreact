const Post = require("../Models/postModel");

const createPost = async (req, res) => {
  const { titre, description, categorie, prix, ville } = req.body;
  const authorId = req.user.id;

  
  if (!titre || !description || !categorie || !prix || !ville) {
    return res.status(400).send("Merci de remplir tous les champs");
  }

  try {
    
    const post = new Post({
      titre,
      description,
      categorie,
      prix,
      ville,
      vendeur: authorId,
    });

    
    await post.save();

   
    res.status(201).send(post);
  } catch (error) {
    
    res.status(400).send({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.titre) {
      filter.titre = { $regex: req.query.titre, $options: "i" };
    }
    if (req.query.categorie) {
      filter.categorie = { $regex: req.query.categorie, $options: "i" };
    }

    const posts = await Post.find(filter).populate("vendeur", "username email");

    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getPostByUserId = async (req, res) => {
  try {
    const posts = await Post.find({ vendeur: req.params.userId }).populate(
      "vendeur",
      "username email"
    );
    if (!posts) {
      return res.status(404).send({ error: "Aucune annonce trouvée" });
    }
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
      return res.status(404).send({ error: "Annonce introuvable" });
    }
    res.status(200).send({ message: "Annonce supprimée" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  getPostByUserId,
  deletePost,
};
