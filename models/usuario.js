

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role permitido'
}

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema( {

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false},
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos}

});

UsuarioSchema.plugin( uniqueValidator, { message: '{PATH} el correo debe ser unico' } );

// Exportamos este esquema para que pueda ser utilizado fuera
module.exports = mongoose.model('Usuario', UsuarioSchema);