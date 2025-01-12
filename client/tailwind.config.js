/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '100px',
                mdsm: '350px',
                sm: '640px',
                md: '765px',
                mymd: '962px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
                '3xl': '1900px',
                '4xl': '2000px',

            },
            fontFamily: {
                sans: ['forma-djr-micro', 'sans-serif'],
                omnes: ['omnes-pro', 'sans-serif'],
                gelica: ['gelica', 'sans-serif'],
                roboto: ['roboto', 'sans-serif'],
            },
            colors: {
                white: '#FFFFFF',
                black: '#000000',
                lightGrey: '#F1F1F1',
                midGrey: '#8D9FB1',
                checkerGrey: '#F2F2F3',
                primaryGreen: '#1C8B48',
                primaryBlue: ' #1B5D9F',
                primaryBlueDark: '#142E54',
                primaryGrey: '#CBCBCB',
                secondaryBlue: '#185EA1',
                secondaryGreen: '#1E9B50',
                secondaryRed: '#DC4A36',
                secondaryOrange: '#F8952A',
                secondaryYellow: '#FFCE39',
                secondaryPink: '#F37778',
                tertiaryGreen: '#1B8A47',
                formBorderGrey: '#707070',
                formTextGrey: '#ADADAD',
                tbPrimaryBlue: '#3681B9',                
                tbSecondaryBlue: '#214C88',
                tbTertiaryBlue: '#3581B9',
                tbPeach: '#F9A565',
                tbPink: '#E17297',
                tbPinkDark: '#BE617E',
                tblightGreen: '#53C0A6',
                tbYellow: '#FFD23F',
                tbDarkPink: '#E27396',
                tbDarkRed: '#D12E3A',
                tbTeal: '#54C0A6',
                tbDarkTeal: '#439F89',
                tbModalGray: '#F2F2F2'
            },
            dropShadow: {
                mysm: '0 3px 2px #00000054',
            },
            boxShadow: {
                orange: '0 -0.4em #FF9233',
            },
            rotate: {
                30: '30deg',
            },
            backgroundImage: {
                'road': "url('/src/assets/images/digitalResources/lumpyRoadToSolids/road.png')",
                'road-mobile': "url('/src/assets/images/digitalResources/lumpyRoadToSolids/road-mobile.png')",
                'tb-road': "url('/src/assets/images/digitalResources/lumpyRoadToSolids/tb-road.png')",
                'tb-road-mobile': "url('/src/assets/images/digitalResources/lumpyRoadToSolids/tb-road-mobile.png')",
            },
        },
    },
    variants: {
        fill: ['hover', 'focus'],
    },
    plugins: [require('daisyui')],
    safelist: [
        {
            pattern:
                /(bg|text|border|btn|fill)-(primary|secondary)(Blue|BlueDark|Grey|Green|Red|Orange|Yellow|Pink)/,
        },
    ],
};
