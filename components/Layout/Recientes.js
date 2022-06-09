import React, { useEffect, useState } from 'react';
import baseURL from '../../utils/baseURL';
import axios from 'axios';

const Recientes = ({ current }) => {
	const [lecturas, setLecturas] = useState(Array);

	const getLecturas = async () => {
		const url = `${baseURL}/api/lecturas`;
		const { data } = await axios.get(url);
		setLecturas(data);
	};

	useEffect(() => {
		getLecturas();
	}, []);

	const lectura = lecturas.filter((l) => {
		return l._id !== current;
	});

	return (
		<div className='recientes p3'>
			<h2>Recientes</h2>
			<ul>
				{lectura
					.map((l) => (
						<li key={l._id}>
							<a href={`/lecturas/lectura?slug=${l.slug}`}>{l.titulo}</a>
						</li>
					))
					.reverse()
					.slice(0, 5)}
			</ul>
		</div>
	);
};

export default Recientes;
