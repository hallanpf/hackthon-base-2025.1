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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [personagens, setPersonagens] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const handleSearch = (params: { nome: string; status: string; genero: string }) => {
        setLoading(true);
        setErro(null);
        setPersonagens([]);
        fetch(`https://rickandmortyapi.com/api/character?name=${params.nome}&status=${params.status}&gender=${params.genero}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Nenhum personagem encontrado.');
                }
                return response.json();
            })
            .then(data => {
                setPersonagens(data.results || []);
            })
            .catch(error => {
                setErro(error.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', padding: '40px'}}>
            <h2 style={{width: '480px', color:'#12B0C9', textAlign:'center', paddingBottom: '20px'}}>Busca de Personagem</h2>
            <BuscaPersonagemForm onSearch={handleSearch} />
            {loading && <p>Carregando...</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24 }}>
                {personagens.map(personagem => (
                    <div key={personagem.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 200 }}>
                        <img src={personagem.image} alt={personagem.name} style={{ width: '100%', borderRadius: 8 }} />
                        <h3>{personagem.name}</h3>
                        <p>Status: {personagem.status}</p>
                        <p>Gênero: {personagem.gender}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Personagem;