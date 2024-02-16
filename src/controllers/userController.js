const User = require('../dao/models/User');

exports.changeUserRole = async (req, res) => {
    const { uid } = req.params;
    const { newRole } = req.body;
    try {
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        user.role = newRole;
        await user.save();
        res.status(200).json({ message: "Rol de usuario actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};
