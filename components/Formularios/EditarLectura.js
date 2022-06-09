import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useRouter } from 'next/router';
import LecturasHeader from '../Headers/LecturasHeader';

const NuevaLectura = ({ usuario, lectura }) => {
	const router = useRouter();

	const [lecturaEditar, setLecturaEditar] = useState({
		titulo: lectura.titulo,
		resumen: lectura.resumen,
		slug: lectura.slug,
	});

	const [contenido, setContenido] = useState('');
	const [errorStatus, setErrorStatus] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [categorias, setCategorias] = useState([]);
	const [categoria, setCategoria] = useState('');

	const handleInputChange = e => {
		setLecturaEditar({
			...lecturaEditar,
			[e.target.name]: e.target.value,
		});
	};

	const handleInputCategoriaChange = e => {
		setCategoria(e.target.value);
	};

	const handleEditorChange = e => {
		setContenido(e);
	};

	const obtenerLasCategorias = async () => {
		const { data } = await axios.get(`${baseURL}/api/categorias`);
		setCategorias(data);
	};

	useEffect(() => {
		obtenerLasCategorias();
	}, []);

	const handleFormNuevaLectura = async e => {
		e.preventDefault();

		try {
			setErrorStatus(false);
			setLoading(true);

			if (
				lecturaEditar.titulo === '' ||
				lecturaEditar.resumen === '' ||
				contenido === '' ||
				categoria === ''
			) {
				setErrorStatus(true);
				setErrorMessage('Todos los blancos son requeridos.');
				return;
			}
			const nuevaLecturaEditar = {
				titulo: lecturaEditar.titulo,
				publicadoPor: usuario._id,
				slug: lecturaEditar.slug,
				resumen: lecturaEditar.resumen,
				contenido: contenido,
				action: 'editarLectura',
				categoria,
			};
			const url = `${baseURL}/api/lecturas`;

			await axios.put(url, nuevaLecturaEditar);

			router.push(
				`${baseURL}/lecturas/lectura?slug=${nuevaLecturaEditar.slug}`,
			);
		} catch (error) {
			setErrorStatus(true);
			setErrorMessage(error.response.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<LecturasHeader tema="Editar publicación" />
			<form onSubmit={handleFormNuevaLectura} className="container p2 mb3">
				<div className="form-input-group">
					<input
						type="text"
						name="titulo"
						placeholder="Título"
						onChange={handleInputChange}
						defaultValue={lectura.titulo}
					/>
				</div>

				<div className="form-input-group">
					<textarea
						type="text"
						name="resumen"
						placeholder="Resumen"
						onChange={handleInputChange}
						defaultValue={lectura.resumen}
					/>
				</div>

				<div className="form-input-group">
					<select name="categoria" onChange={handleInputCategoriaChange}>
						<option value="">Elije una categoría</option>
						{categorias.map(c => (
							<option defaultValue={c.nombre} key={c._id} value={c.nombre}>
								{c.nombre}
							</option>
						))}
					</select>
				</div>

				<SunEditor
					height="600"
					setContents={lectura.contenido}
					value={contenido}
					name="contenido"
					onChange={handleEditorChange}
					// value={contenido}
					placeholder="Tu contenido aquí"
					setOptions={{
						buttonList: [
							['formatBlock'],
							['blockquote'],
							[
								'bold',
								'underline',
								'italic',
								'strike',
								'subscript',
								'superscript',
							],
							['fontColor', 'hiliteColor', 'textStyle'],
							['removeFormat'],
							'/', // Line break
							['align', 'horizontalRule', 'list'],
							['link', 'image', 'video', 'audio'],
							/** ['imageGallery'] */ ['fullScreen', 'showBlocks', 'codeView'],
						],
					}}
				/>
				{errorStatus && (
					<div className="alert-red">
						<svg
							style={{ marginRight: '.5rem' }}
							fill="#fff"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-4.971 19.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm.5-4.25h-1l-1-10h3l-1 10z" />
						</svg>
						<p>{errorMessage}</p>
					</div>
				)}

				{loading ? (
					<>
						<div style={{ textAlign: 'center', marginBottom: 0 }}>
							Cargando...
						</div>
						<div style={{ marginTop: 0 }} className="spinner">
							<div className="double-bounce1"></div>
							<div className="double-bounce2"></div>
						</div>
					</>
				) : (
					<button type="submit">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
						>
							<path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z" />
						</svg>
						Actualizar
					</button>
				)}
			</form>
		</>
	);
};

export default NuevaLectura;
