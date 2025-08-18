interface MaterialIconProps {
  name: string;
  className?: string;
  fill?: boolean;
  size?: number;
}

export const MaterialIcon = ({ name, className = "", fill = false, size = 24 }: MaterialIconProps) => {
  return (
    <span 
      className={`material-symbols-outlined ${fill ? 'material-symbols-filled' : ''} ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      {name}
    </span>
  );
};