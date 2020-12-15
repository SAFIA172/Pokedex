import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

class App extends Component {

  constructor() {
    super()
    this.click = this.click.bind(this)
    this.state = {

      list: [],
      currentPokemon: null,
      // type:null
    }
  }



  componentDidMount() {
    // Nous récupérons la liste de 100 pokemon au démarage de l'application
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => res.json())
      .then(json => {

        // console.log(json)
        this.setState({
          list: json.results,

        })

        //console.log('List',this.state.list)

      })


  }

  click(url) {
    // url corresponds aux informations que nous devons récupérer sur le pokemon selectionner
    fetch(url)
      .then(res => res.json())
      .then(json => {

        //   let typesPokemon = json.types.map(function (elem) {
        //   return elem.type.name
        //  }).join(',')


        // console.log(typesPokemon)
        // nous stokons dans currentPokemon les informations du pokemon selectionner

        this.setState({
          currentPokemon: json,
          //  type:typesPokemon,
        })

      })
  }


  render() {

    return (
      <div className=" App container-fluid">

        <section className="single-poke jumbotron " style={{ backgroundColor: "black", color: "white" }}>
          {this.state.currentPokemon ?
            (<div className="poke-info">
              <img className="big" src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.currentPokemon.id}.png`} style={{ width: 200 }} alt="" />

              <div>

                <p><b>Name : </b> {this.state.currentPokemon.name}</p>
                <p><b>Height : </b>{this.state.currentPokemon.height}</p>
                <p><b>Weight : </b>{this.state.currentPokemon.weight}</p>
                <p><b>Type   :  </b>{this.state.currentPokemon.types.map((elem, index) => { 
                  
                  return (
                  elem.type.name
          
                )}).join(' ,  ') } </p>

              </div>

            </div>) :
            (<h1>Please select a pokemon</h1>)

          }
        </section>

        <section>
          {this.state.list.map((elem, index) => {
            return (
              <button onClick={() => this.click(elem.url)}>
                <img src={`https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`} style={{ width: 200 }} alt="" />
                <p>{elem.name}</p>
              </button>
            )
          })}
        </section>







      </div>
    );
  }
}

export default App;


