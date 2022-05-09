// sản phẩm mới nhất
axios({
  method: "get",
  url: "http://localhost:3000/products",
  responseType: "json",
}).then(function (response) {

  const promotion_item = document.querySelector('.promotion-layout')
  var result = response.data.map(function (item) {
    return `
        <div class="promotion-item">
        <img src="${item.image}" alt="" />
        <div class="promotion-content">
          <h3>${item.product_name} </h3>
          <div class="price-pro">
            <span class="price-pro-item">Giá :  <span class="price-prod"</span>${item.price}</span>
          </div>
          <div class="details-prodnew">
            <a href="productDetails.html?id=${item.id}" style="background-color: rgb(248, 246, 108) ;" class="details-prod-new"><i
                class="fas fa-eye"></i> Xem chi tiết</a>
          </div>
          <div class="add-cart-btn">
                <button class="add-cart-new" onclick = "Mua(${item.id})" style="background-color: rgb(250, 93, 93);height:40px; font-size:15px;"> Mua </button>
          </div>

        </div>
        </div>
        `
  })
  promotion_item.innerHTML = result.join("")

})
{/* <a href="cart.html" style="background-color: rgb(250, 93, 93) ;" class="add-cart-new"><i
class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</a> */}

{/* <button class="add-cart-new" style="background-color: rgb(250, 93, 93) ; height:40px; font-size : 14px;><i
class="fas fa-shopping-cart"></i>Thêm vào giỏ hàng</button> */}
// sản phẩm bán chạy

axios({
  method: "get",
  url: "http://localhost:3000/products",
  responseType: "json",
}).then(function (response) {
  const product_layout = document.querySelector(".product-layout")
  var rs = response.data.map(function (item) {
    return `
        <div class="product">
        <div class="img-container">
          <img src="${item.image}" alt="" />
          <div class="addCart">
            <a href="cart.html"><i class="fas fa-shopping-cart"></i></a>
          </div>

          <ul class="side-icons">
            <div class="deletais-eye" style="margin-bottom:10px">
              <a href="productDetails.html?id=${item.id}"><span><i class="fas fa-eye"></i></span></a>
            </div>
            <span><i class="far fa-heart"></i></span>
            <span><i class="fas fa-sliders-h"></i></span>
          </ul>
        </div>
        <div class="bottom">
          <a href="cart.html">${item.product_name}</a>
          <div class="price">
            <span>${item.price}</span>
          </div>
        </div>
      </div>`
  })
  product_layout.innerHTML = rs.join("")
})


// add cart
function Mua(idsp) {

  myCart = localStorage.getItem("myCart")
  if (myCart == null) {
    myCart = {}
  }
  else {
    myCart = JSON.parse(myCart)
  }

  if (myCart[idsp] != undefined) {
    alert("Thêm thành công")
    myCart[idsp] += 1
  }
  else {
    myCart[idsp] = 1
  }

  localStorage.setItem('myCart', JSON.stringify(myCart))


}