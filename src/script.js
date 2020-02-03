document.addEventListener("DOMContentLoaded", () => {
    console.log("connected")
    getForm().addEventListener('submit', newCharacterFromForm)
    renderCharacters()

})

    function renderCharacters() {
        fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(characterArray => {

            characterArray.forEach(
                character =>
                renderCharacterCard(character)
            )
        })
    }
    
    function getForm() {
        return document.getElementById('create-form')
       }    


    function newCharacterFromForm(e){
        e.preventDefault()
        let newName = e.target.name.value
        let newImage = e.target.image.value
        let newSpecies = e.target.species.value
        let newStatus = e.target.status.value

        let newCharacter = {
            name: newName, 
            image: newImage, 
            species: newSpecies, 
            status: newStatus
        }
        let configObj = 
        { method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newCharacter)}

        fetch('http://localhost:3000/characters', configObj)
          
        
         .then(response => response.json())
         .then(character => renderCharacterCard(character))
        }
    
        function deleteCharacter(e) {
            let id = e.currentTarget.id.split("-")[1]
            fetch(`http://localhost:3000/characters/${id}`, {
                method: 'DELETE'
            })
            e.currentTarget.remove()
        }


    function renderCharacterCard(character){
        let container = document.getElementById('container')
        let characterCard = document.createElement('div')
        let characterName = document.createElement('h2')
        characterName.innerText = character.name
        let characterImg = document.createElement('img')
        characterImg.src = character.image
        let characterSpecies = document.createElement('div')
        characterSpecies = character.species
        let characterStatus = document.createElement('div')
        characterStatus = character.status
        container.appendChild(characterCard)
        characterCard.append(characterName, characterImg, characterSpecies, characterStatus)
        characterCard.addEventListener('click', deleteCharacter)
    }
        