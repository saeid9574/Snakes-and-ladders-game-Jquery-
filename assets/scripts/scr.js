function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateHTML(data) {
    var HTML = '' ;
    $.each(data , function (index , element) {
        var className = '' ;
        var child = '' ;

        //if (index == 0) {
          //  className = ' user-1'
        //}
        if (element.is_snake) {
            className = ' snake' ;
            child = '<b>'+element.is_snake+'</b>' ;
        }
        if (element.is_ladder) {
            className = ' ladder' ;
            child = '<b>'+element.is_ladder+'</b>'
        }
        HTML += '<span data-num="'+element.num+'"class="cell '+className+'">'+element.num+ child+'</span>'
    }) ;
    $('#stage').html(HTML) ;
}

function generateBoard() {
    var cells = [] ;
    var counter = 100 ;
    for (var i=0 ; i<10 ; i++) {
        var temp = [] ;
        for (var j=0 ; j<10 ; j++) {
            temp.push({
                num: counter ,
                is_snake: isSnake(counter) ,
                is_ladder: isLadder(counter)
            })
            --counter ;
        }
        if (i % 2) temp.reverse() ;
        cells = cells.concat(temp) ;
    }
    console.log(cells) ;
    return cells ;
}

function isSnake(count) {
    var snake_map = {
        11: 2,
        22: 15,
        34: 23,
        45: 33,
        60: 48,
        84: 70,
        90: 85,
        8: 2,

    }
    return snake_map[count] || null ;
}

function isLadder(count) {
    var ladder_map = {
        12: 25,
        24: 36,
        82: 99
    }
    return ladder_map[count] || null ;
}

function getCurrentUser(count) {
    return count ;
}

function getCurrentUserClass(userId) {
    user_map = {
        1 : 'user-1' ,
        2 : 'user-2' ,
        3 : 'user-3' ,
        4 : 'user-4'
    }
    return user_map[userId] ;
}

function isUserIn(currentUserClass) {
    return !!$('#stage').find('.'+currentUserClass).length ;
}

function canMove(nextLocation) {
    return nextLocation <= 100 ;
}

generateHTML(generateBoard()) ;

var count = 1 ;

$('#dice').on('click' , function () {
    var rnd = Random(1 , 6) ;
    $('#dice_number').text(rnd) ;
    if (count > 4) {
        count = 1 ;
        console.log('bozorg hast')
    }

    var currentUser = getCurrentUser(count) ;


    count+=1 ;


    var currentUserClass = getCurrentUserClass(currentUser) ;

    if (rnd === 6 && !isUserIn(currentUserClass)) {
        $('#stage').find('[data-num=1]').addClass(currentUserClass) ;
    } else if (isUserIn(currentUserClass)) {
        var userLocation = $('#stage').find('.'+currentUserClass).data('num') ;
        var nextLocation = userLocation + rnd ;
        console.log(nextLocation) ;

        if(canMove(nextLocation)) {
            var nextStep = '' ;
            var $nextPossion = $('#stage').find('[data-num='+nextLocation+']') ;
            if ($nextPossion.is('.snake')) {
                nextStep = $nextPossion.find('b').text() ;
                console.log(nextStep) ;
            }
            if ($nextPossion.is('.ladder')) {
                nextStep = $nextPossion.find('b').text() ;
                console.log(nextStep) ;
            }
            if (nextStep) {
                $('#dice').attr('disabled' , 'disabled') ;
                setTimeout( function () {
                    $('#stage').find('.'+currentUserClass).removeClass(currentUserClass) ;
                    $('#stage').find('[data-num='+nextStep+']').addClass(currentUserClass) ;
                    $('#dice').attr('disabled' , false) ;
                } , 1000)
            }

            $('#stage').find('.' + currentUserClass).removeClass(currentUserClass) ;
            $('#stage').find('[data-num='+nextLocation+']').addClass(currentUserClass) ;

            if (nextLocation === 100) {
                alert('win') ;
                $('#dice').attr('disabled' , 'disabled') ;
            }
        } else {
            console.log('nemitooni')
        }
    }
})