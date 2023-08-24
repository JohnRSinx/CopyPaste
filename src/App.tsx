import './styles/App.css'
import React, { useRef, useState } from 'react';

interface CopyInputProps {
  className: string;
  inputValue: string;
  onInputChange: (value: string, className: string) => void;
}

const CopyInput: React.FC<CopyInputProps> = ({ className, inputValue, onInputChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value)
        .then(() => {
          console.log('Texto copiado com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao copiar o texto:', error);
        });
    }
  };

  return (
    <div className='input-container'>
     
      <input
        ref={inputRef}
        className={className}
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value, className)}
      />
      <button className='buttonCopy' onClick={handleCopyClick}>Copy</button>
    </div>
  );
};

function App() {
  const [inputValues, setInputValues] = useState({
    inputcpf: "",
    data: "",
    nome: "",
    outros: "",
    another: ""  // Novo input fictício
  });

  const handleInputChange = (value: string, className: string) => {
    setInputValues({
      ...inputValues,
      [className]: value
    });
  };

  const handleGlobalReset = () => {
    setInputValues({
      inputcpf: "",
      data: "",
      nome: "",
      outros: "",
      another: ""  // Novo input fictício
    });
  };

  return (
    <main className='main'>
      <h1 className='title'>COPY</h1>
      <CopyInput className='inputcpf' inputValue={inputValues.inputcpf} onInputChange={handleInputChange} />
      <CopyInput className='data' inputValue={inputValues.data} onInputChange={handleInputChange} />
      <CopyInput className='nome' inputValue={inputValues.nome} onInputChange={handleInputChange}/>
      <CopyInput className='outros' inputValue={inputValues.outros} onInputChange={handleInputChange} />
      <CopyInput className='another' inputValue={inputValues.another} onInputChange={handleInputChange} />
      <button className='buttonGlobalReset' onClick={handleGlobalReset}>Reset All</button>
      <span>clique no botão "Reset All" para resetar os valores digitados</span>
    </main>
  );
}

export default App;
