import React from 'react';
import './Input.css';

function Input({ placeholder, type, id, name, value, onChange }) {
  return (
    <div className="main-input">
      <input className='primary-input-large'
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;