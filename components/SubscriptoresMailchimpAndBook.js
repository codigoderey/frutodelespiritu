import React, { useState } from 'react';
import baseURL from "../utils/baseURL";
import axios from 'axios';

const SubscriptoresMailchimp = () => {

  const [suscriptor, setSuscriptor] = useState({
    nombre: "",
    correo: ""
  })

  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleFormSuscribirme = async (e) => {
    e.preventDefault();

    try {
      setErrorStatus(false)
      setSuccess(false)
      setLoading(true)

      if (suscriptor.nombre === '' || suscriptor.correo === '') {
        setErrorStatus(true)
        return setErrorMessage('Todos los blancos son requeridos.');
      }

      const url = `${baseURL}/api/mailchimplusbook`;
      const payload = suscriptor;

      setSuscriptor({
        nombre: '',
        correo: '',
      });

      await axios.post(url, payload);

      setSuccess(true);

    } catch (error) {
      console.error(error.message);
      setErrorStatus(true)
      setErrorMessage("Hubo un error, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = (e) => {
    setSuscriptor({
      ...suscriptor,
      [e.target.name]: e.target.value
    })
  }

  const { nombre, correo } = suscriptor

  return (
    <form onSubmit={handleFormSuscribirme} className="mailchimp-form p2 mb3">
      <p className="mb0"><strong>Ingresa la siguiente información para recibir un enlace a tu libro.</strong></p>
      <div className="mailchimp-input-container m0">
        <div className="form-input-group-mailchimp p1">
          <input
            onChange={handleInputChange}
            type="text"
            name="nombre"
            value={nombre}
            placeholder="Tu nombre"

          />
        </div>

        <div className="form-input-group-mailchimp p1">
          <input type="email" name="correo" placeholder="Correo electrónico" onChange={handleInputChange} value={correo} />
        </div>

        <div className="mailchimp-btn-container p1">
          {
            loading ? (<button className="btn-primary" type="submit">Procesando...</button>)
              : (<button className="btn-primary" type="submit">Suscribirme</button>)
          }
        </div>
      </div>

      {errorStatus &&
        <div className="alert-red m0">
          <svg style={{ marginRight: ".5rem" }} fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-4.971 19.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm.5-4.25h-1l-1-10h3l-1 10z" /></svg>
          <p>{errorMessage}</p>
        </div>
      }

      {success &&
        <div className="alert-green">Verifica tu correo electrónico. Recibirás un enlace con acceso a tu libro.  ¡Completamente gratis! Si no recibes el mensaje en varios minutos verifica tu correo spam.</div>
      }
    </form>
  )
}

export default SubscriptoresMailchimp
