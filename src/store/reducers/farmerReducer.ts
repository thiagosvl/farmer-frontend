import { BusinessIdType, Farmer } from '@/types/farmerTypes';
import { FarmerActionTypes } from "../types/farmerActionTypes"
import { initialFarmerForm } from "../../utils/farmerUtils"
import { FarmerActions } from '../types/farmerActionTypes';

type FarmerState = {
    farmers: Farmer[];
    farmer: Farmer;
    inEditMode: boolean;
    documentType: BusinessIdType;
    farmerDialog: boolean;
    loadingFarmers: boolean;
};

const initialState: FarmerState = {
    farmers: [],
    farmer: initialFarmerForm,
    inEditMode: false,
    documentType: BusinessIdType.CPF,
    farmerDialog: false,
    loadingFarmers: false
};

const farmerReducer = (state = initialState, action: FarmerActions): FarmerState => {
    switch (action.type) {
        case FarmerActionTypes.CREATE_FARMER:
            return {
                ...state,
                farmers: [...state.farmers, action.payload]
            };
        case FarmerActionTypes.UPDATE_FARMER:
            return {
                ...state,
                farmers: state.farmers.map(farmer =>
                    farmer.id === action.payload.id ? action.payload : farmer
                )
            };
        case FarmerActionTypes.DELETE_FARMER:
            return {
                ...state,
                farmers: state.farmers.filter(farmer => farmer.id !== action.payload)
            };
        case FarmerActionTypes.GET_ALL_FARMERS:
            return {
                ...state,
                farmers: action.payload
            };
        case FarmerActionTypes.SET_FARMER:
            return {
                ...state,
                farmer: action.payload
            };
        case FarmerActionTypes.CHANGE_IN_EDIT_MODE:
            return {
                ...state,
                inEditMode: action.payload
            };
        case FarmerActionTypes.SET_DOCUMENT_TYPE:
            return {
                ...state,
                documentType: action.payload
            };
        case FarmerActionTypes.SET_FARMER_DIALOG:
            return {
                ...state,
                farmerDialog: action.payload
            };
        case FarmerActionTypes.SET_LOADING_FARMERS:
            return {
                ...state,
                loadingFarmers: action.payload
            };
        default:
            return state;
    }
};

export default farmerReducer;
