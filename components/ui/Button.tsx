
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-none font-sans tracking-widest uppercase text-xs transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-teal text-obsidian hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-obsidian",
    outline: "border border-teal/30 text-teal hover:border-teal hover:bg-teal/10",
    text: "text-gray-500 dark:text-chrome hover:text-teal"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gray-900 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0" />
      )}
    </button>
  );
};
