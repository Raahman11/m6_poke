
const poke_container = document.getElementById('poke_container');
const pokemons_num = 898;

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
    normal: '#F5F5F5',
    steel: 'rgb(184,184,208)',
    dark: 'rgb(182, 173, 167)',
    ice: 'rgb(152,216,216)',
    ghost: 'rgb(231, 157, 45)',
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemons_num; i++){
        await getPokedex(i);
    }
}

const getPokedex = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon'); //create div with class pokemon

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(el => poke_types.indexOf(el) > -1);

    //change pokemonCard color based on type
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;

    const pokemonTypes = pokemon.types.map(el => {
		return `<span>${el.type.name}</span>`;
	}).join(', ');


    //capitalize first letter of pokemon name
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokeInnerHTML = `
    <div class="img-container" value="${name}" onclick="pokedexNumbering();">
        <img src=${pokemon.sprites.front_default} alt="${name}>
    </div>
    <div class="info">
        <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
        <h3 class="name">${name}</h3>
        <small class="type"><b>Type: </b><span>${pokemonTypes}</span></small>
    </div>`;

    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);
    
}

fetchPokemons();
function pokedexNumbering(){
    var pokedexClick = document.getElementsByClassName('pokemon');
    var pokeID = document.getElementsByClassName('number');
    for(let i = 0; i <= pokedexClick.length; i++){
        pokedexClick[i].addEventListener('click', () => {
            var storedID = pokeID[i].innerHTML.toString().substring(1).replace(/^0+/,"");
            localStorage.clear();
            localStorage.setItem('storedID', storedID)
            goToIndex();
        });
        
    }
    
}

function goToIndex(){
    location.href = "index.html";
}


/*
//ORIGINAL but difficult way of assigning ID
function pokedexNumbering(){
    var pokedexClick = document.getElementsByClassName('pokemon');
    for(let i = 0; i <= pokemons_num; i++){
        pokedexClick[i].addEventListener('click', function(){
            for(let j = 1; j <= pokedexClick.length; j++){ 
                if(pokeName = pokedexClick[i].innerHTML){
                    var pokeName = document.getElementsByClassName('name')[i].innerHTML;
                    console.log(pokeName)
                    localStorage.setItem("pokeNameStorage", pokeName);                 //OKAY
                    var storedVal = localStorage.getItem("pokeNameStorage");  //OKAY
                    console.log(storedVal) //OKAY
                }
            }
        })
    }
}
*/

/*
var pokeArr = [];
for(let i = 1; i <= pokedexClick.length; i++){
    pokeArr.push(i);
}
console.log(pokeArr);
for(let j = 1; j <= pokedexClick.length; j++){
    console.log(pokeArr.shift(j))
}
*/



/*
//dummy pokedexNumbering
function pokedexNumbering(){
    var pokedexClick = document.getElementsByClassName('pokemon');
    var pokedexName = document.getElementsByClassName('name');
    var pokeID = document.getElementsByClassName('number');
    //console.log(pokedexClick[9]) //html but not raw
    //console.log(pokedexClick[9].length)//UNDEFINED
    //console.log(pokedexClick[9].innerHTML)//raw HTML

    //NO!   console.log(pokedexClick[9].innerHTML.length)//raw HTML length
    //NGAM__________ console.log(pokedexName[9])  //outerHTML
    //NO!   console.log(pokedexName[9].length)//UNDEFINED
    //NGAM__________ console.log(pokedexName[9].innerHTML.length) //name length
    //NO!    console.log(pokeID)     //htmlcollection
    //NO!    console.log(pokeID.innerHTML) //undefined
    //console.log(pokeID[0].innerHTML.toString().substring(1).replace(/^0+/,""))
    console.log(pokedexClick.length)
}
*/






