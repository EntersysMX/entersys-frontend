import React from 'react';
import { Box } from '@mui/material';
import SupportDashboard from '../components/support/SupportDashboard';
import ChatbotWidget from '../components/support/ChatbotWidget';

const SoporteKof = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            <SupportDashboard />
            <ChatbotWidget />
        </Box>
    );
};

export default SoporteKof;
