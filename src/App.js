
import logo from './logo.svg';
import React, {Component} from 'react';
import { connect } from "redux-zero/react";
import { incrementScore, decrementScore, guardarRespuesta, compararRespuestas, obtenerCorrectas, reiniciar } from "./actions";
import './App.css';
import {  ProgressBar, Row, Grid, Col, Image, Button, } from 'react-bootstrap';

function Stats(props) {
	return (<div>
			Barra de carga
			</div>
	)
}
const progressBar = ({ respuestas }) => {
    return (
        <div>
            <div className="progress-label">
                {respuestas} of {5} answered
            </div>
            <ProgressBar now={respuestas * 20} />
        </div>
    );
}
const Opciones = ({ opciones, comparar }) => {
    return (
        <Row>
            {Object.keys(opciones).map((key, index) => {
                let value = opciones[key];
                return (
                    <Col md={4} className={comparar===value ? 'seleccionado' : ''}>
                        <Button key={index} onClick={() => guardarRespuesta(value)}>
                            <span>{key}</span>{value}
                        </Button>
                    </Col>
                );
            })}
        </Row>
    );
}

const CrearPreguntas = ({ question, respuestas, contar }) => {
    return (
        <div>
            <h1> {question.pregunta} </h1>
            <Opciones opciones={question.opciones} comparar={respuestas[contar]} />
        </div>
    );
}
 const ListarRespuestas = ({ comparar, preguntas, respuestas }) => {
    let correctas = obtenerCorrectas();
    return (
        <div>
            <h1>
                {!comparar && 'Here are you answers:'}
                {correctas + ' out of ' + preguntas.length + ' correct!'}
            </h1>
            {
                respuestas.map((item, index) => {
                    let clase = comparar ? (item == preguntas[index].respuesta ? 'text-success' : 'text-danger') : '';
                    let contenido = clase == 'text-danger' ? <strong><strike>{item}</strike> {preguntas[index].respuesta}</strong> : <strong>{item}</strong>;
                    return <p className={clase}>{index + 1}. {preguntas[index].pregunta} {contenido}</p>;
                })
            }
            <div className='text-center'>
                {comparar && <Button  onClick={() => reiniciar()}>Start Again</Button>}
                {!comparar && <Button  onClick={() => compararRespuestas()}>Submit</Button>}
            </div>
        </div>
    );
}

const App = ({ quiz, contar, completo, comparar, respuestas }) => {
  const preguntaActual = quiz[contar];
  console.log ( 'this..', this);//con truco, es el connect el this.
  return (
    <div >
      <header>
        {!completo && <Image src={preguntaActual.imagen} />}
        
      </header>
      <div className="cajita">
		  <Stats />
        {!comparar &&
          <progressBar respuestas={respuestas.length} preguntas={quiz.length} />
        }
        <div>
          {!completo && <CrearPreguntas question={preguntaActual} respuestas={respuestas} contar={contar} />}
          {completo && <ListarRespuestas comparar={comparar} respuestas={respuestas} preguntas={quiz} />}
        </div>
      </div>
    </div>
	
	);
}

const mapToProps = ({ quiz, contar, completo, comparar, respuestas }) => ({ quiz, contar, completo, comparar, respuestas });
export default connect(mapToProps)(App);