const init = () => {
    document.addEventListener("DOMContentLoaded", ()=>{


        const renderCurrentPage = async () => {
            const monstersObj = await apiCommunication.getMonsters();
            const frag = new DocumentFragment();

            // debugger;
        
            for await (const monster of monstersObj){
                // debugger;
                const div = document.createElement("div");
                div.classList.add("monster-card")
                div.innerHTML = `<h2>name: ${monster.name} </h2> 
                <h4>age: ${monster.age}</h4>
                <p> description: ${monster.description} </p>
                `
                frag.appendChild(div);
            }
            document.getElementById("monster-container").appendChild(frag);
        }

        const createMonsterForm = ()=>{
            const frag = new DocumentFragment();
            const formDiv = document.getElementById("create-monster");
            const form = document.createElement("form");
            form.setAttribute("id", "create-monster-form");
        
            const formMonsterNameLabel = document.createElement("label");
            formMonsterNameLabel.innerHTML = `Name: `;
            const formMonsterName = document.createElement("input");
            formMonsterName.setAttribute("type", "text");
            formMonsterName.setAttribute("name", "name");
            form.appendChild(formMonsterNameLabel);
            form.appendChild(formMonsterName);
        
            const formMonsterAgeLabel = document.createElement("label");
            formMonsterAgeLabel.innerHTML = `Age: `;
            const formMonsterAge = document.createElement("input");
            formMonsterAge.setAttribute("type", "text");
            formMonsterAge.setAttribute("name", "age");
            form.appendChild(formMonsterAgeLabel)
            form.appendChild(formMonsterAge);
        
            const formMonsterDescriptionLabel = document.createElement("label");
            formMonsterDescriptionLabel.innerHTML = `Description: `;
            const formMonsterDescription = document.createElement("input");
            formMonsterDescription.setAttribute("type", "text");
            formMonsterDescription.setAttribute("name", "description");
            form.appendChild(formMonsterDescriptionLabel)
            form.appendChild(formMonsterDescription);

            const formMonsterButton = document.createElement("input");
            formMonsterButton.setAttribute("type", "submit");
            form.appendChild(formMonsterButton);
            // form.action = "http://localhost:3000/monsters";           
            // form.method = "POST";

            frag.appendChild(form)
            formDiv.appendChild(frag);
        }

        const monsterFormSubmission = () =>{
            const form = document.getElementById("create-monster-form");
            console.log(form)
            form.addEventListener("submit", e => {
                e.preventDefault();

                const fName = e.target.name.value;
                const fAge = e.target.age.value;
                const fDescription = e.target.description.value;

                monsterFormObj = {
                    name: fName,
                    age: fAge,
                    description: fDescription
                }

                debugger;
                apiCommunication.createMonster(monsterFormObj);

            })
        }

        renderCurrentPage();
        createMonsterForm();
        monsterFormSubmission();
    })
}

const apiCommunication = {

    getMonsters: async () => {
        const limit = 50
        const page = 1;
        const url = `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`

        let response = await fetch(url);
        let monsters = await response.json();
        return monsters;
        
    },

    createMonster: async (monsterForm) => {

        let url = "http://localhost:3000/monsters"
        configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(monsterForm)
        }
    
        const rawResponse = await fetch(url, configObj)
        const postNewMonster = await rawResponse.json();
        console.log(postNewMonster)
    }

}

init();

/* 

TODO- last deliverable: next/previous page should show next 50 monsters


*/