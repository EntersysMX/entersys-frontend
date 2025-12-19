import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Button,
    Fade,
    CircularProgress,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    Chat as ChatIcon,
    Close as CloseIcon,
    SmartToy as BotIcon,
    Refresh as RefreshIcon,
    Send as SendIcon
} from '@mui/icons-material';
import supportService from '../../services/supportService';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null); // 'KOF' o 'CONTRACTOR'
    const [history, setHistory] = useState([]); // Array of { type: 'bot' | 'user', text: string }
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [history, isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && history.length === 0) {
            // Mensaje inicial
            setHistory([{
                type: 'bot',
                text: '¡Hola! Soy el asistente virtual de Entersys. ¿Eres empleado KOF o Contratista?'
            }]);
        }
    }, [isOpen]);

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
        setHistory(prev => [
            ...prev,
            { type: 'user', text: role === 'KOF' ? 'Soy KOF' : 'Soy Contratista' },
            { type: 'bot', text: `Perfecto. ¿En qué puedo ayudarte hoy? Escribe tu pregunta:` }
        ]);
    };

    const searchFAQs = async (question) => {
        setLoading(true);
        try {
            const faqs = await supportService.getFAQs(selectedRole, question);

            if (faqs && faqs.length > 0) {
                // Mostrar las FAQs encontradas
                const response = faqs.slice(0, 3).map(faq =>
                    `**${faq.question}**\n${faq.answer}`
                ).join('\n\n');

                setHistory(prev => [
                    ...prev,
                    { type: 'bot', text: `Encontré estas respuestas que podrían ayudarte:\n\n${response}` }
                ]);
            } else {
                setHistory(prev => [
                    ...prev,
                    { type: 'bot', text: 'Lo siento, no encontré información sobre eso. ¿Quieres intentar con otras palabras o contactar a soporte?' }
                ]);
            }
        } catch (error) {
            console.error("Error searching FAQs", error);
            setHistory(prev => [
                ...prev,
                { type: 'bot', text: 'Lo siento, tuve un problema al buscar. Por favor intenta de nuevo.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        const question = userInput.trim();
        setHistory(prev => [...prev, { type: 'user', text: question }]);
        setUserInput('');

        // Buscar en FAQs
        searchFAQs(question);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleReset = () => {
        setHistory([]);
        setSelectedRole(null);
        setUserInput('');
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            {/* Chat Window */}
            <Fade in={isOpen}>
                <Paper
                    elevation={6}
                    sx={{
                        position: 'absolute',
                        bottom: 70,
                        right: 0,
                        width: 350,
                        height: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.1)'
                    }}
                >
                    {/* Header */}
                    <Box sx={{
                        p: 2,
                        bgcolor: '#C41E3A', // KOF Red
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '3px solid #8B0000' // Dark red accent
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BotIcon />
                            <Typography variant="subtitle1" fontWeight="bold">Asistente de Seguridad</Typography>
                        </Box>
                        <Box>
                            <IconButton size="small" onClick={handleReset} sx={{ color: 'white', mr: 1 }}>
                                <RefreshIcon />
                            </IconButton>
                            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Messages Area */}
                    <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#f5f5f5' }}>
                        {history.map((msg, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                    mb: 2
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 1.5,
                                        maxWidth: '80%',
                                        bgcolor: msg.type === 'user' ? '#C41E3A' : 'white',
                                        color: msg.type === 'user' ? 'white' : 'text.primary',
                                        borderRadius: 2,
                                        borderTopLeftRadius: msg.type === 'bot' ? 0 : 2,
                                        borderTopRightRadius: msg.type === 'user' ? 0 : 2,
                                        border: msg.type === 'bot' ? '1px solid #e0e0e0' : 'none'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                        {msg.text}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <CircularProgress size={24} sx={{ color: '#C41E3A' }} />
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, bgcolor: 'white', borderTop: '2px solid #C41E3A' }}>
                        {!selectedRole ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleRoleSelection('KOF')}
                                    sx={{
                                        textTransform: 'none',
                                        bgcolor: '#C41E3A',
                                        '&:hover': { bgcolor: '#A01729' }
                                    }}
                                >
                                    Soy KOF
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleRoleSelection('CONTRACTOR')}
                                    sx={{
                                        textTransform: 'none',
                                        borderColor: '#C41E3A',
                                        color: '#C41E3A',
                                        '&:hover': {
                                            borderColor: '#A01729',
                                            bgcolor: 'rgba(196, 30, 58, 0.04)'
                                        }
                                    }}
                                >
                                    Soy Contratista
                                </Button>
                            </Box>
                        ) : (
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Escribe tu pregunta..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleSendMessage}
                                                disabled={!userInput.trim() || loading}
                                                size="small"
                                                sx={{
                                                    color: '#C41E3A',
                                                    '&:hover': { bgcolor: 'rgba(196, 30, 58, 0.04)' }
                                                }}
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': { borderColor: '#C41E3A' },
                                        '&.Mui-focused fieldset': { borderColor: '#C41E3A' }
                                    }
                                }}
                            />
                        )}
                    </Box>
                </Paper>
            </Fade>

            {/* Toggle Button */}
            <IconButton
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    bgcolor: '#C41E3A',
                    color: 'white',
                    width: 56,
                    height: 56,
                    '&:hover': { bgcolor: '#A01729' },
                    boxShadow: 4,
                    border: '2px solid #8B0000'
                }}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </IconButton>
        </Box>
    );
};

export default ChatbotWidget;
