import React, { useState, createContext, PropsWithChildren } from 'react';

// Interface for setting a global pathway for the FHP component
interface pathwayContextInterface {
    path: string;
    setPath(currentPath: string): void;
}

/**
 * This handles the "current" path that the user is on for the FHP
 */
export const PathwayContext = createContext<pathwayContextInterface>(
    {} as pathwayContextInterface
);

export function PathWayProvider(props: PropsWithChildren) {
    const [path, setPath] = useState<string>('firstPage');
    return (
        <div>
            <PathwayContext.Provider value={{ path, setPath }}>
                {props.children}
            </PathwayContext.Provider>
        </div>
    );
}
