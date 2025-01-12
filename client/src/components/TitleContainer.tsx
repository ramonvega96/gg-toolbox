interface TitleContainerProps {
    title: string;
    subtitle: string;
}

const TitleContainer = ({ title, subtitle }: TitleContainerProps) => {
    return (
        <div
            className={`flex flex-col bg-primaryBlue w-full py-12 lg:py-12 sm:py-3`}
        >
            <div className="flex items-center h-min">
                <div className="bg-primaryBlue flex flex-col text-white text-left justify-center h-full max-xl:pl-20 max-lg:w-full max-lg:py-10 lg:w-3/5 xl:w-1/2 xl:pl-36 pr-16">
                    <h1 className="font-omnes font-bold text-3xl lg:mb-12 max-mymd:mb-10 sm:mb-3">
                        {title}
                    </h1>
                    <span className="font-forma text-xl tracking-normal w-4/5">
                        {subtitle}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default TitleContainer;
