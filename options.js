document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    enableCardIds: true,
    enableListGrouping: true,
    enablePointsBadges: true,
  }, (settings) => {
    document.getElementById('cardIds').checked = settings.enableCardIds;
    document.getElementById('listGrouping').checked = settings.enableListGrouping;
    document.getElementById('pointsBadges').checked = settings.enablePointsBadges;
  });
});

document.getElementById('save').addEventListener('click', () => {
  chrome.storage.sync.set({
    enableCardIds: document.getElementById('cardIds').checked,
    enableListGrouping: document.getElementById('listGrouping').checked,
    enablePointsBadges: document.getElementById('pointsBadges').checked,
  }, () => {
    var status = document.getElementById('status');
    status.textContent = 'Saved';
    setTimeout(() => {
      status.textContent = '';
    }, 1000);
  });
});
