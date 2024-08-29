document.addEventListener('DOMContentLoaded', () => {
  const soundUrlInput = document.getElementById('soundUrl');
  const imageUrlInput = document.getElementById('imageUrl');
  const queryInput = document.getElementById('query');

  const defaultSoundUrl = 'https://files.voicy.network/public/Content/Clips/Sound/00a4b495-076b-4f4c-8bfa-95b8735bd4cd.mp4';
  const defaultImageUrl = 'https://tinyurl.com/ys44mrax';
  const defaultQuery = 'lightning';

  chrome.storage.sync.get(['soundUrl', 'imageUrl', 'query'], (result) => {
      soundUrlInput.value = result.soundUrl || defaultSoundUrl;
      imageUrlInput.value = result.imageUrl || defaultImageUrl;
      queryInput.value = result.query || defaultQuery;
  });

  document.getElementById('saveButton').addEventListener('click', () => {
      const soundUrl = soundUrlInput.value || defaultSoundUrl;
      const imageUrl = imageUrlInput.value || defaultImageUrl;
      const query = queryInput.value || defaultQuery;

      chrome.storage.sync.set({ soundUrl, imageUrl, query }, () => {
          alert('Settings saved!');
      });
  });
});
