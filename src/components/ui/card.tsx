interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-dark_secondary rounded-xl px-4 py-6">{children}</div>
  );
};

export default Card;
