import jwt from "jsonwebtoken";
import dataSource from "../index.js";
import User from "./entity_users.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Creating user:", email,password);

  try {
    const userExists = await dataSource
      .getRepository(User)
      .findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ msg: "Cet utilisateur existe déjà." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ email: email, password: hashedPassword }])
      .execute();

    res.json({ msg: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      msg: "Une erreur s'est produite lors de la création de l'utilisateur.",
      code: "failed",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Mot de passe incorrect." });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, "sarah", {
      expiresIn: "10min",
    });

    res.json({
      msg: "Connexion réussie",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      msg: "Une erreur s'est produite lors de la tentative de connexion.",
      code: "failed",
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await dataSource.getRepository(User).find();
    res.json(users);
  } catch (error) {
    console.error("Failed to retrieve users:", error);
    res.status(500).json({
      msg: "Une erreur s'est produite lors de la récupération des utilisateurs.",
    });
  }
};

/* export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Attempting login for:', email);

    try {
        // Recherche de l'utilisateur par email
        const user = await dataSource
            .getRepository(User)
            .findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ msg: "Utilisateur non trouvé." });
        }

        // Comparaison des mots de passe (assurez-vous que le mot de passe est haché lors de la sauvegarde)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Mot de passe incorrect." });
        }

        // Connexion réussie
        res.json({
            msg: 'Connexion réussie',
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            msg: "Une erreur s'est produite lors de la tentative de connexion.",
            code: 'failed',
        });
    }
};
 */
