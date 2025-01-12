import { useState, createContext, PropsWithChildren, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Interface for setting a global pathway for the home page
interface homePathContextInterface {
    path: string;
    setPath(currentPath: string): void;
}

/**
 * This handles the "current" page that the user is on the home page
 */
export const HomePathwayContext = createContext<homePathContextInterface>(
    {} as homePathContextInterface
);

export function HomePathWayProvider(props: PropsWithChildren) {
    /**
     * This function, based on the route (url), defines the contest for setting the
     * right landing page (The proper category).
     * @returns The context that should be set according to the route
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const convertSearchParamsToPathway = (): string => {
        const pathway = searchParams.has('pathway')
            ? searchParams.get('pathway')
            : '';

        switch (pathway) {
            case 'grow-and-go':
                return 'growAndGo';
            case 'aboriginal-and-torres-strait':
                return 'aboriginalAndTorresStrait';
            case 'health-professionals':
                return 'healthProfessionals';
            case 'parents-and-families':
                return 'parentsAndFamilies';
            case 'early-childhood-education':
                return 'earlyChildhoodEducation';
            case 'multicultural-resources':
                return 'multiculturalResources';
            case 'grow-go-toolbox':
                return 'growGoToolbox';
            default:
                return 'growAndGo';
        }
    };

    const [searchParams] = useSearchParams();
    const [path, setPath] = useState<string>('growAndGo');

    useEffect(() => {
        setPath(convertSearchParamsToPathway());
    }, [convertSearchParamsToPathway]);

    return (
        <div>
            <HomePathwayContext.Provider value={{ path, setPath }}>
                {props.children}
            </HomePathwayContext.Provider>
        </div>
    );
}
