import React, { FC } from 'react';

interface IContainerProps {
    children: React.ReactNode;
}

const Container: FC<IContainerProps> = ({ children }) => {
    return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
};

export default Container;
