// Third party
import { Client, Account, ID } from 'appwrite';

// Configs
import envConf from '../config/envConfig';

// Types
import { IAccountData, ILoginData } from '../types';

const { appwriteUrl, appwriteProjectId } = envConf;


class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);

        this.account = new Account(this.client);
    }

    /**
     * Asynchronously creates a new user account with the provided data.
     * @param {Object} accountData - An object containing user account data.
     * @param {string} accountData.email - The email address of the user.
     * @param {string} accountData.password - The password for the user account.
     * @param {string} accountData.name - The name of the user.
     * @returns {Promise} A Promise that resolves with a user account object if successful, or rejects with an error.
     * @throws {Error} If there is an error during the account creation process.
     */
    async createAccount({
        email,
        password,
        name,
    }: IAccountData) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error: any) {
            console.log('error while creating user account', error);
            throw error;
        }
    }

    /**
     * Asynchronously logs in a user with the provided email and password.
     * @param {Object} loginData - An object containing login data.
     * @param {string} loginData.email - The email address of the user.
     * @param {string} loginData.password - The password for the user account.
     * @returns {Promise} A Promise that resolves with a session object if successful, or rejects with an error.
     * @throws {Error} If there is an error during the login process.
     */
    async login({ email, password }: ILoginData) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log('error while logging in user', error);
            throw error;
        }
    }

    /**
     * Asynchronously retrieves the details of the currently logged-in user.
     * @returns {Promise} A Promise that resolves with the user object if successful, or null if no user is logged in.
     * @throws {Error} If there is an error during the retrieval process.
     */
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('error while getting current logged in user', error);
        }

        return null;
    }

    /**
     * Asynchronously logs out the currently logged-in user by deleting all active sessions.
     * @returns {Promise} A Promise that resolves with true if the logout process is successful, or false if an error occurs.
     */
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log('error while logging out', error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;
