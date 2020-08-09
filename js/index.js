

document.addEventListener("DOMContentLoaded",function(){
    const container = document.getElementById("monster-container")
    const formContainer = document.getElementById("create-monster")
    let pageCounter = 1;

    initialLoad(1)
    autoAddingForm()

    formContainer.addEventListener("submit", function(e){
        e.preventDefault()
        postingMonster(e.target)


    })

    document.addEventListener('click',function(e){
        if (e.target.id ==="forward"){
            pageCounter++
            container.innerHTML = ""
            initialLoad(pageCounter)
        }
        else if (e.target.id ==="back"){
            if (pageCounter > 1){
            pageCounter--
            container.innerHTML = ""
            initialLoad(pageCounter)}
            else{
                alert("Sorry, but you can't for back any further")
            }
        }
    })









    function initialLoad(number){
        fetch(`http://localhost:3000/monsters/?_limit=20&_page=${number}`)
        .then(function(response){ return response.json()})
        .then(function(json){
            renderingMonsters(json)

        })

    }

    function renderingMonsters(monsters){

        for(let i = 0; i < monsters.length; i++){

            const div = document.createElement("div"),
            h2 = document.createElement("h2"),
            h4 = document.createElement("h4"),
            p = document.createElement("p");

            h2.textContent = monsters[i].name
            h4.textContent = `Age: ${monsters[i].age}`
            p.textContent = `Bio: ${monsters[i].description}`

            div.appendChild(h2)
            div.appendChild(h4)
            div.appendChild(p)
            container.appendChild(div)
        }
        

    }


    function autoAddingForm(){
        formContainer.innerHTML = `
        <form action="/action_page.php">
            <input type="text" id="name" name="name" placeholder="Luis">
            <input type="number" id="age" name="age" placeholder="30">
            <input type="text" id="bio" name="bio" placeholder="I'm freaking amazing">

            <input type="submit" value="Submit">
        </form> 
        `

    }
    
    function postingMonster(monster){
            let body = JSON.stringify({
                name: monster.name.value,
                age: monster.age.value,
                description: monster.bio.value
            })
            const option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: body
            }


            fetch("http://localhost:3000/monsters/",option)
            .then(function(response){ return response.json})
            .then(function(object){console.log(`${object.name} was posted`)})
            monster.name.value = ""
            monster.age.value = ""
            monster.bio.value = ""

        }



    // end of the DOMContentLoaded addEventListener
})