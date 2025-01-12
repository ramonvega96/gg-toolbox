export interface LinksListModal {
    services: ILink[];
}

export interface TabsModal {
    description: string;
    tabHeaders: string[];
    tabContents: JSX.Element[];
}

export interface CategorizedBulletsModal {
    categories: CategorizedTopics[];
}

export interface UncategorizedBulletsModal {
    bullets: string[];
}

export interface ECECMapModal {
    stateDescription: string;
    buttons: ECECIlink[];
}

interface CategorizedTopics {
    categoryName: string;
    topics: string[];
}

export interface ILink {
    linkLabel: string;
    link: string;
}

interface ECECIlink extends ILink {
    linkNote?: string;
}
