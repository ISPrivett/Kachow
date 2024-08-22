document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const body = document.body;
    let image = null;
    let sound = new Audio('assets/Ka-chow!.mp3');

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const addImage = () => {
        if (!image) {
            image = document.createElement('img');
            image.src = 'assets/thelightning.png';
            image.style.position = 'absolute';
            
            // Random starting and ending heights
            const startHeight = getRandomInt(50, window.innerHeight - 150);
            const endHeight = getRandomInt(50, window.innerHeight - 150);
            
            // Initial position
            image.style.left = '-50%';
            image.style.top = `${startHeight}px`;
            image.style.transition = 'left 2s, top 2s';
            image.style.transform = 'scale(0.3)';
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
