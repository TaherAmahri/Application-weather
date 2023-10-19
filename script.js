const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".cities");

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const listItems = list.querySelectorAll(".local .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=0f207bebf44f6c8f3ba7c609c47087d7&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = "https://openweathermap.org/img/wn/" +weather[0].icon + "@2x.png";
      const parag = document.createElement("p");
      parag.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">
        ${Math.round(main.temp)}<sup>°C</sup>
        </div>
        <div>
          <img class="city-icon" src="${icon}" alt="${
            weather[0]["description"]}">
          <p>${weather[0]["description"]}</p>
        </div>
      `;
      parag.innerHTML = markup;
      list.appendChild(parag);
    });
  form.reset();
  input.focus();
});