export interface IHealthProfession {
    state: string;
    profession: string;
    description?: string;
    publicService: string[];
    privateService?: string[];
    communityService?: string[];
    tags: string[];
}

export interface ILink {
    linklabel: string;
    url: string;
}

export interface IHealthProfessionCommunity {
    communityType: 'null' | 'links' | 'descriptionWithButtonLabel';
    description?: string;
    links?: ILink[];
}
