import React, { useState, useEffect } from 'react';
import './App.css';


export default function RandomUser() {
  const [count, setCounter] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [clickedImage, setClickedImage] = useState('')
  
  // const [loading, setLoading] = useState(true);

  function spriteUrl(value) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${clickedImage}${value}.png`;
  }

  useEffect(async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
    const data = await response.json()
    const info = data.results;
    console.log(info);
    setPokemon(info);
  }, []);


  function generateList(pokemon) {
    return pokemon.map((pokemon, index) => {
      return (
        <div className='grid-item' key={index}>
          {pokemon.name}
          <img className='grid-item-img' src={spriteUrl(index + 1)} />
          <button onClick={() => setClickedImage('')}>Front</button>
          <button onClick={() => setClickedImage('back/')}>Back</button>
        </div>
      )
    })
  }

  return(
    <div>
      <p>You've clicked {count} times</p>

      <button onClick={() => setCounter(count + 1)}>Click Me</button>
      <div className='grid-items'>
        {pokemon.length ? generateList(pokemon) : <div>...loading</div>  }
      </div>
    </div>
  )

}
