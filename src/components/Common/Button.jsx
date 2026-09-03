import './Button.css';

function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;