const pokeCard = document.querySelector("#data-poke-card");
const pokeName = document.querySelector("#data-poke-name");
const pokeImage = document.querySelector("#data-poke-image");
const pokeImageContainer = document.querySelector("#data-poke-image-container");
const pokeId = document.querySelector("#data-poke-id");
const pokeTypes = document.querySelector("#data-poke-type");
const pokeStats = document.querySelector("#data-poke-stats");
const pokeHeight = document.querySelector("#data-poke-height");
const pokeWeight = document.querySelector("#data-poke-weight");

const typeColors = {
    bug: "#A8B820",
    dark: "#705848",
    dragon: "#7038F8",
    electric: "#F8D030",
    fire: "#F08030",
    flying: "#A890F0",
    ghost: "#705898",
    grass: "#78C850",
    ground: "#E0C068",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
    steel: "#B8B8D0",
    water: "#6890F0",
    fighting: "#C03028",
    default: "#2A1A1F",
};

const searchPokemon = (event) => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then((data) => data.json())
        .then((response) => renderPokemonData(response))
        .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
    const sprite = data.sprites.front_default;
    const { stats, types, } = data;
    console.log(data)

    pokeName.textContent = data.name;
    pokeImage.setAttribute("src", sprite);
    pokeId.textContent = `N° ${data.id}`;
    pokeHeight.textContent = `Height: ${data.height/10} Mts`;
    pokeWeight.textContent = `Weight: ${data.weight/10} Kg`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
};

const setCardColor = (types) => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1]
        ? typeColors[types[1].type.name]
        : typeColors.default;
    pokeImage.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImage.style.backgroundSize = "  5px 5px";
};

const renderPokemonTypes = data => {
    pokeTypes.innerHTML = "";
    data.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
};

const renderPokemonStats = data => {
    pokeStats.innerHTML = "";
    data.forEach((stats) => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stats.stat.name;
        statElementAmount.textContent = stats["base_stat"];
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
};

const renderNotFound = () => {
    pokeName.textContent = "Pokemon no encontrado";
    pokeImage.setAttribute("src", "img/poke-shadow.png");
    pokeImage.style.background = "#ffffff";
    pokeTypes.innerHTML = "";
    pokeId.textContent = "";
    pokeStats.innerHTML = "";
    pokeHeight.textContent = "";
    pokeWeight.textContent = "";
};


