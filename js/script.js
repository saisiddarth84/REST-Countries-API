const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');

const themeChanger = document.querySelector('.theme-changer');

let allCountriesData



fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => {
  renderCountries(data);
  allCountriesData = data;
})


filterByRegion.addEventListener('change', () => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then(res => res.json())
  .then(renderCountries)
})

function renderCountries(data){
  countriesContainer.innerHTML = ''
    data.forEach((country) => {
      const countryCard = document.createElement('a');
      countryCard.classList.add('country-card');
      countryCard.href = `/country.html?name=${country.name.common}`
      countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="flag">
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>
      ` 
      countriesContainer.append(countryCard);

    })
}

searchInput.addEventListener('input', (e) => {
  const filteredCountry = allCountriesData.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountry)
})

const modeText = document.querySelector('.mode-text')

window.addEventListener('DOMContentLoaded', function() {
  if(localStorage.getItem('mode') === 'dark'){
    changeTheme()
  }
});

themeChanger.addEventListener('click', changeTheme)

function changeTheme(){
  document.body.classList.toggle('dark');
  themeChanger.firstElementChild.classList.toggle('fa-moon');
  themeChanger.firstElementChild.classList.toggle('fa-sun');
  if(document.body.classList.contains('dark')){
    modeText.textContent = 'Light Mode';
    localStorage.setItem('mode','dark');
  } else {
    modeText.textContent = 'Dark Mode';
    localStorage.setItem('mode','');
  }
}