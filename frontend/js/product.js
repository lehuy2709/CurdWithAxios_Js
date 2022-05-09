// show danh mục
axios({
  method: 'get',
  url: 'http://localhost:3000/categories',
  responseType: 'json'
}).then(function (response) {
  const block_content = document.querySelector(".block-content")
  rs = response.data.map(function (item) {
    return `
        <li>
        <input type="radio" name="checkCate" id="list" onclick="loadSp(${item.id})">
        <label for="">
          <span>${item.cate_name}</span>
        </label>
      </li>
        `
  })
  block_content.innerHTML = rs.join("")
})
// show product
const product_layout = document.querySelector(".product-layout")
axios({
  method: "get",
  url: "http://localhost:3000/products/",
  responseType: "json",
}).then(function (response) {
  const rs = response.data.map(function (item) {
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
        <a href="productDetails.html?id=${item.id}">${item.product_name}</a>
        <div class="price">
          <span>${item.price}</span>
        </div>
      </div>
    </div>
      `
  })
  product_layout.innerHTML = rs.join("")
})

// lấy sản phẩm theo danh mục
function loadSp(id) {
  const product_layout = document.querySelector(".product-layout")
  axios({
    method: "get",
    url: "http://localhost:3000/categories/" + id + '?_embed=products',
    responseType: "json",
  }).then(function (response) {
    var rs = response.data.products.map(function (item) {
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
        <a href="productDetails.html?id=${item.id}">${item.product_name}</a>
        <div class="price">
          <span>${item.price}</span>
        </div>
      </div>
    </div>
      
      `
    })
    product_layout.innerHTML = rs.join("")


  })



}