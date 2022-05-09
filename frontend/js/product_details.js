const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")
axios({
    method: "get",
    url: "http://localhost:3000/products/" + id,
    responseType: "json",
}).then(function (response) {
    console.log(response);
    const details = document.querySelector(".details")
    var result = `  <div class="left">
    <div class="main">
      <img src="${response.data.image}" alt="" />
    </div>
    <div class="thumbnails">
      <div class="thumbnail">
        <img src="${response.data.image}" alt="" />
      </div>
      <div class="thumbnail">
        <img src="${response.data.image}" alt="" />
      </div>
      <div class="thumbnail">
        <img src="${response.data.image}" alt="" />
      </div>
      <div class="thumbnail">
        <img src="${response.data.image}" alt="" />
      </div>
    </div>
  </div>
  <div class="right">

    <span>Trang Chủ/Chi tiết sản phẩm</span>
    <h1>${response.data.product_name}</h1>
    <div class="price">
      <span class="cancel" style="color: rgb(146, 142, 142);">${response.data.price}</span>
      <span>Giá mới : ${response.data.sale}</span>
    </div>

    <form class="form">
      <input type="text" placeholder="1" />
      <a href="cart.html" class="addCart">Thêm vào giỏ hàng</a>
    </form>
    <h3>Mô tả sản phẩm</h3>
    <p>
    ${response.data.desc}
    </p>
    
  </div>
        </p>
        `
    details.innerHTML = result
})



