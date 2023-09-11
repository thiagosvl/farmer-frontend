import { FarmerActionTypes } from "../types/farmerActionTypes"
import { addAlert } from './alertActions';
import { BusinessIdType, Farmer } from '../../types/farmerTypes';
import { getAllFarmers, deleteFarmer, createFarmer, updateFarmer } from '../../services/farmerService';
import { generateAlertUniqueId } from "../../utils/alertUtils"
import { batch } from "react-redux";

export const setFarmerAction = (farmer: Farmer) => ({
    type: FarmerActionTypes.SET_FARMER,
    payload: farmer
});

export const changeInEditModeAction = (payload: boolean) => ({
    type: FarmerActionTypes.CHANGE_IN_EDIT_MODE,
    payload
});

export const setDocumentTypeAction = (documentType: BusinessIdType) => ({
    type: FarmerActionTypes.SET_DOCUMENT_TYPE,
    payload: documentType
});

export const createFarmerAction = (farmer: Farmer) => async (dispatch: any) => {
    try {
        const response = await createFarmer(farmer);
        dispatch({
            type: FarmerActionTypes.CREATE_FARMER,
            payload: response
        });
        dispatch({
            type: FarmerActionTypes.SET_FARMER,
            payload: response
        });
        dispatch({
            type: FarmerActionTypes.SET_FARMER_DIALOG,
            payload: false
        });
        dispatch(addAlert({
            type: 'success',
            message: 'Successfully created',
            id: generateAlertUniqueId()
        }));
    } catch (error) {
        dispatch(addAlert({
            type: 'error',
            message: error.response.data.message,
            id: generateAlertUniqueId()
        }));
        console.error("Error: ", error);
    }
};

export const updateFarmerAction = (farmer: Farmer) => async (dispatch: any) => {
    try {
        const response = await updateFarmer(farmer);
        batch(() => {
            dispatch({
                type: FarmerActionTypes.UPDATE_FARMER,
                payload: response
            });
            dispatch({
                type: FarmerActionTypes.SET_FARMER,
                payload: response
            });
            dispatch({
                type: FarmerActionTypes.SET_FARMER_DIALOG,
                payload: false
            });
            dispatch(addAlert({
                type: 'success',
                message: 'Updated successfully',
                id: generateAlertUniqueId()
            }));
        })
    } catch (error) {
        dispatch(addAlert({
            type: 'error',
            message: error.response.data.message,
            id: generateAlertUniqueId()
        }));
        console.error("Error: ", error);
    }
};

export const getAllFarmersAction = () => async (dispatch: any) => {
    dispatch({
        type: FarmerActionTypes.SET_LOADING_FARMERS,
        payload: true
    });
    try {
        const response = await getAllFarmers();
        dispatch({
            type: FarmerActionTypes.GET_ALL_FARMERS,
            payload: response
        });
    } catch (error) {
        console.error("Error: ", error);
    } finally {
        dispatch({
            type: FarmerActionTypes.SET_LOADING_FARMERS,
            payload: false
        });
    }
};

export const deleteFarmerAction = (farmerId: string) => async (dispatch: any) => {
    try {
        await deleteFarmer(farmerId);
        dispatch({
            type: FarmerActionTypes.DELETE_FARMER,
            payload: farmerId
        }); dispatch(addAlert({
            type: 'success',
            message: 'Successfully removed',
            id: generateAlertUniqueId()
        }));
    } catch (error) {
        dispatch(addAlert({
            type: 'error',
            message: error.response.data.message,
            id: generateAlertUniqueId()
        }));
        console.error("Error: ", error);
    }
}

export const setFarmerDialogAction = (open: boolean) => ({
    type: FarmerActionTypes.SET_FARMER_DIALOG,
    payload: open
});