const express = require("express");

const router = express.Router();

const utilisateurControlleur = require("../Controller/authentifiaction");
// const { verifierUtilisateur } = require("../middleware/authentifiaction");

router.post("/register", utilisateurControlleur.register_post);
router.get("/register", utilisateurControlleur.register_get);
router.post("/login", utilisateurControlleur.login_post);
router.get("/login", utilisateurControlleur.login_get);
router.get("/logout", utilisateurControlleur.logout);

module.exports = router;
