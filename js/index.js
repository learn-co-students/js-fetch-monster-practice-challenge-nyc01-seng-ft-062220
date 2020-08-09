
document.addEventListener("DOMContentLoaded", function(e) {
    console.log("Dom loaded")
    const monsterCont = document.getElementById("monster-container")
    const formDiv = document.getElementById("create-monster")
    //const newMonsterForm = document.querySelector("form")
    const forwardButton = document.getElementById("forward")
    const backButton = document.getElementById("back")
    let pageNum = 1

    document.addEventListener("click", function(e){
        if(e.target === forwardButton) {
            pageNum++
            monsterCont.innerHTML = ""
            getMonsters(pageNum)
        } else if (e.target === backButton) {
            pageNum--
            monsterCont.innerHTML = ""
            getMonsters(pageNum)
        }
        

    })

    /*
        add listener to each button
        addbehavior to each button (includes get reuqest)
    */

    formDiv.addEventListener("submit", function(e){
        const monstName = e.target.name.value
        const monstAge = e.target.age.value
        const monstDesc = e.target.description.value
        
        const monstObjToStringify = {
            name: monstName,
            age: monstAge,
            description: monstDesc
        }

        const configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(monstObjToStringify)
        }

        fetch("http://localhost:3000/monsters", configObj)
            .then(response => response.json())
            .then(data => {renderMonster(data)
                e.target.reset()
            })

        e.preventDefault()
    })


    function getMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(function(monsters){ renderMonsters(monsters)})
        .catch(error => {
            alert(`Error: $(error)`)
    })
    }
    


    function renderMonster(monsterObj) {
        newDiv = document.createElement("div")
        newDiv.innerHTML = `
                <h2>Name: ${monsterObj.name}</h2>
                <h4>Age: ${monsterObj.age} </h4>
                <p> Bio: ${monsterObj.description} </p>

            `
        newDiv.id = monsterObj.id
            monsterCont.append(newDiv)
    }


    function renderMonsters(monstersObj) {
        monstersObj.forEach(renderMonster)
    }

    function createForm() {    
        formDiv.innerHTML = `
        <form>
            <input type="text" id="tt" name="name" placeholder="name...">
            <input type="number" id="ttt" name="age" placeholder="age...">
            <input type="text" id="ttttt " name="description" placeholder="description...">
            <input type="submit" value="Create">
        </form>
        
        `
    }
    

    createForm()
    getMonsters(pageNum)
    

})

/*

0. make sure DOM loads befopre doing anything w/ listener
1. fetch 50 monsters from DB
    - add optionmmal parameters
2. render monsters to DOM 
    - make a method to put data into HTML
3. create form for creating new monsters
    - that updates DB
4. create buttons that load next and previous pages
*/

//why cant you assing to variable here?
// fetch("http://localhost:3000/monsters/?_limit=50")
// .then(response => response.json())
// .then(monsters => const monsterBatch = monsters))
// .catch(error => {
//     alert(`Error: $(error)`)
// })

