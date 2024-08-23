document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const body = document.body;
    let image = null;
    let sound = new Audio('https://files.voicy.network/public/Content/Clips/Sound/00a4b495-076b-4f4c-8bfa-95b8735bd4cd.mp4');
    sound.preload = 'auto';

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const addImage = () => {
        if (!image) {
            image = document.createElement('img');
            image.src = 'https://w7.pngwing.com/pngs/787/25/png-transparent-lightning-mcqueen-lightning-mcqueen-cars-wikia-toy-pixar-cars-3-game-car-transport-thumbnail.png';
            image.style.position = 'absolute';
            
            // Random starting and ending heights
            const startHeight = getRandomInt(50, window.innerHeight - 150);
            const endHeight = getRandomInt(50, window.innerHeight - 150);
            
            // Initial position
            image.id = 'unique-dynamic-image';
            image.style.left = '-50%';
            image.style.top = '50px';
            image.style.transition = 'left 2s, top 2s';
            image.style.backgroundColor = 'transparent'; // Ensure no background
            image.style.border = 'none'; // Remove borders
            image.style.display = 'block';
            image.style.maxWidth = 'none'; // Prevents scaling issues
            image.style.maxHeight = 'none'; // Prevents scaling issues
            image.style.width = 'auto'; // Explicit width
            image.style.height = '150px'; // Explicit height
            body.appendChild(image);

            requestAnimationFrame(() => {
                image.style.left = '120%'; // New position
                image.style.top = `${endHeight}px`; // New position
                
                // Play the sound when the image starts moving
                sound.play();
            });
        }
    };

    const removeImage = () => {
        if (image) {
            body.removeChild(image);
            image = null;
        }
    };

    let debounceTimer;
    searchBar.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = searchBar.value.toLowerCase();
            if (query === 'lightning') {
                addImage();
            } else if (query === '') {
                removeImage();
            }
        }, 300);
    });
});
