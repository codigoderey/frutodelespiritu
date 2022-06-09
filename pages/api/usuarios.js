import connectDB from '../../utils/connectDB';
import Usuario from '../../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Lectura from '../../models/lecturaModel';
import { correoBienvenida } from '../../utils/emails/correoBienvenida';
import Cors from 'cors';

connectDB();

// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, result => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export default (req, res) => {
	switch (req.method) {
		case 'GET':
			handleGetRequest(req, res);
			break;

		case 'POST':
			handlePostRequest(req, res);
			break;

		case 'PUT':
			handlePutRequest(req, res);
			break;

		case 'DELETE':
			handleDeleteRequest(req, res);
			break;

		default:
			res.status(200).json(`Request ${req.method} no está autorizado`);
	}
};

// get if user is logged in
const handleGetRequest = async (req, res) => {
	// Run the middleware
	await runMiddleware(req, res, cors);

	try {
		const { id } = req.query;

		if (id) {
			const usuario = await Usuario.findOne({ _id: id }).populate({
				path: 'lecturasGuardadas.lectura',
				model: Lectura,
			});

			return res.status(200).json(usuario);
		} else if (!req.headers.authorization) {
			return res.status(401).send('Acción no autorizada');
		} else {
			const { userId } = jwt.verify(req.headers.authorization, process.env.JWT);

			const usuario = await Usuario.findOne({ _id: userId }).populate({
				path: 'lecturasGuardadas.lectura',
				model: Lectura,
			});

			if (usuario) {
				return res.status(200).json(usuario);
			} else {
				return res.status(404).send('Usuario no encontrado');
			}
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Hubo un error, inténtelo nuevamente');
	}
};

const handlePutRequest = async (req, res) => {
	try {
		const { usuarioId, lecturaId, action } = req.body;

		if (action === 'removerlibro') {
			const usuario = await Usuario.findOne({ _id: usuarioId }).populate({
				path: 'lecturasGuardadas.lectura',
				model: Lectura,
			});
			const removerLectura = usuario.lecturasGuardadas.find(
				l => (l.lectura._id = lecturaId),
			);
			removerLectura.remove();
			await usuario.save();
			res.status(200).send('Lectura removida');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Hubo un error, inténtelo nuevamente');
	}
};

// Post request will handle login and registration based on actions
const handlePostRequest = async (req, res) => {
	// Run the middleware
	await runMiddleware(req, res, cors);

	const { nombre, correo, contrasena, action, usuarioId, lecturaId } = req.body;

	if (action === 'registrar') {
		// data validation
		if (!isLength(nombre, { min: 3, max: 30 })) {
			return res
				.status(422)
				.send('El nombre debe contener entre 3 a 30 caracteres');
		} else if (!isLength(contrasena, { min: 8 })) {
			return res
				.status(422)
				.send('La contraseña debe contener al menos 8 caracteres');
		} else if (!isEmail(correo)) {
			return res.status(422).send('El correo electrónico no es válido');
		}

		const usuario = await Usuario.findOne({ correo });

		if (usuario) {
			return res.status(422).send(`Usuario con el correo ${correo} ya existe`);
		}

		const hash = await bcrypt.hash(contrasena, 10);

		const nuevoUsuario = await new Usuario({
			nombre,
			correo,
			contrasena: hash,
		});

		await nuevoUsuario.save();

		const name = nuevoUsuario.nombre;
		const email = nuevoUsuario.correo;
		correoBienvenida({ name, email });

		// crear token para funcionalidad de inicio de sesion
		// jwt crea un usuario al cual le asignamos el id de la base de datos
		const token = jwt.sign({ userId: nuevoUsuario._id }, process.env.JWT, {
			expiresIn: '7d',
		});

		return res.status(200).json(token);
	} else if (action === 'ingresar') {
		const usuario = await Usuario.findOne({ correo }).select('+contrasena');

		if (!usuario) {
			return res.status(404).send('El usuario no existe');
		}

		const passwordsIguales = await bcrypt.compare(
			contrasena,
			usuario.contrasena,
		);

		if (passwordsIguales) {
			// crear token para funcionalidad de inicio de sesion
			// jwt crea un id de usuario al cual le asignamos el id de la base de datos y posteriormente hacerlo persistente
			const token = jwt.sign({ userId: usuario._id }, process.env.JWT, {
				expiresIn: '7d',
			});

			res.status(200).json(token);
		} else {
			res.status(401).send('Credenciales inválidos');
		}
	} else if (action === 'anadirlibro') {
		try {
			const lectura = await Lectura.findOne({ _id: lecturaId });
			const usuario = await Usuario.findOne({ _id: usuarioId });
			const lecturaGuardar = {
				lectura: lecturaId,
				publicadoPor: lectura.publicadoPor,
			};

			usuario.lecturasGuardadas.push(lecturaGuardar);
			await usuario.save();
			res.status(200).send('Guardada exitosamente');
		} catch (error) {
			console.error(error);
			res.status(500).send('Hubo un error, inténtelo nuevamente');
		}
	}
};

const handleDeleteRequest = async (req, res) => {
	// Run the middleware
	await runMiddleware(req, res, cors);

	try {
		const { id } = req.body;

		await Usuario.find()
			.populate({
				path: 'lecturasGuardadas',
				model: Lectura,
			})
			.updateMany(
				{},
				{ $pull: { lecturasGuardadas: { publicadoPor: id } } },
				{ multi: true },
			);

		await Lectura.deleteMany({ publicadoPor: id });
		await Usuario.deleteOne({ _id: id });

		res.status(200).send('Cuenta Eliminada');
	} catch (error) {
		console.error(error);
		res.status(500).send('Hubo un error, inténtelo nuevamente');
	}
};

export const config = {
	api: {
		externalResolver: true,
	},
};
