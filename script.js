document.addEventListener("DOMContentLoaded", () => { refreshTable(); });

const SOLDIERS_LIST = JSON.parse(localStorage.getItem('allSoldiers')) || [];
const NEW_SOLDIER_FORM = document.getElementById("create-form")


//--------- Functions ---------//
function findById(id){
    const index = todos.findIndex(t => t.Id === id);
    return todos[index];
};

function generateId(){
    return `a`+ Math.random().toString(36).substring(2, 15);
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

    tableBody.innerHTML = '';

    alphabeticalList.forEach(soldier =>{

        const newRow = document.createElement('tr');
        newRow.setAttribute('id', soldier.Id);

        let rowData = {
            Name: soldier.Name,
            Rank: soldier.Rank,
            Position: soldier.Position,
            Platoon: soldier.Platoon,
            MissionTime: soldier.MissionTime,
            Status: soldier.Status
        };
        for (let key in rowData) {

            const newData = document.createElement('td');
            newData.innerText = rowData[key];
            newRow.appendChild(newData);
        };
        newRow.appendChild(addButtons(soldier));
        tableBody.appendChild(newRow);
    });
}

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
    name.value = "";
    rank.value = "";
    pos.value = "";
    plat.value = "";
    missionT.value = "";
});