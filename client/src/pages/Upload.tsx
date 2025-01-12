import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import UploadPage from '../components/home/Upload/UploadPage';

function Upload() {
    return (
        <div>
            <Header toggleBanner={true} />

            <UploadPage />

            <Footer pageAnalitycsId="share-a-resource-page" />
        </div>
    );
}

export default Upload;
