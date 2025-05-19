import React, { useState } from 'react';

interface SearchFormProps {
    onSearch: (params: { nome: string; status: string; genero: string }) => void;
}

const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'alive', label: 'Vivo' },
    { value: 'dead', label: 'Morto' },
    { value: 'unknown', label: 'Desconhecido' },
];

const generoOptions = [
    { value: '', label: 'Todos' },
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' },
    { value: 'genderless', label: 'Sem Gênero' },
    { value: 'unknown', label: 'Desconhecido' },
];

const BuscaPersonagemForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState('');
    const [genero, setGenero] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ nome, status, genero });
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <div>
                <label>
                    Buscar personagem:
                    <input
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder="Nome do personagem"
                    />
                </label>
            </div>
            <div>
                <label>
                    Status:
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Gênero:
                    <select value={genero} onChange={e => setGenero(e.target.value)}>
                        {generoOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>
            </div>
            <button type="submit">Buscar</button>
        </form>
    );
};

const Personagem: React.FC = () => {
    const handleSearch = (params: { nome: string; status: string; genero: string }) => {
        // Aqui você pode implementar a lógica de busca
        console.log('Buscar personagem com:', params);
    };

    return (
        <div>
            <h1>Busca de Personagem</h1>
            <BuscaPersonagemForm onSearch={handleSearch} />
        </div>
    );
};

export default Personagem;