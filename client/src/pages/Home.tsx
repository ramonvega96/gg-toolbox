import { useContext } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import GrowAndGo from '../components/home/categories/GrowAndGo';
import AboriginalAndTorresStrait from '../components/home/categories/AboriginalAndTorresStrait';
import { HomePathwayContext } from '../utils/HomeContext';
import HealthProfessionals from '../components/home/categories/HealthProfessionals';
import ParentsAndFamilies from '../components/home/categories/ParentsAndFamilies';
import EarlyChildhoodEducation from '../components/home/categories/EarlyChildhoodEducation';
import MulticulturalResources from '../components/home/categories/MulticulturalResources';
import GrowGoToolbox from '../components/home/categories/GrowGoToolbox';

function Home() {
    const { path } = useContext(HomePathwayContext);

    const getPageAnalitycsId = () => {
        switch (path) {
            case 'growAndGo':
                return 'landing';
            case 'aboriginalAndTorresStrait':
                return 'atsi';
            case 'healthProfessionals':
                return 'health-professionals';
            case 'parentsAndFamilies':
                return 'parents-and-families';
            case 'earlyChildhoodEducation':
                return 'ecec';
            case 'multiculturalResources':
                return 'multicultural-resources';
            case 'growGoToolbox':
                return 'g&g-resources';
            default:
                return '';
        }
    };

    function renderHomeCategory(pagePath: string) {
        switch (pagePath) {
            case 'growAndGo':
                return <GrowAndGo />;
            case 'aboriginalAndTorresStrait':
                return <AboriginalAndTorresStrait />;
            case 'healthProfessionals':
                return <HealthProfessionals />;
            case 'parentsAndFamilies':
                return <ParentsAndFamilies />;
            case 'earlyChildhoodEducation':
                return <EarlyChildhoodEducation />;
            case 'multiculturalResources':
                return <MulticulturalResources />;
            case 'growGoToolbox':
                return <GrowGoToolbox />;
            default:
                return <GrowAndGo />;
        }
    }

    return (
        <div>
            <Header toggleBanner={true} />

            {/* These render the different category pages when using the header navigation bar */}
            {renderHomeCategory(path)}

            <Footer
                proudlySupported={path === 'growAndGo'}
                pageAnalitycsId={`home-${getPageAnalitycsId()}-page`}
            />
        </div>
    );
}

export default Home;
