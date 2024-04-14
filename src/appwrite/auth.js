import conf from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const response = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (response) {
                // call another method
                return this.login({ email, password });
            } else {
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const response = await this.account.createEmailSession(email, password);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await this.account.get();
            if (response) {
                return response;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new Authservice();

export default authService;