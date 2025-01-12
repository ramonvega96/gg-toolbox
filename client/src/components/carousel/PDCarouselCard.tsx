export interface PDCarouselCardProps {
    title: string;
    description: string;
    externalLink: string;
    note?: string;
}

const PDCarouselCard = ({
    title,
    description,
    externalLink,
    note,
}: PDCarouselCardProps) => {
    return (
        <div
            className="flex flex-col bg-white items-start text-center transition ease-in-out delay-10 hover:!bg-lightGrey whitespace-pre-wrap w-80 h-full pt-12 pb-4 px-4 border-[0.25px] border-black shadow-[0px_3px_2px_#00000054] cursor-pointer"
            onClick={() => {
                window.open(externalLink, '_blank');
            }}
        >
            <h1 className="w-full text-xl font-bold font-omnes text-primaryBlueDark">
                {title}
            </h1>
            <p className="text-xs my-2">{description}</p>
            {note && (
                <p className="w-full text-xs font-bold italic text-black">
                    {note}
                </p>
            )}
        </div>
    );
};

export default PDCarouselCard;
