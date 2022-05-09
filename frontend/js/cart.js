function showCart() {
    myCart = localStorage.getItem("myCart")
    if (myCart == null) {
        alert("giỏ hàng trống");
        window.location.href = "index.html"
    }

    myCart = JSON.parse(myCart)
    chuoi = ''
    Object.keys(myCart).forEach(function (key) {
        if (chuoi.length > 0) 
            chuoi += '&'
            chuoi += 'id=' + key
        
    })

    axios({
        method: 'get',
        url: 'http://localhost:3000/products?'+chuoi,
        responseType: 'json'
    }).then(function(response){
        var target = document.querySelector("#target")
        var show_total = document.querySelector("#show-total")
        tong_tien = 0
        console.log(response);
        var rs = response.data.map(function(item){
            soluong = myCart[item.id]
            tien_sp = soluong * item.price
            tong_tien += tien_sp
            return `
            <tr>
            <td>${item.id}</td>
            <td>
              <div class="cart-info">
                <img src="${item.image}" alt="" />
                <div>
                  <p>${item.product_name}</p>
                  <span>Giá : ${item.price}</span>
                  <br />
                  <a href="#">Xóa</a>
                </div>
              </div>
            </td>
            <td><input type="number" value="${soluong}"  /></td>
            <td>${item.price}</td>
            <td>${tien_sp}</td>
            <td><button class="btn-update-cart">Cập Nhật</button></td>
          </tr>
            `
        })
        target.innerHTML = rs.join("")
        show_total.innerHTML = tong_tien


    })




}
showCart()
