let data;
const savedData = JSON.parse(localStorage.getItem('rahasia'));

if (Array.isArray(savedData)) {
    data = savedData;
} else {
    data = [{
        name: 'afiq',
        age: 18,
        profession: 'Mahasiswa',
        id: 'id1'
    }, {
        name: 'muh',
        age: 23,
        profession: 'Web Developer',
        id: 'id2'
    }, {
        name: 'mamun',
        age: 34,
        profession: 'Graphic Designer',
        id: 'id3'
    }];
}

read();

function createData(addName, addAge, addProfession) {
    const id = '' + new Date().getTime();
    data.push({
        name: addName,
        age: addAge,
        profession: addProfession,
        id: id
    });
    saveData();
}

function removeData(idToDelete) {
    data = data.filter(function (param) {
        if (param.id === idToDelete) {
            return false;
        } else {
            return true;
        }
    });
    saveData();
}

function saveData() {
    localStorage.setItem('rahasia', JSON.stringify(data));
}

// add data
document.getElementById('add-button').addEventListener('click', function (event) {
    event.preventDefault();
    const addName = document.getElementById('input-name').value;
    const addAge = document.getElementById('input-age').value;
    const addProfession = document.getElementById('input-profession').value;

    if (addName === '' || addAge === '' || addProfession === '') {
        return;
    }
    createData(addName, addAge, addProfession);
    read();
    
    document.getElementById('input-name').value = '';
    document.getElementById('input-age').value = '';
    document.getElementById('input-profession').value = '';
});

// delete data
function deleteData(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeData(idToDelete);
    read();
}
// update data
function updateData(event) {
    const idToUpdate = event.target.id;

    for (let i = 0; i < data.length; i++) {
        if (idToUpdate === data[i].id) {
            document.getElementById('input-name').value = data[i].name;
            document.getElementById('input-age').value = data[i].age;
            document.getElementById('input-profession').value = data[i].profession;

            const addBtn = document.getElementById('add-button');
            const updateBtn = document.createElement('button');
            updateBtn.innerText = 'Update Data';
            
            document.getElementById('button').appendChild(updateBtn);
            document.getElementById('button').removeChild(addBtn);

            updateBtn.addEventListener('click', function (event) {
                event.preventDefault();
                data[i].name = document.getElementById('input-name').value;
                data[i].age = document.getElementById('input-age').value;
                data[i].profession = document.getElementById('input-profession').value;

                updateBtn.remove();
                document.getElementById('button').appendChild(addBtn);
                read();
                saveData();

                document.getElementById('input-name').value = '';
                document.getElementById('input-age').value = '';
                document.getElementById('input-profession').value = '';

            });
            break;
        }
    }
}

// read data
function read() {
    document.getElementById('container').innerHTML = '';

    if(data.length === 0) {
        document.getElementById('container').style = 'border: none;';
        document.getElementById('container').innerHTML = 'Data Kosong, Silahkan tambah data...';   
    } else {
        const head = document.createElement('tr');
        head.insertCell(0).innerHTML = 'Nama';
        head.insertCell(1).innerHTML = 'Umur';
        head.insertCell(2).innerHTML = 'Pekerjaan';
        head.insertCell(3).innerHTML = 'Ubah';
        head.insertCell(4).innerHTML = 'Hapus';
        head.style = 'font-weight: bold; text-align: center;';
    
        document.getElementById('container').appendChild(head);
    }


    data.forEach(function (param) {
        const container = document.createElement('tr');
        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'button-in-js';
        deleteButton.onclick = deleteData;
        deleteButton.id = param.id;
        // deleteButton.className('button-in-js');

        // update button
        const updateButton = document.createElement('button');
        updateButton.innerText = 'Update';
        updateButton.className = 'button-in-js';
        let x=0;     
        updateButton.addEventListener('click', function (event) {
            if(x === 0) {
                updateData(event);
            } 
            x += 1;  
            if(x >= 5) {
                alert('Please Update Your Data!');
            } 
        });
        updateButton.id = param.id;

        container.insertCell(0).innerHTML = param.name;
        container.insertCell(1).innerHTML = param.age;
        container.insertCell(2).innerHTML = param.profession;
        container.insertCell(3).appendChild(updateButton);
        container.insertCell(4).appendChild(deleteButton);

        document.getElementById('container').appendChild(container);
        // document.getElementById('container').setAttribute('border','1');
    });
}

