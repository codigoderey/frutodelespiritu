import { useEffect } from 'react';
import LecturasHeader from '../components/Headers/LecturasHeader';
import Registrarme from '../components/Formularios/Registrarme';
import Head from 'next/head';
import { useRouter } from 'next/router';

const registrarme = ({ usuario }) => {
	const router = useRouter();
	useEffect(() => {
		if (usuario) {
			router.push('/perfil');
		}
	}, [usuario]);

	return (
		<div>
			<Head>
				<title>Crea una cuenta con Fruto del Espíritu</title>
				<meta
					name="description"
					content="Al registrarte podrás guardar lecturas, estudios bíblicos como referencia y solicitar privilegios de administrador para ser un autor."
				/>
				<meta
					name="keywords"
					content="escritor cristiano, escritor sobre la fe, autor cristiano, autor de la fe, escritor religioso"
				/>
				<meta
					property="og:title"
					content="Crea una cuenta con Fruto del Espíritu"
				/>
				<meta
					property="og:description"
					content="Al registrarte podrás guardar lecturas, estudios bíblicos como referencia y solicitar privilegios de administrador para ser un autor."
				/>
				<meta property="og:locale" content="es_US" />
				<meta
					property="og:image"
					content="https://frutodelespiritu.com/logo.png"
				/>
				<meta
					property="og:url"
					content="https://frutodelespiritu.com/registrarme"
				/>
			</Head>
			<LecturasHeader tema="Registrarme" />
			<Registrarme />
		</div>
	);
};

export default registrarme;
