export type StatisticForNew = {
    thisMonth: number;
    increasedPercent: number;
}

export type TransactionSum = {
    totalIncome: number;
    todayIncome: number;
}

export type TransactionSummary = {
    date: string;
    orderCount: number;
    userCount: number;
}