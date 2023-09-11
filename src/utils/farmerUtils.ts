
import { cpf as cpfValidate } from 'cpf-cnpj-validator';
import { cnpj as cnpjValidate } from 'cpf-cnpj-validator';
import { BusinessIdType } from '@/types/farmerTypes';

export const initialFarmerForm = {
    id: "",
    corporate_name: '',
    trading_name: '',
    business_id: '',
    cell_phone: '',
    city: '',
    state: ''
};

export const farmFormInitialErrors = {
    corporate_name: [],
    trading_name: [],
    business_id: [],
    cell_phone: [],
    city: [],
    state: []
};

export const farmFormFieldsErrors = {
    corporate_name: 'Campo obrigatório',
    trading_name: 'Campo obrigatório',
    business_id_required: 'Campo obrigatório',
    business_id_invalid: 'CPF/CNPJ inválido',
    city: 'Campo obrigatório',
    state: 'Campo obrigatório',
    cell_phone: 'Número de celular inválido',
};

export const isValidBusinessId = (businessId: string, documentType: string): boolean => {
    if (documentType === BusinessIdType.CPF) {
        return cpfValidate.isValid(businessId);
    } else if (documentType === BusinessIdType.CNPJ) {
        return cnpjValidate.isValid(businessId);
    }
    return false;
}

export function cleanNonNumericChars(inputStr: string) {
    return inputStr.replace(/\D+/g, '');
}

export const checkBusinessIdType = (businessId: string): BusinessIdType => {
    const businessIdClean = cleanNonNumericChars(businessId);
    if (businessIdClean.length === 11) {
        return BusinessIdType.CPF;
    }
    return BusinessIdType.CNPJ;
}

export const isValidCellPhone = (cell: string): boolean => {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(cell);
};