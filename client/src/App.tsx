import Home from './pages/Home';
import './assets/css/App.scss';
import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import FHP from './pages/FHP';
import { PathWayProvider } from './utils/Contexts';
import BrowseCategories from './pages/BrowseCategories';
import ContactUs from './pages/ContactUs';
import Upload from './pages/Upload';
import TermsAndConditions from './pages/TermsAndConditions';
import Accessibility from './pages/Accessibility';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import AdministratorPanel from './pages/AdministratorPanel';
import ProtectedRoute from './utils/ProtectedRoute';
import DigitalResources from './digitalResources/DigitalResources';
import Help from './pages/Help';
import ECECPodcast from './pages/ECECPodcast';
import AdministratorPanelTB from './pages/AdministratorPanelTB';
import PAR from './pages/PAR';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/search"
                    element={<Search />}
                />
                <Route
                    path="/find-a-health-professional"
                    element={
                        <PathWayProvider>
                            <FHP />
                        </PathWayProvider>
                    }
                />
                <Route
                    path="/browse"
                    element={<BrowseCategories />}
                />
                <Route
                    path="/contact-us"
                    element={<ContactUs />}
                />
                <Route
                    path="/help"
                    element={<Help />}
                />
                <Route
                    path="/upload-a-resource"
                    element={<Upload />}
                />
                <Route
                    path="/personalise-a-resource"
                    element={<PAR />}
                />
                <Route
                    path="/G&G-podcast"
                    element={<ECECPodcast />}
                />
                <Route
                    path="/about-us"
                    element={<AboutUs />}
                />
                <Route
                    path="/terms-of-use"
                    element={<TermsAndConditions />}
                />
                <Route
                    path="/accessibility"
                    element={<Accessibility />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/digital-resources/*"
                    element={<DigitalResources />}
                />
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/administrator-panel"
                        element={<AdministratorPanel />}
                    />
                    <Route
                        path="/administrator-panel-tb"
                        element={<AdministratorPanelTB />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
