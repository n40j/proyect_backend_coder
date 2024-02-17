const User = require('../dao/models/User');
const { generateToken, sendPasswordResetEmail } = require('../utils/authUtils');

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const token = generateToken();
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();
        await sendPasswordResetEmail(email, token); // Implementar esta función para enviar el correo
        res.status(200).json({ message: "Se ha enviado un correo electrónico para restablecer la contraseña" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "El enlace ha expirado o es inválido" });
        }
        // Asegúrate de almacenar la contraseña de manera segura
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Contraseña restablecida exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};