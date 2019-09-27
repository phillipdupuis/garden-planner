const layoutObjects = [];


export default class Layout {
  constructor(resource) {
    this.id = resource.id;
    this.rows = resource.rows;
    this.cols = resource.cols;
    this.fill = resource.fill;
    this.styles = {
        display: 'grid',
        gridTemplateRows: `repeat(${resource.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${resource.cols}, 1fr)`,
        top: 0,
        left: 0,
        width: '95%',
        height: '95%',
    };
    // create an ordered list of [row, col] pairs for all the points in this layout.
    let points = [];
    for (let row = 0 ; row < resource.rows ; row++ ) {
      for (let col = 0 ; col < resource.cols ; col++ ) {
        points.push([row, col]);
      }
    }
    this.allPoints = points;
    // create a row-major ordered list of booleans indicating which points are filled
    const filled = resource.fill.map(JSON.stringify);
    this.cellFilledStates = points.map(p => (filled.includes(JSON.stringify(p))) ? true : false);
  }

  static getObject(id) {
    return layoutObjects.find(layout => layout.id == id);
  }

  static allObjects() {
    return layoutObjects;
  }

  static loadObjectsFromApi() {
    fetch('/backend/layouts/')
      .then(response => {
        return (response.status === 200) ? response.json() : null;
      })
      .then(data => {
        if (data) {
          data.forEach(resource => layoutObjects.push(new Layout(resource)));
        }
      });
  }
}