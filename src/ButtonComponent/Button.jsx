import React from 'react';

const Button = ({ text, icon, onClick }) => {
    return (
        <button 
            className="flex items-center justify-between bg-red-500 text-white py-2 px-4 rounded" 
            id='btns' 
            onClick={onClick}  // Ensure the onClick prop is applied here
        >
            <span>{text}</span>
            {icon && <span className="text-xl">{icon}</span>}
        </button>
    );
};

export default Button;
