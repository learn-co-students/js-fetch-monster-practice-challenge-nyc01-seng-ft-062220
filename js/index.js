//let currentPage = 3
let currentPage = 1
function getMonsters(currentPage) {
    const monsterContainer = document.getElementById("monster-container")
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(monster => {
            let div = document.createElement("div")
            div.innerHTML = `
                <h3>${monster.name}</h3>
                <p>${monster.age}</p>
                <p>${monster.description}</p>
            `
            monsterContainer.appendChild(div)
        })
    })

}


document.addEventListener("submit", function(e) {
    e.preventDefault()
    const form = document.querySelector("form")
    const nameField = document.querySelector('input[name="name"]')
    const ageField = document.querySelector('input[name="age"]')
    const descriptionField = document.querySelector('input[name="description"]')
    fetch("http://localhost:3000/monsters/?_limit=50", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            "name": nameField.value,
            "age": ageField.value,
            "description": descriptionField.value 
        })
    })
    .then(response => response.json())
    .then(data => {
        const monsterContainer = document.getElementById("monster-container")
        let div = document.createElement("div")
        div.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.age}</p>
            <p>${data.description}</p>
        `
        monsterContainer.appendChild(div)
    })
    form.reset()
})

function nextPage() {
    const backBtn = document.querySelector("#back")
    const forwardBtn = document.querySelector("#forward")
    document.addEventListener("click", function(e) {
        e.preventDefault()
        if (e.target === backBtn) {
            if (currentPage === 1) {
                null
            }
            getMonsters(currentPage - 1)
        }
        else if (e.target === forwardBtn) {
            getMonsters(currentPage + 1)
        }
    })
}

nextPage()
getMonsters()