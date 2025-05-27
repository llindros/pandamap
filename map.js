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
        map.addImage('pandaicon', image);

        // Add a layer to display the points with the panda icon
        map.addLayer({
            id: 'zoos-layer',
            type: 'symbol', // Use a symbol layer for icons
            source: 'zoos',
            layout: {
                'icon-image': 'pandaicon', // Reference the added image
                'icon-size': [
                    0.1
                    /* 'interpolate', // Use interpolation for smooth scaling
                    ['linear'], // Linear interpolation
                    ['zoom'], // Based on the zoom level
                    2, 0.05, // At zoom level 2, icon size is 0.1
                    5, 0.07, // At zoom level 5, icon size is 0.3
                    10, 0.09 // At zoom level 10, icon size is 0.6 */
                ],
                'icon-anchor': 'center', // Anchor the icon at its center
                'icon-rotate': '180'
            }
        });

        console.log('Zoos layer with dynamic icon size added successfully!');
    });

    // Add hover interaction to display GeoJSON info
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'zoos-layer', (e) => {
        // Ensure there are features under the cursor
        if (e.features && e.features.length > 0) {
            map.getCanvas().style.cursor = 'pointer';
    
            const properties = e.features[0].properties;
    
            popup
                .setLngLat(e.lngLat)
                .setHTML(`<strong>${properties.zoo_name}</strong><br>${properties.country_name}`)
                .addTo(map);
        }
    });
    

    map.on('mouseleave', 'zoos-layer', () => {
        // Reset the cursor
        map.getCanvas().style.cursor = '';

        // Remove the popup
        popup.remove();
    });
});


