const mongoose = require('mongoose');
const bcrypt = require ("bcrypt");
const usuarioWangoSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
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