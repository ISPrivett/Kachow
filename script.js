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
        image.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d3789c8c-0874-407c-a457-03b147f59b18/dfat773-401506bb-96ce-494f-a767-34f356198220.png/v1/fit/w_720,h_435/lighting_mcqueen_transparent_by_darkmoonanimation_dfat773-375w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDM1IiwicGF0aCI6IlwvZlwvZDM3ODljOGMtMDg3NC00MDdjLWE0NTctMDNiMTQ3ZjU5YjE4XC9kZmF0NzczLTQwMTUwNmJiLTk2Y2UtNDk0Zi1hNzY3LTM0ZjM1NjE5ODIyMC5wbmciLCJ3aWR0aCI6Ijw9NzIwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Ud8I-aUo8WMOPx1c_SkzHPNB-dSdHvWbOTZnVsrmIS0';
        image.style.position = 'absolute';
        
        // Image dimensions
        const imageHeight = 150; // Explicit height of the image
        const imageWidth = 200;  // Explicit width of the image
        
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
        image.style.left = `-${imageWidth*2}px`; // Start off the screen to the left
        image.style.top = `${startHeight*2}px`; // Set the random starting height
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
