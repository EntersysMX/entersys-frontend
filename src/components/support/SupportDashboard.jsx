import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    Grid,
    Card,
    CardContent,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    CircularProgress,
    Alert
} from '@mui/material';
import { Search as SearchIcon, ExpandMore as ExpandMoreIcon, HelpOutline as HelpIcon } from '@mui/icons-material';
import supportService from '../../services/supportService';

const SupportDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchFaqs();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchFaqs = async () => {
        setLoading(true);
        setError(null);
        try {
            // TODO: Get real user role from auth context. For now defaulting to ALL/KOF
            const data = await supportService.getFAQs('KOF', searchTerm);
            setFaqs(data);
        } catch (err) {
            setError('Error al cargar las preguntas frecuentes.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
                    Centro de Soporte KOF
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    ¿Cómo podemos ayudarte hoy?
                </Typography>

                <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Buscar ayuda (ej: VPN, Contraseñas, Accesos)..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 4, bgcolor: 'white' }
                        }}
                    />
                </Box>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {faqs.length > 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HelpIcon color="primary" /> Preguntas Frecuentes
                            </Typography>

                            {faqs.map((faq) => (
                                <Accordion key={faq.id} sx={{ mb: 1, borderRadius: 1, '&:before': { display: 'none' } }} elevation={1}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                            <Typography fontWeight="medium">{faq.question}</Typography>
                                            <Chip label={faq.category} size="small" color="default" variant="outlined" sx={{ ml: 'auto', mr: 2 }} />
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="text.secondary" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', py: 8, opacity: 0.7 }}>
                                <Typography variant="h6">No se encontraron resultados</Typography>
                                <Typography variant="body2">Intenta con otros términos de búsqueda</Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default SupportDashboard;
