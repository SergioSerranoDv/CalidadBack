const generarId = require("../../helpers/generarId.js");
const usuarioWango = require("../models/usuarioModel.js");
const generarJWT = require("../../helpers/generarJW.js");
const validator = require('validator');

const registrar = async (req, res) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: "El email no es válido" });
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        return res.status(400).json({ msg: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo" });
    }

    try {
        const existeUsuario = await usuarioWango.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ msg: "El usuario ya está registrado" });
        }

        const usuario = new usuarioWango(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }
};


const autenticar = async (req, res) =>{
    //Comprobar la existencia del usuario
    const { email, password } = req.body;
    const usuario = await usuarioWango.findOne({ email});
    //console.log(usuario);
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }
    //confirmar si el usuario está confirmado
    
    //Comprobar password
    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombres: usuario.nombres,
            email: usuario.email,
            token: generarJWT(usuario._id),
        })
    }else{
        const error = new Error( "El password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }
};

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await usuarioWango.findOne({ token });
    if (!usuarioConfirmar){
        const error = new Error("El token no es válido");
        return res.status(403).json({ msg: error.message });
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente"}); 
        console.log(usuarioConfirmar);
    } catch (error) {
        console.log(error);
    }

};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario =  await usuarioWango.findOne({ email });
    if (!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }
    try {
        //Queda pendiente la parte en la que se le envía el token al usuario. Puede ser con un botón o algo así.
        //Porque para validar el token se hace una solicitud GET al URL con el token en esta. quizás enviar un correo
        //en el que aparezca un botón que haga esa solicitud. 
        usuario.token = generarId();
        console.log(usuario);
        await usuario.save();
        res.json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
        console.log(error);
    }
};

const comprobarToken = async (req, res) => {
    //params para métodos GET
    const { token } = req.params;
    const tokenValido = await usuarioWango.findOne({ token });
    if(tokenValido){
        console.log("Token valido");
        res.json({ msg: "Token valido, el usuario existe" });
    }else{
        const error = new Error("Token no valido - Comprobar Token");
        return res.status(404).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await usuarioWango.findOne({ token });
    if(usuario){
        usuario.password = password;
        usuario.token = '';
        try {
            await usuario.save();
            res.json ({ msg: "Password modificado correctamente" })
        } catch (error) {
            console.log(error);
        }
    }else{
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }

};

const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

const obtenerPerfil = async (req, res) => {
    try {
        const { id }  = req.params;
        const usuario = await usuarioWango.findById( id );
        if(!usuario){
            const error = new Error("Usuario no encontrado");
            return res.status(404).json({ msg: error.message });
        }
        res.json(usuario);    
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Error al obtener el perfil del usuario" });
    }
};

module.exports = {
    registrar,
    autenticar,
    confirmar,
    olvidePassword, 
    comprobarToken, 
    nuevoPassword,
    perfil,
    obtenerPerfil,
};