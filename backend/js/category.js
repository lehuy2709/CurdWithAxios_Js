var tbody = document.querySelector("tbody");
// show
axios({
    method: 'get',
    url: 'http://localhost:3000/categories',
    responseType: 'json'
})
    .then(function (response) {
        var result = response.data.map(function (item) {
            return `<tr>
                <td> ${item.id} </td>
                <td> ${item.cate_name} </td>
                <td>
                 <a href="edit.html?id=${item.id}" class="btn btn-outline-info btn-edit">Sửa</a>
                 <button data-id="${item.id}" class="btn btn-danger btn-remove">Xóa</button>
              </td>
            </tr>`
        })
        tbody.innerHTML = result.join("")
        // delete

        var btnDelete = document.querySelectorAll(".btn-remove")
        btnDelete.forEach(function (btn) {
            btn.onclick = function () {
                if (confirm("bạn có muốn xóa không")) {
                    var id = btn.getAttribute("data-id")
                    axios.delete("http://localhost:3000/categories/" + id)
                    alert("Xóa thành công")
                    window.location.href = "index.html"
                }

            }
        })
    })




// create


var name_cate = document.querySelector("#cate_name")
var addform = document.querySelector("form")
var error = document.querySelector(".alert-danger")



addform.addEventListener("submit", function (e) {
    if (cate_name.value == "") {
        error.style.display = "block"
        error.innerHTML = " Tên loại hàng không được để trống !"
        e.preventDefault()
    }
    else {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3000/categories',
            data: {
                cate_name: cate_name.value
            }
        }).then(function (response) {
            alert("Thêm thành công")
            window.location.href = "index.html"
        })
    }



})

// edit

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")
const btnEdit = document.querySelector("#btn_edit")


axios({
    method: 'get',
    url: 'http://localhost:3000/categories/' + id,
    responseType: 'json'
}).then(function (response) {
    name_cate.value = response.data.cate_name
})
btnEdit.onclick = function (e) {
    e.preventDefault()
    axios({
        method: 'PUT',
        url: 'http://localhost:3000/categories/' + id,
        data: {
            cate_name: name_cate.value
        }
    }).then(function (data) {
        alert("Sửa thành công")
        window.location.href = "index.html"

    })
}












