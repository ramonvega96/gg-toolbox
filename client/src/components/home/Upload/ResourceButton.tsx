/**
 * ResourceButton component is for the 'build a resource' and 'upload a resource' buttons
 * on the health proffesionals page.
 */

import { useNavigate } from 'react-router-dom';

interface ResourceButtonProps {
    title: string;
    svg: JSX.Element;
    leftPadding?: boolean;
    borderColor?: string;
    route: string;
}

/**
 * ResourceButton component displays svg next to title which is a link to a route
 *
 * @param title title of button
 * @param svg svg image displayed next to title
 * @param leftPadding if true, the button will be floated right on bigger screens
 * @param borderColor border color of button
 * @param route route to navigate to when button is clicked
 */

const ResourceButton = ({
    title,
    svg,
    leftPadding,
    borderColor,
    route,
}: ResourceButtonProps) => {
    const navigate = useNavigate();

    return (
        <div
            className={`w-full ${
                borderColor &&
                `max-md:border-t max-md:border-black md:border-t-8 ${borderColor}`
            }`}
        >
            <div
                className={`max-lg:w-full py-8 flex flex-row items-center hover:bg-lightGrey px-12 
                lg:px-32 xl:px-48 min-[2000px]:px-64 hover:cursor-pointer ${
                    leftPadding ? `lg:float-right` : `lg:float-left`
                }`}
                onClick={() => {
                    navigate(route);
                }}
            >
                <div>{svg}</div>
                <div className="font-omnes text-xl text-primaryBlueDark pl-10">
                    {title}
                </div>
            </div>
        </div>
    );
};

export default ResourceButton;
