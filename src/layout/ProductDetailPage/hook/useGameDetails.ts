import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../../../config/apiClient';
import { GameDTO } from '../../../utils/CartUtils';

const useGameDetails = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const game = params.get('game');
    const [gameDetails, setGameDetails] = useState<GameDTO | null>(null);
    const [recommendations, setRecommendations] = useState<GameDTO[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await apiClient.get(`/api/games/p/${game}`);
                setGameDetails(response.data.data);
                console.log('Game details:', response.data.data);
            } catch (err: any) {
                console.error('Error fetching game details:', err);
                setError(err);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const response = await apiClient.get(`/api/games/p/${game}/recommendations`);
                setRecommendations(response.data.data);
                console.log('Recommendations:', response.data.data);
            } catch (err: any) {
                console.error('Error fetching recommendations:', err);
                setError(err);
            }
        };

        if (game) {
            fetchGameDetails();
            fetchRecommendations();
        }
    }, [game]);

    return { gameDetails, recommendations, error };
};

export default useGameDetails;