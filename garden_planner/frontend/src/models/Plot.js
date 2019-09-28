import Plant from './Plant';
import Layout from './Layout';


class Plot {
    constructor(plant = null, layout = null) {
        this.plant = plant;
        this.layout = layout;
        this.plantPickerOptionGroups = this.plantPickerOptionGroups.bind(this);
    }

    plantPickerOptionGroups(neighboringPlants) {
        const groups = {};
        const [goodIds, neutralIds, badIds] = [new Set(), new Set(), new Set()];
        // If there are no neighbors to consider, any plant is a good choice!
        if (neighboringPlants.length === 0) {
            Plant.allObjects().forEach(plant => goodIds.add(plant.id));
        } else {
            // Start with all plants in the NEUTRAL set.
            Plant.allObjects().forEach(plant => neutralIds.add(plant.id));
            // Move everything that's GOOD for one of the neighbors into the good set.
            neighboringPlants.forEach(plant => {
                plant.goodNeighborIds.forEach(id => {
                    neutralIds.delete(id);
                    goodIds.add(id);
                });
            });
            // Then move anything that's BAD for neighbor(s) into the bad set.
            // This has to come last, so it can override any 'good' matches.
            neighboringPlants.forEach(plant => {
                plant.badNeighborIds.forEach(id => {
                    neutralIds.delete(id);
                    goodIds.delete(id);
                    badIds.add(id);
                });
            })
        }
        // Convert each set with >0 entries into an array and add it to the plant groups.
        [['good', goodIds], ['neutral', neutralIds], ['bad', badIds]].forEach(
            ([name, idSet]) => {
                if (idSet.size > 0) {
                    groups[name] = Array.from(idSet).map(id => Plant.getObject(id));
                }
            }
        );
        return groups;
    }
}

export default Plot;