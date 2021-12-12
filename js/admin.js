const $ = document.querySelector.bind(document);
const table = $('#table');
const form = $('.form');

//card-info
const countData = {
  dataProduct: function(){
    return JSON.parse(localStorage.getItem('listProduct')) || []
  },
  dataUser: function(){
    return JSON.parse(localStorage.getItem('dataUser')) || []
  },
  countUser: function(){
    let count = 0;
    for(let i of this.dataUser()){
      count ++;
    }
    return count;
  },
  countProduct: function(){
    let count = 0;
    for(let i of this.dataProduct()){
      count ++;
    }
    return count;
  },
  rederQuatity: function(){
    $('.consumer .inner span').innerHTML = this.countUser();
    $('.products .inner span').innerHTML = this.countProduct();
  },
}
countData.rederQuatity();

//add-update-delete-user
let arr = JSON.parse(localStorage.getItem('dataUser')) || [];
let formData = {
  user: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  pass: "",
  userType: ""
}
let inputUser = `<form>
            <div class="form-input">
              <button onclick="addAcc()"><a href="#form-id">Add</a></button>
            </div>
            <label class="title">Register</label>
            <div class="board">
              <div class="form-input">
                <label class="space-tb">User</label>
                <input type="text" id="user">
              </div>
              <div class="form-input">
                <label class="space-tb">Full Name</label>
                <input type="text" id="full-name">
              </div>
              <div class="form-input">
                <label class="space-tb">Address</label>
                <input type="text" id="address">
              </div>
              <div class="form-input">
                <label class="space-tb">Phone Number</label>
                <input type="text" id="phone-number">
              </div>
              <div class="form-input">
                <label class="space-tb">Password</label>
                <input type="text" id="password">
              </div>
              <div class="form-input">
                <label class="space-tb">UserType</label>
                <input type="text" id="userType">
              </div>
              <div class="bot-board">
                <input type="submit" value="Submit">
              </div>
            </div>
          </form>`;
function deleteAcc(obj){
  if(confirm('Bạn có muốn xóa tài khoản này?')){
    for(let i = parseInt(obj.getAttribute("data-set"));i < arr.length;i++){
      arr[i] = arr[i + 1];
    }
    arr.pop();
    localStorage.setItem('dataUser', JSON.stringify(arr));
    innerUser();
    countData.countUser();
    countData.rederQuatity();
  }
}

function updateAcc(obj){
  const btnSubmit = $('.bot-board input');
  let user = $('#user');
  let fullName = $('#full-name');
  let address = $('#address');
  let phoneNumber = $('#phone-number');
  let pass = $('#password');
  let userType = $('#userType');

  let n = obj.getAttribute("data-set");
  $('.title').innerHTML = "Update";
  btnSubmit.value = "Update";
  user.value = arr[n].user;
  fullName.value = arr[n].fullName;
  address.value = arr[n].address;
  phoneNumber.value = arr[n].phoneNumber;
  pass.value = arr[n].pass;
  userType.value = arr[n].userType;
  btnSubmit.onclick = ()=>{
    formData.user = user.value,
    formData.fullName = fullName.value,
    formData.address = address.value,
    formData.phoneNumber = phoneNumber.value,
    formData.pass = pass.value,
    formData.userType = userType.value
    arr[n] = formData;
    localStorage.setItem('dataUser', JSON.stringify(arr));
    innerUser();
  }
}

function addAcc(){
  const btnSubmit = $('.bot-board input');
  let user = $('#user');
  let fullName = $('#full-name');
  let address = $('#address');
  let phoneNumber = $('#phone-number');
  let pass = $('#password');
  let userType = $('#userType');

  $('.title').innerHTML = "Add";
  btnSubmit.value = "Add";
  btnSubmit.onclick = ()=>{
    formData.user = user.value;
    formData.fullName = fullName.value;
    formData.address = address.value;
    formData.phoneNumber = phoneNumber.value;
    formData.pass = pass.value;
    formData.userType = userType.value == "" ? "consumer": userType.value;
    arr.push(formData);
    localStorage.setItem('dataUser', JSON.stringify(arr));
    innerUser();
    countData.countUser();
    countData.rederQuatity();
  }
}

function innerUser(){
  dividePageUser(arr);
  showContentUser(arr);
}
function dividePageUser(arr){
  let pages = Math.ceil(arr.length / 6);
  let s = "";
  if(pages > 6){
    for(let i = 1; i <= pages;i++){
      s += `<li onclick="innerPageUser('${i}')">${i}</li>`;
      $('.page').innerHTML = `<ul>${s}</ul>`;
    }
  }else {
    $('.page').innerHTML = "";
  }
}
function innerPageUser(currentPage){
  let count = 0;
  let temp = [];
  let page = (JSON.parse(currentPage) - 1) * 6;
  for(let i = page;count < 6 && count < arr.length - page; i++){
    temp.push(arr[i]);
    count++;
  }
  showContentUser(temp);
}

function  showContentUser(arr){
  console.log(arr);
  let s = "";
  let count = 0;
  let listData = 
    `<tr>
      <th style="width: 10%">User</th>
      <th style="width: 15%">Name</th>
      <th style="width: 25%">Address</th>
      <th style="width: 15%">Phone Number</th>
      <th style="width: 15%">Password</th>
      <th style="width: 10%">Usertype</th>
      <th style="width: 5%">Remove</th>
      <th style="width: 5%">Update</th>
    </tr>`;
  
  for(let i = 0;count < 6 && count < arr.length;i++){
    s += `<tr>
            <td>${arr[i].user}</td>
            <td>${arr[i].fullName}</td>
            <td>${arr[i].address}</td>
            <td>${arr[i].phoneNumber}</td>
            <td>${arr[i].pass}</td>
            <td>${arr[i].userType}</td>
            <td><button onclick="deleteAcc(this)" data-set = ${i+1}>Remove</button></td>
            <td><a href="#form-id"><button onclick="updateAcc(this)" data-set = ${i+1}>Update</button></a></td>
          </tr>
          `;
    count++;
  }
  listData += s;
  console.log(listData);
  table.innerHTML = `<table>${listData}</table>`;
}

//add-update-delete-product
let arrProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
let formProduct = {
  productId: "",
  brand: "",
  img: "",
  name: "",
  price: ""
}
let inputProduct = `<form>
            <div class="form-input">
              <button onclick="addProduct()"><a href="#form-id">Add</a></button>
            </div>
            <label class="title">Register</label>
            <div class="board">
              <div class="form-input">
                <label class="space-tb">ProductId</label>
                <input type="text" id="productId">
              </div>
              <div class="form-input">
                <label class="space-tb">Brand</label>
                <input type="text" id="brand">
              </div>
              <div class="form-input">
                <label class="space-tb">Name</label>
                <input type="text" id="name">
              </div>
              <div class="form-input">
                <label class="space-tb">Image</label>
                <input type="file" id="image" accept="image/png, image/jpeg">
                <div>Ảnh phải thuộc Brand khi Update</div>
              </div>
              <div class="form-input">
                <label class="space-tb">Price</label>
                <input type="text" id="price">
              </div>
              <div class="bot-board">
                <input type="submit" value="Submit">
              </div>
            </div>
          </form>`;
function deleteProduct(obj){
  if(confirm('Bạn có muốn xóa sản phẩm này?')){
    for(let i = parseInt(obj.getAttribute("data-set"));i < arrProduct.length;i++){
      arrProduct[i] = arrProduct[i + 1];
    }
    arrProduct.pop();
    localStorage.setItem('listProduct', JSON.stringify(arrProduct));
    innerProducts();
    countData.countUser();
    countData.rederQuatity();
  }
}

function updateProduct(obj){
  const btnSubmit = $('.bot-board input');
  let productId = $('#productId');
  let brand = $('#brand');
  let name = $('#name');
  let image = $('#image');
  let price = $('#price');

  let n = obj.getAttribute("data-set");
  $('.title').innerHTML = "Update";
  btnSubmit.value = "Update";
  productId.value = arrProduct[n].productId;
  brand.value = arrProduct[n].brand;
  name.value = arrProduct[n].name;
  price.value = arrProduct[n].price;
  btnSubmit.onclick = ()=>{
    formProduct.productId = productId.value,
    formProduct.brand = brand.value,
    formProduct.name = name.value,
    formProduct.img = image.value.replace("C:\\fakepath\\", `./assests/img/${brand.value}/`),
    formProduct.price = price.value,
    arrProduct[n] = formProduct;
    localStorage.setItem('listProduct', JSON.stringify(arrProduct));
    innerProducts();
  }
}

function addProduct(){
  const btnSubmit = $('.bot-board input');
  let productId = $('#productId');
  let brand = $('#brand');
  let name = $('#name');
  let image = $('#image');
  let price = $('#price');

  $('.title').innerHTML = "Add";
  btnSubmit.value = "Add";
  btnSubmit.onclick = ()=>{
    formProduct.productId = productId.value,
    formProduct.brand = brand.value,
    formProduct.name = name.value,
    formProduct.img = image.value,
    formProduct.price = price.value,
    arrProduct.push(formData);
    localStorage.setItem('listProduct', JSON.stringify(arrProduct));
    innerProducts();
    countData.countUser();
    countData.rederQuatity();
  }
}

function innerProducts(){
  dividePageProduct(arrProduct);
  showContentProduct(arrProduct);
}

function dividePageProduct(arr){
  let pages = Math.ceil(arr.length / 6);
  let s = "";
  for(let i = 1; i <= pages;i++){
    s += `<li onclick="innerPageProduct('${i}')">${i}</li>`;
    $('.page').innerHTML = `<ul>${s}</ul>`;
  }
}
function innerPageProduct(currentPage){
  let count = 0;
  let temp = [];
  let page = (JSON.parse(currentPage) - 1) * 6;
  for(let i = page;count < 6 && count < arrProduct.length - page; i++){
    temp.push(arrProduct[i]);
    count++;
  }
  showContentProduct(temp);
}
function showContentProduct(arr){
  let s = "";
  let count = 0;
  let listData = 
  `<tr>
    <th style="width: 5%">Stt</th>
    <th>ProductId</th>
    <th style="width: 10%">Brand</th>
    <th style="width: 40%">Name</th>
    <th style="width: 15%">Image</th>
    <th style="width: 10%">Price</th>
    <th style="width: 5%">Remove</th>
    <th style="width: 5%">Update</th>
  </tr>`;
  
  for(let i = 0;count < 6 && count < arr.length;i++){
    s += `<tr>
            <td>${i+1}</td>
            <td>${arr[i].productId}</td>
            <td>${arr[i].brand}</td>
            <td>${arr[i].name}</td>
            <td><img src="${arr[i].img}"></td>
            <td>${arr[i].price}</td>
            <td><button onclick="deleteProduct(this)" data-set = ${i}>Remove</button></td>
            <td><a href="#form-id"><button onclick="updateProduct(this)" data-set = ${i}>Update</button></a></td>
          </tr>
          `;
    count++;
  }
  listData += s;
  console.log(listData);
  table.innerHTML = `<table>${listData}</table>`;
}