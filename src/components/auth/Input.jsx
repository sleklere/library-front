const Input = ({
  type,
  labelText,
  placeholder,
  errMsg,
  isInvalid,
  classes,
  ...props
}) => (
  <label className={`label ${classes}`}>
    {labelText}
    <input className="input" type={type} placeholder={placeholder} {...props} />
    {isInvalid && <p className="error-text">{errMsg}</p>}
  </label>
);
export default Input;
