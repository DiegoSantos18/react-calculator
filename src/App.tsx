import { useState } from 'react';
import {
  Container,
  Content,
  Row,
  Column,
  Header,
  Footer,
  LoadingOverlay
} from './styles';

import Input from './components/Input';
import Button from './components/Button';
import logo from './assets/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

type ButtonType = 'number' | 'operation' | 'action';

interface CalculatorButton {
  label: string;
  type: ButtonType;
  value?: string;
}

const buttons: CalculatorButton[] = [
  // Primeira Linha
  { label: '%', type: 'action', value: 'percentage' },
  { label: 'CE', type: 'action', value: 'clear-entry' },
  { label: 'C', type: 'action', value: 'clear' },
  { label: '⌫', type: 'action', value: 'backspace' },

  // Segunda Linha
  { label: 'x⁻¹', type: 'action', value: 'inverse' },
  { label: 'x²', type: 'action', value: 'square' },
  { label: '²√x', type: 'action', value: 'square-root' },
  { label: '÷', type: 'operation', value: '÷' },

  // Terceira Linha
  { label: '7', type: 'number', value: '7' },
  { label: '8', type: 'number', value: '8' },
  { label: '9', type: 'number', value: '9' },
  { label: '×', type: 'operation', value: 'x' },

  // Quarta Linha
  { label: '4', type: 'number', value: '4' },
  { label: '5', type: 'number', value: '5' },
  { label: '6', type: 'number', value: '6' },
  { label: '-', type: 'operation', value: '-' },

  // Quinta Linha
  { label: '1', type: 'number', value: '1' },
  { label: '2', type: 'number', value: '2' },
  { label: '3', type: 'number', value: '3' },
  { label: '+', type: 'operation', value: '+' },

  // Sexta Linha
  { label: '±', type: 'action', value: 'plus-minus' },
  { label: '0', type: 'number', value: '0' },
  { label: ',', type: 'action', value: 'decimal' },
  { label: '=', type: 'action', value: 'result' },
];

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [waitingForNumber, setWaitingForNumber] = useState(false);
  const [expression, setExpression] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('');
    setOperation('');
    setWaitingForNumber(false);
    setExpression('');
  };

  const handleClearEntry = () => {
    setCurrentNumber('0');
  };

  const handleAddNumber = (number: string) => {
    if (waitingForNumber) {
      setCurrentNumber(number);
      setWaitingForNumber(false);
      return;
    }

    setCurrentNumber((prev) =>
      prev === '0' || prev === 'Erro'
        ? number
        : `${prev}${number}`
    );
  };

  const handleDecimal = () => {
    if (waitingForNumber) {
      setCurrentNumber('0,');
      setWaitingForNumber(false);
      return;
    }

    if (!currentNumber.includes(',')) {
      setCurrentNumber((prev) => `${prev},`);
    }
  };

  const handleBackspace = () => {
    if (
      waitingForNumber ||
      currentNumber === 'Erro'
    ) {
      return;
    }

    setCurrentNumber((prev) => {
      if (
        prev.length <= 1 ||
        (prev.length === 2 && prev.startsWith('-'))
      ) {
        return '0';
      }

      return prev.slice(0, -1);
    });
  };

  const toNumber = (value: string) => {
    return Number(value.replace(',', '.'));
  };

  const toDisplayNumber = (value: number) => {
    if (!Number.isFinite(value)) {
      return 'Erro';
    }

    return String(value).replace('.', ',');
  };

  const calculate = (
    first: number,
    current: number,
    op: string
  ): number | null => {
    switch (op) {
      case '+':
        return first + current;

      case '-':
        return first - current;

      case 'x':
        return first * current;

      case '÷':
        if (current === 0) {
          return null;
        }

        return first / current;

      default:
        return null;
    }
  };

  const handleOperation = (op: string) => {
    if (
      operation &&
      firstNumber !== '' &&
      !waitingForNumber
    ) {
      const first = toNumber(firstNumber);
      const current = toNumber(currentNumber);

      const result = calculate(
        first,
        current,
        operation
      );

      if (result === null) {
        setCurrentNumber('Erro');
        setFirstNumber('');
        setOperation('');
        setWaitingForNumber(true);
        setExpression(`${firstNumber} ${operation} ${currentNumber} =`);

        return;
      }

      const resultString = toDisplayNumber(result);

      setCurrentNumber(resultString);
      setFirstNumber(resultString);
      setExpression(`${resultString} ${op}`);
      setOperation(op);
      setWaitingForNumber(true);

      return;
    }

    setFirstNumber(currentNumber);
    setOperation(op);
    setWaitingForNumber(true);
    setExpression(`${currentNumber} ${op}`);
  };

  const calculateResult = () => {
    if (!operation || firstNumber === '') {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const first = toNumber(firstNumber);
      const current = toNumber(currentNumber);

      const result = calculate(
        first,
        current,
        operation
      );

      if (result === null) {
        setCurrentNumber('Erro');
        setFirstNumber('');
        setOperation('');
        setWaitingForNumber(true);
        setExpression(`${firstNumber} ${operation} ${currentNumber} =`);
        setIsLoading(false);

        return;
      }

      const resultString = toDisplayNumber(result);

      setExpression(`${firstNumber} ${operation} ${currentNumber} =`);
      setCurrentNumber(resultString);
      setFirstNumber('');
      setOperation('');
      setWaitingForNumber(true);
      setIsLoading(false);
    }, 800);
  };

  const handlePercentage = () => {
    const current = toNumber(currentNumber);

    if (!Number.isFinite(current)) {
      return;
    }

    if (
      operation &&
      firstNumber !== ''
    ) {
      const first = toNumber(firstNumber);
      const percentage =
        (first * current) / 100;

      setCurrentNumber(toDisplayNumber(percentage));
      setWaitingForNumber(false);

      return;
    }

    setCurrentNumber(toDisplayNumber(current / 100));
  };

  const handlePlusMinus = () => {
    if (
      currentNumber === '0' ||
      currentNumber === 'Erro'
    ) {
      return;
    }

    setCurrentNumber((prev) =>
      prev.startsWith('-')
        ? prev.substring(1)
        : `-${prev}`
    );
  };

  const handleInverse = () => {
    const current = toNumber(currentNumber);

    if (current === 0) {
      setCurrentNumber('Erro');
      setWaitingForNumber(true);
      return;
    }

    setExpression(`1/(${currentNumber})`);
    setCurrentNumber(toDisplayNumber(1 / current));
    setWaitingForNumber(true);
  };

  const handleSquare = () => {
    const current = toNumber(currentNumber);

    if (!Number.isFinite(current)) {
      return;
    }

    setExpression(`sqr(${currentNumber})`);
    setCurrentNumber(toDisplayNumber(current ** 2));
    setWaitingForNumber(true);
  };

  const handleSquareRoot = () => {
    const current = toNumber(currentNumber);

    if (current < 0) {
      setCurrentNumber('Erro');
      setWaitingForNumber(true);
      return;
    }

    setExpression(`√(${currentNumber})`);
    setCurrentNumber(toDisplayNumber(Math.sqrt(current)));
    setWaitingForNumber(true);
  };

  const handleButtonClick = (
    button: CalculatorButton
  ) => {
    if (isLoading) return;

    const { type, value } = button;

    if (type === 'number') {
      handleAddNumber(value!);
      return;
    }

    if (type === 'operation') {
      handleOperation(value!);
      return;
    }

    switch (value) {
      case 'percentage':
        handlePercentage();
        break;

      case 'clear-entry':
        handleClearEntry();
        break;

      case 'clear':
        handleOnClear();
        break;

      case 'backspace':
        handleBackspace();
        break;

      case 'inverse':
        handleInverse();
        break;

      case 'square':
        handleSquare();
        break;

      case 'square-root':
        handleSquareRoot();
        break;

      case 'plus-minus':
        handlePlusMinus();
        break;

      case 'decimal':
        handleDecimal();
        break;

      case 'result':
        calculateResult();
        break;

      default:
        console.error(
          `Botão desconhecido: ${value}`
        );
    }
  };

  const anoAtual = new Date().getFullYear();

  return (
    <Container>
      <Column>
        <Header>
          <img
            src={logo}
            alt="Logo da calculadora"
          />

          <h1>Calculadora REACT</h1>
        </Header>

        <Content>
          {isLoading && (
            <LoadingOverlay>
              <img src={logo} alt="Carregando..." />
              <span>Calculando...</span>
            </LoadingOverlay>
          )}

          <Input
            value={currentNumber}
            expression={expression}
          />

          {buttons.map((_button, index) => {
            if (index % 4 !== 0) {
              return null;
            }

            return (
              <Row key={index}>
                {buttons
                  .slice(index, index + 4)
                  .map((button) => (
                    <Button
                      key={button.label}
                      label={button.label}
                      type={button.type}
                      value={button.value}
                      onClick={() =>
                        handleButtonClick(button)
                      }
                    />
                  ))}
              </Row>
            );
          })}
        </Content>

        <Footer>
          <p>
            <span>&copy; {anoAtual} Diego Dos Santos -
              <FontAwesomeIcon icon={faGithub} size="lg" />
              <a href="https://github.com/DiegoSantos18/react-calculadora" target="_blank" rel="noreferrer">GitHub</a>
            </span>
          </p>
        </Footer>
      </Column>
    </Container>
  );
};

export default App;