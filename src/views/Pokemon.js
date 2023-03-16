import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/DataProvider";

export default function Pokemon(){
    const [pokemonData, setPokemonData] = useState({})
    const [loadingState, setloadingState] = useState("LOADING")
    const [pokemonID, setPokemonID] = useState(1)
    const [id, setID] = useState(1)
    const {getPokemonData} = useContext(DataContext)

    useEffect(() => {
        async function handleLoad(){
           const data = await getPokemonData(pokemonID)
           setPokemonData(data)
           setloadingState("loaded")
        }
        handleLoad()
    }, [pokemonID])

    function handleSubmit(e) {
        e.preventDefault()
        setPokemonID(id)
        setID("")

    }

    function incermentPokemonID(incrementor){
        setPokemonID(pokemonID+incrementor)
        setID(pokemonID+incrementor)
        
    }
    console.log(pokemonData)

    return(
        <div>
            <h1 className="title">Pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="" name="id" id="id" value={id} onChange={(e) => setID(parseInt(e.target.value))} min={1} max={1010}/>
                <button type="submit" onClick={handleSubmit}>Search</button>
            </form>
            {
                (loadingState === "LOADING") ?
                <p>Loading</p>
                :
                <div className="pokemon">
                <img src={pokemonData.sprites.front_default}/>
                <h2>{pokemonData.name}</h2>
                {
                    (pokemonID > 1) ?
                    <button onClick={() => incermentPokemonID(-1)}>Pervious</button>
                    :
                    <></>
                }
                <button onClick={() => incermentPokemonID(1)}>Next</button>
                </div>
            }
        </div>
    )
}