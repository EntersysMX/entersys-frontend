import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const supportService = {
    /**
     * Obtener FAQs filtradas
     * @param {string} role - Rol del usuario (KOF, CONTRACTOR)
     * @param {string} searchTerm - Término de búsqueda
     */
    getFAQs: async (role, searchTerm = '') => {
        try {
            const params = {};
            if (role) params.role = role;
            if (searchTerm) params.q = searchTerm;

            const response = await axios.get(`${API_URL}/api/v1/support/faqs`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            throw error;
        }
    },

    /**
     * Obtener estructura del flujo del chatbot
     */
    getChatFlow: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/support/chat-flow`);
            return response.data;
        } catch (error) {
            console.error('Error fetching chat flow:', error);
            throw error;
        }
    }
};

export default supportService;
