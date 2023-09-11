"use client";

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import { Farmer } from '../../types/farmerTypes';

import FarmerList from './FarmerList';
import FarmerDialog from './FarmerDialog';
import FarmerDetailDialog from './FarmerDetailDialog';
import FarmerDeleteConfirmationDialog from './FarmerDeleteConfirmationDialog';

import { setFarmerAction, setFarmerDialogAction, changeInEditModeAction, deleteFarmerAction, getAllFarmersAction } from '../../store/actions/farmerActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import SnackbarAlert from '../SnackBarAlert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Farmers: React.FC = () => {
    const dispatch = useDispatch();
    const farmer = useSelector((state: RootState) => state.farmer.farmer);
    const farmers = useSelector((state: RootState) => state.farmer.farmers);
    const loadingFarmers = useSelector((state: RootState) => state.farmer.loadingFarmers);
    const farmerDialog = useSelector((state: RootState) => state.farmer.farmerDialog);
    const [confirmDeleteFarmerDialogOpen, setConfirmDeleteFarmerDialogOpen] = useState(false);
    const [farmerDetailDialogOpen, setFarmerDetailDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllFarmersAction());
    }, [dispatch]);

    const handleOpenDialogCreateFarmer = () => {
        dispatch(changeInEditModeAction(false));
        dispatch(setFarmerDialogAction(true));
    };

    const handleOpenDialogEditFarmer = (farmer: Farmer) => {
        dispatch(changeInEditModeAction(true));
        dispatch(setFarmerAction(farmer));
        dispatch(setFarmerDialogAction(true));
    };

    const handleCloseFarmerDialog = () => {
        dispatch(changeInEditModeAction(false));
        dispatch(setFarmerDialogAction(false));
    };

    const handleOpenDialogFarmerDetails = (farmer: Farmer) => {
        dispatch(setFarmerAction(farmer))
        setFarmerDetailDialogOpen(true);
    }

    const handleCloseDialogFarmerDetails = () => {
        setFarmerDetailDialogOpen(false);
    }

    const handleOpenConfirmDialogDeleteFarmer = (farmer: Farmer) => {
        dispatch(setFarmerAction(farmer));
        setConfirmDeleteFarmerDialogOpen(true);
    };

    const handleCloseConfirmDialogDeleteFarmer = () => {
        setConfirmDeleteFarmerDialogOpen(false);
    };

    const confirmDeleteFarmer = async () => {
        await dispatch(deleteFarmerAction(farmer.id));
        handleCloseConfirmDialogDeleteFarmer();
    };

    return (
        <React.Fragment>

            <Typography component="h2" variant="h5" align="center">
                Gerenciamento de Agricultores
            </Typography>

            <Box mt={2} mb={3} display="flex" justifyContent="space-between">
                <div>{farmers.length} agricultor(es)</div>
                <Button variant="outlined" color="primary" onClick={handleOpenDialogCreateFarmer}>
                    Adicionar
                </Button>
            </Box>

            {loadingFarmers &&
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            }

            {(!loadingFarmers && farmers.length === 0) &&
                <Box display="flex" justifyContent="center" alignItems="center">
                    <p>Não há agricultores cadastrados</p>
                </Box>
            }

            {!loadingFarmers &&
                <FarmerList
                    onFarmerClick={handleOpenDialogFarmerDetails}
                    onDeleteClick={handleOpenConfirmDialogDeleteFarmer}
                    onEditClick={handleOpenDialogEditFarmer}
                />
            }

            <FarmerDialog
                open={farmerDialog}
                onClose={handleCloseFarmerDialog}
            />

            <FarmerDeleteConfirmationDialog
                open={confirmDeleteFarmerDialogOpen}
                onClose={handleCloseConfirmDialogDeleteFarmer}
                onConfirm={confirmDeleteFarmer}
            />

            <FarmerDetailDialog
                open={farmerDetailDialogOpen}
                onClose={handleCloseDialogFarmerDetails}
            />

            <SnackbarAlert />

        </React.Fragment>

    );
};

export default Farmers;
