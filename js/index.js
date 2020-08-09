
 




document.addEventListener('DOMContentLoaded', function(e) {

    let page = 1
// let limitUrl = `http://localhost:3000/monsters/?_limit=10&_page=${page}`






   
    function getMonsters() {
        return fetch(`http://localhost:3000/monsters/?_limit=10&_page=${page}`)
            .then(resp => resp.json())
            .then(json => addMonsters(json))
            
          }
    
    // array1.forEach(element => console.log(element));
    
    function addMonsters(monsters) {
        const monsterContainer = document.getElementById('monster-container')
        monsters.forEach(monster => {
            const monsterDiv = document.createElement('div')
            monsterContainer.appendChild(monsterDiv)
            monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
            `
          })
    
        }

        document.addEventListener("click", function(e) {
            const fwdBtn = document.getElementById('forward')
            const backBtn = document.getElementById('back')
            if (e.target === fwdBtn) {
                const pageMonsters = document.getElementById('monster-container').childNodes.length
                console.log(pageMonsters)
                page += 1
                console.log(page)
                console.log(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
                getMonsters()
            } else if (e.target === backBtn && page !== 1) {
                page -= 1
                console.log(page)
                console.log(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
                getMonsters()
            }
        })


    const formDiv = document.getElementById('create-monster')
   

    function createForm() {
        const newMonForm = document.createElement('form')
        const nameInput = document.createElement("input")
        const ageInput = document.createElement("input")
        const descriptionInput = document.createElement("input")
        const btnSubmit = document.createElement("button")

        newMonForm.setAttribute('id', 'create-monster-form')

        nameInput.setAttribute('id', 'name')
            nameInput.setAttribute('placeholder', 'name...')
                nameInput.setAttribute('value', "")
       
        ageInput.setAttribute('id', 'age')
            ageInput.setAttribute('placeholder', 'age...')
                ageInput.setAttribute('value', "")
    
        descriptionInput.setAttribute('id', 'description')
            descriptionInput.setAttribute('placeholder', 'description...')
                descriptionInput.setAttribute('value', "")
  
        btnSubmit.textContent = ('Create')
            btnSubmit.setAttribute('id', 'create')

        formDiv.appendChild(newMonForm)

        newMonForm.appendChild(nameInput)
        newMonForm.appendChild(ageInput)
        newMonForm.appendChild(descriptionInput)
        newMonForm.appendChild(btnSubmit)


    }

        document.addEventListener("submit", function(e){
            const monstForm = document.getElementById('create-monster-form')
            const name = monstForm.name.value
            const age = monstForm.age.value
            const description = monstForm.description.value
            const monsterObj = { name: name, age: age, description: description}
            createMonster(monsterObj)
        })

    function createMonster(monstObj){
        fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
            "name": monstObj.name,
            "age": monstObj.age,
            "description": monstObj.description})
        })
      }





createForm();
getMonsters();

})



