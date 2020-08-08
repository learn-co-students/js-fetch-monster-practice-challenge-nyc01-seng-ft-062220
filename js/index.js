document.addEventListener("DOMContentLoaded", function(e){

 let base_link = "http://localhost:3000/monsters/?_limit=50&_page=3"

 fetch(base_link)
 .then(resp =>resp.json())
 .then(monsters => monsters.forEach(monster =>{
     renderMonsters(monster)
     })
 )

    function renderMonsters(monster){
        let monsterCont = document.querySelector("#monster-container")
        let monsterDiv = document.createElement('div')
        monsterDiv.innerHTML=`
        <h2>${monster.name}<h2/>
        <h4>${monster.age}<h4/>
        <p>${monster.description}<p/>
        `
        monsterCont.appendChild(monsterDiv)
    }

    function addForm(){
        let h1 = document.querySelector("h1")
        let form = document.createElement('form')
        form.innerHTML= 
        `
        <label for="fname" ></label>
        <input type="text" id="name" name="name" placeholder="name">
        <label for="age"></label>
        <input type="text" id="age" name="age" placeholder="age">
        <label for="description"></label>
        <input type="text" id="description" name="description" placeholder="description">
        <button>create monster</button>
        `
         h1.appendChild(form)
        //  debugger
         form.addEventListener("submit", function(e){
            
            e.preventDefault()
            

            let name= e.target.name.value
            let age= e.target.age.value 
            let decription= e.target.decription.value  

            let newMonster = {
                name:name, 
                age:age,
                description: description
            }

            renderMonsters(newMonster)
            debugger

             fetch(base_link, {
                method: "POST" ,
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                    name: name, 
                    age: age, 
                    decription: decription
                  })
             })
             
         })//eventListener
          
    }

  addForm()

    
})//DOMLoaded