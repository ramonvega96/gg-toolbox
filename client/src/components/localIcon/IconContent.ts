import { SearchBarFilterFields } from '../../utils/NetworkCalls';

// Interface for icon attributes
export interface IconAttributes {
    key: string;
    iconTag: string;
    dbValue?: string;
    filterField?: SearchBarFilterFields;
}

// an array to define the order and type for icons used in this component
export const IconContent: IconAttributes[] = [
    {
        key: 'health-professional',
        iconTag: 'Health Professional',
        dbValue: 'health professionals',
        filterField: 'audiences',
    },
    {
        key: 'ECEC',
        iconTag: 'Early childhood education and care',
        dbValue: 'education professionals',
        filterField: 'audiences',
    },
    {
        key: 'parents',
        iconTag: 'Parents and carers',
        dbValue: 'general public',
        filterField: 'audiences',
    },
    {
        key: 'ATSI',
        iconTag: 'Aboriginal and Torres Strait Islander',
        dbValue: 'aboriginal and torres strait islander people',
        filterField: 'audiences',
    },
    { key: 'CALD', iconTag: 'Translated Content', dbValue: 'CALD' },
    {
        key: 'baby',
        iconTag: 'Baby (0-1 years)',
        dbValue: 'birth-12 months',
        filterField: 'ageGroups',
    },
    {
        key: 'toddler',
        iconTag: 'Toddler (1-3 years)',
        dbValue: '1-3 years',
        filterField: 'ageGroups',
    },
    {
        key: 'preschooler',
        iconTag: 'Preschooler (3-5 years)',
        dbValue: '3-5 years',
        filterField: 'ageGroups',
    },
    {
        key: 'all-ages-general',
        iconTag: 'General (all ages)',
        dbValue: 'birth-5 years',
        filterField: 'ageGroups',
    },
    {
        key: 'breast-formula-feeding',
        iconTag: 'Breast/formula feeding',
        dbValue: 'breast or formula feeding',
        filterField: 'categories',
    },
    {
        key: 'intro-to-solids',
        iconTag: 'Introducing solids',
        dbValue: 'introducing solids',
        filterField: 'categories',
    },
    {
        key: 'mealtimes',
        iconTag: 'Mealtimes',
        dbValue: 'mealtimes',
        filterField: 'categories',
    },
    {
        key: 'healthy-lifestyle',
        iconTag: 'Healthy lifestyle',
        dbValue: 'healthy lifestyle',
        filterField: 'categories',
    },
    {
        key: 'nutrients',
        iconTag: 'Nutrients',
        dbValue: 'nutrients',
        filterField: 'categories',
    },
    {
        key: 'growth',
        iconTag: 'Growth',
        dbValue: 'growth and development',
        filterField: 'categories',
    },
    {
        key: 'health-concerns',
        iconTag: 'Health Concerns',
        dbValue: 'health concerns',
        filterField: 'categories',
    },
    {
        key: 'antenatal',
        iconTag: 'Antenatal',
        dbValue: 'antenatal diet and lifestyle',
        filterField: 'categories',
    },
    { key: 'text-based', iconTag: 'Text based content', dbValue: 'text based' },
    { key: 'video-based', iconTag: 'Video based content', dbValue: 'video' },
    { key: 'audio-based', iconTag: 'Audio based content', dbValue: 'audio' },
];

// An array for easy mapping of the LocalIconName type
export const iconKeys: string[] = IconContent.map(
    (icon: IconAttributes) => icon.key
);

export type LocalIconName = (typeof iconKeys)[number];
