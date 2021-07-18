let pageConfig = {
    showData: 5,
    currentPage: 1
}
let users = [{
    name: "Admin",
    gender: "Male",
    address: "Jakarta"
}, {
    name: "User",
    gender: "Female",
    address: "Bogor"
}, {
    name: "Operator",
    gender: "Male",
    address: "Depok"
}, {
    name: "admin1",
    gender: "Female",
    address: "Bandung"
}, {
    name: "admin2",
    gender: "Female",
    address: "Palembang"
}, {
    name: "User2",
    gender: "Male",
    address: "Koto"
}, {
    name: "User3",
    gender: "Male",
    address: "Baru"
}, {
    name: "Operator2",
    gender: "Male",
    address: "Medan"
}, {
    name: "Operator3",
    gender: "Female",
    address: "Aceh"
}, {
    name: "Admin4",
    gender: "Male",
    address: "Malang"
}, {
    name: "User4",
    gender: "Male",
    address: "Batu"
}, {
    name: "Operator4",
    gender: "Female",
    address: "Kalimantan"
}, {
    name: "Admin5",
    gender: "Male",
    address: "Ambon"
}, {
    name: "User5",
    gender: "Female",
    address: "Bali"
}, {
    name: "Operator5",
    gender: "Male",
    address: "Jayapura"
}, {
    name: "Admin6",
    gender: "Female",
    address: "Solok"
}, {
    name: "User6",
    gender: "Male",
    address: "Matur"
}, {
    name: "Operator6",
    gender: "Female",
    address: "Maninjau"
}, {
    name: "Admin6",
    gender: "Female",
    address: "Solok"
}, {
    name: "User6",
    gender: "Male",
    address: "Matur"
}, {
    name: "Operator6",
    gender: "Female",
    address: "Maninjau"
}, {
    name: "Admin6",
    gender: "Female",
    address: "Solok"
}, {
    name: "User6",
    gender: "Male",
    address: "Matur"
}, {
    name: "Operator6",
    gender: "Female",
    address: "Maninjau"
}, {
    name: "Admin6",
    gender: "Female",
    address: "Solok"
}, {
    name: "User6",
    gender: "Male",
    address: "Matur"
}, {
    name: "Operator6",
    gender: "Female",
    address: "Maninjau"
}, {
    name: "Admin6",
    gender: "Female",
    address: "Solok"
}, {
    name: "User6",
    gender: "Male",
    address: "Matur"
}, {
    name: "Operator6",
    gender: "Female",
    address: "Maninjau"
}, {
    name: "Admin6",
    gender: "Female",
    address: "Solok"
}, {
    name: "User6",
    gender: "Male",
    address: "Matur"
}, {
    name: "Operator6",
    gender: "Female",
    address: "Maninjau"
}, {
    name: "Admin6",
    gender: "Female",
    address: "Solok"
}, {
    name: "User6",
    gender: "Male",
    address: "Matur"
}, {
    name: "Operator6",
    gender: "Female",
    address: "Maninjau"
}]

let filteredUsers = []
let updateStatus = false

const generateTable = (data = users) => {
    let tbody = document.querySelector("table > tbody")
    let rows = ""

    let startIndex = (pageConfig.currentPage - 1) * pageConfig.showData
    let endIndex = startIndex + pageConfig.showData
    // halaman 1 = 0 => 0 * 2 = 0
    // halaman 2 = 2  => 1 * 2 = 2
    // halaman 3 = 4  => 2 * 2 = 4

    for (let index = startIndex; index < endIndex && index < data.length; index++) {
        const user = data[index];

        rows += `
            <tr>
                <td align="center">${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.gender}</td>
                <td>${user.address}</td>
                <td align="center">
                    <input type="button" name="editUser" value="Edit" onclick="editRow(this)"/>
                    <input type="button" name="deleteUser" value="Delete" onclick="deleteData(this)" />
                </td>
            </tr>
        `
    }
    tbody.innerHTML = rows
    generatePagination(data)
}

const generatePagination = data => {
    const pagination = document.querySelector("div.pagination")

    let buttonPage = ""
    let totalPage = Math.ceil(data.length / pageConfig.showData)
    let startPage = () => {
        let tempPage = totalPage - 4;
        if (tempPage < 1)
            return tempPage = 1
        else
            return tempPage
    }

    if (pageConfig.currentPage != 1)
        buttonPage += `<span class="page prev">Prev</span>`

    for (let page = startPage(); page <= totalPage; page++) {
        let className = "page"
        if (pageConfig.currentPage == page) className = "page active"

        buttonPage += `<span class="${className}">${page}</span>`
    }

    if (pageConfig.currentPage != totalPage)
        buttonPage += `<span class="page next">Next</span>`

    pagination.innerHTML = buttonPage
    mapEvent()
}

const goToPage = e => {
    const search = document.querySelector('input[name="search"]')

    if (e.classList.contains("prev"))
        pageConfig.currentPage--
    else if (e.classList.contains("next"))
        pageConfig.currentPage++
    else
        pageConfig.currentPage = e.innerText

    if (search.value != "")
        generateTable(filteredUsers)
    else
        generateTable()
}

const mapEvent = () => {
    document.querySelectorAll("span.page").forEach(el => {
        el.addEventListener("click", () => goToPage(el))
    })
}

const mapEventAddNew = () => {
    document.querySelector("table").addEventListener('keyup', e => {
        if (e.key === "Enter") saveData()
    })
}

const filterRow = e => {
    // filteredUsers = []
    // for (let index = 0; index < users.length; index++) {
    //     const user = users[index];

    //     if (user.name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase()))
    //         filteredUsers.push(user)
    // }
    // generateTable(filteredUsers)

    // filter (array method) usage
    // filteredUsers = users.filter(user => user.name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase()))
    // atau
    filteredUsers = users.filter(user => {
        return user.name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase())
    })
    generateTable(filteredUsers)
}

const addRow = () => {
    const tbody = document.querySelector("table > tbody")
    const input = document.querySelector("input")

    if (updateStatus) return alert("isi dulu input nya!!")

    const newRow = `
            <tr>
            <td align="center">${users.length + 1}</td>
            <td>
                <input type="text" name="name" />
            </td>
            <td>
                <select name="gender">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </td>
            <td>
                <input type="text" name="address" />
            </td>
            </tr>
        `
    tbody.innerHTML = newRow + tbody.innerHTML
    updateStatus = true
}

const saveData = () => {
    const name = document.querySelector("input[name='name']")
    const gender = document.querySelector("select[name='gender']")
    const address = document.querySelector("input[name='address']")

    if (name.value == "" && address.value == "") {
        document.querySelector("button").focus()
        return alert("Isi formnya terlebih dahulu yaa!!")
    }

    users.push({
        name: name.value,
        gender: gender.value,
        address: address.value
    })

    updateStatus = false
    generateTable()
}

const resetSearch = () => {
    document.querySelector('input[name="search"]').value = ""
}

const __init = () => {
    generateTable()
    mapEventAddNew()
    resetSearch()
}
__init()

console.time("hitungFor")
for (let index = 0; index < 20; index++) {
    // console.log(index);
}
console.timeEnd("hitungFor")


// parameter default value
const a = (param1 = "tidak oke") => {
    console.log(param1);
}

a("oke")
a()

// callback
const backFn = res => {
    console.log("called!!");
    console.log("Result:", res);
}

const initialFn = (param1, param2, cb) => {
    console.log("initial")
    const total = param1 * param2
    cb(total)
}

initialFn(23, 11, res => {
    console.log("called!!");
    console.log("Result:", res);
})
// atau
initialFn(23, 11, backFn)


// map (array method)
const userMod = users.map(user => {
    if (user.gender === "Male")
        return {
            ...user,
            gender: "Laki-laki"
        }

    return {
        ...user,
        gender: "Perempuan"
    }
})
console.log("userMod:", userMod);

let listArray = ["satu", 2, true]
// tambah data di depan
listArray.unshift("NOL")
console.log(listArray);

// hapus data di depan
listArray.shift()
console.log(listArray);

// tambah data di belakang
listArray.push("5")
console.log(listArray);

// hapus data di belakang
listArray.pop()
console.log(listArray);

// edit array (tambah)
listArray.splice(2, 0, "horeeee")
console.log(listArray);

// edit array (ganti)
listArray.splice(1, 2, "keganti 2 data", "kedua")
console.log(listArray);

// edit array (hapus)
listArray.splice(2, 1)
console.log(listArray);
console.log(listArray[2]);
console.log(listArray[3]);


// slice
arrayBaru = listArray.slice(0, 2) // (start, end)
console.log("listArray:", listArray);
console.log("arrayBaru:", arrayBaru);

const editRow = (data) => {
    const getRow = document.querySelector('table > tbody')
    const input = document.querySelector("input")
    selectedRow = data.parentElement.parentElement;
    console.log(selectedRow);

    let newNumber = selectedRow.cells[0].innerHTML;
    let newName = selectedRow.cells[1].innerHTML;
    let newGender = selectedRow.cells[2].innerHTML;
    let newAddress = selectedRow.cells[3].innerHTML;

    const editRow = `
        <tr>
            <td></td>
            <td>
                <input type="text" name="name" value="${newName}" />
            </td>
            <td>
                <select name="gender">
                    <option>${newGender}</option>
                    
                    if (${newGender} === "Male")
                        <option value="Female">Female</option>                                            
                    else 
                        <option value="Male">Male</option>
                    
                </select>
            </td>
            <td>
                <input type="text" name="address" value="${newAddress}" />
            </td>
            <td>
                <input type="button" value="update" onclick="updateData(${newNumber})" ></input>
            </td>
        </tr>
    `
    updateStatus = true;

    getRow.innerHTML = editRow + getRow.innerHTML;

}

const updateData = (id) => {
    console.log(id);
    const newId = id - 1;
    const newName = document.querySelector("input[name='name']")
    const newGender = document.querySelector("select[name='gender']")
    const newAddress = document.querySelector("input[name='address']")

    // console.log("cek");
    console.log(newName.value);
    console.log(newGender.value);
    console.log(newAddress.value);

    if (newName.value == "" && newAddress.value == "") {
        document.querySelector("button").focus()
        return alert("Isi formnya terlebih dahulu yaa!!")
    }

    console.log(users[newId].name);
    users[newId].name = newName.value;
    users[newId].gender = newGender.value;
    users[newId].address = newAddress.value;
    
    console.log(users[newId]);
    updateStatus = false
    generateTable()
}

const deleteData = data => {
    const getRow = document.querySelector('table > tbody')
    const input = document.querySelector("input")
    selectedRow = data.parentElement.parentElement;
    console.log(selectedRow);

    let newNumber = selectedRow.cells[0].innerHTML;

    console.log(newNumber);

    users.splice(newNumber-1, 1);
    generateTable();
}