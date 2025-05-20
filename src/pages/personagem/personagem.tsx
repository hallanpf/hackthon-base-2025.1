import React, { useState } from 'react';
import logo from './../../assets/Rick-and-Morty-Shop-logo.png';

interface SearchFormProps {
    onSearch: (params: { nome: string; status: string; genero: string; }) => void;
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
            <div style={{color: "#12B0C9", width: '500px', marginBottom: '10px'}}>
                <label>
                    <p>Buscar personagem:</p>
                    <input
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder="Nome do personagem"
                        style={{color: "#12B0C9", width: '500px', marginTop:'5px', padding: '10px 20px' }}
                    />
                </label>
            </div>
            <div style={{color: "#12B0C9", width: '500px', marginBottom: '10px'}}>
                <label>
                    <p>Status:</p>
                    <select value={status} onChange={e => setStatus(e.target.value)} style={{color: "#12B0C9", width: '500px', marginTop:'5px', padding: '10px 20px' }}>
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div style={{color: "#12B0C9", width: '500px', marginBottom: '10px'}}>
                <label>
                    <p>Gênero:</p>
                    <select value={genero} onChange={e => setGenero(e.target.value)} style={{color: "#12B0C9", width: '500px', marginTop:'5px', padding: '10px 20px' }}>
                        {generoOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>
            </div>
            <button type="submit" style={{marginLeft: '160px', padding: '20px 60px', backgroundColor: '#12B0C9', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Buscar</button>
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
        <div style={{display: 'flex', flexDirection:'column', padding: '40px'}}>
            <h2 style={{color:'#12B0C9', textAlign:'center', paddingBottom: '20px', marginLeft: '100px'}}>Busca de Personagem</h2>
            <BuscaPersonagemForm onSearch={handleSearch} />
            {loading && <p>Carregando...</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <div style={{marginTop: '20px', textAlign: 'left'}}>Resultados</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24, padding: 20 }}>
                {personagens.map(personagem => (
                    <div key={personagem.id} style={{ border: '1px solid #ccc', backgroundColor:'darkgray', borderRadius: 8, padding: 16, width: 400 }}>
                        <img src={personagem.image} alt={personagem.name} style={{ width: '150px', borderRadius: 8 }} />
                        <div style={{ marginLeft: 170, marginTop: -150, marginBottom: 30, textAlign: 'left' }}>
                            <h3>{personagem.name}</h3>
                            <p style={{marginTop: 10}}>Status</p>
                            <p>{personagem.status}</p>
                            <p style={{marginTop: 10}}>Gênero</p>
                            <p>{personagem.gender}</p>
                        </div>
                    </div>
                ))}
            </div>
            <img src={logo} alt="Rick and Morty Logo" style={{marginLeft:'100px', paddingBottom: '10px' }} />
        </div>
    );
};

export default Personagem;