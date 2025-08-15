import axios from 'axios';
import { API_BASE_URL } from '@/modules/shared/utils/constants';
import { UserCredentials, UserSession } from '../types/user';

// Auth service for handling authentication operations
class AuthService {
    /**
     * Login a user with email and password
     * @param credentials User credentials (email and password)
     * @returns Promise with user session data
     */
    async login(credentials: UserCredentials): Promise<UserSession> {
        try {
            const response = await axios.get(`${API_BASE_URL}/login/${credentials.email}/auth/${credentials.password}`,);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Authentication failed');
            }
            throw error;
        }
    }

    /**
     * Logout the current user
     */
    logout(): void {
        
    }

  
}

const authService = new AuthService();
export default authService;