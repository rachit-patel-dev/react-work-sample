// Third party
import { Client, Databases, Models, Query } from 'appwrite';

// Configs
import envConf from '../config/envConfig';

// Types
import { IPostData, PostDataToUpdate } from '../types';

const {
    appwriteUrl,
    appwriteProjectId,
    appwriteUrlDatabaseId,
    appwriteUrlCollectionId,
} = envConf;

export class PostService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    /**
     * Asynchronously creates a new post with the provided data.
     * @param {Object} postData - An object containing post data.
     * @param {string} postData.title - The title of the post.
     * @param {string} postData.slug - The slug of the post.
     * @param {string} postData.content - The content of the post.
     * @param {string} postData.featuredImage - The URL of the featured image for the post.
     * @param {string} postData.userId - The ID of the user who created the post.
     * @param {string} postData.status - The status of the post.
     * @returns {Promise} A Promise that resolves with the created post object if successful, or false if an error occurs.
     */
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        userId,
        status,
    }: Omit<IPostData, '$id'>) {
        try {
            const payload = {
                title,
                content,
                featuredImage,
                userId,
                status,
            }

            return await this.databases.createDocument(
                appwriteUrlDatabaseId,
                appwriteUrlCollectionId,
                slug,
                payload
            );
        } catch (e) {
            console.log('AppWrite service :: createPost :: error', e);
            return false;
        }
    }

    /**
     * Asynchronously updates an existing post with the provided data.
     * @param {string} slug - The slug of the post to update.
     * @param {Object} postDataToUpdate - An object containing post data to update.
     * @param {string} postDataToUpdate.title - The updated title of the post.
     * @param {string} postDataToUpdate.content - The updated content of the post.
     * @param {string} postDataToUpdate.featuredImage - The updated URL of the featured image for the post.
     * @param {string} postDataToUpdate.status - The updated status of the post.
     * @returns {Promise} A Promise that resolves with the updated post object if successful, or false if an error occurs.
     */
    async updatePost(
        slug: string,
        { title, content, featuredImage, status }: PostDataToUpdate
    ) {
        try {
            return await this.databases.updateDocument(
                appwriteUrlDatabaseId,
                appwriteUrlCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (e) {
            console.log('AppWrite service :: updatePost :: error', e);
            return false;
        }
    }

    /**
     * Asynchronously deletes an existing post identified by its slug.
     * @param {string} slug - The slug of the post to delete.
     * @returns {Promise} A Promise that resolves with true if the deletion is successful, or false if an error occurs.
     */
    async deletePost(slug: string) {
        try {
            await this.databases.deleteDocument(
                appwriteUrlDatabaseId,
                appwriteUrlCollectionId,
                slug
            );
            return true;
        } catch (e) {
            console.log('AppWrite service :: deletePost :: error', e);
            return false;
        }
    }

    /**
     * Asynchronously retrieves an existing post identified by its slug.
     * @param {string} slug - The slug of the post to retrieve.
     * @returns {Promise<Document|false>} A Promise that resolves with the post document if found, or false if an error occurs.
     */
    async getPost(slug: string): Promise<Models.Document | false> {
        try {
            return await this.databases.getDocument(
                appwriteUrlDatabaseId,
                appwriteUrlCollectionId,
                slug
            );
        } catch (e) {
            console.log('AppWrite service :: getPost :: error', e);
            return false;
        }
    }

    /**
     * Asynchronously retrieves a list of posts based on specified queries.
     * @param {Array} queries - An array of queries to filter the posts (default: [{ equal: ['status', ['active']] }]).
     * @returns {Promise<DocumentList<Document>|false>} A Promise that resolves with the list of post documents if successful, or false if an error occurs.
     */
    async getPosts(queries = [Query.equal('status', ['active'])]): Promise<Models.DocumentList<Models.Document> | false> {
        try {
            return await this.databases.listDocuments(
                appwriteUrlDatabaseId,
                appwriteUrlCollectionId,
                queries
            );
        } catch (e) {
            console.log('AppWrite service :: getPosts :: error', e);
            return false;
        }
    }
}

const postService = new PostService();

export default postService;
