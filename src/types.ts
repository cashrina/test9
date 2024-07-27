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


