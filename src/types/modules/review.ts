export interface ITestimonialReview {
    _id: string;
    userImage: object;
    stars: number;
    content: string;
    userName: string;
    userPosition: string;
}

export type TestimonialReviewList = ITestimonialReview[]
