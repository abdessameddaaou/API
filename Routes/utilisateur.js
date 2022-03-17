const express = require("express");

const router = express.Router();
const { verifierUtilisateur } = require("../middleware/authentifiaction");

const utilisateurControlleur = require("../Controller/utilisateur");

router.get("/users", verifierUtilisateur, utilisateurControlleur.utilisateurs);

module.exports = router;
