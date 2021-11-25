import React, { useState } from 'react';
import SubscriptoresMailchimpAndBook from "../SubscriptoresMailchimpAndBook"

const FreeBookModal = ({ closeFreeBookModal }) => {

  return (
    <div className="subscribe__modal">
      <div className="subscribe__modal-wrapper ma1">
        <h1 className="p2">¡Libro gratis!</h1>
        <p className="p2">Recibe nuestro libro devocional Fruto del Espíritu por correo. Al ingresar tu nombre y correo electrónico recibirás un enlace de descarga. ¡Completamente gratis!</p>
        <SubscriptoresMailchimpAndBook />
        <p onClick={closeFreeBookModal} className="subscribe__modal-close mt3 p2">Cerrar</p>
        <div className="subscribe__modal-image">
        </div>
      </div>
    </div>
  )
}

export default FreeBookModal
