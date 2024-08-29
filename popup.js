document.addEventListener('DOMContentLoaded', () => {
  const soundUrlInput = document.getElementById('soundUrl');
  const imageUrlInput = document.getElementById('imageUrl');
  const queryInput = document.getElementById('query');

  const defaultSoundUrl = 'https://files.voicy.network/public/Content/Clips/Sound/00a4b495-076b-4f4c-8bfa-95b8735bd4cd.mp4';
  const defaultImageUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d3789c8c-0874-407c-a457-03b147f59b18/dfat773-401506bb-96ce-494f-a767-34f356198220.png/v1/fit/w_720,h_435/lighting_mcqueen_transparent_by_darkmoonanimation_dfat773-375w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDM1IiwicGF0aCI6IlwvZlwvZDM3ODljOGMtMDg3NC00MDdjLWE0NTctMDNiMTQ3ZjU5YjE4XC9kZmF0NzczLTQwMTUwNmJiLTk2Y2UtNDk0Zi1hNzY3LTM0ZjM1NjE5ODIyMC5wbmciLCJ3aWR0aCI6Ijw9NzIwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Ud8I-aUo8WMOPx1c_SkzHPNB-dSdHvWbOTZnVsrmIS0';
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
