import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/_selector.scss';

const Selector = ({
                    label,
                    placeholder,
                    error,
                    disabled,
                    required,
                    data,
                    onChange,
                    value,
                    searchable = false,
                    ...props
                  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const selectorClassName = `selector__field text-input__field
    ${error ? 'text-input__field--error' : ''} 
    ${isFocused ? 'text-input__field--focused' : ''}
    ${disabled ? 'text-input__field--disabled' : ''}`;

  const labelClassName = `selector__label text-input__label ${required ? 'text-input__label--required' : ''}`;

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(
        data.filter(item =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = (item) => {
    onChange(item);
    setIsOpen(false);
    setSearchTerm(item.label);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchable) {
      setIsOpen(true);
      setFilteredData(data); // Show all options when focused
    }
  };

  if (!searchable) {
    return (
      <div className="selector text-input">
        {label && (
          <label className={labelClassName}>
            {label}
          </label>
        )}
        <div className="selector__wrapper text-input__wrapper">
          <select
            className={selectorClassName}
            value={value ? value.value : ''}
            onChange={(e) => {
              const selectedItem = data.find(item => item.value === e.target.value);
              onChange(selectedItem);
            }}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            required={required}
            {...props}
          >
            <option value="" disabled hidden>{placeholder}</option>
            {data.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="selector__error text-input__error">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="selector text-input" ref={wrapperRef}>
      {label && (
        <label className={labelClassName}>
          {label}
        </label>
      )}
      <div className="selector__wrapper text-input__wrapper">
        <input
          type="text"
          className={selectorClassName}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          onClick={() => setIsOpen(true)}
          disabled={disabled}
          required={required}
          {...props}
        />
        <div className="selector__chevrons">
          <FontAwesomeIcon icon={faChevronUp} className="selector__chevron-up" />
          <FontAwesomeIcon icon={faChevronDown} className="selector__chevron-down" />
        </div>
        {isOpen && (
          <div className="selector__dropdown">
            {filteredData.map((item) => (
              <div
                key={item.value}
                className={`selector__item ${value && value.value === item.value ? 'selector__item--selected' : ''}`}
                onClick={() => handleSelect(item)}
              >
                {value && value.value === item.value && (
                  <FontAwesomeIcon icon={faCheck} className="selector__item-icon" />
                )}
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="selector__error text-input__error">{error}</p>
      )}
    </div>
  );
};

export default Selector;
