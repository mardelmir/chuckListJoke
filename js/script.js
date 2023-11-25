const btnFetchList = document.getElementById('fetchJoke');
const fetchJoke = document.getElementById('jokeList');


window.addEventListener('load', () => {
    if (!localStorage.data) {
        fetchJoke.innerHTML=''
    } else {
        let guardados = JSON.parse(localStorage.data)
        guardados.forEach(elemento => {
            mostrar(elemento)
        })
    }
})

btnFetchList.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => {
            if (!response.ok) {
                throw new error('no se pudo obtener')
            }
            return response.json()
        })
        .then(data => {
            mostrar (data.value)
            guardar(data.value)
    })
})

const mostrar = (joke) => {
    const plantilla = `
        <li>
            <p>${joke}</p>
            <button id ="borrar" class="eliminar">Eliminar</button>
        </li>`
    fetchJoke.innerHTML += plantilla
}

const guardar = (broma) => {
    if(!localStorage.data) {
        let chiste = JSON.stringify([broma])
        localStorage.setItem('data', chiste)
    } else {
        let antiguo = JSON.parse(localStorage.data)
        let actual = [...antiguo, broma]
        localStorage.data = JSON.stringify(actual)
    }
}

