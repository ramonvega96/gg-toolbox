import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ContactUsPage from '../components/home/Contact/ContactUsPage';

function ContactUs() {
    return (
        <div>
            <Header toggleBanner={true} />
            <ContactUsPage />
            <Footer pageAnalitycsId="contact-us-page" />
        </div>
    );
}

export default ContactUs;
