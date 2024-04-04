const User = require('../dao/models/User');
const nodemailer = require('nodemailer');

exports.updateToPremium = async (req, res) => {
    const { uid } = req.params;
    try {
        // Buscar el usuario por su ID
        const user = await User.findById(uid);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar si el usuario ya es premium
        if (user.role === 'premium') {
            return res.status(400).json({ message: "El usuario ya es premium" });
        }

        // Verificar si el usuario ha completado el proceso de documentación
        if (!user.documents || user.documents.length < 3) {
            return res.status(400).json({ message: "El usuario no ha completado el proceso de documentación" });
        }

        // Actualizar el rol del usuario a premium
        user.role = 'premium';
        await user.save();

        // Enviar correo electrónico al usuario
        await sendEmail(user.email, 'Actualización a cuenta premium', '¡Felicidades! Tu cuenta ha sido actualizada a premium.');

        res.status(200).json({ message: "El usuario ha sido actualizado a premium exitosamente" });
    } catch (error) {
        console.error("Error al actualizar a premium:", error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};

exports.deleteInactiveUsers = async (req, res) => {
    try {
        // Definir el límite de tiempo para usuarios inactivos (30 días)
        const timeLimit = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        
        // Buscar usuarios inactivos
        const inactiveUsers = await User.find({ lastLogin: { $lt: timeLimit } });

        // Eliminar usuarios inactivos
        const result = await User.deleteMany({ lastLogin: { $lt: timeLimit } });

        // Enviar correo electrónico a los usuarios cuyas cuentas se eliminaron
        await Promise.all(inactiveUsers.map(async (user) => {
            await sendEmail(user.email, 'Eliminación de cuenta por inactividad', 'Tu cuenta ha sido eliminada debido a la inactividad.');
        }));

        res.json({ message: 'Usuarios inactivos eliminados correctamente.', deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Error al eliminar usuarios inactivos:", error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};

async function sendEmail(email, subject, text) {
    // Aquí debes configurar tu servicio de correo electrónico, como nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu_correo@gmail.com',
            pass: 'tu_contraseña'
        }
    });

    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
}
