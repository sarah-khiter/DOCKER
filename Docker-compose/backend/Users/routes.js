import * as servicesUsers from "./users_services.js";
import { authenticateToken } from '../Jwt/jwt.js';

/**
 * Generate API Routes
 * @param {Express} app
 */
export const Routes = (app) => {
    app.post('/api/createUser', servicesUsers.createUser);
    app.post('/api/loginUser', servicesUsers.loginUser);
    app.get('/api/users', authenticateToken, servicesUsers.getAllUsers); 
   //app.get('/api/users', servicesUsers.getAllUsers);
    
}
