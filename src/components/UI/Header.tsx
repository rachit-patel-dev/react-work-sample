// Third party
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Custom components
import { Container, Logo, LogoutBtn } from '..';

// Helper
import { RootState } from '../../store/store';

const Header = () => {
    const isUserLoggedin = useSelector(
        (state: RootState) => state.auth.isUserLoggedin
    );

    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            redirectTo: '/',
            active: true,
        },
        {
            name: 'Login',
            redirectTo: '/login',
            active: !isUserLoggedin,
        },
        {
            name: 'Signup',
            redirectTo: '/register',
            active: !isUserLoggedin,
        },
        {
            name: 'All Posts',
            redirectTo: '/all-posts',
            active: isUserLoggedin,
        },
        {
            name: 'Add Post',
            redirectTo: '/add-post',
            active: isUserLoggedin,
        },
    ];

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    <ul className="flex ml-auto">
                        {navItems?.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                            onClick={() =>
                                                navigate(item.redirectTo)
                                            }
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}
                        {isUserLoggedin && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
