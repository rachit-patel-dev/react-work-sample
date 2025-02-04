// Third party
import { Client, ID, Storage } from 'appwrite';

// Configs
import envConf from '../config/envConfig';

const { appwriteUrl, appwriteProjectId, appwriteUrlBucketId } = envConf;

export class FileService {
    client = new Client();
    bucket;

    constructor() {
        this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);

        this.bucket = new Storage(this.client);
    }

    /**
     * Asynchronously uploads a file to the specified bucket.
     * @param {File} file - The file to upload.
     * @returns {Promise} A Promise that resolves with the uploaded file object if successful, or false if an error occurs.
     */
    async uploadFile(file: File) {
        try {
            return await this.bucket.createFile(
                appwriteUrlBucketId,
                ID.unique(),
                file
            );
        } catch (e) {
            console.log('AppWrite File service :: uploadFile :: error', e);
            return false;
        }
    }

    /**
     * Asynchronously deletes a file from the specified bucket.
     * @param {string} fileId - The ID of the file to delete.
     * @returns {Promise} A Promise that resolves with true if the deletion is successful, or false if an error occurs.
     */
    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(appwriteUrlBucketId, fileId);
            return true;
        } catch (e) {
            console.log('AppWrite File service :: deleteFile :: error', e);
            return false;
        }
    }

    /**
     * Retrieves the preview URL or string of a file from the specified bucket.
     * @param {string} fileId - The ID of the file to retrieve the preview for.
     * @returns {URL|string} The preview URL of the file if successful, or an empty string if an error occurs.
     */
    getFilePreview(fileId: string): URL | string {
        try {
            return this.bucket.getFilePreview(appwriteUrlBucketId, fileId);
        } catch (e) {
            console.log('AppWrite File service :: getFilePreview :: error', e);
            return "";
        }
    }
}

const fileService = new FileService();

export default fileService;
