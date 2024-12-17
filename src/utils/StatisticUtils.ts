import apiClient from "../config/apiClient";
import { StatisticForNew, TransactionSum, TransactionSummary } from "../model/Statistic";
import { GameDTO } from "./CartUtils";

export async function fetchNewOrderStatistics(): Promise<StatisticForNew[]> {
    try {
        const response = await apiClient.get('/api/transactions/statistics/new-orders');
        return response.data.data as StatisticForNew[];
    } catch (error) {
        console.error('Error fetching new order statistics:', error);
        throw error;
    }
}

export async function fetchNewUserStatistics(): Promise<StatisticForNew[]> {
    try {
        const response = await apiClient.get('/api/users/statistics/new-users');
        return response.data.data as StatisticForNew[];
    } catch (error) {
        console.error('Error fetching new user statistics:', error);
        throw error;
    }
}

export async function fetchTransactionSumStatistic(): Promise<TransactionSum> {
    try {
        const response = await apiClient.get('/api/transactions/statistics/sums');
        return response.data.data as TransactionSum;
    } catch (error) {
        console.error('Error fetching transaction sum statistic', error);
        throw error;
    }
}

export async function fetchTransactionSummaryStatistic(): Promise<TransactionSummary[]> {
    try {
        const response = await apiClient.get('/api/transactions/statistics/summary');
        return response.data.data as TransactionSummary[];
    } catch (error) {
        console.error('Error fetching transaction sum statistic', error);
        throw error;
    }
}

export async function fetchSortedGames(field: string): Promise<GameDTO[]> {
    try {
        const response = await apiClient.get('/api/games/p/sort', {
            params: {
                field: field,
                page: 0,
                size: 5,
            }
        });
        return response.data.data as GameDTO[];
    } catch (error) {
        console.error('Error fetching sorted games:', error);
        throw error;
    }
}