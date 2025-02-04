export interface IArticle {
    id: string;
    createdAt: string;
    articleUrl: string;
    description: string;
    title: string;
    image: string;
}

export type ArticleList = IArticle[]
