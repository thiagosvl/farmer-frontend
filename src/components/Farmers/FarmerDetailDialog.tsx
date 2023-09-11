import React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

interface FarmerDetailDialogProps {
    open: boolean;
    onClose: () => void;
}

const FarmerDetailDialog: React.FC<FarmerDetailDialogProps> = ({ open, onClose }) => {
    const farmer = useSelector((state: RootState) => state.farmer.farmer);
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Detalhes do Agricultor</DialogTitle>
            <DialogContent>
                {farmer && (
                    <div>
                        <div><b>Nome Corporativo:</b> {farmer.corporate_name}</div>
                        <div><b>Nome Fantasia:</b> {farmer.trading_name}</div>
                        <div><b>CPF/CNPJ:</b> {farmer.business_id}</div>
                        <div><b>Celular:</b> {farmer.cell_phone}</div>
                        <div><b>Cidade:</b> {farmer.city}</div>
                        <div><b>Estado:</b> {farmer.state}</div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FarmerDetailDialog;
