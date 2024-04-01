const mongoose = require('mongoose');
const bcrypt = require ("bcrypt");
const usuarioWangoSchema = mongoose.Schema({
    IdTipo:{
        type: String,
        required: true,
        trim: true,
    },
    NoIdentificacion: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
    token:{
        type: String,
    },
    usuarioTipo:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    }
},{
    timestamps: true
});
usuarioWangoSchema.pre('save', async function(next){
    if (!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
usuarioWangoSchema.methods.comprobarPassword = async function (passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}
const usuarioWango = mongoose.model("Usuario", usuarioWangoSchema);
module.exports = usuarioWango;