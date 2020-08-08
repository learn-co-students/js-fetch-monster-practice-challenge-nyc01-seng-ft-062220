document.addEventListener("DOMContentLoaded", e =>{

    const url = "http://localhost:3000/monsters/";
    const monsterContainerDiv = document.getElementById('monster-container')
    let page = 1

    const pullMonsters = (start= 0, end = 50) => {

        monsterContainerDiv.innerHTML = ''

        fetch(url)
            .then(res => res.json())
            .then(data => {
                for (let i = start; i < end; i++) {

                    generateMonsterCards(data[i])
                }
            })
    }

    const generateMonsterCards = (monsterItem) => {

        const monsterCard = document.createElement("div")
        monsterCard.classList.add("monster-card")
        monsterCard.id = monsterItem.id

        monsterCard.innerHTML = `
            <p>Monster id: ${monsterItem.id}</p>
            <p>Monster Name: ${monsterItem.name}</p>
            <p>Monster Age: ${monsterItem.age}</p>
            <p>Monster Description: ${monsterItem.description}</p>
            <br/><br/> 
            `
            monsterContainerDiv.append(monsterCard)

    }

    const createMonster = () => {

        //get data from form
        //submit data to server

        document.addEventListener("submit", e => {
            e.preventDefault()

            const newMonsterForm = e.target

            const name = newMonsterForm.name.value
            const age = newMonsterForm.age.value
            const description = newMonsterForm.description.value

            const newMonsterData = {
                name: name,
                age: age,
                description: description
            }

            const packet = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(newMonsterData)
            }


            fetch(url, packet)
                .then(res => res.json())
                .then(data => console.log(data))

            newMonsterForm.reset()

        })


    }

    const loadPage = () => {
        let start = 0
        let end = 50
        pullMonsters(start, end)

        document.addEventListener("click", e => {

            if (e.target.matches("button#forward")){
                start = start + 50
                end = end + 50
                pullMonsters(start, end)

            } else if (e.target.matches("button#back")) {
                start = start - 50
                end = end - 50
                if (start < 0){
                    start = 0
                    end = 50
                    pullMonsters(start, end)
                }
                pullMonsters(start, end)
            }
        })


    }


    loadPage()
    createMonster()

})