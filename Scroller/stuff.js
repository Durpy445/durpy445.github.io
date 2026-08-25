/**
 * 🦊 magicalbunny31
 * 🐺 https://nuzzles.dev
 */
// thanks bunny and ruby

const getStuffJson = async () => {
    // fetch the json file
    const response = await fetch(`Scroller/stuff.json`);
    return await response.json();
};


const number = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); // RANDOM NUMBER GO


const shuffle = array => {
    // use a count-based loop to decrease from the array's length to 0
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = number(0, i);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // swap the elements in-place
    };

    // return a reference to the modified array
    return array;
};


const createImage = (image, isDuplicateImage = false) => {
    // base <img> tag
    const img = document.createElement(`img`);
    img.src = image.src;

    // this image has alt text
    if (img.alt)
        img.alt = image.alt;

    // in order to scroll infinitely, the image needs to be duplicated with a hidden attribute
    if (isDuplicateImage)
        img.setAttribute(`aria-hidden`, `true`);

    // this image has a link, wrap it around an <a>
    if (image.href) {
        // the <a> tag
        const a = document.createElement(`a`);
        a.href = image.href;
        a.target = `_blank`;
        a.rel = `noopener noreferrer`;

        // add more attributes to the duplicated image
        if (isDuplicateImage) {
            a.setAttribute(`tabindex`, `-1`);
            a.setAttribute(`aria-hidden`, `true`);
        };

        // wrap the <img> with the <a>
        a.appendChild(img);

        // return the <a> (which has the <img>)
        return a;
    };

    // return the <img>
    return img;
};


const setImageScrollDuration = track => {
    // track.scrollWidth is the total width of the original and duplicate images
    const singleSetWidth = track.scrollWidth / 3;

    //    time in seconds = distance in pixels / speed
    const pixelsPerSecond = singleSetWidth / 50;

    // Apply the calculated duration directly to the track element
    track.style.setProperty(`--scroll-duration`, `${pixelsPerSecond}s`);
};


const setupStuffContainerRow = (stuffRowId, images, direction) => {
    // get the row by the given stuffRowId and specify its direction
    const stuffRowElement = document.getElementById(stuffRowId);
    stuffRowElement.classList.add(direction);

    // create a track for all the images
    const track = document.createElement(`div`);
    track.className = `stuff-track`;

    // add images to the track
    images.forEach(image => track.appendChild(createImage(image)));
    images.forEach(image => track.appendChild(createImage(image, true)));
    stuffRowElement.appendChild(track);


    // get all images set in the track
    const imageElements = track.querySelectorAll(`img`);

    // wait for each image to load, then set its `--scroll-duration` style property based on its width
    let loadedCount = 0;
    imageElements.forEach(img => {
        
        if (img.complete) {
            loadedCount++;
            if (loadedCount === imageElements.length)
                setImageScrollDuration(track);
        } else {
            img.addEventListener(`load`, () => {
                loadedCount++;
                if (loadedCount === imageElements.length)
                    setImageScrollDuration(track);
            });
        };
    });
};


const waitForImageLoad = img =>
    new Promise(resolve => {
        if (img.complete && img.naturalWidth !== 0) {
            // the image is already loaded, resolve the promise
            resolve();

        } else {
            // wait for the image to load (or wait for it to error so the promise doesn't hang) then resolve the promise
            img.addEventListener(`load`, resolve, { once: true });
            img.addEventListener(`error`, resolve, { once: true });
        };
    });


const showContainer = async () => {
    // get the hidden container
    const container = document.querySelector(`.stuff-container`);

    // select all images within the hidden container and wait for them all to load
    const imageElements = container.querySelectorAll(`.stuff-row img`);
    const images = Array.from(imageElements);
    await Promise.all(images.map(waitForImageLoad));

    // show the container by adding to the class list
    container.classList.add(`is-loaded`);
};


window.addEventListener(`load`, async () => {
    // fetch the buttons and blinkies and shuffle it
    const stuff = await getStuffJson();

    // add the buttons and blinkies to the container
    setupStuffContainerRow(`buttons`, shuffle(stuff.buttons), `scroll-left`);
    setupStuffContainerRow(`blinkies`, shuffle(stuff.blinkies), `scroll-right`);

    // wait for all images to load before showing the container
    await showContainer();
});