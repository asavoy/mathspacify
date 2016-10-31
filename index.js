const REG_EXP = /^\s*[\(\[]\s*([\.0-9\?]+)\s*[\]\)]\s*(.*)$/i;

function update() {

  const cards = Array.from(document.querySelectorAll('#board .list-card'));
  const lists = Array.from(document.querySelectorAll('#board .list'));

  cards.forEach((card) => {
    const title = card.querySelector('.list-card-title');
    const badgeList = card.querySelector('.badges');
    const match = title.innerText.match(REG_EXP);

    if (match) {
      let badge = badgeList.querySelector('.point-badge');

      if (!badge) {
        badge = document.createElement('div');
        badge.classList.add('badge');
        badge.classList.add('point-badge');

        if (badgeList.children.length) badgeList.insertBefore(badge, badgeList.children[0]);
        else badgeList.appendChild(badge);
      }

      if (badge.innerText != match[1]) badge.innerText = match[1];

      if (match[1] === '?') badge.classList.add('point-badge--unestimated');
      else badge.classList.remove('point-badge--unestimated');

      title.childNodes[1].data = match[2];
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

  setTimeout(update, 500);
}

update();
