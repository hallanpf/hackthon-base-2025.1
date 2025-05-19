import React, { useEffect, useState } from "react";

type Episode = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
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
    results: Episode[];
};

const Episodios: React.FC = () => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState<ApiResponse["info"] | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
            .then((res) => res.json())
            .then((data: ApiResponse) => {
                setEpisodes(data.results);
                setInfo(data.info);
                setLoading(false);
            });
    }, [page]);

    const handlePrev = () => {
        if (info?.prev) setPage((p) => p - 1);
    };

    const handleNext = () => {
        if (info?.next) setPage((p) => p + 1);
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Episódios</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <ul>
                        {episodes.map((ep) => (
                            <li key={ep.id} style={{ marginBottom: 16 }}>
                                <strong>{ep.episode} - {ep.name}</strong>
                                <div>Data de exibição: {ep.air_date}</div>
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: 24 }}>
                        <button onClick={handlePrev} disabled={!info?.prev}>
                            Anterior
                        </button>
                        <span style={{ margin: "0 12px" }}>
                            Página {page} de {info?.pages}
                        </span>
                        <button onClick={handleNext} disabled={!info?.next}>
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Episodios;