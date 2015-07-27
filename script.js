$(document).ready(function(){
//Array containing the store Objects
var storeInventory = [];

//Create Objects for the store items and push them to the storeInventory array
storeInventory.push(new StoreItem ("Apple", "apple.png"));
storeInventory.push(new StoreItem ("Bananas", "bananas.png"));
storeInventory.push(new StoreItem ("Orange", "orange.png"));
storeInventory.push(new StoreItem ("Pear", "pear.png"));

//Create an Object for the user
var User = {
	cash : 10000
}

//populate screen with the storeInventory
for (var i = 0; i < storeInventory.length; i++) {
	var price = formatNum(storeInventory[i].currentPrice);
	$('.store').append('<div class="col-md-3 col-xs-6 store-item '+storeInventory[i].name+'"></div>');//add store-item container
	$('.store > .'+storeInventory[i].name).append('<img src="images/'+storeInventory[i].img+'">');//add item image
	$('.store > .'+storeInventory[i].name).append('<h3 class="name">'+storeInventory[i].name+'</h3>');
	$('.store > .'+storeInventory[i].name).append('<h3 class="price">'+price+'</h3>');
	$('.store > .'+storeInventory[i].name).append('<button class="btn buy" id="'+storeInventory[i].name+'">Buy</button>');
	$('.store > .'+storeInventory[i].name).append('<button class="btn sell" id="'+storeInventory[i].name+'">Sell</button>');
};
//populate screen with user basket
for (var i = 0; i < storeInventory.length; i++) {
	$('.cart').append('<div class="col-sm-12 col-xs-12 cart-item '+storeInventory[i].name+'"></div>');//add cart-item container
	$('.cart > .'+storeInventory[i].name).append('<div class="num-in-cart">'+storeInventory[i].numInCart+'</div>');//add item image
	$('.cart > .'+storeInventory[i].name).append('<div class=""><img src="images/'+storeInventory[i].img+'"></div>');//add item image
	$('.cart > .'+storeInventory[i].name).append('<div class="avg-price"></div>');//add average price text


};
$('.cart').append('<div class="col-md-12 col-sm-6 col-xs-12 user-cash">Total Cash: '+formatNum(User.cash)+'</div>');//add cart-item container	


//Store Item consructor
function StoreItem(name, img) {
	this.name = name;
	this.img = img
	this.numPurchased = 0; //total number purchased during game
	this.numInCart = 0; //current number in users cart
	this.totalAmtSpent = 0; //total amount spent on this fruit
	this.currentPrice = randomNumber(50, 999); //set current price of fruit $.50 - $9.99
	this.priceTrend = ""; //track the price trend	
}

//update the price of the fruit
function updateFruitPrice(price, findStoreItem) {
	var randomChange = randomNumber(1, 2);
	if (price > 949) {price -= 50; } //avoid price over $9.99
	else if (price < 100) {price += 50} //avoid price under $.50
	else if (randomChange === 1) {price += 50}// add $.50
	else {price -= 50} //subtract $.50
		return price;	
}
//buy a storeItem
$('body').on('click', '.buy', function() {
	var getBtnId = $(this).attr('id');
	var findStoreItem = $.grep(storeInventory, function(e){ return e.name == getBtnId});
	if (User.cash >= findStoreItem[0].currentPrice){
		findStoreItem[0].numInCart++;
		$('.'+getBtnId+' .num-in-cart').text(findStoreItem[0].numInCart);//update cart inventory on DOM	
		findStoreItem[0].numPurchased++;
		findStoreItem[0].totalAmtSpent += findStoreItem[0].currentPrice;
		User.cash -= findStoreItem[0].currentPrice; //addjust user cash
		$('.cart .user-cash').text('Total Cash: '+formatNum(User.cash));//update user cash on DOM
		var avgPrice = (findStoreItem[0].totalAmtSpent/findStoreItem[0].numPurchased);
		$('.'+getBtnId+' .avg-price').text("Avg. purchase price: "+formatNum(avgPrice));//update cart inventory on DOM	
		console.log(avgPrice);	
	}
});
//sell a storeItem
$('body').on('click', '.sell', function() {
	var getBtnId = $(this).attr('id');
	var findStoreItem = $.grep(storeInventory, function(e){ return e.name == getBtnId});
	if (findStoreItem[0].numInCart > 0){//make sure there are storeItems to sell
		findStoreItem[0].numInCart--;
		$('.'+getBtnId+' .num-in-cart').text(findStoreItem[0].numInCart);//update cart inventory on DOM	
		User.cash += findStoreItem[0].currentPrice;
		$('.cart .user-cash').text('Total Cash: '+formatNum(User.cash));//update user cash on DOM	
	}
	
});

//this will call updateFruitPrice every 1 seconds
setInterval(function(){
	for (var i = 0; i < storeInventory.length; i++) {
		storeInventory[i].currentPrice = updateFruitPrice(storeInventory[i].currentPrice, storeInventory[i].name)//update fruit price
		$('.'+storeInventory[i].name+' > .price').text(formatNum(storeInventory[i].currentPrice));//send new price to the dom 
	};
}, 1000);

//format to Dollar values
function formatNum(num) {
	num /= 100;
	num = parseFloat(Math.round(num * 100) / 100).toFixed(2);
	num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	num = "$" + num;
	return num;
}
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);

}
}); //End Document Ready




