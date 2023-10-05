const Input = ({
  type,
  labelText,
  placeholder,
  errMsg,
  isInvalid,
  classes,
  ...props
}) => (
  <label className={classes}>
    {labelText}
    <input type={type} placeholder={placeholder} {...props} />
    {isInvalid && <p className="error-text">{errMsg}</p>}
  </label>
);
export default Input;
