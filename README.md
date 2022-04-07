# Foodchecker

## User Story

Als foodie, wil ik tijdens het boodschappen doen een product kunnen scannen, zodat ik meer informatie over het product kan lezen en een goede keuze kan maken of het bij mijn dieet past.

## Beschrijving

De oplossing voor de user story is Foodchecker, deze applicatie scant barcodes met behulp van de Barcode Detection API. De Barcode Detection is een API waarmee je barcodes kan scannen met de camera van je laptop en telefoon. Ook is het mogelijk om gebruik te maken van de zoekbalk om producten te vinden, want helaas wordt de Barcode Detection API door de meeste browsers niet ondersteund.

## Hoe te installeren

Foodchecker kan eenvoudig worden geïnstalleerd met behulp van de Command Line. Om Foodchecker te gebruiken is zowel [Node.js](https://nodejs.org/en/) als de [Node Package Manager](https://www.npmjs.com/) geïnstalleerd.
Om de repository te clonen via de CL is het ook van belang dat [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is geïnstalleerd.

### Clone Repo

```
git clone https://github.com/zainuwachtig/foodchecker-node.git
```

### Navigate to directory

```
cd foodchecker-node
```

### Downloading packages & dependencies

```
npm install
```

### Start server

```
npm start
```

## Gebruikte API's

Voor foodchecker is gebruik gemaakt van de [Barcode Detection API ](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API) om de producten te scannen en de [Open Food API](https://world.openfoodfacts.org/data) om de gescande producten op te halen uit de database.

In de Open Food API staan producten die gebruikers zelf kunnen aanvullen met bijvoorbeeld hoeveel suikers erin een product zitten, land van herkomst en of het e-nummers bevat.

## Overige externe databronnen

De applicatie is gebouwd met [Node.js](https://nodejs.org/en/) en [Express](https://expressjs.com/). Als template engine heb ik gekozen voor [EJS](https://ejs.co/) omdat de syntax erg overeenkomt met die van html.

## Serverside renderen

Alle HTML pagina's worden gerenderd met EJS op de server. Met een template engine, zoals EJS, kan je een applicatie dynamischer en sneller maken dan wanneer je de HTML op de client serveert. De template engine vervangt data uit de Open Food API (JSON) door 'echte' waardes die worden begrepen door de browser. Zeker in combinatie met Express is dit heel makkelijk te serveren, hoe je html rendert door middel van routes met Express wordt [hier](https://github.com/mde/ejs/wiki/Using-EJS-with-Express) uitgelegd.

## Clientside

Nog steeds gebeuren er dingen aan de clientside, zoals het vragen om activeren van de camera (dit zou best spannend zijn al zou de server dit kunnen bepalen) en de Barcode Scanner API werkt alleen clientside.

## Service Worker

Foodchecker maakt gebruik van een [Service Worker](https://developer.chrome.com/docs/workbox/service-worker-overview/) om data op te slaan in de cache en bepaalde bestanden sneller te laden wanneer de gebruiker de applicatie vaker gebruikt (denk hierbij aan de css en clientside javascript). Ook kan je met een service worker:

- De applicatie toevoegen aan je beginscherm.
- Er is offline support (bijvoorbeeld een offline fallback pagina).
- De applicatie kan push notificaties sturen.
- Applicaties kunnen in de Play Store en App Store geplaatst worden.

De service worker wordt uitgevoerd aan de clientside.

### App Manifest

Voor het opzetten van een Service Worker is er eerst een App Manifest nodig, dit is een JSON bestand met metadata, zoals de naam, versie en een beschrijving van de app. Een voorbeeld van een manifest.json vind je [hier](https://web.dev/add-manifest/).

### Cache

Met de service worker worden bestanden uit de cache gehaald en geserveerd aan de gebruiker, zie onderstaande afbeelding voor een voorbeeld.
In de applicatie is er een verschil tussen een statische cache (o.a. css, iconen en de offline pagina) en een dynamische cache (producten die de gebruiker heeft gescand). Bestanden kunnen alleen toegevoegd of geüpdatet worden aan de cache van de gebruiker als die verbonden is met het internet.

Bestanden die je toe wil voegen aan de statische cache kan in `sw.js` en dan de als route in `CORE_ASSETS`.

![Network tab Chrome dev tools](https://user-images.githubusercontent.com/74155415/162265264-7369a698-5e08-44ed-8123-cf814fe5668b.png)

## Optimalization

Om de applicatie te optimaliseren is er gebruik gemaakt van [compression](https://www.npmjs.com/package/compression).

Het minimaliseren van clientside javascript en css met [minify](https://www.npmjs.com/package/minify). Dit kan snel uitgevoerd worden in de CLI met `npm minify-js` en `npm minify-css`, die vervolgens de bestanden verkleinen naar `script.min.js` en `style.min.css`.

Met `font-display: swap` wordt eerst het fallback font ingeladen als het externe font nog niet ingeladen is en zal dan later 'geswapt' worden.

Met `@font-face` wordt het externe font in de css geladen en heb ik de `<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">` uit de head gehaald, op aanraden van Lighthouse.

Ten slotte haalde ik de applicatie door [Lighthouse](https://developers.google.com/web/tools/lighthouse), een tool in Chrome DevTools om je site mee te optimaliseren. Alles was gelukt, want ik ontving 100 op alle onderdelen!
![Lighthouse score](https://user-images.githubusercontent.com/74155415/162282876-674c088e-0f88-419d-a9e3-fb443bd80cf1.png)

## Activity Diagram

## License

[MIT](LICENSE)
