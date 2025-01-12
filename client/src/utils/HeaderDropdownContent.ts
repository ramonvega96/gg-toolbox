import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react-hooks/rules-of-hooks */

export const HeaderDropdownContent = (
    categoryType:
        | 'healthProfessionals'
        | 'parentsAndFamilies'
        | 'earlyChildhoodEducation'
        | 'growGoToolbox'
) => {
    const messages = useIntl();
    const navigate = useNavigate();

    const goToExternalLink = (url: string) => {
        window.open(url, '_blank');
    };

    switch (categoryType) {
        case 'healthProfessionals':
            return [
                {
                    title: messages.formatMessage({
                        id: 'resourcesForHP',
                    }),
                    navigationFunction: () => {
                        navigate('/?pathway=health-professionals');
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'professionalDevForHP',
                    }),
                    navigationFunction: () => {
                        navigate(
                            '/search?h=true&audiences=Health+Professionals&resourceTypes=Professional+Development+Courses'
                        );
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'personaliseResource',
                    }),
                    navigationFunction: () => {
                        navigate('/personalise-a-resource');
                    },
                },
            ];
        case 'parentsAndFamilies':
            return [
                {
                    title: messages.formatMessage({
                        id: 'resourcesForParentsAndFamilies',
                    }),
                    navigationFunction: () => {
                        navigate('/?pathway=parents-and-families');
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'FHP',
                    }),
                    navigationFunction: () => {
                        navigate('/find-a-health-professional');
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'findFoodAid',
                    }),
                    navigationFunction: () => {
                        goToExternalLink(
                            'https://www.acnc.gov.au/charity/programs/map?classie=487'
                        );
                    },
                },
            ];
        case 'earlyChildhoodEducation':
            return [
                {
                    title: messages.formatMessage({
                        id: 'resourcesForECE',
                    }),
                    navigationFunction: () => {
                        navigate('/?pathway=early-childhood-education');
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'G&GPodcast',
                    }),
                    navigationFunction: () => {
                        navigate('/G&G-podcast');
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'ECECProDev',
                    }),
                    navigationFunction: () => {
                        navigate(
                            '/search?h=true&audiences=Education+Professionals&resourceTypes=Professional+Development+Courses'
                        );
                    },
                },
            ];
        case 'growGoToolbox':
            return [
                {
                    title: messages.formatMessage({
                        id: 'ourResources',
                    }),
                    navigationFunction: () => {
                        navigate('/?pathway=grow-go-toolbox');
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'browseCategories',
                    }),
                    navigationFunction: () => {
                        navigate('/browse');
                    },
                },
                {
                    title: messages.formatMessage({
                        id: 'aboutUs',
                    }),
                    navigationFunction: () => {
                        navigate('/about-us');
                    },
                },
            ];
    }
};
