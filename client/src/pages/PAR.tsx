import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const EmbeddedCanva = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '570vw',
                paddingTop: '56.2225%',
                paddingBottom: '0',
                boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                overflow: 'hidden',
                willChange: 'transform',
            }}
        >
            <iframe
                loading="lazy"
                title="PAR"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    border: 'none',
                    padding: '0',
                    margin: '0',
                }}
                src="https://www.canva.com/design/DAFkPYgJx0k/view?embed"
                allowFullScreen={false}
            ></iframe>
        </div>
    );
};

function PAR() {
    return (
        <div>
            <Header toggleBanner={true} />
            {EmbeddedCanva()}
            <Footer pageAnalitycsId="personalise-a-resource" />
        </div>
    );
}

export default PAR;
