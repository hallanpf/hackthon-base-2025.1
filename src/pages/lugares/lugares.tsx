import React, { useEffect, useState } from "react";

type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
};

type ApiResponse = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Location[];
};

const API_URL = "https://rickandmortyapi.com/api/location";

const Lugares: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [info, setInfo] = useState<ApiResponse["info"] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_URL}?page=${page}`);
                if (!res.ok) throw new Error("Erro ao buscar dados");
                const data: ApiResponse = await res.json();
                setLocations(data.results);
                setInfo(data.info);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, [page]);

    const handlePrev = () => {
        if (info?.prev) setPage((p) => Math.max(1, p - 1));
    };

    const handleNext = () => {
        if (info?.next) setPage((p) => p + 1);
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Lugares (Rick and Morty)</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {locations.map((loc) => (
                    <li key={loc.id} style={{ marginBottom: 16 }}>
                        <strong>{loc.name}</strong> <br />
                        Tipo: {loc.type} <br />
                        Dimensão: {loc.dimension} <br />
                        Residentes: {loc.residents.length}
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: 16 }}>
                <button onClick={handlePrev} disabled={!info?.prev || loading}>
                    Anterior
                </button>
                <span style={{ margin: "0 12px" }}>
                    Página {page} de {info?.pages || 1}
                </span>
                <button onClick={handleNext} disabled={!info?.next || loading}>
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default Lugares;