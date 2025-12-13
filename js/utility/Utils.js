("use strict");

export class Canvas {
  constructor(id, api, width, height, config = {}) {
    const container = document.getElementById(id);
    const canvas = document.createElement("canvas");
    canvas.ctx = canvas.getContext(api);
    canvas.width = width;
    canvas.height = height;
    if (config.class) canvas.setAttribute("class", config.class);
    if (config.id) canvas.setAttribute("id", config.id);
    container.append(canvas);
    return canvas;
  }
}

export class InputHandler {
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.config = config;

    this.keys = [];
    this.mouse = {
      pos: null,
      left_click: false,
      right_click: false,
      left_mouse_down: false,
      right_mouse_down: false,
    };
    this.addEventListeners(canvas);
  }
  addEventListeners(canvas) {
    canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    canvas.addEventListener("mouseup", (e) => this.handleMouseUp(e));
    canvas.addEventListener("mousemove", (e) => this.handleMousemove(e));
    canvas.addEventListener("click", (e) => this.handleClick(e));
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());

    window.addEventListener("keydown", (e) => this.handleKeydown(e));
    window.addEventListener("keyup", (e) => this.handleKeyup(e));
  }
  #_getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const nSize = [this.canvas.width, this.canvas.height];
    const oSize = [
      window.parseInt(
        window.getComputedStyle(this.canvas).getPropertyValue("width")
      ),
      window.parseInt(
        window.getComputedStyle(this.canvas).getPropertyValue("height")
      ),
    ];
    const cFactor = [nSize[0] / oSize[0], nSize[1] / oSize[1]];
    const pos = [
      (e.clientX - rect.left) * cFactor[0],
      (e.clientY - rect.top) * cFactor[1],
    ];
    return pos;
  }
  updateMousemove(f = (config = {}) => {}) {
    this.updateMousemove = f;
  }
  handleMousemove(e) {
    this.mouse.pos = this.#_getMousePos(e);

    if (this.updateMousemove) this.updateMousemove();
  }
  updateClick(f = (config = {}) => {}) {
    this.updateClick = f;
  }
  handleClick(e) {
    if (e.button === 0) {
      if (this.updateClick) this.updateClick();
    }
  }
  updateMousedown(f = (config = {}) => {}) {
    this.updateMousedown = f;
  }
  handleMouseDown(e) {
    this.mouse.pos = this.#_getMousePos(e);

    if (e.button === 0) this.mouse.left_mouse_down = true;
    if (e.button === 2) this.mouse.right_mouse_down = true;
  }
  handleMouseUp(e) {
    if (e.button === 0) this.mouse.left_mouse_down = false;
    if (e.button === 2) this.mouse.right_mouse_down = false;
  }

  updateKeydown(f = (config = {}) => {}) {
    this.updateKeydown = f;
  }
  handleKeydown(e) {
    if (
      !this.keys.includes(e.key.toLowerCase()) &&
      this.config.keys.includes(e.key.toLowerCase())
    ) {
      this.keys.unshift(e.key.toLowerCase());
      e.preventDefault();

      if (this.updateKeydown) this.updateKeydown();
    }
  }
  handleKeyup(e) {
    this.keys.splice(this.keys.indexOf(e.key.toLowerCase()), 1);
  }
}

export class Engine {
  constructor(fps = 60) {
    this.isPaused = false;
    this.isRunning = false;

    this.animationFrame = null;
    this.prevTime = performance.now();
    this.lagTime = 0;

    this.FPS = fps;
    this.frameTime = 1 / this.FPS;
    this.updateTime = this.frameTime;
    this.MPF = this.frameTime * 1000;

    return this;
  }
  update(f = (t) => {}) {
    this.update = f;
    return null;
  }

  draw(f = () => {}) {
    this.draw = f;
    return null;
  }
  start() {
    this.isRunning = true;
    this.animationFrame = window.requestAnimationFrame(() => {
      this.start();
    });

    this.currTime = performance.now();
    this.elapsedTime = this.currTime - this.prevTime;
    this.prevTime = this.currTime;
    this.lagTime += this.elapsedTime;

    if (this.elapsedTime >= 1000) this.elapsedTime = this.frameTime;

    while (this.lagTime >= this.MPF) {
      this.lagTime -= this.MPF;
      if (!this.isPaused) this.update(this.updateTime);
    }

    this.draw();

    return this.isRunning;
  }
  pause() {
    this.isPaused = !this.isPaused;

    return this.isPaused;
  }
  stop() {
    if (this.isRunning) {
      window.cancelAnimationFrame(this.animationFrame);

      this.isPaused = false;
      this.isRunning = false;

      this.animationFrame = null;
      this.prevTime = performance.now();
      this.lagTime = 0;
    }

    return this.isRunning;
  }
}

//ASSETS
export let assets = {
  //Properties to help track the assets being loaded
  toLoad: 0,
  loaded: 0,
  //File extensions for different types of assets
  imageExtensions: ["png", "jpg", "gif"],
  fontExtensions: ["ttf", "otf", "ttc", "woff"],
  jsonExtensions: ["json"],
  audioExtensions: ["mp3", "ogg", "wav", "webm"],
  //The `load` method creates and loads all the assets. Use it like this:
  //`assets.load(["images/anyImage.png", "fonts/anyFont.otf"]);`
  load(sources) {
    //The `load` method will return a Promise when everything has loaded
    return new Promise((resolve) => {
      //The `loadHandler` counts the number of assets loaded, compares
      //it to the total number of assets that need to be loaded, and
      //resolves the Promise when everything has loaded
      let loadHandler = () => {
        this.loaded += 1;
        console.log(this.loaded);
        //Check whether everything has loaded
        if (this.toLoad === this.loaded) {
          //Reset `toLoad` and `loaded` to `0` so you can use them
          //to load more assets later if you need to
          this.toLoad = 0;
          this.loaded = 0;
          console.log("Assets finished loading");
          //Resolve the promise
          resolve();
        }
      };
      //Display a console message to confirm that the assets are
      //being loaded
      console.log("Loading assets...");
      //Find the number of files that need to be loaded
      this.toLoad = sources.length;
      //Loop through all the source filenames and find out how
      //they should be interpreted
      sources.forEach((source) => {
        //Find the file extension of the asset
        let extension = source.split(".").pop();
        //Load images that have file extensions that match
        //the imageExtensions array
        if (this.imageExtensions.indexOf(extension) !== -1) {
          this.loadImage(source, loadHandler);
        }
        //Load fonts
        else if (this.fontExtensions.indexOf(extension) !== -1) {
          this.loadFont(source, loadHandler);
        }
        //Load JSON files
        else if (this.jsonExtensions.indexOf(extension) !== -1) {
          this.loadJson(source, loadHandler);
        }
        //Load audio files
        else if (this.audioExtensions.indexOf(extension) !== -1) {
          this.loadSound(source, loadHandler);
        }
        //Display a message if a file type isn't recognized
        else {
          console.log("File type not recognized: " + source);
        }
      });
    });
  },

  loadImage(source, loadHandler) {
    //Create a new image and call the `loadHandler` when the image
    //file has loaded
    let image = new Image();
    image.addEventListener("load", loadHandler, false);
    //Assign the image as a property of the `assets` object so
    //you can access it like this: `assets["path/imageName.png"]`
    this[source] = image;
    //Set the image's `src` property to start loading the image
    image.src = source;
  },
  loadFont(source, loadHandler) {
    //Use the font's filename as the `fontFamily` name
    let fontFamily = source.split("/").pop().split(".")[0];
    //Append an `@afont-face` style rule to the head of the HTML document
    let newStyle = document.createElement("style");
    let fontFace =
      "@font-face {font-family: '" +
      fontFamily +
      "'; src: url('" +
      source +
      "');}";
    newStyle.appendChild(document.createTextNode(fontFace));
    document.head.appendChild(newStyle);
    //Tell the `loadHandler` we're loading a font
    loadHandler();
  },
  loadJson(source, loadHandler) {
    //Create a new `xhr` object and an object to store the file
    let xhr = new XMLHttpRequest();
    //Use xhr to load the JSON file
    xhr.open("GET", source, true);
    //Tell xhr that it's a text file
    xhr.responseType = "text";
    //Create an `onload` callback function that
    //will handle the file loading
    xhr.onload = (event) => {
      //Check to make sure the file has loaded properly
      if (xhr.status === 200) {
        //Convert the JSON data file into an ordinary object
        let file = JSON.parse(xhr.responseText);

        //Get the filename
        file.name = source;
        //Assign the file as a property of the assets object so
        //you can access it like this: `assets["file.json"]`
        this[file.name] = file;
        //Texture atlas support:
        //If the JSON file has a `frames` property then
        //it's in Texture Packer format
        if (file.frames) {
          //Create the tileset frames
          this.createTilesetFrames(file, source, loadHandler);
        } else {
          //Alert the load handler that the file has loaded
          loadHandler();
        }
      }
    };
    //Send the request to load the file
    xhr.send();
  },
  createTilesetFrames(file, source, loadHandler) {
    //Get the tileset image's file path
    let baseUrl = source.replace(/[^\/]*$/, "");
    //Use the `baseUrl` and `image` name property from the JSON
    //file's `meta` object to construct the full image source path
    let imageSource = baseUrl + file.meta.image;
    //The image's load handler
    let imageLoadHandler = () => {
      //Assign the image as a property of the `assets` object so
      //you can access it like this:
      //`assets["images/imageName.png"]`
      this[imageSource] = image;
      //Loop through all the frames
      Object.keys(file.frames).forEach((frame) => {
        //The `frame` object contains all the size and position
        //data for each sub-image.
        //Add the frame data to the asset object so that you
        //can access it later like this: `assets["frameName.png"]`
        this[frame] = file.frames[frame];

        //Get a reference to the source so that it will be easy for
        //us to access it later
        this[frame].source = image;
      });
      //Alert the load handler that the file has loaded
      loadHandler();
    };
    //Load the tileset image
    let image = new Image();
    image.addEventListener("load", imageLoadHandler, false);
    image.src = imageSource;
  },
  loadSound(source, loadHandler) {
    //Create a sound object and alert the `loadHandler`
    //when the sound file has loaded
    let sound = makeSound(source, loadHandler);
    //Get the sound file name
    sound.name = source;
    //Assign the sound as a property of the assets object so
    //we can access it this way: `assets["sounds/sound.mp3"]`
    this[sound.name] = sound;
  },
};
