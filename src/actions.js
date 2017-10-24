import store from "./store";

export const incrementScore = (index) => {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();
	const cloneList = [...store.getState().players];
	cloneList[index].score++;
	cloneList[index].updated = `${month}/${day}/${year}`;

	store.setState({
		players: cloneList
	})
};

export const decrementScore = (index) => {
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();
	const cloneList = [...store.getState().players];
	cloneList[index].score--;
	cloneList[index].updated = `${month}/${day}/${year}`;

	store.setState({
		players: cloneList
	})
};

export const guardarRespuesta = (value) => {
    let result = [...store.getState().respuestas];
    let index = store.getState().cont;
    let check = store.getState().check;
    let questions = [...store.getState().quiz];

    if (check) {
        result[index] = value;
        store.setState({
            check: false,
            respuestas: result
        })
    let t = setTimeout(() => {
    let cont = store.getState().cont;
              if (cont === questions.length - 1) {
        store.setState({
            completo: true
        });
    }
        cont++;
        store.setState({
        check: true,
        cont: cont,
                
        })
        }, 1000);
    }
}
export const obtenerCorrectas = () => {
    let questions = [...store.getState().quiz];
    let answers = [...store.getState().respuestas];
    return answers.filter((item, index) => item == questions[index].respuesta).length;
}
export const compararRespuestas = () => {
    store.setState({
        comparar: true
    });
}

export const reiniciar = () => {
    store.setState({
        cont: 0,
        comparar: false,
        completo: false,
        respuestas: []
    });
}