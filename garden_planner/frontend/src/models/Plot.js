import Plant from './Plant';
import Layout from './Layout';


class Plot {
    constructor(plant = null, layout = null) {
        this.plant = plant;
        this.layout = layout;
    }
}

export default Plot;