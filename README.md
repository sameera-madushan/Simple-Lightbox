# Simple Lightbox

Simple Lightbox is a minimalist and lightweight image viewer designed for effortless integration into any website. It provides a smooth, responsive lightbox experience with support for single images or galleries.

Built to be intuitive and easy to use, Simple Lightbox lets your images shine without any unnecessary complexity. Just click and enjoy.

## Demo

Visit the Simple Lightbox [homepage](https://sameera-madushan.github.io/Simple-Lightbox) to see demo.

## Installation

All pre-built files needed to use Tom Select can be found in the "dist" folder from each of these sources:              

### [npm](https://www.npmjs.com/package/@sameera_madushan/simple_lightbox)

```bash
npm i @sameera_madushan/simple_lightbox
```

### jsDelivr

The fastest way to add Simple Lightbox into your project is to just include the js and css from jsDelivr.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sameera_madushan/simple_lightbox/dist/simple_lightbox.css" />
````
```javascript
<script src="https://cdn.jsdelivr.net/npm/@sameera_madushan/simple_lightbox/dist/simple_lightbox.umd.js"></script>
```

### GitHub

Clone the full repo from GitHub to create custom builds. Use ```npm run build``` to build from source.

## Usage

### 1. UMD Build (Browser)

```html
<link rel="stylesheet" href="../dist/simple_lightbox.css">
<script src="../dist/simple_lightbox.umd.js"></script>

<div class="gallery">
  <img src="./assets/img1.jpg">
  <img src="./assets/img2.jpg">
  <img src="./assets/img3.jpg">
</div>

<script>
  const lb = new SimpleLightbox.Lightbox('.gallery img', {
    overlayColor: "rgba(0, 0, 0, 0.8)",
    closeButton: true,
    keyboard: true
  });
</script>

```
Use this in browsers without modules. The SimpleLightbox object is globally available.

### 2. ES Module Build (Modern Browsers)

```html
<link rel="stylesheet" href="../dist/simple_lightbox.css">

<div class="gallery">
  <img src="./assets/img1.jpg">
  <img src="./assets/img2.jpg">
  <img src="./assets/img3.jpg">
</div>

<script type="module">
  import { Lightbox } from "../dist/simple_lightbox.es.js";

  const lb = new Lightbox('.gallery img', {
    overlayColor: "rgba(0, 0, 0, 0.8)",
    closeButton: true,
    keyboard: true
  });
</script>

```
Use this for modern browsers with ```<script type="module">```

### 3. CommonJS Build (Node / Bundlers)
```javascript
const { Lightbox } = require("../dist/simple_lightbox.cjs.js");

const lb = new Lightbox('.gallery img', {
  overlayColor: "rgba(0, 0, 0, 0.8)",
  closeButton: true,
  keyboard: true
});
```
Use this in Node.js or with bundlers like Webpack or Browserify.

## Options

| Option              | Type    | Default | Description                                 |
| ------------------- | ------- | ------- | ------------------------------------------- |
| `overlayColor`      | string  | ""      | Background color of the lightbox overlay    |
| `closeButton`       | boolean | true    | Show close button                           |
| `keyboard`          | boolean | true    | Allow keyboard navigation (Esc, Arrow keys) |

