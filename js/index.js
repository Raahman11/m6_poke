var pokeResults = document.getElementsByClassName('pokechecker')[0];
var inputStr = document.getElementById('search').value;
var inputNum = parseInt(inputStr);
const pokemonsNumForRandomize = 899;

function consoleInput(){
	let inputStrConsole = document.getElementById('search').value;
	console.log("You typed in: " + inputStrConsole)
}

window.onload = function getPokemonFromPokedex(){
	if(localStorage.getItem("storedID") !== null){
		var savedID = localStorage.getItem("storedID");
		document.querySelector('#search').value = savedID;
		document.getElementsByClassName('getPokemon')[0].click();
	}else{
		return
	}
}


async function getPokemon() {
	const id = document.querySelector('#search').value;
	document.querySelector('.pokemon').innerHTML = '';

	fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	.then(function(Response){
		if(Response.status == 404){
			pokeResults.style.width = "800px";
			alert("The Pokémon ID or name you are looking for is not found!" + "\n" +"Please ensure your entered Pokémon ID is between 1 - 898."  + "\n" + "If you are using Pokémon name, ensure it is typed in lower-case alphabets only.");
			return
		}
	})

	let pokemonFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	let pokemon = await pokemonFetch.json();
	
	const pokemonAbilities = pokemon.abilities.map(talent => {
		return `<span>${talent.ability.name}</span>`;
	}).join(', ');
	
	const pokemonTypes = pokemon.types.map(el => {
		return `<span>${el.type.name}</span>`;
	}).join(', ');

	const pokemonMovesForPP = pokemon.moves.map(skill =>{
		return `${skill.move.name}`
	});
	/*
	//GETTING MOVESDETAILS BY  INDIVIDUAL MOVES THEN PUSHING EACH SPECIFIED RESULTS INTO AN ARRAY
	var movesDetails = [];
	
	const fetchPokemonMoves = async function(){
		for(let i = 0; i < pokemonMovesForPP.length; i++){
			const url = `https://pokeapi.co/api/v2/move/${pokemonMovesForPP[i]}`;
			const data = fetch(url).then(r => r.json()).then( ({pp, poweraccuracy, type, effect_entries, effect_chance, name}) => ({pp, poweraccuracy, type, effect_entries, effect_chance, name}) );
			movesDetails.push(data);
			var info = movesDetails;
		}
		
		//INDIVIDUAL MOVES DETAILS (for checking purposes)
		for await (const moves of movesDetails){
			//console.log(moves) //PROTIP: hover on <-- this for loop movesDetails[i] in VSCode to see the JSON tooltip!!
		}
		for(let i = 0; i <pokemonMovesForPP.length; i++){
			console.log(movesDetails) 
		}
		let raw = fetchPokemonMoves();
		console.log(raw)
		
	}
	*/
	/*
	for(let j = 0; j < pokemonMovesForPP.length; j++){
		console.log(`${movesDetails.pp}`)
	}
	*/
	const pokemonMoves = pokemon.moves.map(skill => {
		return `<li class="movesList>${skill.move.name}</li>`
	}).join("");

	const pokemonHeight = ((pokemon.height)/10).toFixed(1);
	const pokemonWeight = ((pokemon.weight)/10).toFixed(1);

	const pokemonCard = `<div class="pokemonCard">
		<div class="LHS">
			<div class="pokeIdName">#${pokemon.id} ${pokemon.name}</div>
				<img src = ${pokemon.sprites.front_default} class="pokeImg" height="160px" width="160px">
			<div class="data">
				<div class="type" style="text-transform: capitalize;"><b>Type: </b>${pokemonTypes}</div>
				<div class="abilities" style="text-transform: capitalize;"><b>Abilities: </b>${pokemonAbilities}</div>
				<div class="height"><b>Height: </b>${pokemonHeight} m</div>
				<div class="weight"><b>Weight: </b>${pokemonWeight} kg</div>
			</div>
			<div class="stats">
				<div class="statsChild"> &nbsp; &nbsp; &nbsp; &nbsp;<b>HP: </b>${pokemon.stats[0].base_stat} &nbsp; &nbsp; &nbsp;  <b>Attack: </b>${pokemon.stats[1].base_stat}</div>
				<div class="statsChild"><b>Defense: </b>${pokemon.stats[2].base_stat} &nbsp; &nbsp; <b>Speed: </b>${pokemon.stats[5].base_stat}</div>
				<div class="statsChild"><b>Special-Attack: </b>${pokemon.stats[3].base_stat}</div>
				<div class="statsChild"><b>Special-Defense: </b>${pokemon.stats[4].base_stat}</div>
			</div>
		</div>
		
		<div class="moves">
			<div style="font-size: 30px; font-weight: bold; text-align: center; position:-webkit-sticky; position: sticky; top: 0;">Moves: </div>
			<ol>${pokemonMoves}</ol>
		</div>
	</div>`;
	

	if(`${pokemonMoves}`.length === 0){
		alert("The latest PokéAPI version does not have this Pokémon's moves.")
	}
	document.querySelector('.pokemon').innerHTML = pokemonCard;

	pokeResults.style.borderRadius = "20px";
	pokeResults.style.padding = "20px";
	pokeResults.style.width = "auto";
};

document.querySelector('.getPokemon').addEventListener('click', function (){
	// alert("InputNum type is " + typeof(inputNum))
	if(inputNum < 1 || inputNum > 802){
		alert("Please enter ID between 1 to 802 only.")
		document.getElementById('search').value = "";
		return;	
	}else{
		getPokemon();
	}
});

function randomize(){
	var randomNum = Math.floor(Math.random()* pokemonsNumForRandomize);
	document.querySelector('#search').value = randomNum;
	document.getElementsByClassName('getPokemon')[0].click();
}