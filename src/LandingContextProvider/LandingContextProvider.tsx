import { FC, useState } from 'react';

// Context
import { LandingContext } from './LandingContext';

// Static
import { defaultPropertyStatistics } from '../resources/statics';

// Types
import {
    IpropertyStatistics,
    PropertyList,
    ArticleList,
    TestimonialReviewList,
} from '../types';

interface ILandingContextProviderProps {
    children: JSX.Element;
}

const LandingContextProvider: FC<ILandingContextProviderProps> = ({
    children,
}) => {
    const [properties, setProperties] = useState<PropertyList>([]);
    const [propertyStatistics, setPropertyStatistics] =
        useState<IpropertyStatistics>(defaultPropertyStatistics);
    const [articles, setArticles] = useState<ArticleList>([]);
    const [reviews, setReviews] = useState<TestimonialReviewList>([]);

    return (
        <LandingContext.Provider
            value={{
                properties,
                propertyStatistics,
                articles,
                reviews,
                setProperties,
                setPropertyStatistics,
                setArticles,
                setReviews,
            }}
        >
            {children}
        </LandingContext.Provider>
    );
};

export default LandingContextProvider;
