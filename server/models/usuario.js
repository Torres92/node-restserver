
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

// creo el schema de usuario con sus role (pronto agregaremos: ENTERPRISE_ROLE, MOTO_ROLE, ADMIN_ROLE)

let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario']
	},
	password: {
		type: String,
		required: [true, 'La contraseña es obligatoria']
	},
	img: {
		type: String,
		required: false
	},// no es obligatoria
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValidos
	}, // default 'USER_ROLE'
	estado: {
		type: Boolean,
		default: true
	},// Boolean
	google: {
		type: Boolean,
		default: false
	}
});

//aca modificamos el objeto JSON para que no retorne el password o informacion que no quiero mostrar

usuarioSchema.methods.toJSON = function() {

	let user = this;
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
}

//muestro mensaje de validacion de correo
usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único'} )

module.exports = mongoose.model('Usuario', usuarioSchema);
