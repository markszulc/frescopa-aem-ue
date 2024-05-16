


export async function initMap() {
  // eslint-disable-next-line no-undef
  const { Map } = await google.maps.importLibrary('maps');

  map = new Map(document.getElementById('locator-map'), {
    center: {
      lat: 36.2425741,
      lng: -113.7464011,
    },
    zoom: 8,
  });
  // eslint-disable-next-line no-undef
  infoWindow = new google.maps.InfoWindow({
    map,
  });
  getMyLocation(false);
}



export default function decorate(block) {

  const pText = block.querySelector('p').textContent;
  block.textContent = '';
  
  window.initMap = async () => {
    initMap();
  };

  const d = document.createElement('div');
  d.className = 'map-container';
  const mdiv = document.createElement('div');
  mdiv.id = 'locator-map';
  mdiv.className = 'map';
  d.append(mdiv);
  const rdiv = document.createElement('div');
  rdiv.id = 'locator-results';
  rdiv.className = 'results';
  d.appendChild(rdiv);
  
  const spinner = document.createElement('div');
  spinner.classList.add('loading-modal');
  spinner.style.display = 'none';
  d.appendChild(spinner);

  block.append(d);

}