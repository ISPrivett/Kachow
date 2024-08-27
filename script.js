(function() {
    // Create and style the moving image element
    let image = null;
    const sound = new Audio('https://files.voicy.network/public/Content/Clips/Sound/00a4b495-076b-4f4c-8bfa-95b8735bd4cd.mp4');
    sound.preload = 'auto';

    // Function to generate a random integer between min (inclusive) and max (inclusive)
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Function to add the image with random starting and ending heights
    const addImage = () => {
        if (image) {
            removeImage(); // Ensure only one image is added by removing any existing image
        }
        image = document.createElement('img');
        image.src = 'https://w7.pngwing.com/pngs/787/25/png-transparent-lightning-mcqueen-lightning-mcqueen-cars-wikia-toy-pixar-cars-3-game-car-transport-thumbnail.png';
        image.style.position = 'absolute';
        
        // Image dimensions
        const imageHeight = 150; // Explicit height of the image
        const imageWidth = 150;  // Explicit width of the image
        
        // Viewport and margin calculations
        const viewportHeight = window.innerHeight;
        const padding = 50; // Padding to ensure image doesn't touch edges
        const maxHeight = viewportHeight - imageHeight - padding;
        
        // Random starting and ending heights within the visible area
        const startHeight = getRandomInt(padding, maxHeight);
        const endHeight = getRandomInt(padding, maxHeight);

        // Initial position and styling
        image.id = `unique-dynamic-image-${Date.now()}`;
        image.style.zIndex = '9999'; // Ensure image is on top
        image.style.left = `-${imageWidth}px`; // Start off the screen to the left
        image.style.top = `${startHeight}px`; // Set the random starting height
        image.style.transition = 'left 2s, top 2s'; // Transition for movement
        image.style.backgroundColor = 'transparent'; // Ensure no background
        image.style.border = 'none'; // Remove borders
        image.style.display = 'block';
        image.style.width = `${imageWidth}px`; // Set explicit width
        image.style.height = `${imageHeight}px`; // Set explicit height
        document.body.appendChild(image);

        // Ensure styles are applied before starting the animation
        requestAnimationFrame(() => {
            // Trigger the animation
            requestAnimationFrame(() => {
                image.style.left = `${window.innerWidth}px`; // Move image off the screen to the right
                image.style.top = `${endHeight}px`; // Move image to a random vertical position
                
                // Play the sound when the image starts moving
                sound.play();
            });
        });
    };

    // Function to remove the image
    const removeImage = () => {
        if (image) {
            document.body.removeChild(image);
            image = null;
        }
    };

    let debounceTimer;
    
    // Select all text input elements and add event listeners
    const textInputs = document.querySelectorAll('input[type="text"]');
    
    textInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = input.value.toLowerCase();
                console.log(`Current Query: ${query}`); // Debugging output
                
                if (query === 'lightning') {
                    addImage(); // Add or re-add the image
                } else {
                    removeImage(); // Remove the image if the query is anything else
                }
            }, 300);
        });
    });
})();
