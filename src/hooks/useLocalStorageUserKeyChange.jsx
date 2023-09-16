import { useEffect } from 'react';

function useLocalStorageUserKeyChange(key, callback) {
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key) {
                callback(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, callback]);
}

export default useLocalStorageUserKeyChange;
