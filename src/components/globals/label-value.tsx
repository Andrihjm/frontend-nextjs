interface LabelValueProps {
  label: string;
  value: string;
  className?: string;
}

const LabelValue = ({ label, value, className }: LabelValueProps) => {
  return (
    <div className={`flex w-full items-center gap-2 text-sm ${className}`}>
      <p className="text-secondary">{label}:</p>
      <p className="font-medium text-white">{value}</p>
    </div>
  );
};

export default LabelValue;
