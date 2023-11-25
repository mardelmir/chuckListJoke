const btnFetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');


window.addEventListener('load', () => {
    if (!localStorage.data) {
        jokeList.innerHTML = ''
    } else {
        let guardados = JSON.parse(localStorage.data)
        guardados.forEach(elemento => {
            mostrar(elemento.valor)
        })
    }
})

btnFetchJoke.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el contenido')
            }
            return response.json()
        })
        .then(data => {
            mostrar(data.value)
            guardar(data.value)
        })
        .catch(error => {
            console.error('Error al mostrar el contenido')
            jokeList.innerText = 'No se puede mostrar el contenido'
        })
})

const mostrar = (chiste) => {
    const plantilla = `
        <li class="chiste">
            <p>${chiste}</p>
            <button class="eliminar">Eliminar</button>
        </li>`
    jokeList.innerHTML += plantilla
}

const guardar = (broma) => {
    const item = {
        //id: `${id}`,
        valor: broma,
    }
    if (!localStorage.data) {
        let chiste = JSON.stringify([item])
        console.log(chiste)
        localStorage.setItem('data', chiste)
    } else {
        let antiguo = JSON.parse(localStorage.data)
        let actual = [...antiguo, item]
        localStorage.data = JSON.stringify(actual)
    }
}



const btnEliminarUno = document.querySelectorAll('.eliminar')
btnEliminarUno.forEach(btn => {
    let li = btn.parentNode
    console.log(li);
})

const btnEliminarTodo = document.createElement('button')
btnEliminarTodo.textContent = 'Eliminar todo'
btnEliminarTodo.setAttribute('id', 'clear')
jokeList.insertAdjacentElement('afterend', btnEliminarTodo)

btnEliminarTodo.addEventListener('click', () => {
    localStorage.clear()
    jokeList.innerHTML = ''
})




// const guardar = (broma) => {
//     if (!localStorage.data) {
//         let chiste = JSON.stringify([broma])
//         localStorage.setItem('data', chiste)
//     } else {
//         let antiguo = JSON.parse(localStorage.data)
//         let actual = [...antiguo, broma]
//         localStorage.data = JSON.stringify(actual)
//     }
// }
