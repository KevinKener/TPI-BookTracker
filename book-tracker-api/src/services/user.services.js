import { User } from "../models/index.js";

export const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user){
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // memberSince formatea la fecha en que se registró
    const formattedUser = {
        ...user.toJSON(),
        memberSince: new Date(user.createdAt).toLocaleDateString('es-ES')
    };

    res.json(formattedUser);
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, profilePictureUrl, description } = req.body; 

    const user = await User.findByPk(id);

    if (!user){
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update({
        username,
        profilePictureUrl,
        description
    });

    res.json(user);
}

export const deleteUser = async (req,res) => {
    const {id} = req.params;

    const user = await User.findByPk(id);

    if (!user){
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.destroy();

    res.send(`El usuario con id: ${id} ha sido eliminado`);
}