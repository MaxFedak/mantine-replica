import React, { useState } from 'react';
import '../styles/components/_text-input.scss';

const TextInput = ({ label, placeholder, error, disabled, required, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClassName = `text-input__field 
    ${error ? 'text-input__field--error' : ''} 
    ${isFocused ? 'text-input__field--focused' : ''}
    ${disabled ? 'text-input__field--disabled' : ''}`;

  const labelClassName = `text-input__label ${required ? 'text-input__label--required' : ''}`;

  return (
    <div className="text-input">
      {label && (
        <label className={labelClassName} htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className="text-input__wrapper">
        <input
          type="text"
          className={inputClassName}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
      {error && (
        <p className="text-input__error">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
