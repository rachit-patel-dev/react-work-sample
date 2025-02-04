export interface IPostData {
    $id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    userId: string;
    status: string;
}

export interface IPostPayloadData extends IPostData {
    image: FileList;
}

export type PostDataToUpdate = Partial<IPostData>;

export interface IPostFormData {
    title: string;
    content: string;
    status: string;
    slug: string;
    image: FileList;
}
