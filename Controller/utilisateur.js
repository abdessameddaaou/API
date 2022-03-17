const Utilisateur = require("../Models/Utilisateur");

// cette fonction permet de de recuperer tous les information de l'utilisateur a l'aide de la commande find
module.exports.utilisateurs = async (req, res) => {
  const utilisateurs = await Utilisateur.find({ ...req.body });
  res.render("utilisateur", { utilisateurs: utilisateurs });
};
