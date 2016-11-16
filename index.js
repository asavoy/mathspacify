const REG_EXP = /^\s*(\#[0-9]+)?\s*[\(\[]\s*([\.0-9\?]+)\s*[\]\)](.*)$/i;

function update(settings) {

  const cards = Array.from(document.querySelectorAll('#board .list-card'));
  const lists = Array.from(document.querySelectorAll('#board .list-wrapper:not(.js-add-list)'));

  if (settings.enableCardIds) {

    cards.forEach((card) => {
      const title = card.querySelector('.list-card-title');
      const hiddenId = title && title.querySelector('.card-short-id.hide');

      if (hiddenId) {
        hiddenId.classList.remove('hide');
        hiddenId.classList.add('subtle-id');
        hiddenId.innerText = hiddenId.innerText + ' ';
      }
    });

  }

  if (settings.enableListGrouping) {

    lists.forEach((list) => {
      const listHeaderName = list.querySelector('.list-header-name');
      const listTitle = listHeaderName ? listHeaderName.value.trim().toLowerCase() : '';

      [
        'inbox',
        'current sprint',
      ].forEach((title) => {
        if (listTitle === title) {
          list.classList.add('list-wrapper-start');
        }
      });

      [
        'next',
        'merged',
      ].forEach((title) => {
        if (listTitle === title) {
          list.classList.add('list-wrapper-end');
        }
      });
    });

  }

  if (settings.enablePointsBadges) {

    cards.forEach((card) => {
      const title = card.querySelector('.list-card-title');
      const badgeList = card.querySelector('.badges');
      const match = title && title.innerText.match(REG_EXP);

      if (match) {
        let badge = badgeList.querySelector('.point-badge');

        if (!badge) {
          badge = document.createElement('div');
          badge.classList.add('badge');
          badge.classList.add('point-badge');

          if (badgeList.children.length) badgeList.insertBefore(badge, badgeList.children[0]);
          else badgeList.appendChild(badge);
        }

        if (badge.innerText != match[2]) badge.innerText = match[2];

        if (match[2] === '?') badge.classList.add('point-badge--unestimated');
        else badge.classList.remove('point-badge--unestimated');

        title.childNodes[1].data = match[3];
      }

    });

    lists.forEach((list) => {

      const listHeaderExtras = list.querySelector('.list-header-extras');
      const cardBadges = Array.from(list.querySelectorAll('.list-cards .point-badge'));
      const points = cardBadges.reduce((points, b) => {
        return points + (parseFloat(b.innerText, 10) || 0);
      }, 0);

      let badge = listHeaderExtras.querySelector('.point-badge');

      if (!badge) {
        badge = document.createElement('span');
        badge.classList.add('point-badge');
        badge.innerText = '0';

        if (listHeaderExtras.children.length) listHeaderExtras.insertBefore(badge, listHeaderExtras.children[0]);
        else listHeaderExtras.appendChild(badge);
      }

      if (badge.innerText != points) badge.innerText = points;
    });

  }

  setTimeout(() => update(settings), 500);
}

chrome.storage.sync.get({
  enableCardIds: true,
  enableListGrouping: true,
  enablePointsBadges: true,
}, update);
