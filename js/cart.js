let listProduct = [];
function innerChoice(){
  let UserChoose = JSON.parse(localStorage.getItem('currentUser'));
  let s = "";
  let block = `
    <div class="cart-box">
      <div class="cart-content-top">
        <table>
        
        </table>
      </div>
      <div class="cart-content-bottom">
				<table>
					<tr>
							<th colspan="2">TỔNG TIỀN GIỎ HÀNG</th>
					</tr>
					<tr>
							<td>Tổng sản phẩm</td>
							<td class="sl">2</td>
					</tr>
					<tr>
							<td>Tổng tiền hàng</td>
							<td><span class="tt"></span><span>.000.000 <sub>đ</sub></span></td>
					</tr>
					<tr>
          
							<td>Tạm tính</td>
							<td style="color: red;"><span class="tt"></span><span>.000.000 <sub>đ</sub></span></td>
					</tr>
				</table>
				<div class="cart-content-bottom-text">
					<p>Bạn sẽ được free ship khi đơn hàng của bạn có tổng giá trị trên 2.000.000đ</p>
					<p style="color: red; font-weight: bold">Bạn được free ship</p>
				</div>
				<div class="cart-content-bottom-button">
					<button id="home-page" onclick="goToHome()">Tiếp tục mua sắm</button>
					<button id="pay" onclick="pay()">Thanh toán</button>
				</div>
			</div>
    </div>
  `;
  let header = `
    <tr>
      <th>Sản phẩm</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Thành tiền</th>
      <th>Xóa</th>
    </tr>
  `;
  for(let i = 1;i < UserChoose.length;i++){
    s += `
      <tr class="product">
        <td><img src="${UserChoose[i].img}" alt=""></td>
        <td><p>${UserChoose[i].name}</p></td>
        <td><input type="number" value="1" min="1" onchange="tempValue(this)"></td>
        <td><p>${UserChoose[i].price} <sub>đ</sub></p></td>
        <td><button>Remove</button></td>
      </tr>
    `;
    listProduct.push(UserChoose[i]);
  }
  header += s;
  $('.container').innerHTML = block;
  $('.cart-box table').innerHTML = header;
}

let quantity;
function total(){
  let totalValue = 0;
  quantity = listProduct.length;
  for(let i = 0;i < listProduct.length;i++){
    totalValue += parseInt(listProduct[i].price);
  }
  $$('.tt').forEach(function(value){
    value.innerHTML = `${totalValue}`;
  })
  $('.sl').innerHTML = quantity;
}

function goToHome(){
  location.href = './index.html';
}

function pay(){
  let temp = JSON.parse(localStorage.getItem('productSold')) || [];
  listProduct.forEach(function(value){
    temp.push(value);
  })
  localStorage.setItem('productSold', JSON.stringify(temp));
  let user = JSON.parse(localStorage.getItem('currentUser'));
  localStorage.setItem('currentUser', JSON.stringify([user[0]]));

  $('.cart-box table').innerHTML = "";
  $$('.tt').forEach(function(value){
    value.innerHTML = 0;
  })
  $('.sl').innerHTML = 0;
}