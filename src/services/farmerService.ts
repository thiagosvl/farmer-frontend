import axios from 'axios';
import { Farmer } from '../types/farmerTypes';

const BASE_URL = 'http://localhost:8000/api/farmers';

const getAllFarmers = async (): Promise<Farmer[]> => {
    try {
        const response = await axios.get<Farmer[]>(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching farmers:", error);
        throw error;
    }
};

const deleteFarmer = async (farmerId: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${farmerId}`);
    } catch (error) {
        console.error(`Error deleting farmer with ID ${farmerId}:`, error);
        throw error;
    }
};

const createFarmer = async (farmerData: Farmer): Promise<Farmer> => {
    try {
        const response = await axios.post<Farmer>(BASE_URL, farmerData);
        return response.data;
    } catch (error) {
        console.error("Error adding new farmer:", error);
        throw error;
    }
};

const updateFarmer = async (farmerData: Farmer): Promise<Farmer> => {
    if (!farmerData.id) {
        throw new Error("Farmer ID is required for updating.");
    }

    try {
        const response = await axios.put<Farmer>(`${BASE_URL}/${farmerData.id}`, farmerData);
        return response.data;
    } catch (error) {
        console.error("Error updating the farmer:", error);
        throw error;
    }
};

export { getAllFarmers, deleteFarmer, createFarmer, updateFarmer };
