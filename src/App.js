
import logo from './logo.svg';
import React, {Component} from 'react';
import { connect } from "redux-zero/react";
import { incrementScore, decrementScore, addPlayer, removePlayer, selectPlayer } from "./actions";
import './App.css';


const Player = ({pregunta, respuesta, imagen, opciones}) => {
	return (
		<div >
			<img src={imagen} alt=""/>
			<div>
				<h1>{pregunta}</h1>
			</div>
			<div>
				<button> {respuesta} </button>
			</div>
		</div>
	);
}

function Stats(props) {
	var totalPlayers = props.players.length;
	var totalPoints = props.players.reduce(function (total, player) {
		return total + player.score;
	}, 0);

	return (
		<div>
			Barra de carga
			</div>
	)
}

const Option = ( {index, option, model} ) => {
   const onOptionSelect = (e) =>  {
      console.log('value: ', option);
      model.setAnswerAt(option, index);
   };

   return (
      <div>
         <div>
            <span> { String.fromCharCode(65 + index)} -  </span>
            <button onClick = {onOptionSelect} >  {option} </button>
         </div>
      </div>);
};


const App = ({players, selectedPlayerIndex}) => {
	const onSubmit = (e) => {
		e.preventDefault();
		console.log ( 'this..', this);//con truco, es el connect el this.
		addPlayer(this.playerInputRef.value)
	}
	const playerComponents =  players.map ( (player, index) => {
			return <Player
					key = {index}
					pregunta={player.pregunta}
					respuesta={player.respuesta}
					imagen={player.imagen}
					increment={ () => incrementScore(index)}
					decrement={ () => decrementScore(index)}
					removePlayer={ () => removePlayer (index) }
					selectPlayer={ () => selectPlayer (index) }
 				/>
		})

	let selectedPlayer;
	if(selectedPlayerIndex !== -1){
		selectedPlayer = players[selectedPlayerIndex];
	}

	return (
		<div className="scoreboard">
			<div className="header">
				<Stats players={players}/>
				<h1>TRIVIA</h1>
			</div>
			<div className="cajita">
				{playerComponents}
			</div>
		</div>
	);
}

const mapToProps = ({players, selectedPlayerIndex}) => ({players, selectedPlayerIndex});

export default connect(mapToProps)(App);

