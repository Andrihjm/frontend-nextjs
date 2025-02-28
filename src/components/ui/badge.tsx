interface BadgeProps {
  className?: string;
  children?: React.ReactNode;
}

const Badge = ({ className, children }: BadgeProps) => {
  return (
    <div className={`rounded-full px-2 py-1 text-white ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
