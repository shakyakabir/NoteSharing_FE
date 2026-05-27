interface InputProps {
  type: string;
  placeHolder?: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  className?: string;
  labelName?: string;
}

const Input = ({
  type,
  placeHolder,
  ref,
  onChange,
  onKeyDown,
  name,
  className,
  value,
  labelName,
}: InputProps) => {
  return (
    <>
      {labelName && <label htmlFor="">{labelName}</label>}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
        className={`p-2 m-1 rounded-md border-gray-300 border ${className || ""}`}
      />
    </>
  );
};
export default Input;
