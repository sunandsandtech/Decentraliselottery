import React from 'react';
import './CustomButtonStyles.css';

const CustomButton = ({title, className, onPress, disabled, type}) => {
  return (
    <button 
        onClick={onPress} 
        className={`CustomButton ${className} ${disabled && 'disabled' || null }`} 
        disabled={disabled}
        type={type}
    >
        {title}
    </button>
  )
}

export default CustomButton