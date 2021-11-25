import React from 'react'
import { useState } from 'react'
import FreeBookModal from '../Modals/FreeBookModal'
import SubscribeModal from "../Modals/SubscribeModal"

const IndexHeader = () => {

  const [subscribeModal, showSubscribeModal] = useState(false)

  const [bookModal, showBookModal] = useState(false)

  const openSubscribeModal = () => {
    showSubscribeModal(true)
  }

  const closeSubscrubeModal = () => {
    showSubscribeModal(false)
  }

  const openFreeBookModal = () => {
    showBookModal(true)
  }

  const closeFreeBookModal = () => {
    showBookModal(false)
  }

  return (
    <>
      {subscribeModal && (
        <SubscribeModal closeSubscrubeModal={closeSubscrubeModal} />
      )}

      {bookModal && (
        <FreeBookModal closeFreeBookModal={closeFreeBookModal} />
      )}
      <header className="index-header ">
        <div className="index-header__left" />
        <div className="index-header__right">
          <h1>Fruto del Espíritu</h1>
          <p>Palabra que edifica, levanta y restaura.</p>
          <div className="index-header__btns">
            <a onClick={openSubscribeModal} className="btn-primary">Suscríbete</a>
            <a onClick={openFreeBookModal} className="btn-secondary">Descarga libro gratis</a>
          </div>
        </div>
      </header>
    </>
  )
}

export default IndexHeader
