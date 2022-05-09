const tbody = document.querySelector("tbody");

const addform = document.querySelector("form")

const name_pr = document.querySelector("#name")
const price_pr = document.querySelector("#price")
const description_pr = document.querySelector("#description")
const cate_pr = document.querySelector("#cate")
const sale_pr = document.querySelector("#sale")
const preview_pr = document.querySelector("#img-preview")
var error = document.querySelector(".alert-danger")

// xem thử file ảnh

function preViewFile() {
    const preview = document.querySelector("#img-preview")
    const file = document.querySelector("#image").files[0]
    const reader = new FileReader()
    reader.addEventListener("load", function () {
        preview.src = reader.result
    }, false)
    if (file) {
        reader.readAsDataURL(file)
    }
}

// lấy danh mục 

axios({
    method: 'get',
    url: 'http://localhost:3000/categories',
    responseType: 'json'
})
    .then(function (response) {
        var result = response.data.map(function (item) {
            return `<option value="${item.id}">${item.cate_name}</option>`;
        })
        cate_pr.innerHTML = result.join("")
    })



// show product
axios({
    method: 'get',
    url: 'http://localhost:3000/products?_expand=category',
    responseType: 'json'
})
    .then(function (response) {
        var result = response.data.map(function (item) {
            return `
                <tr>
                <td> ${item.id} </td>
                <td> ${item.product_name}</td>
                <td> ${item.category.cate_name}</td>
                <td> <img src="${item.image}" alt="" width="80px"> </td>
                <td>${item.price} VNĐ </td>
                <td>
                <a href="edit.html?id=${item.id}" class="btn btn-outline-info btn-edit">Sửa</a>
                <button data-id="${item.id}" class="btn btn-danger btn-remove">Xóa</button>
                 </td>
                </tr>
            
            `;
        })
        tbody.innerHTML = result.join("")

        // delete
        var btnDelete = document.querySelectorAll(".btn-remove")
        btnDelete.forEach(function (btn) {
            btn.onclick = function () {
                if (confirm("bạn có muốn xóa không")) {
                    var id = btn.getAttribute("data-id")
                    axios.delete("http://localhost:3000/products/" + id)
                    alert("Xóa thành công")
                    window.location.href = "index.html"
                }

            }
        })

    })



// create 


addform.addEventListener("submit", function (e) {
    const img = document.querySelector("#img-preview").getAttribute('src')
    if (name_pr.value == "" ||
        price_pr.value == "" ||
        description_pr.value == "" ||
        cate_pr.value == "" ||
        sale_pr.value == "")
    {
        error.style.display = "block"
        error.innerHTML = " Các trường không được để trống !"
        e.preventDefault()
    }
    else {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3000/products',
            data: {
                product_name: name_pr.value,
                price: Number(price_pr.value),
                desc: description_pr.value,
                categoryId: parseInt(cate_pr.value),
                sale: sale_pr.value,
                image: img
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
    url: 'http://localhost:3000/products/' + id,
    responseType: 'json'
}).then(function (response) {
    name_pr.value = response.data.product_name
    price_pr.value = response.data.price
    sale_pr.value = response.data.sale
    description_pr.value = response.data.desc
    cate_pr.value = response.data.categoryId
    preview_pr.src = response.data.image

})
btnEdit.onclick = function (e) {
    e.preventDefault()
    const img = document.querySelector("#img-preview").getAttribute('src')
    axios({
        method: 'PUT',
        url: 'http://localhost:3000/products/' + id,
        data: {
            product_name: name_pr.value,
            price: Number(price_pr.value),
            sale: sale_pr.value,
            desc: description_pr.value,
            categoryId: parseInt(cate_pr.value),
            image: img

        }
    }).then(function (res) {
        alert("Sửa thành công")
        window.location.href = "index.html"

    })
}


