import { Recipient } from "./recipient.interface";
import { Sender } from "./sender.interface";

export interface Transaction {
    id: number;
    date: Date
    sender: Sender,
    recipient: Recipient,
    Amount: number,
    CurrencyCd: string;
    Comments: string;
    status: string;
}