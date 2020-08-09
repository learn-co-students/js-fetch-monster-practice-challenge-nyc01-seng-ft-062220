
 




document.addEventListener('DOMContentLoaded', function(e) {

    let page = 1
    let setUrl = `http://localhost:3000/`






   
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
            let fwdBtn = document.getElementById('forward'),
                backBtn = document.getElementById('back');
            if (e.target === fwdBtn) {
                const pageMonsters = document.getElementById('monster-container').childNodes.length
                console.log(pageMonsters)
                page++
                console.log(page)
                console.log(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
                getMonsters(page)
            } else if (e.target === backBtn && page !== 1) {
                page -= 1
                console.log(page)
                console.log(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
                getMonsters()
            }
        })


    const formDiv = document.getElementById('create-monster')
   

    function createForm() {
        let newMonForm = document.createElement('form'),
            nameInput = document.createElement("input"),
            ageInput = document.createElement("input"),
            descriptionInput = document.createElement("input"),
            btnSubmit = document.createElement("button");

        newMonForm.id = 'create-monster-form',

        nameInput.id = 'name',
            nameInput.placeholder = 'name...',
                nameInput.value = "",
       
        ageInput.id= 'age',
            ageInput.placeholder = 'age...',
                ageInput.value = "",
    
        descriptionInput.id = 'description',
            descriptionInput.placeholder = 'description...',
                descriptionInput.value = "",
  
        btnSubmit.textContent = 'Create',
            btnSubmit.id= 'create',

        formDiv.appendChild(newMonForm)
        newMonForm.appendChild(nameInput)
        newMonForm.appendChild(ageInput)
        newMonForm.appendChild(descriptionInput)
        newMonForm.appendChild(btnSubmit)


    }

        document.addEventListener("submit", function(e){
            let monstForm = document.getElementById('create-monster-form'),
                name = monstForm.name.value,
                age = monstForm.age.value,
                description = monstForm.description.value,
                monsterObj = { name: name, age: age, description: description};
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



