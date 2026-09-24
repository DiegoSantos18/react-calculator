import { InputContainer } from './styles';

interface InputProps {
  value: string;
  expression: string;
}

const Input = ({ value, expression }: InputProps) => {
  return (
    <InputContainer>
      {expression && <label>{expression}</label>}

      <input disabled value={value} />
    </InputContainer>
  );
};

export default Input;