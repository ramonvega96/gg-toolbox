import { useState, useEffect } from 'react';

const usePageVisibility = () => {
    const [isVisible, setIsVisible] = useState(!document.hidden);

    const handleVisibilityChange = () => {
        setIsVisible(!document.hidden);
    };

    const handleWindowBlur = () => {
        setIsVisible(false);
    };

    const handleWindowFocus = () => {
        setIsVisible(!document.hidden);
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('focus', handleWindowFocus);

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
            window.removeEventListener('blur', handleWindowBlur);
            window.removeEventListener('focus', handleWindowFocus);
        };
    }, []);

    return isVisible;
};

export default usePageVisibility;
