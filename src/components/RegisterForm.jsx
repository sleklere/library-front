function RegisterForm() {
  return (
    <div className="form-container">
      <h1>Creá tu Cuenta</h1>
      <form>
        <div className="name-lastName">
          <label>
            Nombre
            <input type="text" placeholder="Juan" name="user" />
          </label>
          <label>
            Apellido
            <input type="text" placeholder="Rodriguez" name="user" />
          </label>
        </div>
        <label>
          E-mail
          <input type="email" placeholder="user@email.com" name="user" />
        </label>
        <label>
          Usuario
          <input type="text" placeholder="username123" name="user" />
        </label>
        <label>
          Contraseña
          <input type="password" placeholder="************" name="password" />
        </label>
        <button className={`btn auth-submit`} type="submit">
          {/* {formIsSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} className="btn-spinner" />
          ) : (
            "REGISTRARSE"
          )} */}
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
