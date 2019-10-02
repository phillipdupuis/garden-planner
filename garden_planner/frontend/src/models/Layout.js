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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    };
  }

  static getObject(id) {
    return layoutObjects.find(layout => layout.id === id);
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