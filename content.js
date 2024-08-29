(function() {
    let image = null;
    let sound = null;
    let query = '';

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const levenshteinDistance = (a, b) => {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        let dp = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(0));
        
        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                let cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );
            }
        }

        return dp[a.length][b.length];
    };

    const addImage = () => {
        if (image) {
            removeImage();
        }
        image = document.createElement('img');
        image.src = imageUrl;
        image.style.position = 'absolute';

        const imageHeight = 150;
        const imageWidth = 200;
        const viewportHeight = window.innerHeight;
        const padding = 50;
        const maxHeight = viewportHeight - imageHeight - padding;

        const startHeight = getRandomInt(padding, maxHeight);
        const endHeight = getRandomInt(padding, maxHeight);

        image.id = `unique-dynamic-image-${Date.now()}`;
        image.style.zIndex = '9999';
        image.style.left = `-${imageWidth*2}px`;
        image.style.top = `${startHeight}px`;
        image.style.transition = 'left 2s, top 2s';
        image.style.backgroundColor = 'transparent';
        image.style.border = 'none';
        image.style.display = 'block';
        image.style.width = `${imageWidth}px`;
        image.style.height = `${imageHeight}px`;
        document.body.appendChild(image);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                image.style.left = `${window.innerWidth}px`;
                image.style.top = `${endHeight}px`;
                sound.play();
            });
        });

        image.addEventListener('transitionend', removeImage);
    };

    const removeImage = () => {
        if (image) {
            image.removeEventListener('transitionend', removeImage);
            document.body.removeChild(image);
            image = null;
        }
    };

    let debounceTimer;
    const threshold = 2;

    const textInputs = document.querySelectorAll('input[type="text"]');
    
    textInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const queryText = input.value.toLowerCase();
                console.log(`Current Query: ${queryText}`);
                
                if (levenshteinDistance(queryText, query) <= threshold) {
                    addImage();
                } else {
                    removeImage();
                }
            }, 300);
        });
    });

    chrome.storage.local.get(['imageUrl', 'soundUrl', 'query'], (result) => {
        imageUrl = result.imageUrl || 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d3789c8c-0874-407c-a457-03b147f59b18/dfat773-401506bb-96ce-494f-a767-34f356198220.png/v1/fit/w_720,h_435/lighting_mcqueen_transparent_by_darkmoonanimation_dfat773-375w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDM1IiwicGF0aCI6IlwvZlwvZDM3ODljOGMtMDg3NC00MDdjLWE0NTctMDNiMTQ3ZjU5YjE4XC9kZmF0NzczLTQwMTUwNmJiLTk2Y2UtNDk0Zi1hNzY3LTM0ZjM1NjE5ODIyMC5wbmciLCJ3aWR0aCI6Ijw9NzIwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Ud8I-aUo8WMOPx1c_SkzHPNB-dSdHvWbOTZnVsrmIS0';
        sound = new Audio(result.soundUrl || 'https://files.voicy.network/public/Content/Clips/Sound/00a4b495-076b-4f4c-8bfa-95b8735bd4cd.mp4');
        sound.preload = 'auto';
        query = result.query || 'lightning';
    });
})();
