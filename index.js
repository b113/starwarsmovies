const promise = new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.open("GET", "https://swapi.co/api/films/");
  request.onload = () => {
    if (request.status === 200) {
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
  };

  request.onerror = () => {
    reject(Error("Error fetching data."));
  };

  request.send();
});

promise.then(
  data => {
    const response = JSON.parse(data);

    response.results.forEach((movie, i) => {
      let li = document.createElement('li');
      let h3 = document.createElement('h3');
      let p = document.createElement('p');
      let span = document.createElement('span');

      h3.innerText = `Star Wars: Episode ${romanize(movie.episode_id)} - ${movie.title}`;
      h3.className = 'app-list__header';

      span.innerHTML = `<b>Director</b>: ${movie.director} <br/> <b>Initial release</b>: ${String(movie.release_date).slice(0, 4)}`

      p.innerText = movie.opening_crawl;
      p.className = 'app-list__desc';

      li.className = 'app-list__item';

      li.appendChild(h3);
      li.appendChild(span);
      li.appendChild(p);

      document.querySelector('.app-list').appendChild(li);

      li.addEventListener('click', e => {
        modalWindow();
        characters(response.results[i])
      });
    });

  },
  error => {
    console.log("Promise rejected.");
    console.log(error.message);
  }
);


const characters = res => {
  res.characters.forEach(url => {
    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open("GET", url);
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };

      request.onerror = () => {
        reject(Error("Error fetching data."));
      };
      request.send();
    });

    const table = document.querySelector('.list-characters__table');

    promise.then(
      data => {
        const response = JSON.parse(data);

        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${response.name}</td><td>${response.gender}</td>`

        if (table !== null) {
          table.appendChild(tr);
        }
      },
      error => {
        console.log("Promise rejected.");
        console.log(error.message);
      }
    );
  });
};

function romanize(num) {
  let result = '';
  const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  for (let i = 0; i <= decimal.length; i++) {
    while (num % decimal[i] < num) {
      result += roman[i];
      num -= decimal[i];
    }
  }
  return result;
}

const modalWindow = () => {

  document.body.style.overflow = "hidden";

  const modalWindow = document.createElement('div');
  modalWindow.className = 'modalWindow';
  document.body.appendChild(modalWindow);

  const div = document.createElement('div');
  div.className = 'list-characters';

  const table = document.createElement('table');
  table.className = 'list-characters__table';

  let tr = document.createElement('tr');
  tr.innerHTML = `<tr><td><b>Name</b></td><td><b>Gender</b></td></tr>`;

  const h3 = document.createElement('h3');
  h3.innerText = 'List of Characters';
  h3.className = 'list-characters__header';

  table.appendChild(tr);
  div.appendChild(h3);
  div.appendChild(table);
  modalWindow.appendChild(div);

  window.addEventListener('click', (e) => {
    if (e.target === modalWindow) {
      modalWindow.remove();
      document.body.style.overflow = "";
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalWindow.remove();
      document.body.style.overflow = "";
    }
  });
};


// Олдскульная версия
/*
const request = new XMLHttpRequest();
const URL = 'https://swapi.co/api/films/';

request.open('GET', URL);
request.onload = () => {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);

    response.results.forEach((movie, i) => {
      let li = document.createElement('li');
      let h3 = document.createElement('h3');
      let p = document.createElement('p');
      let span = document.createElement('span');

      h3.innerText = `Star Wars: Episode ${romanize(movie.episode_id)} - ${movie.title}`;
      h3.className = 'app-list__header';

      span.innerHTML = `<b>Director</b>: ${movie.director} <br/> <b>Initial release</b>: ${String(movie.release_date).slice(0, 4)}`

      p.innerText = movie.opening_crawl;
      p.className = 'app-list__desc';

      li.className = 'app-list__item';

      li.appendChild(h3);
      li.appendChild(span);
      li.appendChild(p);

      document.querySelector('.app-list').appendChild(li);

      li.addEventListener('click', e => {
        modalWindow();
        characters(response.results[i])
      });
    });

  } else {
    console.log('There was a network error: ' + request.statusText);
  }
};
request.send();

const characters = res => {
  res.characters.forEach(url => {
    const request = new XMLHttpRequest();
    const URL = url;
    const table = document.querySelector('.list-characters__table');

    request.open('GET', URL);
    request.onload = () => {
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);

        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${response.name}</td><td>${response.gender}</td>`

        if (table !== null) {
          table.appendChild(tr);
        }

      } else {
        console.log('There was a network error: ' + request.statusText);
      }
    };
    request.send();
  });
};


const modalWindow = () => {

  document.body.style.overflow = "hidden";

  const modalWindow = document.createElement('div');
  modalWindow.className = 'modalWindow';
  document.body.appendChild(modalWindow);

  const div = document.createElement('div');
  div.className = 'list-characters';

  const table = document.createElement('table');
  table.className = 'list-characters__table';

  let tr = document.createElement('tr');
  tr.innerHTML = `<tr><td><b>Name</b></td><td><b>Gender</b></td></tr>`;

  const h3 = document.createElement('h3');
  h3.innerText = 'List of Characters';
  h3.className = 'list-characters__header';

  table.appendChild(tr);
  div.appendChild(h3);
  div.appendChild(table);
  modalWindow.appendChild(div);

  window.addEventListener('click', (e) => {
    if (e.target == modalWindow) {
      modalWindow.remove();
      document.body.style.overflow = "";
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      modalWindow.remove();
      document.body.style.overflow = "";
    }
  });
}
*/

