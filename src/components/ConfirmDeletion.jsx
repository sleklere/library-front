function ConfirmDeletion({ confirm, closeModal }) {
  const confirmHandler = () => {
    console.log("CONFIRM HANDLER");
    confirm(); // will trigger the useEffect that sends the request
    closeModal();
  };
  const cancelHandler = () => {
    closeModal();
  };

  return (
    <>
      <div className="overlay-bg" onClick={closeModal}></div>
      <div className="confirm-deletion-modal">
        <h2>¿Estás seguro?</h2>
        <div className="confirm-deletion-modal__buttons">
          <button onClick={confirmHandler}>Confirmar</button>
          <button className="confirm-deletion-modal__buttons--cancel" onClick={cancelHandler}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmDeletion;
