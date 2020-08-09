document.addEventListener("DOMContentLoaded", () => {
    
    const url = "http://localhost:3000/monsters/"
    var limit = 50
    var page = 1

    const loadForm = () => {
        const form = document.createElement("form")
        form.id = "monster-form"
        form.innerHTML =   `<input id="name" placeholder="name...">
                            <input id="age" placeholder="age...">
                            <input id="description" placeholder="description...">
                            <button>Create</button>`
        document.querySelector("#create-monster").append(form)
    }
    
    const getMonsters = () => {
        const limitString = `?_limit=${limit}`
        const pageString = `&_page=${page}`
        const fetchUrl = url + limitString + pageString
        fetch(fetchUrl)
        .then(response => response.json())
        .then(function(monsters) {
            renderMonsters(monsters)
        })
        .catch(function(error) {
            console.log(error.message)
        })
    }


    const buildMonsters = monsters => {
        // for (const monster of monsters) {
        //     renderMonster(monster)
        // }
        for (let i = 0; i < monsters.length; i++) {
            monsterList.push(monsters[i])
        }
    }

    // getMonsters()
    // console.dir(monsterList)


    const renderMonsters = (monsters) => {
        for (let monster of monsters) {
            renderMonster(monster)
        }
    }

    const renderMonster = monster => {
        const div = document.createElement("div")
        div.className = "monster"
        div.id = monster.id
        const h2 = document.createElement("h2")
        h2.innerText = monster.name
        const h4 = document.createElement("h4")
        h4.innerText = `Age: ${monster.age}`
        const p = document.createElement("p")
        p.innerText = `Bio: ${monster.description}`
        const button = document.createElement("button")
        button.id = "edit-button"
        button.innerHTML = `Edit`
        div.appendChild(h2)
        div.appendChild(h4)
        div.appendChild(p)
        div.appendChild(button)
        document.querySelector("#monster-container").append(div)
    }

    const loadEditForm = () => {
        const form = document.createElement("form")
        form.className = "edit-form"
        form.innerHTML =   `<input id="name" placeholder="name...">
                            <input id="age" placeholder="age...">
                            <input id="description" placeholder="description...">
                            <button>Create</button>`
        return form
    }

    const clickHandler = () => {
        document.addEventListener('click', (e) => {
            const click = e.target
            if (click.matches("#forward")) {
                document.querySelectorAll(".monster").forEach(e => e.remove())
                page += 1
                getMonsters()
            } else if (click.matches ("#back")) {
                if (page > 1) {
                    document.querySelectorAll(".monster").forEach(e => e.remove())
                    page -= 1
                    getMonsters()
                } 
            } else if (click.matches("#edit-button")) {
                const div = click.parentNode
                click.style.display = "none"
                div.appendChild(loadEditForm())
            }
        })
    }

    const submitHandler = () => {
        document.addEventListener("submit", (e) => {
            if (e.target.matches("#monster-form")) {
                createMonster(e.target)
            }
            else if (e.target.matches(".edit-form")) {
                e.preventDefault
                editMonster(e.target)
            }
        })
    }

    const createMonster = (newMonster) => {

        const name = newMonster.name.value
        const age = newMonster.age.value
        const description = newMonster.description.value
  
        const monsterObj = { 
          name: name,
          age: age, 
          description: description, 
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(monsterObj)
        } 

        fetch(url, options) 
    }

    const editMonster = (Monster) => {

        const name = Monster.name.value
        const age = Monster.age.value
        const description = Monster.description.value
        const id = Monster.parentNode.id
  
        const monsterObj = { 
          name: name,
          age: age, 
          description: description, 
        }

        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(monsterObj)
        } 

        console.log(url + id)
        fetch(url + id, options) 
        .then (response => response.json)
        .then(function(monster) {
            updateMonsterView(monster)
        })
        .catch(function(error) {
            console.log(error.message)
        })
    }

    const updateMonsterView = (monster) => {
        console.dir(monster)
    }

    loadForm()
    submitHandler()
    getMonsters(limit)
    clickHandler()
})
