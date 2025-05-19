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

const cardStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    marginBottom: 16,
    background: "#fff",
    maxWidth: 400,
};

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
            <h1 style={{ color: "#12B0C9", padding: 10}}>Lugares (Rick and Morty)</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                    justifyContent: "center",
                    alignItems: "start",
                    maxWidth: 850,
                    margin: "0 auto",
                }}
            >
                {locations.map((loc) => (
                    <div key={loc.id} style={{ ...cardStyle, background: "#f5f5f5",}} >
                        <h2 style={{ margin: "0 0 8px 0" }}>{loc.name}</h2>
                        <p><strong>Tipo:</strong> {loc.type}</p>
                        <p><strong>Dimensão:</strong> {loc.dimension}</p>
                        <p><strong>Residentes:</strong> {loc.residents.length}</p>
                    </div>
                ))}
            </div>
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