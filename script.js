function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);

}

var User = {
	numCurrentApples : 0,
	numCurrentOranges : 0,
	numCurrentBananas : 0,
	//numCurrentGrapes : 0,
	numCurrentPears : 0,
	totalNumApples : 0,
	totalNumOranges : 0,
	totalNumBananas : 0,
	//totalNumGrapes : 0,
	totalNumPears : 0,
	spentApples : 0,
	spentOranges : 0,
	spentBananas : 0,
	//spentGrapes : 0,
	spentPears : 0,
	cash : 10000
}

//this is user inventory
var userBasket = {
	apples: 0,
	oranges: 0,
	bananas: 0,
	grapes: 0,
	pears: 0
}

//something that defines fruit prices' starting point
	//[2] will indicate if price has gone up or down in last fiftyCents function call
var fruitPrices = [
	["apples", 50, ""], 
	["oranges", 50, ""],
	["bananas", 50, ""],
	//["grapes", 950, ""],
	["pears", 950, ""]
]

var change = "";

//function that changes price for each fruit
function fruitPriceUpdates() {
	for(var i = 0; i < fruitPrices.length; i++) {
		if(randomNumber(1, 2) == 1 && (fruitPrices[i][1] <= 900)){
			fruitPrices[i][1] += 50;
			fruitPrices[i][2] = "increase";
			// console.log("increase");
		} else if (fruitPrices[i][1] > 50) {
			fruitPrices[i][1] -= 50;
			fruitPrices[i][2] = "decrease";
			// console.log("decrease");
		};
	}
	$('.apple > .price').text("$" + fruitPrices[0][1]);
	$('.orange > .price').text("$" + fruitPrices[1][1]);
	$('.banana > .price').text("$" + fruitPrices[2][1]);
	$('.pear > .price').text("$" + fruitPrices[3][1]);
// console.log("pears price: " + fruitPrices[1][1] + "pears indicator: " + fruitPrices[1][2]);
}
fruitPriceUpdates(fruitPrices);
//this will call the fruitPriceUpdates function each 15 seconds
setInterval('fruitPriceUpdates(fruitPrices);', 1000);

$(document).ready(function(){

	$('.cash').text("$" + User.cash);
	$(".buy-apple").on('click', function(){
		User.numCurrentApples++;
		User.totalNumApples++;
		User.spentApples += fruitPrices[0][1];
		User.cash -= fruitPrices[0][1];
	var avgApple = User.spentApples / User.totalNumApples;
	$('.userapple > .inventory').text(User.numCurrentApples);
	$('.userapple > .avgprice').text(avgApple);
	$('.cash').text("$" + User.cash);
	});
	
	$(".buy-orange").on('click', function(){
		User.numCurrentOranges++;
		User.totalNumOranges++;
		User.spentOranges += fruitPrices[1][1];
		User.cash -= fruitPrices[1][1];
	var avgOrange = User.spentOrange / User.totalNumOranges;
	$('.userorange > .inventory').text(User.numCurrentOranges);
	$('.userorange > .avgprice').text(avgOrange);
	$('.cash').text("$" + User.cash);
	});
	
	$(".buy-banana").on('click', function(){
		User.numCurrentBananas++;
		User.totalNumBananas++;
		User.spentBananas += fruitPrices[2][1];
		User.cash -= fruitPrices[2][1];
	var avgBanana = User.spentBananas / User.totalNumBananas;
	$('.userbanana > .inventory').text(User.numCurrentBananas);
	$('.userbanana > .avgprice').text(avgBanana);
	$('.cash').text("$" + User.cash);
	});
	
	$(".buy-pear").on('click', function(){
		User.numCurrentPears++;
		User.totalNumPears++;
		User.spentPears += fruitPrices[3][1];
		User.cash -= fruitPrices[3][1];
	var avgPear = User.spentPears / User.totalNumPears;
	$('.userpear > .inventory').text(User.numCurrentPears);
	$('.userpear > .avgprice').text(avgPear);
	$('.cash').text("$" + User.cash);
	});
	
	$(".sell-apple").on('click', function(){
		User.numCurrentApples--;
		User.cash += fruitPrices[0][1];
	$('.userapple > .inventory').text(User.numCurrentApples);
	$('.cash').text("$" + User.cash);
	});
	
	$(".sell-orange").on('click', function(){
		User.numCurrentOranges--;
		User.cash += fruitPrices[1][1];
	$('.userorange > .inventory').text(User.numCurrentOranges);
	$('.cash').text("$" + User.cash);
	});
	
	$(".sell-banana").on('click', function(){
		User.numCurrentBananas--;
		User.cash += fruitPrices[2][1];
	$('.userbanana > .inventory').text(User.numCurrentBananas);
	$('.cash').text("$" + User.cash);
	});
	
	$(".sell-pear").on('click', function(){
		User.numCurrentPears--;
		User.cash += fruitPrices[3][1];
	$('.userpear > .inventory').text(User.numCurrentPears);
	$('.cash').text("$" + User.cash);
	});

}); 



