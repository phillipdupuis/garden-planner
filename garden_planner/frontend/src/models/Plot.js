import Plant from './Plant';


class Plot {
  constructor(plant = null, layout = null) {
    this.plant = plant;
    this.layout = layout;
  }

  static neighbors(plotRow, plotCol, grid) {
    // returns the plots surrounding the specified one
    const numRows = grid.length;
    const numCols = grid[0].length;
    const validLoc = (row, col) => (
      row >= 0 &&
      row < numRows &&
      col >= 0 &&
      col < numCols &&
      `${row}_${col}` !== `${plotRow}_${plotCol}`
      );
    const neighborPlots = [];
    [plotRow - 1, plotRow, plotRow + 1].forEach(row => {
      [plotCol - 1, plotCol, plotCol + 1].forEach(col => {
        if (validLoc(row, col)) {
          neighborPlots.push(grid[row][col]);
        }
      })
    });
    return neighborPlots;
  }

  static plantPickerGroups(plotRow, plotCol, grid) {
    const neighbors = Plot.neighbors(plotRow, plotCol, grid);
    const neighborPlants = neighbors.map(plot => plot.plant).filter(Boolean);
    const groups = {};
    const [goodIds, neutralIds, badIds] = [new Set(), new Set(), new Set()];

    if (neighborPlants.length === 0) {
      // If there are no neighbors to consider, any plant is a good choice!
      Plant.allObjects().forEach(plant => goodIds.add(plant.id));
    } else {
      // Start with all plants in the NEUTRAL set.
      Plant.allObjects().forEach(plant => neutralIds.add(plant.id));
      // Move everything that's GOOD for one of the neighbors into the good set.
      neighborPlants.forEach(plant => {
        plant.goodNeighborIds.forEach(id => {
          neutralIds.delete(id);
          goodIds.add(id);
        });
      });
      // Then move anything that's BAD for neighbor(s) into the bad set.
      // This has to come last, so it can override any 'good' matches.
      neighborPlants.forEach(plant => {
        plant.badNeighborIds.forEach(id => {
          neutralIds.delete(id);
          goodIds.delete(id);
          badIds.add(id);
        });
      });
    }
    
    // And finally, create a group for each non-empty set
    [
    ['good', goodIds],
    ['neutral', neutralIds],
    ['bad', badIds]
    ].forEach(
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