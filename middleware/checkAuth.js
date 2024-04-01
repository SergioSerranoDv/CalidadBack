const jwt = require('jsonwebtoken');
const usuarioWango = require ('../src/models/usuarioModel');
const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await usuarioWango.findById(decoded.id).select(
                "-password -confirmado -token -createdAt -updatedAt -__v"
            );
            console.log(JSON.stringify(req.usuario));
            console.log(req.usuario);
            return next();
        } catch (error) {
            return res.status(401).json({ msg: "Token inválido" });   
        }
    }else{
        return res.status(401).json({ msg: "Token no proporcionado" });
    }
};

module.exports = checkAuth;