mapboxgl.accessToken = 'pk.eyJ1IjoibGlseWxpbmQiLCJhIjoiY2x3amdzanBmMTJidzJqbWpnYzlkZnAyZyJ9.csn_7z53ZtqByVzYMZRVuA';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/lilylind/clwjhkej600r601q1hdwj8vjw', // style link
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

