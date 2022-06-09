import { useEffect } from 'react';
import LecturasHeader from '../components/Headers/LecturasHeader';
import Ingresar from '../components/Formularios/IngresarFormulario';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ingresar = ({ usuario }) => {
	const router = useRouter();

	useEffect(() => {
		if (usuario) {
			router.push('/perfil');
		}
	}, [usuario]);

	return (
		<>
			<Head>
				<title>Ingresa a tu cuenta con tus credenciales</title>
				<meta name="description" content="Ingresa a Fruto del Espíritu." />
				<meta
					property="og:title"
					content="Ingresa a tu cuenta con tus credenciales"
				/>
				<meta
					property="og:description"
					content="Ingresa a Fruto del Espíritu."
				/>
				<meta property="og:locale" content="es_US" />
				<meta
					property="og:image"
					content="https://frutodelespiritu.com/logo.png"
				/>
				<meta
					property="og:url"
					content="https://frutodelespiritu.com/ingresar"
				/>
			</Head>
			<LecturasHeader tema="Ingresar" />
			<Ingresar />
		</>
	);
};

export default ingresar;
