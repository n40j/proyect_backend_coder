const User = require('../dao/models/User');

exports.updateToPremium = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar si el usuario ha cargado los documentos requeridos
        if (!user.documents || user.documents.length < 3) {
            return res.status(400).json({ message: "El usuario no ha completado el proceso de documentación" });
        }

        // Actualizar el rol del usuario a premium
        user.role = 'premium';
        await user.save();

        res.status(200).json({ message: "El usuario ha sido actualizado a premium exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};