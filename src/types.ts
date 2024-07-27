export interface Categories {
    id: string;
    name: string;
    type: string;
}

export type ApiCategory = Omit<Categories, 'id'>;

export interface CategoryId extends Categories {
    id: string;
}

export interface ApiCategories {
    [id: string]: ApiCategory;
}

export interface CategoryMutation {
    name: string;
    type: string;
}



export interface Transaction {
    type: string,
    category: string,
    amount: number,
    createdAt: string,
}

export type ApiTransaction = Omit<Transaction, 'id'>;

export interface TransactionId extends Transaction {
    id: string;
}


