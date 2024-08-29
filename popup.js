document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings
  chrome.storage.local.get(['imageUrl', 'soundUrl', 'query'], (result) => {
    document.getElementById('imageUrl').value = result.imageUrl || '';
    document.getElementById('soundUrl').value = result.soundUrl || '';
    document.getElementById('query').value = result.query || '';
  });

  document.getElementById('save').addEventListener('click', () => {
    const imageUrl = document.getElementById('imageUrl').value;
    const soundUrl = document.getElementById('soundUrl').value;
    const query = document.getElementById('query').value;

    chrome.storage.local.set({ imageUrl, soundUrl, query }, () => {
      alert('Settings saved!');
    });
  });
});
