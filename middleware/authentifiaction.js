const jwt = require("jsonwebtoken");
const Utilisateur = require("../Models/Utilisateur");

//Verifier que l'utilisateur est connecté
const verifierUtilisateur = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "CLE_SECRET", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { verifierUtilisateur };
