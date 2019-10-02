import Layout from './Layout';

const plantObjects = [];


export default class Plant {
  constructor(resource) {
    this.id = resource.id;
    this.name = resource.name;
    this.namePlural = resource.name_plural;
    this.scientificName = resource.scientific_name;
    this.layoutIds = resource.layouts;
    this.goodNeighborIds = resource.good_neighbors;
    this.badNeighborIds = resource.bad_neighbors;
    this.className = resource.name.toLowerCase().replace(/ /g, '-');
    this.imageName = resource.name.toLowerCase().replace(/ /g, '-');
    this.defaultLayout = this.defaultLayout.bind(this);
  }

  static getObject(id) {
    return plantObjects.find(plant => plant.id === id);
  }

  static allObjects() {
    return plantObjects;
  }

  static loadObjectsFromApi() {
    fetch('/backend/plants/')
      .then(response => {
        return (response.status === 200) ? response.json() : null;
      })
      .then(data => {
        if (data) {
          data.forEach(resource => plantObjects.push(new Plant(resource)));
        }
      });
  }

  defaultLayout() {
    return Layout.getObject(this.layoutIds[0]);
  }
}