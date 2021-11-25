import React, { useState } from 'react';
import SubscriptoresMailchimp from "../SubscriptoresMailchimp"

const SubscribeModal = ({ closeSubscrubeModal }) => {

  return (
    <div className="subscribe__modal">
      <div className="subscribe__modal-wrapper ma1">
        <h1 className="p2">Suscríbete</h1>
        <p className="p2">Entérate cada vez que publicamos una nueva lectura.  Entra tu nombre y correo electrónico. ¡100% gratis!</p>
        <SubscriptoresMailchimp />
        <p onClick={closeSubscrubeModal} className="subscribe__modal-close mt3 p2">Cerrar</p>
        <div className="subscribe__modal-image">
        </div>
      </div>
    </div>
  )
}

export default SubscribeModal
