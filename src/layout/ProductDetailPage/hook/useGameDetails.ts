import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../../../config/apiClient';
import { GameDTO } from '../../../utils/CartUtils';

export interface CommentDTO {
    sysIdComment?: number;
    context: string;
    commentDate: string;
    usersDTO?: UsersDTO;
    gameId: number;
    star: number;
    gameDTO?: GameDTO;
}

export interface UsersDTO {
    sysIdUser?: number;
    username?: string;
    email?: string;
    hoVaTen?: string;
    balance?: string;
    joinTime?: string;
    avatar?: string;
    totalSpent?: number;
}

const useGameDetails = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const game = params.get('game');
    const [gameDetails, setGameDetails] = useState<GameDTO | null>(null);
    const [recommendations, setRecommendations] = useState<GameDTO[]>([]);
    const [comments, setComments] = useState<CommentDTO[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await apiClient.get(`/api/games/p/${game}`);
                setGameDetails(response.data.data);
            } catch (err: any) {
                console.error('Error fetching game details:', err);
                setError(err);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const response = await apiClient.get(`/api/games/p/${game}/recommendations`);
                setRecommendations(response.data.data);
            } catch (err: any) {
                console.error('Error fetching recommendations:', err);
                setError(err);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await apiClient.get(`/api/comments/p/game/${game}/latest-comments`);
                setComments(response.data);
            } catch (err: any) {
                console.error('Error fetching comments:', err);
                setError(err);
            }
        };

        if (game) {
            fetchGameDetails();
            fetchRecommendations();
            fetchComments();
        }
    }, [game]);

    return { gameDetails, recommendations, comments, error, setComments };
};

export default useGameDetails;