const cache = {};


function loadObjectIntoCache(objectName, callbackOnComplete = null) {
  fetch(`/backend/${objectName}/`)
    .then(response => {
      if (response.status !== 200) {
        return null;
      } else {
        return response.json();
      }
    })
    .then(data => {
      cache[objectName] = data;
      if (callbackOnComplete) {
        callbackOnComplete();
      };
    });
}


export function loadCache() {
  loadObjectIntoCache('plants');
  loadObjectIntoCache('layouts');
}


export function plants() {
  if (!('plants' in cache)) {
    loadObjectIntoCache('plants');
  }
  return cache.plants;
}


export function layouts() {
  if (!('layouts' in cache)) {
    loadObjectIntoCache('layouts');
  }
  return cache.layouts;
}


export function plant(id) {
  return cache.plants.find(plant => plant.id == id);
}


export function layout(id) {
  return cache.layouts.find(layout => layout.id == id);
}