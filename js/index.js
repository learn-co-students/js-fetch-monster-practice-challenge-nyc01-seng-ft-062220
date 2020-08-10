document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container')
    const forward = document.querySelector("#forward")
    const back = document.getElementById('back')
    let page = 1 
    
    function fetchMonsters(pageNum = 1) {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(renderMonster)
        })
    }

    const renderMonster = (monsters) => {
        let div = document.createElement('div')
        div.classList.add('monster-attributes')
        let h2 = document.createElement('h2')
        h2.textContent = monsters.name
        let h4 = document.createElement('h4')
        h4.textContent = monsters.age
        let par = document.createElement('p')
        par.textContent = monsters.description

        monsterContainer.appendChild(div)
        div.appendChild(h2)
        div.appendChild(h4)
        div.appendChild(par)
    }

    const submitForm = () => {

        const monsterCreateForm = document.querySelector("#create-monster")
        const form = document.createElement('form')
        form.innerHTML = `
        <label>Name:</label>
        <input type="text" name="name">
        
        <label>Age:</label>
        <input type="number" name="age">
        
        <label>Description:</label>
        <input type="text" name="description">
        
        <input type="submit" value="Create Monster">
        `
        monsterCreateForm.append(form)
    }

    const postHandler = () => {
        document.addEventListener('submit', (event) => {
            console.dir(document)
            event.preventDefault()
            const newForm = event.target 

            const name = event.target.name.value
            const age = event.target.age.value
            const description = event.target.description.value
            

            const monsterObj = {
                name: name,
                age: age,
                descrption: description
            }
            postMonster(monsterObj)
            newForm.reset()
        })
    }

    const postMonster = (monsterObj) => {
        const monsterInput = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(monsterObj)
        }
        fetch("http://localhost:3000/monsters/", monsterInput)
        .then(response => response.json())
        .then(monsters => 
            renderMonster(monsters))
    }




    document.addEventListener('click', (event) => {
        // console.log(event.target) 
        // console.dir(event) testing the target and click to see what it does 
        if (event.target === forward) {
            // console.log(event.target)
            page += 1 
            monsterContainer.innerHTML = ""
            fetchMonsters(page)
        } else if (event.target === back && page > 0) {
            page -= 1
            monsterContainer.innerHTML ="" 
            fetchMonsters(page)
        } else if (event.target === back && page < 1) {alert('you have gone too far back') 
        }
    })


//    const forward = document.querySelector("#forward")
//    forward.addEventListener('click')
fetchMonsters()
postMonster()
submitForm()
postHandler()

// change the url dynamically to increase/decrease the page number 
//change page number when clicking the buttons
//change number of page and add event listener  

})