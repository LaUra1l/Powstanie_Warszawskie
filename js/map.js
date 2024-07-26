function initMap() {
    // The map, centered at a middle point between all markers
    const centerPoint = { lat: 52.24, lng: 20.99 };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: centerPoint,
      mapId: 'YOUR_MAP_ID' // Replace with your actual Map ID
    });

    // The markers
    const locations = [
      { lat: 53.43546676635742, lng: 10.233931541442871, title: 'First location' },
      { lat: 52.21104049682617, lng: 21.05608367919922, title: 'Second location' },
      { lat: 52.254817962646484, lng: 20.98223114013672, title: 'Third location' },
      { lat: 52.258087158203125, lng: 20.951814651489258, title: 'Fourth location' }
    ];

    locations.forEach((location) => {
      new google.maps.marker.AdvancedMarkerElement({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map,
        title: location.title,
      });
    });
}



new Navigation(`.date_1_btn`,`.contenerMap`,'click');