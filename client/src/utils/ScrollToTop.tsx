import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    // We need this eslint to enable scroll restoration prevention
    // eslint-disable-next-line no-restricted-globals
    history.scrollRestoration = 'manual';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
