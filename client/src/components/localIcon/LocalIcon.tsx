import { ReactComponent as HealthProfessional } from '../../assets/images/icons/svg/health_professional.svg';
import { ReactComponent as HealthConcerns } from '../../assets/images/icons/svg/health_concerns.svg';
import { ReactComponent as HealthyLifestyle } from '../../assets/images/icons/svg/healthy_lifestyle.svg';
import { ReactComponent as IntroToSolids } from '../../assets/images/icons/svg/intro_to_solids.svg';
import { ReactComponent as Growth } from '../../assets/images/icons/svg/growth.svg';
import { ReactComponent as AllAgesGeneral } from '../../assets/images/icons/svg/all_ages_general.svg';
import { ReactComponent as Antenatal } from '../../assets/images/icons/svg/antenatal.svg';
import { ReactComponent as Baby } from '../../assets/images/icons/svg/baby.svg';
import { ReactComponent as ATSI } from '../../assets/images/icons/svg/ATSI.svg';
import { ReactComponent as BreastFormulaFeeding } from '../../assets/images/icons/svg/breast_formula_feeding.svg';
import { ReactComponent as CALD } from '../../assets/images/icons/svg/CALD.svg';
import { ReactComponent as ECEC } from '../../assets/images/icons/svg/ECEC.svg';
import { ReactComponent as Parents } from '../../assets/images/icons/svg/parents.svg';
import { ReactComponent as Mealtimes } from '../../assets/images/icons/svg/mealtimes.svg';
import { ReactComponent as Toddler } from '../../assets/images/icons/svg/toddler.svg';
import { ReactComponent as Nutrients } from '../../assets/images/icons/svg/nutrients.svg';
import { ReactComponent as Preschooler } from '../../assets/images/icons/svg/child_preschooler.svg';
import { ReactComponent as TextBasedContent } from '../../assets/images/icons/svg/circle_icon.svg';
import { ReactComponent as VideoBasedContent } from '../../assets/images/icons/svg/circle_icon.svg';
import { ReactComponent as AudioBasedContent } from '../../assets/images/icons/svg/circle_icon.svg';
import { ReactComponent as Rural } from '../../assets/images/icons/svg/rural.svg';
import { ReactComponent as ToolboxLogo } from '../../assets/images/icons/svg/toolbox_logo.svg';
import { Resource } from '../resourceCard/types/Resource';
import { IconAttributes, IconContent, LocalIconName } from './IconContent';
import { Tooltip } from 'react-tooltip';

// a second interface for extracting style specific properties
interface StyleProps {
    width?: string;
    fill?: string;
    height?: string;
    className?: string;
}

// This interface adds the icon name as a required field for this component
interface Props extends StyleProps {
    icon: LocalIconName;
}

interface Colours {
    [index: string]: string;
}

// These colours are directly copied from tailwind config
const colours: Colours = {
    blue: '#142e54',
    green: '#1e9b50',
    red: '#de4b36',
    orange: '#f8952a',
    yellow: '#ffce39',
    pink: '#ff7778',
    secondaryBlue: '#185EA1',
};

// This function is to correct currently known issues on strings. May be redundant in future iterations of the data
function correctIconStrings(iconFields: (string | undefined)[]) {
    const lifestyleIndex = iconFields.indexOf('healthy lifestyles');
    if (lifestyleIndex !== -1) iconFields[lifestyleIndex] = 'healthy lifestyle';
    return iconFields.filter(
        (icon: string | undefined) => icon !== undefined
    ) as string[];
}

// This function takes the Resource and StyleProps to return an array of JSX icons
export function ResourceIcons(resource: Resource, style: StyleProps) {
    const resourceType =
        resource.resourceType === 'video' || resource.resourceType === 'audio'
            ? resource.resourceType
            : 'text based';

    // If the translatedId is not 0, it indicates the document belongs to a translation group
    const translatedId = resource.translatedId > 0 ? 'CALD' : undefined;

    // The order for this array is important as it will determine the order the icons are shown
    const iconFields: string[] = correctIconStrings([
        resource.audience,
        translatedId,
        resource.category,
        resource.ageGroup,
        resourceType,
    ]);

    // This is used to determine if there are icons for the resource card
    const iconAttributes: IconAttributes[] = iconFields
        .map((field: string) => {
            const iconContent = IconContent.find(
                (icon: IconAttributes) => icon.dbValue === field
            );
            return iconContent;
        })
        .filter(
            (icon: IconAttributes | undefined) => icon !== undefined
        ) as IconAttributes[];

    if (iconAttributes.length === 0) return <></>;

    // This is used for building the tooltip label out of the db value for the displayed icon
    const buildIconTooltipText = (iconDbValue: string) => {
        switch (iconDbValue) {
            case 'CALD':
                return 'Translated Content';
            default:
                return iconDbValue
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
        }
    };

    // An array of icon JSX elements to be returned
    const icons = iconAttributes.map((icon: IconAttributes) => (
        <div
            data-tooltip-id="icon-tooltip"
            data-tooltip-content={
                icon.dbValue ? buildIconTooltipText(icon.dbValue) : ''
            }
            key={icon.key}
            className="inline"
        >
            {LocalIcon({
                icon: icon.key,
                ...style,
            })}
            <Tooltip
                id="icon-tooltip"
                className="text-black font-sans text-xs p-1"
                noArrow
                style={{ backgroundColor: '#F2F2F2' }}
            />
        </div>
    ));
    return icons;
}

function LocalIcon(props: Props) {
    const { icon, width, height, className } = props;
    const fill = props.fill
        ? (props.fill as string) in colours
            ? colours[props.fill]
            : props.fill
        : undefined;
    const styleProps: StyleProps = {
        width: width || '1em',
        fill,
        height,
        className,
    };

    // Depending on the string passed in the properties, return a specific icon
    // If fill is not defined, use a default color
    switch (icon) {
        case 'health-professional':
            return (
                <HealthProfessional
                    {...styleProps}
                    fill={styleProps.fill || colours.yellow}
                />
            );
        case 'health-concerns':
            return (
                <HealthConcerns
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'intro-to-solids':
            return (
                <IntroToSolids
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'healthy-lifestyle':
            return (
                <HealthyLifestyle
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'growth':
            return (
                <Growth
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'all-ages-general':
            return (
                <AllAgesGeneral
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'antenatal':
            return (
                <Antenatal
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'baby':
            return (
                <Baby
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'ATSI':
            return (
                <ATSI
                    {...styleProps}
                    fill={styleProps.fill || colours.orange}
                />
            );
        case 'breast-formula-feeding':
            return (
                <BreastFormulaFeeding
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'CALD':
            return (
                <CALD
                    {...styleProps}
                    fill={styleProps.fill || colours.pink}
                />
            );
        case 'ECEC':
            return (
                <ECEC
                    {...styleProps}
                    fill={styleProps.fill || colours.green}
                />
            );
        case 'parents':
            return (
                <Parents
                    {...styleProps}
                    fill={styleProps.fill || colours.red}
                />
            );
        case 'mealtimes':
            return (
                <Mealtimes
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'toddler':
            return (
                <Toddler
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'nutrients':
            return (
                <Nutrients
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'preschooler':
            return (
                <Preschooler
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'text-based':
            return (
                <TextBasedContent
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'video-based':
            return (
                <VideoBasedContent
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'audio-based':
            return (
                <AudioBasedContent
                    {...styleProps}
                    fill={styleProps.fill || colours.blue}
                />
            );
        case 'rural':
            return (
                <Rural
                    {...styleProps}
                    fill={styleProps.fill || colours.orange}
                />
            );
        case 'toolbox-logo':
            return (
                <ToolboxLogo
                    {...styleProps}
                    fill={styleProps.fill || colours.secondaryBlue}
                />
            );
        default:
            return <></>;
    }
}

export default LocalIcon;
