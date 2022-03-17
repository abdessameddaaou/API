const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Utilisateur = require("../Models/Utilisateur");

// cette fonctionnalité permet de creer un cookie avec le payload, clé secret et la duré de l'expiration
const createToken = (id) => {
  return jwt.sign({ id }, "CLE_SECRET", { expiresIn: "1h" });
};

// cette fonction sert a afficher la page d'inscription
module.exports.register_get = (req, res) => {
  res.render("register");
};

//
module.exports.register_post = async (req, res) => {
  try {
    const existe = await Utilisateur.findOne({ email: req.body.email }); // je verifie si l'adresse email existe si non on crée l'utilisateur sinon on envoie une erreur
    if (!existe) {
      try {
        const salt = await bcrypt.genSalt(10); // pour cette fonction j'ai utilisé la fonction de hachage bcrypt pour crypter le mot de passe
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        // je crée l'utilisateur
        const utilisateur = await Utilisateur.create({
          email: req.body.email,
          password: hashpassword,
        });

        res.status(201).json({ utilisateur: utilisateur._id });
      } catch (message) {
        res
          .status(400)
          .json({ message: "un utilisateur ne peut pas être créer " });
      }
    } else {
      res
        .status(400)
        .json({
          message:
            " ce utilisateur existe. veuillez utiliser une autre adresse rmail",
        });
    }
  } catch (message) {
    res
      .status(400)
      .json({ message: "il y a une erreur lors de l'inscription" });
  }
};

// cette fonction permet la deconnexion de l'utilisateur donc je change la durée du cookie pour 1ms
module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
};

// cette fonction ser a demander au server de se connecter
module.exports.login_post = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findOne({ email: req.body.email }); // je cherche si l'utilisateur existe

    if (utilisateur) {
      // si oui je compare le mot de passe
      const passwordValide = await bcrypt.compare(
        req.body.password,
        utilisateur.password
      );
      // si le mot de passe invalide j'envoie une erreur
      if (!passwordValide) {
        res
          .status(400)
          .json({ message: "votre mot de passe est incorrecte  ): ! " });
      } else {
        // sinon j'appelle la fonction createToken, je met le token dans le cookie puis j'envoie l'id de l'utilisateur
        try {
          const token = createToken(utilisateur);
          res.cookie("jwt", token, { httpOnly: true }); // http only pour que le cookie ne sera pas visualiser dans la console
          res.status(200).json({ utilisateur: utilisateur._id });
        } catch (message) {
          res
            .status(400)
            .json({
              message:
                "problème de connexion veuillez réessayer ultérieurement ): !",
            });
          console.log(err);
        }
      }
    } else {
      res.status(404).json({ message: "ce utilisateur n'existe pas :)  !" });
    }
  } catch (err) {
    res
      .status(400)
      .json({
        message: "problème de connexion veuillez réessayer ultérieurement ): !",
      });
  }
};

// cette fonction sert a afficher la page de connexion
module.exports.login_get = (req, res) => {
  res.render("login");
};
