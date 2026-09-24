import { ButtonContainer } from './styles';

interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type: 'number' | 'operation' | 'action';
  value?: string;
}

const Button = (prop: ButtonProps) => {
  const isResult =
    prop.type === 'action' &&
    prop.value === 'result';

  return (
    <ButtonContainer
      onClick={prop.onClick}
      $isResult={isResult}
    >
      {prop.label}
    </ButtonContainer>
  );
};

export default Button;