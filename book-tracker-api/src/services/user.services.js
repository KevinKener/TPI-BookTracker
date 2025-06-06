import { User, Lecture } from "../models/index.js";
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // memberSince formatea la fecha en que se registró
  const formattedUser = {
    ...user.toJSON(),
    memberSince: new Date(user.createdAt).toLocaleDateString('es-ES')
  };

  res.json(formattedUser);
}

export const getUsers = async (req, res) => {
  const users = await User.findAll();

  res.json(users);
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, profilePictureUrl, description, email, password, role } = req.body;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (email) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== user.id) {
      return res.status(400).json({ message: 'El email ya está en uso por otro usuario' });
    }
  }


  const updateData = {};
  if (username !== undefined) updateData.username = username;
  if (profilePictureUrl !== undefined) updateData.profilePictureUrl = profilePictureUrl;
  if (description !== undefined) updateData.description = description;
  if (email !== undefined) updateData.email = email;
  if (role !== undefined) updateData.role = role;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  await user.update(updateData);

  res.json(user);
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }


  await Lecture.destroy({ where: { userId: id } });

  await user.destroy();

  res.send(`El usuario con id: ${id} ha sido eliminado`);
}