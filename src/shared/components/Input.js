import React from 'react';
import '../styles/global.scss';

export default function Input({
    label,
    id,
    name,
    type,
    htmlFor,
    onChange,
    value,
    placeholder = '',
    autoComplete = false,
}) {
    return (
        <div className="fullWidth">
            <label htmlFor={htmlFor} className="formLabel">
                {label}
            </label>
            <div className="centerInput">
                <input
                    id={id}
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    autoComplete={autoComplete ? 'email' : ''}
                    className="formInput"
                    onChange={onChange}
                    value={value}
                />
            </div>
        </div>
    );
}
