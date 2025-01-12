import { useNavigate } from 'react-router-dom';

export interface BrowseCardProps {
    title: string;
    bulletPoints: string;
    searchTerm: string;
}

/**
 * This component returns a browse card. These cards feature a title, a description
 * and a button that links to a pre-filled search page based on the card details.
 * @param props
 *    title - the title of the string
 *    bulletPoints - string that forms the body of the card
 * @returns a browse card
 */
function BrowseCard(props: BrowseCardProps) {
    const { title, bulletPoints, searchTerm } = props;
    const navigate = useNavigate();

    return (
        <div
            className={`px-8 py-8 col-span-2 cursor-pointer 
                transition ease-in-out delay-10 hover:!bg-lightGrey border-[0.25px] 
                border-black shadow-[0px_3px_2px_#00000054]`}
            onClick={() => {
                navigate(`/search?subcategories=${searchTerm}`);
            }}
            id="topic-card"
        >
            <h3 className="font-forma font-semi-bold text-2xl text-primaryBlueDark">
                {title}
            </h3>
            <div className="text-primaryBlueDark pt-4 text-md font-forma">
                <ul className="list-disc">
                    {bulletPoints.split(';').map((bullet, index) => {
                        return <li key={`list-item-${index}`}>{bullet}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default BrowseCard;
