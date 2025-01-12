interface YoutubeEmbedProps {
    embedId: string;
    paddingBottom: string;
}

function YoutubeEmbed(props: YoutubeEmbedProps) {
    const { embedId, paddingBottom } = props;
    return (
        <div className={`relative w-full h-full ${paddingBottom}`}>
            <iframe
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={`https://www.youtube.com/embed/${embedId}`}
                title="YouTube video player"
            />
        </div>
    );
}

export default YoutubeEmbed;
