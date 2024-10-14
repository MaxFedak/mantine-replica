import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/_text-input.scss';

const TextInput = ({ label, placeholder, error, disabled, required, type = 'text', ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputClassName = `text-input__field 
    ${error ? 'text-input__field--error' : ''} 
    ${isFocused ? 'text-input__field--focused' : ''}
    ${disabled ? 'text-input__field--disabled' : ''}
    ${type === 'password' ? 'text-input__field--password' : ''}`;

    useEffect(() => console.log(isFocused),[isFocused])

  const labelClassName = `text-input__label ${required ? 'text-input__label--required' : ''}`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="text-input">
      {label && (
        <label className={labelClassName} htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className="text-input__wrapper">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={inputClassName}
          placeholder={placeholder}
          onFocus={() => {
            console.log(error)
            if(!error) {
              setIsFocused(true)
            }
          }}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="text-input__toggle-visibility"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
      {error && (
        <p className="text-input__error">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
