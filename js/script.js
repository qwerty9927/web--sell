const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const login = $('.login');
const register = $('.register');
const headerRightS = $('.header-right span');
const headerAccount = $('.account');
const iconUser = $('.icon-user');

//login
const userLogin = $('#user-login');
const passLogin = $('#password-login');

//register
const userRegister = $('#user-register');
const warningUserReg = $('#user-register ~ span');
const fullName = $('#full-name');
const address = $('#address');
const phoneNumber = $('#phone-number');
const warningPhone = $('#phone-number ~ span');
const passRegister = $('#password-register');
const warningPassReg = $('#password-register ~ span');
const rePassword = $('#re-password');
const warningRePass = $('#re-password ~ span');

const btnLogin = $('.btn-login');
const btnRegister = $('.btn-register');
const boardRegister = $('.board-register');
const boardLogin = $('.board-login');

//form đăng ký đăng nhập
function textAnimation(){
  $$('.form-input label').forEach((label)=>{
    label.innerHTML = label.innerText
    .split('')
    .map((letter, idx) => `<span style="transition-delay: ${idx * 20}ms">${(letter == ' ') ? '&#160' : letter}</span>`)
    .join('')
  })
}

let admin = {
  user: "admin",
  fullName: "admin",
  address: "",
  phoneNumber: "",
  pass: "1",
  userType: "admin"
};
// localStorage.clear();
let temp = JSON.parse(localStorage.getItem('dataUser'))
let listUser = temp !== null ? temp : [admin];
let data = localStorage.setItem('dataUser', JSON.stringify(listUser));
let formData = {
  user: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  pass: "",
  userType: "consumer"
}
function handleEvent(){
  register.onclick = ()=>{
    boardRegister.classList.remove('active');
  }
  btnRegister.onclick = ()=>{
    boardRegister.classList.add('active');
  }
  login.onclick = ()=>{
    boardLogin.classList.remove('active');
  }
  btnLogin.onclick = ()=>{
    boardLogin.classList.add('active');
  }
}

function changeForm(){
  boardLogin.classList.add('active');
  boardRegister.classList.remove('active');
}

//check đăng ký
function checkRegister(){
  $('#form-register').onsubmit = function(){
    formData.fullName = fullName.value;
    formData.address = address.value;
    if(userRegister.value === ""){
      warningUserReg.innerHTML = "Nhap user";
      userRegister.focus();
      return false;
    }else{
      warningUserReg.innerHTML = "";
      formData.user = userRegister.value;
    }
    if(phoneNumber.value.length < 10){
      warningPhone.innerHTML = "So dien thoai khong dung";
      phoneNumber.focus();
      return false;
    }else{
      warningPhone.innerHTML = "";
      formData.phoneNumber = phoneNumber.value;
    }
    if(passRegister.value.length < 8){
      warningPassReg.innerHTML = "Mat khau qua ngan";
      passRegister.focus();
      return false;
    }else{
      warningPassReg.innerHTML = "";
      formData.pass = passRegister.value;
    }
    if(passRegister.value != rePassword.value){
      warningPassReg.innerHTML = "Mat khau khong trung khop";
      warningRePass.innerHTML = "Mat khau khong trung khop";
      rePassword.focus();
      return false;
    }else{
      warningPassReg.innerHTML = "";
      warningRePass.innerHTML = "";
    }
    setAccount(formData);
    listUser.push(formData);
    localStorage.setItem('dataUser', JSON.stringify(listUser));
  }
}

//check đăng nhập
function checkLogin(){
  $('#form-login').onsubmit = function(event){
    for(let i of listUser){
      if(userLogin.value === i.user && passLogin.value === i.pass && i.userType === "admin"){
        event.preventDefault()
        window.open('./managerAcc.html', '_black');
        return true;
      }else if(userLogin.value === i.user && passLogin.value === i.pass){
        setAccount(i);
        return true;
      }
    }
    alert('Tai khoan khong ton tai');
    return false;
  }
}

//lấy tài khoản hiện tại
function setAccount(obj){
  let temp = [obj];
  localStorage.setItem('currentUser', JSON.stringify(temp));
  location.href = './index.html/'
}
let currentAccount = JSON.parse(localStorage.getItem('currentUser'));
function renderAccount(){
  if(currentAccount != null){
    headerAccount.style.display = 'none';
    headerRightS.innerHTML = currentAccount[0].fullName;
    iconUser.style.display = 'block';
    headerRightS.addEventListener('click', logOut);
  }
}

//đăng xuất
function logOut(){
  iconUser.style.display = 'none';
  headerRightS.style.display = 'none';
  headerAccount.style.display = 'flex'; 
  localStorage.setItem('currentUser', null);
  headerRightS.removeEventListener('click', logOut);
}

var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].classList.add('active');
}

//Product
function InitProduct(productId, brand, img, name, price){
  this.productId = productId
  this.brand = brand
  this.img = img
  this.name = name
  this.price = price
}
let productArr = [
  //***************************Phone********************************
  new InitProduct("1011OO", "phone", "./assests/img/phone/iphone-xi-do-600x600.jpg", "Iphone 11 64gb", "18.990.000"),
  new InitProduct("1111OO", "phone", "./assests/img/phone/iphone-xi-do-600x600.jpg", "Iphone 11 128gb", "20.990.000"),
  new InitProduct("1211OO", "phone", "./assests/img/phone/iphone-11-den-600x600.jpg", "Iphone 11 256gb", "21.490.000"),
  new InitProduct("1311PO", "phone", "./assests/img/phone/iphone-11-pro-256gb-black-600x600.jpg", "Iphone 11 pro 256gb", "25.700.000"),
  new InitProduct("1411PO", "phone", "./assests/img/phone/iphone-11-pro-512gb-white-600x600.jpg", "Iphone 11 pro 64gb", "22.700.000"),
  new InitProduct("1511PO", "phone", "./assests/img/phone/iphone-11-pro-256gb-black-600x600.jpg", "Iphone 11 pro 128gb", "24.700.000"),
  new InitProduct("1611PM", "phone", "./assests/img/phone/iphone-11-pro-max-512gb-gold-600x600.jpg", "Iphone 11 pro max 256gb", "28.700.000"),
  new InitProduct("1711PM", "phone", "./assests/img/phone/iphone-11-pro-512gb-white-600x600.jpg", "Iphone 11 pro max 512gb", "30.700.000"),
  new InitProduct("1811PM", "phone", "./assests/img/phone/iphone-11-pro-256gb-black-600x600.jpg", "Iphone 11 pro max 256gb", "29.700.000"),
  new InitProduct("1912OO", "phone", "./assests/img/phone/iphone-12-do-new-2-600x600.jpg", "Iphone 12 64gb", "21.000.000"),
  new InitProduct("2012OO", "phone", "./assests/img/phone/iphone-12-do-new-2-600x600.jpg", "Iphone 12 128gb", "22.500.000"),
  new InitProduct("2112MO", "phone", "./assests/img/phone/iphone-12-mini-den-15-600x600.jpg", "Iphone 12 mini 128gb", "19.000.000"),
  new InitProduct("2212MO", "phone", "./assests/img/phone/iphone-12-mini-trang-600x600.jpg", "Iphone 12 mini 256gb", "21.000.000"),
  new InitProduct("2312PM", "phone", "./assests/img/phone/iphone-12-pro-max-vang-new-600x600-600x600.jpg", "Iphone 12 pro max 128gb", "29.000.000"),
  new InitProduct("2412PM", "phone", "./assests/img/phone/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg", "Iphone 12 pro max 256gb", "31.000.000"),
  new InitProduct("2512PM", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 12 pro max 256gb", "31.000.000"),
  new InitProduct("2612PO", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 12 pro 128gb", "26.000.000"),
  new InitProduct("2713OO", "phone", "./assests/img/phone/iphone-13-midnight-2-600x600.jpg", "Iphone 13 256gb", "24.000.000"),
  new InitProduct("2813MO", "phone", "./assests/img/phone/iphone-13-mini-blue-2-600x600.jpg", "Iphone 13 128gb", "22.000.000"),
  new InitProduct("2913MO", "phone", "./assests/img/phone/iphone-13-mini-red-1-600x600.jpg", "Iphone 13 64gb", "22.990.000"),
  new InitProduct("3013PO", "phone", "./assests/img/phone/iphone-13-pro-gold-1-600x600.jpg", "Iphone 13 pro 64", "30.000.000"),
  new InitProduct("3113PM", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 13 pro 128gb", "34.000.000"),
  new InitProduct("3213PO", "phone", "./assests/img/phone/iphone-13-pro-sierra-blue-600x600.jpg", "Iphone 13 pro 256gb", "38.000.000"),
  new InitProduct("3313PO", "phone", "./assests/img/phone/iphone-13-pro-gold-1-600x600.jpg", "Iphone 13 pro 512gb", "40.000.000"),
  new InitProduct("3413PM", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 13 pro 128gb", "34.000.000"),
  new InitProduct("3513PO", "phone", "./assests/img/phone/iphone-13-pro-sierra-blue-600x600.jpg", "Iphone 13 pro 256gb", "30.000.000"),
  //***************************ipad********************************
  new InitProduct("3601IP", "tablet", "./assests/img/tablet/ipad-4-cellular-den-new-600x600-600x600.jpg", "ipad 4 cellular den", "10.000.000"),
  new InitProduct("3702IP", "tablet", "./assests/img/tablet/ipad-4-cellular-hong-new-600x600-600x600.jpg", "ipad 4 cellular hong", "9.400.000"),
  new InitProduct("3803IP", "tablet", "./assests/img/tablet/ipad-air-4-wifi-64gb-2020-xanhduong-600x600-600x600.jpg", "ipad air 4 wifi 64gb", "21.490.000"),
  new InitProduct("3904IP", "tablet", "./assests/img/tablet/ipad-gen-9-wifi-grey-1-600x600.jpg", "ipad gen 9 wifi grey", "10.990.000"),
  new InitProduct("4005IP", "tablet", "./assests/img/tablet/ipad-mini-6-wifi-cellular-starlight-1-600x600.jpg", "ipad mini 6 wifi cellular starlight", "14.990.000"),
  new InitProduct("4106IP", "tablet", "./assests/img/tablet/ipad-mini-79-inch-wifi-cellular-64gb-2019-gold-600x600-1-600x600.jpg", "ipad mini", "15.490.000"),
  new InitProduct("4207IP", "tablet", "./assests/img/tablet/ipad-pro-11-inch-wifi-cellular-128gb-2020-xam-600x600-1-600x600.jpg", "ipad pro 11 inch wifi cellular 128gb", "25.450.000"),
  new InitProduct("4308IP", "tablet", "./assests/img/tablet/ipad-pro-12-9-inch-wifi-128gb-2020-bac-600x600-1-600x600.jpg", "ipad pro 12 9 inch wifi 128gb", "26.790.000"),
  new InitProduct("4409IP", "tablet", "./assests/img/tablet/ipad-pro-2021-129-inch-gray-thumb-600x600.jpg", "ipad pro 2021 12 9 inch gray", "37.490.000"),
  new InitProduct("4510IP", "tablet", "./assests/img/tablet/ipad-pro-2021-129-inch-silver-600x600.jpg", "ipad pro 2021 12 9 inch silver", "41.990.000"),
  //***************************Macbook********************************   
  new InitProduct("4600MB", "computer", "./assests/img/computer/Macbook Pro 13 2020 M1 - Silver.jpg", "Macbook Pro 13 2020 M1", "36.000.000"),
  new InitProduct("4701MB", "computer", "./assests/img/computer/MacBook Pro 16 2021 M1 Pro -Silver.png", "Macbook Pro 16 2021 M1 Pro", "70.000.000"),
  new InitProduct("4802MB", "computer", "./assests/img/computer/MacBook Pro 14 2021 -Space Grey.png", "Macbook Pro 14 2021", "52.000.000"),
  new InitProduct("4903MB", "computer", "./assests/img/computer/MacBook Pro 13 2020 M1 -Grey.jpg", "Macbook 13 2020 M1", "36.000.000"),
  new InitProduct("5004MB", "computer", "./assests/img/computer/Macbook Air 2020 M1 - Grey.jpg", "Macbook Air 2020 M1", "35.000.000"),
  new InitProduct("5105MB", "computer", "./assests/img/computer/Macbook Air 2020 - Silver.jpg", "Macbook Air 2020", "33.000.000"),
  new InitProduct("5206MB", "computer", "./assests/img/computer/Macbook Air 2020 - Grey.jpg", "Macbook Air 2020 Gray", "33.000.000"),
  new InitProduct("5307MB", "computer", "./assests/img/computer/Macbook Air 2020 - Gold.jpg", "Macbook Air 2020 Gold", "33.000.000"),
  new InitProduct("5401IM", "computer", "./assests/img/computer/iMac 24 2021 M1.jpg", "Imac", "44.450.000"),
  new InitProduct("5502IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Xanh Nhạt.jpg", "Imac", "44.450.000"),
  new InitProduct("5603IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Xanh Lục Bảo.jpg", "Imac", "44.450.000"),
  new InitProduct("5704IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Tim.jpg", "Imac", "44.450.000"),
  new InitProduct("5805IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Rose.jpg", "Imac", "44.450.000"),
  //**************************Imac******************************** 
  new InitProduct("5901LK", "LinhKien", "./assests/img/LinhKien/chuot-bluetooth-apple-mk2e3-trang-avatar-600x600.jpg", "Mouse", "2.500.000"),
  new InitProduct("6204LK", "LinhKien", "./assests/img/LinhKien/tai-nghe-earpods-apple-md827fea-avatar-1-600x600.jpg", "Earphone", "700.000"),
  new InitProduct("6305LK", "LinhKien", "./assests/img/LinhKien/bluetooth-airpods-2-apple-mv7n2-imei-ava-600x600.jpg", "AirPods 2", "3.000.000"),
  new InitProduct("6406LK", "LinhKien", "./assests/img/LinhKien/tai-nghe-bluetooth-airpods-pro-apple-mwp22-thumb-600x600.jpg", "AirPods Pro", "5.500.000"),
  new InitProduct("6507LK", "LinhKien", "./assests/img/LinhKien/bluetooth-airpods-max-apple-ava-600x600.jpg","AirPods Max", "12.000.000")
]
localStorage.setItem("listProduct", JSON.stringify(productArr));
function handleString(string){
  if(string.slice(2,) === "PM"){
    return "PM";
  }else if(string.slice(2,) === "PO"){
    return "PO";
  }else if(string.slice(2,) === "OO"){
    return "OO";
  }else if(string.slice(2,) === "MO"){
    return "MO";
  }else {
    return -1;
  }
}
let listTemp;
function innerProducts(brand, key = "NO"){
  let list = [];
  let code = handleString(key);
  JSON.parse(localStorage.getItem("listProduct")).forEach(function(value){
    if(value.brand === brand && key === "NO"){
      list.push(value);
    }else if(value.brand === brand){
      if(key.slice(0, 2) == value.productId.slice(2, 4)){
        if(code == -1){
          list.push(value);
        }else if(code === value.productId.slice(4, )){
          list.push(value);
        }
      }
    }
  });
  listTemp = list;
  dividePage(list);
  showContent(list);
}

function dividePage(arr){
  let pages = Math.ceil(arr.length / 8);
  let s = "";
  for(let i = 1; i <= pages;i++){
    s += `<li onclick="innerPage('${i}')">${i}</li>`;
    $('.page').innerHTML = `<ul>${s}</ul>`;
  }
}
function innerPage(currentPage){
  let count = 0;
  let temp = [];
  let page = (currentPage - 1) * 8;
  for(let i = page;count < 8 && count < listTemp.length - page; i++){
    temp.push(listTemp[i]);
    count++;
  }
  showContent(temp);
}
function showContent(arr){
  let s = "";
  let count = 0;
  let header;
  if(arr[0].brand == "phone"){
    header = `
      <div class="lable">
        <h1>Iphone</h1>
      </div>
    `;
  }else if(arr[0].brand == "tablet"){
    header = `
      <div class="lable">
        <h1>Ipad</h1>
      </div>
    `;
  }else if(arr[0].brand == "computer"){
    header = `
      <div class="lable">
        <h1>Macbook</h1>
      </div>
    `;
  }else {
    header = `
      <div class="lable">
        <h1>Phụ kiện</h1>
      </div>
    `;
  }
  for(let i = 0;count < 8 && count < arr.length;i++){
    s += `<div class="product-item">
            <div class="product-top">
                <img  class="product-thumb" src="${arr[i].img}" alt="">
                <a href="" class="product-name">${arr[i].name}</a>
            </div>
            <div class="product-info">
              <div class="product-price">${arr[i].price} VND</div>
              <a href="#" onclick="confirmation()" data-set="${arr[i].productId}" class="buy-now">Mua ngay</a>
            </div>
          </div>
          `;
    count++;
  }
  $('.innerLable').innerHTML = header;
  $('.products').innerHTML = s;
  $('.products').classList.add('list');
}

function confirmation(obj){  
  if(currentAccount != null){
    let choice;
    let list = JSON.parse(localStorage.getItem('listProduct'));
    let temp = obj.getAttribute("data-set");
    list.forEach(function(value){
      if(temp === value.productId){
        choice = value;
      }
    })
    currentAccount.push(choice)
    localStorage.setItem('currentUser', JSON.stringify(currentAccount));
    location.href = './cart.html';
  }else {
    boardLogin.classList.remove('active');
  }
}
function saveProduct(obj){
  let choice;
  let list = JSON.parse(localStorage.getItem('listProduct'));
  let temp = obj.getAttribute("data-set");
  list.forEach(function(value){
    if(temp === value.productId){
      choice = value;
    }
  })
  currentAccount.push(choice)
  localStorage.setItem('currentUser', JSON.stringify(currentAccount));
}
function requireLogin(){
  let user = JSON.parse(localStorage.getItem('currentUser'))
  if(user !== null){
    innerChoice();
    total();
  }else {
    boardLogin.classList.remove('active');
  }
}

textAnimation();
handleEvent();
checkRegister();
checkLogin();
renderAccount();