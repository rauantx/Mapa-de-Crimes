// Criar mapa centrado em Horizonte-CE
const map = L.map('map').setView([-4.11458000, -38.51498000], 13);

// Adicionar camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Ler CSV e criar marcadores
Papa.parse('crimes.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        results.data.forEach(function(row) {
            const lat = parseFloat(row.latitude);
            const lng = parseFloat(row.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
                L.marker([lat, lng])
                 .addTo(map)
                 .bindPopup(`<b>${row.crime}</b><br>${row.bairro}<br>${row.data}`);
            }
        });
    }
});
