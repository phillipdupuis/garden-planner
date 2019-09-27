const layoutObjects = [];


class Layout {
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
    this.allPoints = this.allPoints.bind(this);
    this.cellFilledStates = this.cellFilledStates.bind(this);
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

  allPoints() {
      let points = [];
      for (let row = 0 ; row < this.rows ; row++ ) {
          for (let col = 0 ; col < this.cols ; col++ ) {
              points.push([row, col]);
          }
      }
      return points;
  }

  cellFilledStates() {
      const filled = this.fill.map(JSON.stringify);
      return this.allPoints().map(JSON.stringify).map(point => (filled.includes(point)) ? true : false);
  }
}

export default Layout;