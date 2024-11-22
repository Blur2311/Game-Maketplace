import { GameDTO } from "../utils/CartUtils";

export type TransactionHistoryDTO = {
    sysIdPayment: number;
    paymentTime: string;
    description: string;
    amount: number;
    status: boolean;
    username: string;
};

export type OrdersDTO = {
    sysIdOrder: number;
    orderCode: string;
    orderDate: string;
    paymentStatus: boolean;
    totalPayment: number;
    sysIdProduct: number;
    sysIdUser: number;
    slug: string;
    quantity: number;
    price: number;
    gameName: string;
    gameDTO?: GameDTO;
};

export type OrderDetailDTO = {
    transactionHistoryDTO: TransactionHistoryDTO;
    ordersDTOS: OrdersDTO[];
};