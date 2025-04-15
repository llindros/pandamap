mapboxgl.accessToken = 'pk.eyJ1IjoibGlseWxpbmQiLCJhIjoiY2x3amdzanBmMTJidzJqbWpnYzlkZnAyZyJ9.csn_7z53ZtqByVzYMZRVuA';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/lilylind/clwjhkej600r601q1hdwj8vjw',
    center: [0, 0], // starting position
    zoom: 2, // starting zoom
    minZoom: 2,
    maxZoom: 5,
    maxBounds: [[-180, -85], [180, 85]], // Restrict panning to the world bounds
    renderWorldCopies: false // Disable horizontal map wrapping
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutLink = document.querySelector(".topnav a[href='#about']");
    const popup = document.getElementById("aboutPopup");
    const closeBtn = popup.querySelector(".close-btn");
  
    // Show the popup when the "About" link is clicked
    aboutLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      popup.style.display = "block";
    });
  
    // Hide the popup when the close button is clicked
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  
    // Hide the popup when clicking outside the popup content
    window.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  });

map.on('load', () => {
    map.setMaxPitch(0);
    map.setMinPitch(0);

    // Add the GeoJSON source for zoos
    map.addSource('zoos', {
        type: 'geojson',
        data: './zoos.geojson' // Path to your GeoJSON file
    });

    // Add the panda icon image to the map
    map.loadImage('./pandaicon.png', (error, image) => {
        if (error) throw error;

        // Add the image to the map's style
        map.addImage('panda-icon', image);

        // Add a layer to display the points with the panda icon
        map.addLayer({
            id: 'zoos-layer',
            type: 'symbol', // Use a symbol layer for icons
            source: 'zoos',
            layout: {
                'icon-image': 'panda-icon', // Reference the added image
                'icon-size': [
                    'interpolate', // Use interpolation for smooth scaling
                    ['linear'], // Linear interpolation
                    ['zoom'], // Based on the zoom level
                    2, 0.1, // At zoom level 2, icon size is 0.1
                    5, 0.3, // At zoom level 5, icon size is 0.3
                    10, 0.6 // At zoom level 10, icon size is 0.6
                ],
                'icon-anchor': 'center' // Anchor the icon at its center
            }
        });

        console.log('Zoos layer with dynamic icon size added successfully!');
    });
});


