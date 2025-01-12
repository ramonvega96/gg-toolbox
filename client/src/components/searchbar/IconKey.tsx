import { useState } from 'react';
import { IconAttributes, IconContent } from '../localIcon/IconContent';
import LocalIcon from '../localIcon/LocalIcon';

function IconKey() {
    const [iconKeyDisplay, setIconKeyDisplay] = useState<boolean>(false);
    return (
        <div
            className="relative w-full h-full"
            tabIndex={0}
            onMouseLeave={() => setIconKeyDisplay(false)}
            onClick={() => setIconKeyDisplay(!iconKeyDisplay)}
            onBlur={() => setIconKeyDisplay(false)}
        >
            <div
                className="z-[21] absolute rounded-full bg-checkerGrey px-2.5 ml-2"
                onMouseEnter={() => setIconKeyDisplay(true)}
                id="iconkey-icon"
            >
                <span className="text-black text-md">i</span>
            </div>
            <div
                className={`${
                    iconKeyDisplay ? 'absolute' : 'hidden'
                } z-[20] bg-white h-max border w-64 xl:left-5 md:left-[-240px] sm:left-[-240px] xs:left-[-240px] top-3`}
                id="iconkey-container"
            >
                {IconContent.map((icon: IconAttributes, index: number) => {
                    return (
                        <div
                            className={`flex justify-start hover:bg-checkerGrey`}
                            key={index}
                        >
                            <div className="flex px-2 items-center">
                                <LocalIcon
                                    className="inline"
                                    icon={icon.key}
                                    width="2em"
                                    height="2em"
                                />
                            </div>
                            <span className="flex items-center text-left break-normal py-2 pr-2 h-max">
                                {icon.iconTag}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default IconKey;
