"use client";

import React, { useEffect } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Farmer } from '../../types/farmerTypes';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

interface FarmerListProps {
    onFarmerClick: (farmer: Farmer) => void;
    onDeleteClick: (farmer: Farmer) => void;
    onEditClick: (farmer: Farmer) => void;
}

const FarmerList: React.FC<FarmerListProps> = ({ onFarmerClick, onDeleteClick, onEditClick }) => {
    const farmers = useSelector((state: RootState) => state.farmer.farmers);

    return (
        <List dense>
            {farmers && farmers.map((farmer: Farmer, key) => (
                <ListItem
                    key={farmer.id}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon color='action' />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={farmer.corporate_name}
                        secondary={farmer.trading_name}
                    />
                    <IconButton arial-label="details" onClick={() => onFarmerClick(farmer)}>
                        <VisibilityIcon fontSize='small' />
                    </IconButton>
                    <IconButton aria-label="update" onClick={() => onEditClick(farmer)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDeleteClick(farmer)}>
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
}

export default React.memo(FarmerList);
