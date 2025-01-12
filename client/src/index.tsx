import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import en from './lang/en.json';
import { HomePathWayProvider } from './utils/HomeContext';
import ScrollToTop from './utils/ScrollToTop';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
        <ScrollToTop />
        <HomePathWayProvider>
            <IntlProvider
                locale="en"
                messages={en}
            >
                <App />
            </IntlProvider>
        </HomePathWayProvider>
    </Router>
);

reportWebVitals();
