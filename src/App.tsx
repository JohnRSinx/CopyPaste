import './styles/App.css'
import React, { useRef, useState } from 'react';

interface CopyInputProps {
  title: string;
  className: string;
  inputValue: string;
  onInputChange: (value: string, className: string) => void;
}

const CopyInput: React.FC<CopyInputProps> = ({ className, inputValue, onInputChange ,title }) => {
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
     <p>{title}</p>
      <input
        ref={inputRef}
        className={className}
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value, className)}
        placeholder={title}
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
      <CopyInput className='inputcpf' inputValue={inputValues.inputcpf} onInputChange={handleInputChange} title={'CPF'} />
      <CopyInput className='data' inputValue={inputValues.data} onInputChange={handleInputChange} title={'DATA'}/>
      <CopyInput className='nome' inputValue={inputValues.nome} onInputChange={handleInputChange} title={'CEP'}/>
      <CopyInput className='outros' inputValue={inputValues.outros} onInputChange={handleInputChange} title={'CELULAR'}/>
      <CopyInput className='another' inputValue={inputValues.another} onInputChange={handleInputChange} title={'E-MAIL'}/>
      <button className='buttonGlobalReset' onClick={handleGlobalReset}>Reset All</button>
      <span>clique no botão "Reset All" para resetar os valores digitados</span>
      <footer>
        <p className='footer'>&copy; {new Date().getFullYear()} PH. Todos os direitos reservados.</p>
      </footer>
     
    </main>
  );
}

export default App;
