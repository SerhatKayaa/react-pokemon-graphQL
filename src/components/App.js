import React  from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_POKEMON_INFO = gql`{
    pokemons(first: 150) {
        id,
        number,
        name,
        image,
        evolutions {
            id,
            number,
            name,
            image,
        },
        attacks {
            special {
                name,
                type,
                damage,
            }
        }
        weaknesses,
    }
}`

const App = () => {
    const { data, loading, error } = useQuery(GET_POKEMON_INFO);
    if( loading ) return <p>Loading ..</p>
    if( error ) return <p>Error</p>

    return (
    <div className="container">
        {data &&
            data.pokemons &&
            data.pokemons.map((pokemon, index) => (
            <div key={index} className="card">
                <img src={pokemon.image} />
                <div class="card-body">
                    <h3>{pokemon.name}</h3>
                    <p>
                        {pokemon.attacks && pokemon.attacks.special.length !== 0 && (
                            <p>
                                Attacks: 
                                {pokemon.attacks.special.map(( attack, index ) => {
                                    return <p key={index}> {attack.name}</p>
                                })}
                            </p>
                        )}
                    </p>
                    <p>
                        {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                        <p>
                            {" "}
                            Evolutions:
                            {pokemon.evolutions.map((e, indx) => {
                            return <p key={indx}> {e.name} </p>;
                            })}
                        </p>
                    )}
                </p>
            </div>
        </div>
        ))}
    </div>
    );
};


export default App;