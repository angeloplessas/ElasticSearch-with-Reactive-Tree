import Store from './store';
import placeholders from './middle/placeholders';
import middle from './middle/create';
import parents from './parents/create';
import children from './children/create';
import connectors from './connectors';
import positions from './utils/correctPositions';
import getCanvasSize from './utils/getCanvasSize';
import getExtendedNodes from './utils/getExtendedNodes';
import { pipe } from './utils';
const pipeline = pipe(placeholders, middle, parents, children, positions);
export default (nodes, rootId) => {
    const families = pipeline(new Store(nodes, rootId)).familiesArray;
    return {
        families: families,
        canvas: getCanvasSize(families),
        nodes: getExtendedNodes(families),
        connectors: connectors(families),
    };
};
//# sourceMappingURL=index.js.map