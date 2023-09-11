import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, FormControl, TextField, DialogActions, Button, InputLabel, Select, MenuItem, FormHelperText, Box, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import InputMask from 'react-input-mask';

import { BusinessIdType, Farmer } from '../../types/farmerTypes';
import { State } from "../../types/stateTypes";
import brazilStates from '../../utils/brazilStates.utils';
import { initialFarmerForm, checkBusinessIdType, farmFormInitialErrors, isValidBusinessId, isValidCellPhone } from "../../utils/farmerUtils";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

import { setDocumentTypeAction, createFarmerAction, updateFarmerAction } from '../../store/actions/farmerActions';

interface FarmerDialogProps {
    open: boolean;
    onClose: () => void;
}

const initialValue = {
    id: null,
    corporate_name: "Teste abc",
    trading_name: "teste teste",
    business_id: "395.423.918-38",
    cell_phone: "(11) 95118-6951",
    city: "São Paulo",
    state: "SP"
};

const FarmerDialog: React.FC<FarmerDialogProps> = ({
    open, onClose,
}) => {
    const dispatch = useDispatch();
    const documentType = useSelector((state: RootState) => state.farmer.documentType);
    const farmer = useSelector((state: RootState) => state.farmer.farmer);
    const businessIdMask = documentType === 'CPF' ? "999.999.999-99" : "99.999.999/9999-99";
    const inEditMode = useSelector((state: RootState) => state.farmer.inEditMode);
    const [farmerForm, setFarmerForm] = useState<Farmer>(initialFarmerForm);
    const [errors, setErrors] = useState(farmFormInitialErrors);

    useEffect(() => {
        if(inEditMode){
            setFarmerForm(farmer);
            const currentDocumentType = checkBusinessIdType(farmer.business_id);
            dispatch(setDocumentTypeAction(currentDocumentType));
        } else {
            setFarmerForm(initialFarmerForm);
        }
    }, [inEditMode]);

    const validateFields = () => {
        const errors = {
            corporate_name: farmerForm.corporate_name.trim() ? [] : ["Campo obrigatório"],
            trading_name: farmerForm.trading_name.trim() ? [] : ["Campo obrigatório"],
            business_id: validateBusinessIdField(farmerForm.business_id, documentType),
            cell_phone: farmerForm.cell_phone != "" && !isValidCellPhone(farmerForm.cell_phone) ? ["Celular inválido"] : [],
            city: farmerForm.city.trim() ? [] : ["Campo obrigatório"],
            state: farmerForm.state.trim() ? [] : ["Campo obrigatório"]
        };

        setErrors(errors);

        return !Object.values(errors).some(errorArray => errorArray.length > 0);
    };

    const validateBusinessIdField = (id: string, type: string) => {
        let errors = [];

        if (!id.trim()) {
            errors.push("Campo obrigatório");
        } else {
            if (!isValidBusinessId(id, type)) {
                errors.push(type === BusinessIdType.CPF ? 'CPF inválido' : ' CNPJ inválido');
            }
        }

        return errors;
    };

    const resetForm = () => {
        setFarmerForm(initialFarmerForm);
        setErrors(farmFormInitialErrors);
    };

    const handleDocumentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDocumentTypeAction(e.target.value as BusinessIdType));
        setFarmerForm(prev => ({ ...prev, business_id: '' }));
    };

    const submitFarmer = async () => {
        if (!validateFields()) return;

        if (inEditMode) {
            await dispatch(updateFarmerAction(farmerForm));
        } else {
            await dispatch(createFarmerAction(farmerForm));
        }
    }

    const handleCloseDialog = () => {
        resetForm();
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{inEditMode ? "Atualizar Agricultor" : "Cadastro de Agricultor"}</DialogTitle>
            <DialogContent>

                <FormControl error={errors.corporate_name.length > 0} fullWidth>
                    <TextField autoFocus margin="dense" id="corporate_name" autoComplete="off" label="Nome Corporativo" value={farmerForm.corporate_name} error={errors.corporate_name.length > 0}
                        onChange={e => setFarmerForm(prev => ({ ...prev, corporate_name: e.target.value }))} />
                    {errors.corporate_name.map((error, key) => <FormHelperText key={key}>{error}</FormHelperText>)}
                </FormControl>

                <FormControl error={errors.trading_name.length > 0} fullWidth>
                    <TextField margin="dense" id="trading_name" autoComplete="off" error={errors.trading_name.length > 0} label="Nome Fantasia" value={farmerForm.trading_name}
                        onChange={e => setFarmerForm(prev => ({ ...prev, trading_name: e.target.value }))} />
                    {errors.trading_name.map((error, key) => <FormHelperText key={key}>{error}</FormHelperText>)}
                </FormControl>

                <FormControl fullWidth>
                    <RadioGroup
                        row
                        aria-label="documentType"
                        name="documentType"
                        value={documentType}
                        onChange={handleDocumentTypeChange}
                    >
                        <FormControlLabel value={BusinessIdType.CPF} control={<Radio color="primary" />} label={BusinessIdType.CPF} />
                        <FormControlLabel value={BusinessIdType.CNPJ} control={<Radio color="primary" />} label={BusinessIdType.CNPJ} />
                    </RadioGroup>
                </FormControl>

                <FormControl error={errors.business_id.length > 0} fullWidth>
                    <InputMask mask={businessIdMask} value={farmerForm.business_id} error={errors.business_id.length > 0}
                        onChange={e => setFarmerForm(prev => ({ ...prev, business_id: e.target.value }))}>
                        {(inputProps: any) => <TextField {...inputProps} margin="dense" autoComplete="off" label={documentType} />}
                    </InputMask>
                    {errors.business_id.map((error, key) => <FormHelperText key={key}>{error}</FormHelperText>)}
                </FormControl>

                <FormControl error={errors.cell_phone.length > 0} fullWidth>
                    <InputMask mask="(99) 99999-9999" value={farmerForm.cell_phone} error={errors.cell_phone.length > 0}
                        onChange={e => setFarmerForm(prev => ({ ...prev, cell_phone: e.target.value }))}>
                        {(inputProps: any) => <TextField {...inputProps} margin="dense" autoComplete="off" label="Celular" />}
                    </InputMask>
                    {errors.cell_phone.map((error, key) => <FormHelperText key={key}>{error}</FormHelperText>)}
                </FormControl>

                <FormControl error={errors.city.length > 0} fullWidth>
                    <TextField margin="dense" id="city" autoComplete="off" label="Cidade" value={farmerForm.city} error={errors.city.length > 0}
                        onChange={e => setFarmerForm(prev => ({ ...prev, city: e.target.value }))} />
                    {errors.city.map((error, key) => <FormHelperText key={key}>{error}</FormHelperText>)}
                </FormControl>

                <Box mt={1}>
                    <FormControl error={errors.state.length > 0} fullWidth>
                        <InputLabel id="state-select-label">Estado</InputLabel>
                        <Select
                            labelId="state-select-label"
                            id="state-select"
                            value={farmerForm.state}
                            margin="dense"
                            onChange={e => setFarmerForm(prev => ({ ...prev, state: e.target.value }))}
                            fullWidth
                            error={errors.state.length > 0}
                        >
                            {brazilStates.map((state: State) => (
                                <MenuItem key={state.key} value={state.key}>{state.value}</MenuItem>
                            ))}
                        </Select>
                        {errors.state.map((error, key) => <FormHelperText key={key}>{error}</FormHelperText>)}
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button variant="contained" onClick={submitFarmer} color="primary">
                    {inEditMode ? "Atualizar" : "Confirmar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FarmerDialog;
