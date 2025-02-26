interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div className={`rounded-xl bg-dark_secondary px-4 py-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
