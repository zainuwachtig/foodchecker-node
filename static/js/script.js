async function detectCamera() {
    const camera = document.querySelector('video');
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
            ideal: "enviroment"
            }
        },
    });
    camera.srcObject = stream;
  
    // Als de camera is toegestaan wordt de melding weggehaald
    if (stream.getVideoTracks().length > 0) {
      const melding = document.querySelector('.melding');
      melding.classList.add('onzichtbaar')
    }
    
    await camera.play();
    detectBarcode(camera)
};

// https://dev.to/ycmjason/detecting-barcode-from-the-browser-d7n
async function detectBarcode(camera) {
    window.setInterval(async () => {
      const barcodeDetector = new BarcodeDetector();
      const barcodes = await barcodeDetector.detect(camera);
      // Als de length dus 0 of kleiner is, is er geen product gevonden en zoekt die verder.
      if (barcodes.length <= 0) {
        return;
      // Wanneer een product gevonden is, wordt dat in een array gezet en daar wordt de eerste dan uitgehaald, wat de gescande barcode is.
      } else {
        const barcode = barcodes[0].rawValue
        // Hiermee voert die getData(barcode) uit
        window.location.pathname = 'product/' + barcode;
      }
    }, 1000)
};

detectCamera();

// Kijken of de sw.js er is.
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then((reg) => console.log('Service worker registered', reg))
  .catch((err) => console.log('Service worker not registered', err))
}