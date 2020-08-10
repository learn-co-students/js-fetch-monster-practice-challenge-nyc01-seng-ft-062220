document.addEventListener("DOMContentLoaded", function(e){
  
  
  let base_link = `http://localhost:3000/monsters/?_limit=50&_page=1`
  
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
      let description= e.target.description.value  
      
      let newMonster = {
        name:name, 
        age:age,
        description: description
      }
      console.log(newMonster)
      renderMonsters(newMonster)
      
      fetch(base_link, {
        method: "POST" ,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          newMonster
        })
      })
      
    })//eventListener
    
  }//addForm

  // debugger
  addForm()
  
  // debugger
  // let page_url = `http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`
  
  
  // let pageNumber = parseInt(base_link.charAt(48))

  
  let currentPage = 2
  document.addEventListener("click", function(e){

    if (e.target.id ==="forward")
    {
      let newPageUrlF = `http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`

      fetch(newPageUrlF)
      .then(resp =>resp.json())
      // .then(console.log(resp.url))
      .then(monsters => monsters.forEach(monster =>{
     renderMonsters(monster)
    })
    
    )

    currentPage= currentPage+1
    
    } else if (e.target.id==="back"){
      let newPageUrlB = `http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`

      fetch(newPageUrlB)
      .then(resp =>resp.json())
      .then(monsters => monsters.forEach(monster =>{
     renderMonsters(monster)
    })
    )
    currentPage=currentPage-1
  }
  // debugger
})
      

    
})//DOMLoaded