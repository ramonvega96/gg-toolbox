import '../assets/css/App.scss';
import { Routes, Route } from 'react-router-dom';
import LumpyRoadToSolids from './lumpyRoadToSolids/LumpyRoadToSolids';
import ReadingFormulaLabels from './readingFoodLabels/ReadingFormulaLabels';
import ReadingFormulaLabelsHP from './readingFoodLabels/ReadingFormulaLabelsHP';
import ChoosingBabyFoods from './readingFoodLabels/ChoosingBabyFoods';
import LumpyRoadToSolidsTB from './lumpyRoadToSolidsTinyBites/LumpyRoadToSolidsTB';

function DigitalResources() {
    return (
        <>
            <Routes>
                <Route
                    path="/lumpy-road-to-solids"
                    element={<LumpyRoadToSolids />}
                />
                <Route
                    path="/lumpy-road-to-solids-tb"
                    element={<LumpyRoadToSolidsTB />}
                />
                <Route
                    path="/reading-formula-labels"
                    element={<ReadingFormulaLabels />}
                />
                <Route
                    path="/reading-formula-labels-hp"
                    element={<ReadingFormulaLabelsHP />}
                />
                <Route
                    path="/choosing-baby-foods"
                    element={<ChoosingBabyFoods />}
                />
            </Routes>
        </>
    );
}

export default DigitalResources;
