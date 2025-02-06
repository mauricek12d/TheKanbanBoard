import { jwtDecode, JwtPayload } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  /**
   * Decode the JWT and return the user's profile information.
   * @returns {UserData | null} The user's decoded data or null if the token is invalid.
   */
  getProfile(): UserData | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<UserData>(token);
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  /**
   * Check if the user is currently logged in.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Check if a token has expired.
   * @param {string} token - The JWT to validate.
   * @returns {boolean} True if the token is expired, false otherwise.
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp !== undefined && decoded.exp < Date.now() / 1000) {  
        localStorage.removeItem("id_token"); // Remove expired token
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error decoding token:', err);
      localStorage.removeItem("id_token"); // Remove invalid token
      return true;
    }
  }

  /**
   * Retrieve the JWT from localStorage.
   * @returns {string | null} The token or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  /**
   * Log in the user by storing the JWT and redirecting to the home page.
   * @param {string} idToken - The JWT token.
   */
  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Redirect to the home page
  }

  /**
   * Log out the user by removing the JWT and redirecting to the login page.
   */
  logout(): void {
    localStorage.removeItem('id_token');
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();
