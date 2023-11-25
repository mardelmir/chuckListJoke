const btnFetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');


btnFetchJoke.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el contenido')
            }
            return response.json()
        })
        .then(data => {
            if (!localStorage.id) {
                localStorage.setItem('id', '1')
                let id = 1
                guardar(data.value, id)
            } else {
                localStorage.id = parseFloat(localStorage.getItem('id')) + 1;
                let id = localStorage.id
                guardar(data.value, id)
            }
        })
        .catch(error => {
            console.error('Error al mostrar el contenido')
            jokeList.innerText = 'No se puede mostrar el contenido'
        })
})

const guardar = (broma, id) => {
    const item = {
        id: `${id}`,
        valor: broma,
    }

    if (!localStorage.data) {
        let arrayChistes = JSON.stringify([item])
        localStorage.setItem('data', arrayChistes)
        mostrar(broma, id)
    } else {
        let antiguo = JSON.parse(localStorage.data)
        let actual = [...antiguo, item]
        localStorage.data = JSON.stringify(actual)
        mostrar(broma, id)
    }
}

const repintar = () => {
    jokeList.innerHTML = ''
    let guardados = JSON.parse(localStorage.data)
    guardados.forEach(elemento => {
        mostrar(elemento.valor, elemento.id)
    })
}

const mostrar = (chiste, id) => {
    const plantilla = `
        <li class="chiste">
            <p>${chiste}</p>
            <button class="eliminar" onclick="eliminar(${id})">Eliminar</button>
        </li>`
    jokeList.innerHTML += plantilla
}

if (!localStorage.data) {
    jokeList.innerHTML = ''
} else {
    repintar()
}




// BONUS

const eliminar = (id) => {
    let arrayData = JSON.parse(localStorage.getItem('data'))
    arrayData.filter(objeto => {
        let identificacion = `${id}`
        if (objeto.id == identificacion) {
            const index = arrayData.indexOf(objeto)
            arrayData.splice(index, 1)
            localStorage.data = JSON.stringify(arrayData)
            repintar()
        }
    })
}

const btnEliminarTodo = document.createElement('button')
btnEliminarTodo.textContent = 'Eliminar todo'
btnEliminarTodo.setAttribute('id', 'clear')
jokeList.insertAdjacentElement('afterend', btnEliminarTodo)

btnEliminarTodo.addEventListener('click', () => {
    localStorage.clear()
    jokeList.innerHTML = ''
})