import { useState } from 'react';
import australiaJSON from '../../../assets/json/australia.json';
import { useIntl } from 'react-intl';

interface AustraliaMapInterface {
    setSelectedState(state: string): void;
}

/**
 * This renders the australian map.
 * @param props the next component to render after the state has been selected
 * @returns JSX element
 */
function AustraliaInteractiveMap(props: AustraliaMapInterface) {
    const messages = useIntl();
    const { setSelectedState } = props;
    const fontStyle = 'font-forma text-4xl fill-white hover:cursor-pointer';

    const stateStyle =
        'fill-primaryBlue stroke-white stroke-[2] hover:cursor-pointer';

    const getStyleOnHover = (state: string): string => {
        let fillColor = 'primaryBlueDark';

        switch (state) {
            case 'NSW':
                fillColor = 'secondaryOrange';
                break;
            case 'VIC':
                fillColor = 'secondaryYellow';
                break;
            case 'QLD':
                fillColor = 'secondaryGreen';
                break;
            case 'SA':
                fillColor = 'secondaryRed';
                break;
            case 'WA':
                fillColor = 'primaryBlueDark';
                break;
            case 'TAS':
                fillColor = 'secondaryGreen';
                break;
            case 'ACT':
                fillColor = 'primaryGreen';
                break;
            case 'NT':
                fillColor = 'secondaryPink';
                break;
        }

        return `stroke-white stroke-[2] hover:cursor-pointer fill-${fillColor}`;
    };

    const [qldStyle, setQLDStyle] = useState<string>(stateStyle);
    const [nswStyle, setNSWStyle] = useState<string>(stateStyle);
    const [actStyle, setACTStyle] = useState<string>(stateStyle);
    const [vicStyle, setVICStyle] = useState<string>(stateStyle);
    const [tasStyle, setTASStyle] = useState<string>(stateStyle);
    const [ntStyle, setNTStyle] = useState<string>(stateStyle);
    const [waStyle, setWAStyle] = useState<string>(stateStyle);
    const [saStyle, setSAStyle] = useState<string>(stateStyle);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1280.89 1200"
        >
            <g
                id="QLD"
                onClick={() => {
                    setSelectedState('QLD');
                }}
                onMouseEnter={() => {
                    setQLDStyle(getStyleOnHover('QLD'));
                }}
                onMouseLeave={() => {
                    setQLDStyle(stateStyle);
                }}
            >
                <path
                    d={australiaJSON.QLD + ' ' + australiaJSON.ATSI}
                    strokeMiterlimit="10"
                    className={qldStyle}
                />
                <text
                    textAnchor="middle"
                    x="1009"
                    y="455"
                    id="QLD-text"
                    fill="#fff"
                    className={fontStyle}
                    onMouseEnter={() => {
                        setQLDStyle(getStyleOnHover('QLD'));
                    }}
                >
                    {messages.formatMessage({ id: 'QLD' })}
                </text>
            </g>
            <g
                id="NT"
                onClick={() => {
                    setSelectedState('NT');
                }}
                onMouseEnter={() => {
                    setNTStyle(getStyleOnHover('NT'));
                }}
                onMouseLeave={() => {
                    setNTStyle(stateStyle);
                }}
            >
                <path
                    d={australiaJSON.NT}
                    className={ntStyle}
                    strokeMiterlimit="10"
                />
                <text
                    id="NT-text"
                    x="609"
                    y="355"
                    fill="#fff"
                    className={fontStyle}
                    onMouseEnter={() => {
                        setNTStyle(getStyleOnHover('NT'));
                    }}
                >
                    {messages.formatMessage({ id: 'NT' })}
                </text>
            </g>
            <g
                id="WA"
                onClick={() => {
                    setSelectedState('WA');
                }}
                onMouseEnter={() => {
                    setWAStyle(getStyleOnHover('WA'));
                }}
                onMouseLeave={() => {
                    setWAStyle(stateStyle);
                }}
            >
                <path
                    d={australiaJSON.WA}
                    className={waStyle}
                    strokeMiterlimit="10"
                />
                <text
                    id="WA-text"
                    x="255"
                    y="550"
                    fill="#fff"
                    className={fontStyle}
                    onMouseEnter={() => {
                        setWAStyle(getStyleOnHover('WA'));
                    }}
                >
                    {messages.formatMessage({ id: 'WA' })}
                </text>
            </g>
            <g
                id="SA"
                onClick={() => {
                    setSelectedState('SA');
                }}
                onMouseEnter={() => {
                    setSAStyle(getStyleOnHover('SA'));
                }}
                onMouseLeave={() => {
                    setSAStyle(stateStyle);
                }}
            >
                <path
                    d={australiaJSON.SA}
                    className={saStyle}
                    strokeMiterlimit="10"
                />
                <text
                    id="SA-text"
                    fill="#fff"
                    x="675"
                    y="650"
                    className={fontStyle}
                    textAnchor="middle"
                    onMouseEnter={() => {
                        setSAStyle(getStyleOnHover('SA'));
                    }}
                >
                    {messages.formatMessage({ id: 'SA' })}
                </text>
            </g>
            <g id="NSW">
                <path
                    d={australiaJSON.NSW}
                    className={nswStyle}
                    strokeMiterlimit="10"
                    onClick={() => {
                        setSelectedState('NSW');
                    }}
                    onMouseEnter={() => {
                        setNSWStyle(getStyleOnHover('NSW'));
                    }}
                    onMouseLeave={() => {
                        setNSWStyle(stateStyle);
                    }}
                />
                <text
                    id="NSW-text"
                    fill="#fff"
                    x="975"
                    y="750"
                    className={fontStyle}
                    onClick={() => {
                        setSelectedState('NSW');
                    }}
                    onMouseEnter={() => {
                        setNSWStyle(getStyleOnHover('NSW'));
                    }}
                >
                    {messages.formatMessage({ id: 'NSW' })}
                </text>
                <circle
                    id="ACT"
                    cx="1123.56"
                    cy="827.57"
                    r="21.5"
                    className={actStyle}
                    onClick={() => {
                        setSelectedState('ACT');
                    }}
                    onMouseEnter={() => {
                        setACTStyle(getStyleOnHover('ACT'));
                    }}
                    onMouseLeave={() => {
                        setACTStyle(stateStyle);
                    }}
                />
                <text
                    id="ACT-text"
                    fill="#fff"
                    x="1095"
                    y="790"
                    className={fontStyle}
                    onClick={() => {
                        setSelectedState('ACT');
                    }}
                    onMouseEnter={() => {
                        setACTStyle(getStyleOnHover('ACT'));
                    }}
                >
                    {messages.formatMessage({ id: 'ACT' })}
                </text>
            </g>
            <g
                id="VIC"
                onClick={() => {
                    setSelectedState('VIC');
                }}
                onMouseEnter={() => {
                    setVICStyle(getStyleOnHover('VIC'));
                }}
                onMouseLeave={() => {
                    setVICStyle(stateStyle);
                }}
            >
                <g>
                    <path
                        data-name="Path 2138"
                        d={australiaJSON.VIC}
                        className={vicStyle}
                        strokeMiterlimit="10"
                    />
                </g>
                <text
                    id="VIC-text"
                    fill="#fff"
                    x="920"
                    y="950"
                    className={fontStyle}
                    onMouseEnter={() => {
                        setVICStyle(getStyleOnHover('VIC'));
                    }}
                >
                    {messages.formatMessage({ id: 'VIC' })}
                </text>
            </g>
            <g
                id="TAS"
                onClick={() => {
                    setSelectedState('TAS');
                }}
                onMouseEnter={() => {
                    setTASStyle(getStyleOnHover('TAS'));
                }}
                onMouseLeave={() => {
                    setTASStyle(stateStyle);
                }}
            >
                <g>
                    <path
                        data-name="Path 2144"
                        d={australiaJSON.TAS}
                        className={tasStyle}
                        strokeMiterlimit="10"
                        strokeWidth="5.48"
                    />
                </g>
                <text
                    id="TAS-text"
                    fill="#fff"
                    x="1030"
                    y="1150"
                    className={fontStyle}
                    onMouseEnter={() => {
                        setTASStyle(getStyleOnHover('TAS'));
                    }}
                >
                    {messages.formatMessage({ id: 'TAS' })}
                </text>
            </g>
        </svg>
    );
}

export default AustraliaInteractiveMap;
