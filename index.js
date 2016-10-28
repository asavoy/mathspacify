function update() {
  Array.from(document.querySelectorAll('.list-card-title')).forEach((title) => {
    if (title.getElementsByTagName('b').length === 0) {
      if (title.innerHTML.match(/\(([\.0-9\?]+)\)/i)) {
        if (title.innerHTML.match(/\((\?)\)/i)) {
          title.innerHTML = title.innerHTML.replace(/\(([\.0-9\?]+)\)/i, '<b class="list-card-title-points" style="background:#f00;border-radius:3px;color:#fff;display:inline-block;padding:0 0.4em;">$1</b>');
        } else {
          title.innerHTML = title.innerHTML.replace(/\(([\.0-9\?]+)\)/i, '<b class="list-card-title-points" style="background:#004280;border-radius:3px;color:#fff;display:inline-block;padding:0 0.4em;">$1</b>');
        }
      }
    }
  });

  Array.from(document.querySelectorAll('#board .list')).forEach((list) => {
    const points = Array.from(list.querySelectorAll('.list-cards .list-card .list-card-details .list-card-title-points')).reduce((points, card) => {
      return points + (parseFloat((card.innerText.match(/^\s*([\s0-9\?\.]+)/i) || [])[1], 10) || 0);
    }, 0);

    let span = list.querySelector('.list-header .list-header-extras .list-header-extras-points');

    if (!span) {
      span = document.createElement('span');
      span.classList.add('list-header-extras-points');
      span.style = 'background:#004280;border-radius:3px;color:#fff;display:inline-block;padding:0 0.4em;';
      list.querySelector('.list-header .list-header-extras').appendChild(span);
    }

    if (span.innerText != points) {
      span.innerText = points;
    }

  });

  setTimeout(update, 500);
}

update();
