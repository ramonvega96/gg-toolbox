import TextArrowButton from '../../sharedComponents/TextArrowButton';

interface ResourceLayoutInterface {
    title: string;
    subtitle: string;
    text: string;
    btn1Text: string;
    btn1Link: string;
    btn2Text: string;
    btn2Link: string;
    btn3Text: string;
    btn3Link: string;
    panel: React.ReactNode;
}

function ResourceLayout(props: ResourceLayoutInterface) {
    const {
        title,
        subtitle,
        text,
        btn1Text,
        btn1Link,
        btn2Text,
        btn2Link,
        btn3Text,
        btn3Link,
        panel,
    } = props;

    const formatLineText = (paragraphs: string[], textClass: string) => {
        return (
            <div data-cy="resource-main-text">
                {paragraphs.map((content, index) => {
                    return (
                        <p
                            key={index}
                            className={`font-forma ${textClass}`}
                        >
                            {content}
                        </p>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`flex flex-col md:flex-row`}>
            <div className="flex flex-col text-white text-left xs:pl-16 md:pl-20 xl:pl-36 xs:pr-16 md:pr-16 xs:py-8 xl:py-16 xs:w-full md:w-2/5 bg-primaryBlue">
                <h1
                    className="font-omnes font-bold xl:text-3xl md:text-2xl xs:text-xl mb-8"
                    data-cy="resource-title"
                >
                    {title}
                </h1>
                <h1
                    className="font-omnes font-bold xl:text-2xl md:text-xl xs:text-base mb-8"
                    data-cy="resource-subtitle"
                >
                    {subtitle}
                </h1>
                {formatLineText(
                    text.split('\n'),
                    'xl:text-xl md:text-base xs:text-sm mb-4'
                )}
                <div className="flex flex-col gap-y-4">
                    <TextArrowButton
                        topText={btn1Text}
                        link={btn1Link}
                    />
                    <TextArrowButton
                        topText={btn2Text}
                        link={btn2Link}
                    />
                    <TextArrowButton
                        topText={btn3Text}
                        link={btn3Link}
                    />
                </div>
            </div>
            <div className="xs:w-full md:w-3/5 md:flex h-full">{panel}</div>
        </div>
    );
}

export default ResourceLayout;
