import { PlacesType, Tooltip } from 'react-tooltip';
import { ReactElement, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

interface InfoTooltipInterface {
    dataTooltipText: string | ReactElement;
    dataTooltipId: string;
    tooltipPosition: string;
    dark?: boolean;
}

const InfoTooltip = (props: InfoTooltipInterface) => {
    const { dataTooltipText, dataTooltipId, tooltipPosition, dark } = props;
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1280);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <div
                className={`flex items-center justify-center text-center rounded-full ${
                    dark ? 'bg-primaryBlueDark' : 'bg-white'
                } w-4 h-4 cursor-pointer pt-0.5 pl-0.5`}
                data-tooltip-id={dataTooltipId}
                data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    dataTooltipText as ReactElement
                )}
            >
                <p
                    className={`${
                        dark ? 'text-white' : 'text-primaryBlueDark'
                    }  text-xs font-omnes font-bold m-0`}
                >
                    i
                </p>
            </div>
            <Tooltip
                id={dataTooltipId}
                className="text-black font-sans text-base"
                opacity={1}
                style={{
                    backgroundColor: '#F2F2F2',
                    width: '350px',
                    zIndex: 1,
                }}
                place={tooltipPosition as PlacesType}
                openOnClick={isMobileView}
            />
        </div>
    );
};

export default InfoTooltip;
