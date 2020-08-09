document.addEventListener("DOMContentLoaded", () => {

    const url = "http://localhost:3000/monsters/?_limit=20&_page="
    let pageNumber = 1

    const getMonster = (url, pageNumber) => {
        fetch(url + pageNumber)
        .then(resp => resp.json())
        .then(monsterList => {
            monsterList.forEach(monster => {
                renderMonster(monster);
            });
        });
    };

    const renderMonster = (monster) => {
        const monsterContainer = document.querySelector("#monster-container")
        const monsterBox = document.createElement("div")
        monsterBox.setAttribute("id", `${monster.id}`)

        const monsterName = document.createElement("h2")
        monsterName.innerText = monster.name

        const monsterAge = document.createElement("h4")
        monsterAge.innerText = `Age: ${monster.age}`

        const monsterDesc = document.createElement("p")
        monsterDesc.innerText = `Bio: ${monster.description}`

        monsterBox.append(monsterName, monsterAge, monsterDesc)
        monsterContainer.append(monsterBox)
    };

    const submitForm = () => {

        const monsterContainer = document.querySelector("#create-monster")
        const monsterForm = document.createElement("form")
        monsterForm.innerHTML = `
            <label>Name:</label>
            <input type="text" name="name">

            <label>Age:</label>
            <input type="number" name="age">

            <label>Bio:</label>
            <input type="text" name="description">

            <input type="submit" value="Create Monster">
        `
        monsterContainer.append(monsterForm)
    };

    const postMonsterHandler = () => {

        document.addEventListener("submit", e => {
            e.preventDefault()
            const newMonsterForm = e.target

            const name = e.target.name.value
            const age = e.target.age.value
            const description = e.target.description.value

            const moneterObj = {
                name: name,
                age: age,
                description:description
            };
            postMonster(moneterObj);
            newMonsterForm.reset();
        });

        const postMonster = (mosterObj) => {

            const option = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(mosterObj)
            };
            
            fetch("http://localhost:3000/monsters/", option)
            .then(resp => resp.json())
            .then(monster => {
                renderMonster(monster);
            });
        };
    };

    const nextPage = () => {
        document.addEventListener("click", e => {
            e.preventDefault()
            if(e.target.matches("#forward")){
                newPageNumber = pageNumber + 1
                pageNumber += 1
                getMonster(url + newPageNumber)
            } else if(e.target.matches("#back") && pageNumber > 0){
                newPageNumber = pageNumber - 1
                pageNumber -= 1
                getMonster(url + newPageNumber)
            };
        });
    };













nextPage();
postMonsterHandler();
getMonster(url, pageNumber);
submitForm();
});