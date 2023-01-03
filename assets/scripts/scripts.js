function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateBoard() {
    var cells = [];
    var counter = 100;

    for(var i = 1; i <= 10;i++){
		for(var j = 1; j <= 10;j++){
			cells.push({
                			num: counter,
                			is_snake: null,
                			is_ladder: null
           		 	});

		counter-- ;
		}
    }

    console.log(cells);
    return cells;
}

function generateHTML(data){
    var HTML = '';
    $.each(data, function (index, element) {
        HTML += '<span class="cell">'+element.num+'</span>'
    });
    $('#stage').html(HTML);
}

generateHTML(generateBoard());

$('#dice').on('click', function (){
    var rnd = Random(1, 6);
    $('#dice_number').html(rnd);
});

/*var arr = [] ;
while (true) {
    var x = Number(prompt('enter numbers(0 end)')) ;
    if (x === 0) {
        break
    }else {
        arr.push(x);
    }
}
console.log(arr) ;
for (var z = 1 ; z <= arr.length ; z++) {
    if (z % 2 == 0){
        console.log(arr[z]) ;
    }
}*/