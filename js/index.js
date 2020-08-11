document.addEventListener(`DOMContentLoaded`, e => {
    const monsterContainer = document.querySelector(`#monster-container`)
    const createMonsterDiv = document.querySelector(`#create-monster`)
    const pageReset = () => {
        monsterContainer.querySelectorAll(`div`).forEach(div => div.remove())
        paginatedFetch()
    }
    let pageCount = 1
    const paginatedFetch = () => {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCount}`)
        .then(resp => resp.json())
        .then(monsterData => monsterData.forEach(monster => renderMonsterDiv(monster)))
    }
    const renderMonsterDiv = (monsterObject) => {
        const monsterDiv = document.createElement(`div`)
        const name = document.createElement(`li`)
        const age = document.createElement(`li`)
        const description = document.createElement(`li`)
    
        monsterDiv.id = monsterObject.id
        name.innerText = `NAME: ${monsterObject.name}`
        age.innerText = `AGE: ${monsterObject.age}`
        description.innerText = `DESCRIPTION: ${monsterObject.description}`
    
        monsterDiv.append(name, age, description)
        monsterContainer.append(monsterDiv)
    } 

    createMonsterDiv.innerHTML = `
        <form>
            <label>Name</label>
            <input name="name">
            <label>Age</label>
            <input type="number" name="age">
            <label>Description</label>
            <input name="description">
            <button type="submit">Add Monster</button>
        </form>
    `

    paginatedFetch()

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        const monsterObject = {
            name: `${e.target.name.value}`,
            age: `${e.target.age.value}`,
            description: `${e.target.description.value}`
        }

        fetch(`http://localhost:3000/monsters`, {
            method: `POST`,
            headers: {
                "content-type": `application/json`,
                "accept": `application/json`
            },
            body: JSON.stringify(monsterObject)  
        })
        .then(r => r.json())
        .then(monsterData => renderMonsterDiv(monsterData))
    })

    document.addEventListener(`click`, e => {
        if (e.target.matches(`#forward`)) {
            pageCount++
            pageReset()
        } else if (e.target.matches(`#back`)) {
            pageCount -= 1
            pageReset()
        }
    })
})