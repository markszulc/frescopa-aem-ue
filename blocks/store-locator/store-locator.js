export async function initMap() {
  // eslint-disable-next-line no-undef
  const { Map } = await google.maps.importLibrary('maps');

  map = new Map(document.getElementById('locator-map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    styles: [
      {
        featureType: "all",
        stylers: [
          { saturation: -100 },
          { visibility : "simplified" }
        ]
      }
    ]  });
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

  const locatorDOM = document.createRange().createContextualFragment(`
  <div class="shopfinder">
    <div class="sidepanel">
      <h1 class="sidepanel__title">Try a new roast at a Fréscopa near you!</h1>
    <div class="search">
      <p class="search__title">Find another location</p>
      <div class="search__box">
        <input class="search__input" type="text" placeholder="Post Code" name="search"></input>
        <button class="search__button">Search</button>
      </div>
    </div>
    </div>
      <div class="map" id="locator-map">
    </div>
  </div>
  `)

  block.append(locatorDOM);

}