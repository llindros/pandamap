mapboxgl.accessToken = 'pk.eyJ1IjoibGlseWxpbmQiLCJhIjoiY2x3amdzanBmMTJidzJqbWpnYzlkZnAyZyJ9.csn_7z53ZtqByVzYMZRVuA';
    
    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/lilylind/clwjhkej600r601q1hdwj8vjw', //style link
        center: [0,0], // starting position
        zoom: 1.3, // starting zoom
        FontFaceSet: ['Lato']
    });

