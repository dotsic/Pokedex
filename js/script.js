//                                                    | |       | |       (_)      
//                                                  __| |  ___  | |_  ___  _   ___ 
//                                                 / _` | / _ \ | __|/ __|| | / __|
//                                              _ | (_| || (_) || |_ \__ \| || (__ 
//                                             (_) \__,_| \___/  \__||___/|_| \___|

const namePokemon = document.querySelector('.pokemon__name');
const numberPokemon = document.querySelector('.pokemon__number');
const imgPokemon = document.querySelector('.pokemon__img');
const LoadingPokemon = '/img/Loading.gif';
const badImgPokemon = '/img/404.png';
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let currentPokemonData;
let isShiny = false;

const fetchPokemon = async (pokemon) => {
   namePokemon.innerHTML = 'Loading...';
   imgPokemon.src = LoadingPokemon;
   const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

   if (APIResponse.status == 200) {
      const data = await APIResponse.json();
      return data;
   } else {
      return null;
   }
}

const renderPokemon = async (pokemon) => {
   const data = await fetchPokemon(pokemon);

   if (data) {
      currentPokemonData = data;
      namePokemon.innerHTML = data.name;
      numberPokemon.innerHTML = `# ${data.id} -`;
      imgPokemon.src = isShiny ?
         data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'] :
         data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      input.value = '';
      searchPokemon = data.id;
   } else {
      imgPokemon.src = badImgPokemon;
      namePokemon.innerHTML = 'Não encontrado.';
      numberPokemon.innerHTML = '';
   }
}

form.addEventListener('submit', (e) => {
   e.preventDefault();
   renderPokemon(input.value.toLowerCase());
});


btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });


btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });


btnShiny.addEventListener('click', () => {
   isShiny = !isShiny;
   renderPokemon(currentPokemonData.name);
});

renderPokemon(searchPokemon);