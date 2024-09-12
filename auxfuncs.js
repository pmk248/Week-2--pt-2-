function addButtons(soldier) {
    let actionData = document.createElement('td');

    // "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.style.backgroundColor = '#27AE60';
    deleteButton.onclick = () => removeTask(soldier.Id);

    // "Activate Mission + Timer button"
    const missionButton = document.createElement('button');
    missionButton.innerText = 'Mission Start';
    if (soldier.Status === "Active" || soldier.Status === "Reserve") {
        missionButton.style.display = 'inline'; 
    } else {
        missionButton.style.display = 'none'; 
    }    
    missionButton.innerText = `Mission Ends in: (${currentTime})`
    missionButton.onclick = () => startCountdown(soldier.Id);

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