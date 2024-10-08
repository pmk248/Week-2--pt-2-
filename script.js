document.addEventListener("DOMContentLoaded", () => { refreshTable(); });

const SOLDIERS_LIST = JSON.parse(localStorage.getItem('allSoldiers')) || [];
const NEW_SOLDIER_FORM = document.getElementById('create-form');
const TABLE_DATA_BODY = document.querySelector('tbody');
const CREATE_FORM = document.querySelector('create-form');

//--------- Functions ---------//
function findById(id){
    const index = SOLDIERS_LIST.findIndex(t => t.Id === id);
    return SOLDIERS_LIST[index];
};

function startCountdown(id, missionButton) {
    let soldier = findById(id); 
    let timeLeft = soldier.missionTime; 

    const intervalId = setInterval(() => {
        clearInterval(intervalId)
        if (timeLeft > 0) {
            timeLeft--; 
            updateMissionButton(timeLeft, missionButton); 
        } else {
            ActionData.missionButton.innerText = "Mission"; 
        }
    }, 1000); 

    return timeLeft; 
}

function updateMissionButton(timeLeft, missionButton) {
    missionButton.innerText = `Mission (${timeLeft})`;
}


function generateId(){

    let id =`a`+ Math.random().toString(36).substring(2, 6);

    if (SOLDIERS_LIST.find(s => s.Id === id)){
        return generateId();
    }
    return id;
};

function updateSoldiersList(){
    localStorage.setItem('allSoldiers', JSON.stringify(SOLDIERS_LIST));
};

function addSoldier(renderedSoldier){
    SOLDIERS_LIST.push(renderedSoldier);
    updateSoldiersList();
    refreshTable(SOLDIERS_LIST);
};

function refreshTable(alphabeticalList = SOLDIERS_LIST) {

    TABLE_DATA_BODY.innerHTML = '';

    alphabeticalList.forEach(soldier =>{

        const newRow = document.createElement('tr');
        newRow.setAttribute('id', soldier.Id);

        let rowData = {
            Name: soldier.Name,
            Rank: soldier.Rank,
            Position: soldier.Position,
            Platoon: soldier.Platoon,
            Status: soldier.Status
        };
        for (let key in rowData) {

            const newData = document.createElement('td');
            newData.innerText = rowData[key];
            newRow.appendChild(newData);
        };
        newRow.appendChild(addButtons(soldier));
        TABLE_DATA_BODY.appendChild(newRow);
    });
}

function addButtons(soldier) {
    let actionData = document.createElement('td');

    // "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.style.backgroundColor = '#27AE60';
    deleteButton.onclick = () => removeSoldier(soldier.Id);

    // "Activate Mission + Timer button"
    const missionButton = document.createElement('button');
    missionButton.innerText = 'Mission Start';
    if (soldier.Status === "Active" || soldier.Status === "Reserve") {
        missionButton.style=" display: 'inline' "; 
        
    } else {
        missionButton.style.display = 'none'; 
    }    
    missionButton.innerText = "Mission";
    missionButton.onclick = () => startCountdown(soldier.Id, missionButton);

    // "Edit" button
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.style.backgroundColor = '#27AE60';
    editButton.onclick = () => openEditWindow(soldier.Id);

    actionData.appendChild(missionButton);
    actionData.appendChild(editButton);
    actionData.appendChild(deleteButton);

    return actionData;
};

function removeSoldier(id) {
    let index = SOLDIERS_LIST.findIndex(s => s.Id === id)
    SOLDIERS_LIST.splice(index, 1);
    updateSoldiersList();
    refreshTable();
};

//--------- Event Listeners ---------//

/* Sorry about the bad obj implementation, we didn't get all year XD */
NEW_SOLDIER_FORM.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = event.target.elements.fname.value.trim();
    let rank = event.target.elements.rank.value.trim();
    let pos = event.target.elements.pos.value.trim();
    let plat = event.target.elements.plat.value.trim();
    let missionT = event.target.elements.missionT.value;
    let status = event.target.elements.status.value;

    let renderedSoldier = {
        Id: generateId(),
        Name: name,
        Rank: rank, 
        Position: pos,
        Platoon: plat,
        MissionTime: missionT,
        Status: status
    };

    addSoldier(renderedSoldier);
    event.target.reset();
});

// -- EDIT WINDOW -- //
const EDIT_FORM = document.getElementById()
let currentEdit = null;
let isFiltered = false;

function openEditWindow(id) {
    window.open("secondpage.html");
    let EDIT_AREA = document.findById('edit-form-area');
    EDIT_AREA.appendChild(CREATE_FORM);
}