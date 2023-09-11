import { BusinessIdType, Farmer } from "../../types/farmerTypes";

export enum FarmerActionTypes {
    CREATE_FARMER = 'CREATE_FARMER',
    UPDATE_FARMER = 'UPDATE_FARMER',
    DELETE_FARMER = 'DELETE_FARMER',
    GET_ALL_FARMERS = 'GET_ALL_FARMERS',
    SET_FARMER = 'SET_FARMER',
    CHANGE_IN_EDIT_MODE = 'CHANGE_IN_EDIT_MODE',
    SET_DOCUMENT_TYPE = 'SET_DOCUMENT_TYPE',
    SET_FARMER_DIALOG = 'SET_FARMER_DIALOG',
    SET_LOADING_FARMERS = 'SET_LOADING_FARMERS'
}

export interface CreateFarmerAction {
    type: typeof FarmerActionTypes.CREATE_FARMER;
    payload: Farmer;
}

export interface UpdateFarmerAction {
    type: typeof FarmerActionTypes.UPDATE_FARMER;
    payload: Farmer;
}

export interface DeleteFarmerAction {
    type: typeof FarmerActionTypes.DELETE_FARMER;
    payload: string;
}

export interface GetAllFarmersAction {
    type: typeof FarmerActionTypes.GET_ALL_FARMERS;
    payload: Farmer[];
}

export interface SetFarmerAction {
    type: typeof FarmerActionTypes.SET_FARMER;
    payload: Farmer;
}

export interface ChangeInEditModeAction {
    type: typeof FarmerActionTypes.CHANGE_IN_EDIT_MODE;
    payload: boolean;
}

export interface SetDocumentTypeAction {
    type: typeof FarmerActionTypes.SET_DOCUMENT_TYPE;
    payload: BusinessIdType;
}

export interface SetFarmerDialogAction {
    type: typeof FarmerActionTypes.SET_FARMER_DIALOG;
    payload: boolean;
}

export interface SetLoadingFarmersAction {
    type: typeof FarmerActionTypes.SET_LOADING_FARMERS;
    payload: boolean;
}

export type FarmerActions = CreateFarmerAction | UpdateFarmerAction | DeleteFarmerAction | GetAllFarmersAction | SetFarmerAction | ChangeInEditModeAction | SetDocumentTypeAction | SetFarmerDialogAction | SetLoadingFarmersAction;
