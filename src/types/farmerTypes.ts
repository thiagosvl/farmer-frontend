export type Farmer = {
    id: string | null;
    corporate_name: string;
    trading_name: string;
    business_id: string;
    cell_phone: string;
    city: string;
    state: string;
};

export type FarmFormFieldErrorsType = {
    corporate_name?: string;
    trading_name?: string;
    business_id?: string;
    city?: string;
    state?: string;
    cell_phone?: string;
};

export enum BusinessIdType {
    CPF = "CPF",
    CNPJ = "CNPJ"
}