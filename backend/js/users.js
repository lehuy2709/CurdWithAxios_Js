const tbody = document.querySelector("tbody");

const addform = document.querySelector("form")
const name_us = document.querySelector("#name")
const email_us = document.querySelector("#email")
const pass_us = document.querySelector("#pass")
const role_us = document.querySelector("#role")

// show users

axios({
    method: 'get',
    url: 'http://localhost:3000/users',
    responseType: 'json'
}).then(function (response) {
    var result = response.data.map(function (item) {
        return `
        <tr>
        <td> ${item.id} </td>
        <td> ${item.name}</td>
        <td> ${item.email}</td>
        <td>${item.password} </td>
        <td>${item.vaiTro == 1 ? "Admin" : "Khách"} </td>
        <td>
        <a href="edit.html?id=${item.id}" class="btn btn-outline-info btn-edit">Sửa</a>
        <button data-id="${item.id}" class="btn btn-danger btn-remove">Xóa</button>
         </td>
        </tr>

        `
    })
    tbody.innerHTML = result.join("")

    // delete 
    var btnDelete = document.querySelectorAll(".btn-remove")
    btnDelete.forEach(function (btn) {
        btn.onclick = function () {
            if (confirm("bạn có muốn xóa không")) {
                var id = btn.getAttribute("data-id")
                axios.delete("http://localhost:3000/users/" + id)
                window.location.href = "index.html"
            }

        }
    })


})



// create

addform.addEventListener("submit", function (e) {
    e.preventDefault()
    axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: {
            name: name_us.value,
            password: pass_us.value,
            email: email_us.value,
            vaiTro: role_us.value
        }
    }).then(function (response) {
        alert("Thêm thành công")
        window.location.href = "index.html"
    })
})

// edit user 

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")
console.log(id);
const btnEdit = document.querySelector("#btn_edit")
axios({
    method: 'get',
    url: 'http://localhost:3000/users/' + id,
    responseType: 'json'
}).then(function (response) {
    name_us.value = response.data.name
    pass_us.value = response.data.password
    email_us.value = response.data.email
    role_us.value = response.data.vaiTro
})

btnEdit.onclick = function (e) {
    e.preventDefault()
    axios({
        method: 'PUT',
        url: 'http://localhost:3000/users/' + id,
        data: {
            name: name_us.value,
            password: pass_us.value,
            email: email_us.value,
            vaiTro: role_us.value,
        }
    }).then(function (res) {
        alert("Sửa thành công")
        window.location.href = "index.html"

    })
}