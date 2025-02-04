import { FC, useEffect, useState } from 'react';

// Third party
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Helpers
import { RootState } from '../../store/store';

interface IProtectedProps {
    children: React.ReactNode;
    isAuthRequired?: boolean;
}

const Protected: FC<IProtectedProps> = ({
    children,
    isAuthRequired = true,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isUserLoggedin
    );

    useEffect(() => {
        setIsLoading(true);
        if (isAuthRequired && !isAuthenticated) navigate('/login');
        else if (!isAuthRequired && isAuthenticated) navigate('/');

        setIsLoading(false);
    }, [isAuthenticated, isAuthRequired]);

    return isLoading ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
