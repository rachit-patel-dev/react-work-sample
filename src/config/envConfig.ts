const envConf = {
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteUrlDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteUrlCollectionId: String(
        process.env.REACT_APP_APPWRITE_COLLECTION_ID
    ),
    appwriteUrlBucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
    apiBaseUrl: String(process.env.REACT_APP_API_BASE_URL),
};

export default envConf;
