import { createContext, useContext } from "react";

// Static
import { defaultPropertyStatistics } from "../resources/statics";

// Types
import { IpropertyStatistics, PropertyList, ArticleList, TestimonialReviewList } from "../types/";

interface ILandingContextProps {
  properties: PropertyList,
  propertyStatistics: IpropertyStatistics,
  articles: ArticleList,
  reviews: TestimonialReviewList,
  setProperties: Function,
  setPropertyStatistics: Function,
  setArticles: Function,
  setReviews: Function,
}

export const LandingContext = createContext<ILandingContextProps>({
  properties: [],
  propertyStatistics: defaultPropertyStatistics,
  articles: [],
  reviews: [],
  setProperties: () => { },
  setPropertyStatistics: () => { },
  setArticles: () => { },
  setReviews: () => { },
});

export const useLandingContext = () => {
  return useContext(LandingContext);
};
