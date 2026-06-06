type DividerProps = {
  className?: string;
};

function Divider({ className = "" }: DividerProps) {
  return <div className={`w-px shrink-0 bg-black/5 h-10 ${className}`} />;
}

export default Divider;