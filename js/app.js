(function () {

    var selectedIndex=0;

    function makeid(pos) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return possible.charAt(pos%26)
    }

/*    for (var i = 0; i < 10; i++) {
        var id = Math.round(Math.random()*100);
        console.log(id,makeid(id));
    }*/

    $('span.alphabet').each(
        function (index) {
            $(this).text(makeid(Math.round(Math.random()*100)));
        });

    function selectCell(index){
        $('.cell.selected').toggleClass('selected');
        $('.cell').eq(index).toggleClass('selected');
    }
    selectCell(selectedIndex);

    function buildOutput(text) {
        $('.output .result.blank').first().text(text);
        $('.output .result.blank').first().toggleClass("blank");
    }

    $('.cell').bind( "click", function() {
        buildOutput($(this).text());
    });

    $('.result').bind('click',function () {
        $(this).not('.blank').text("").toggleClass("blank");
    });

    function clearLastOutput() {
        $('.output .result').not('.blank').last().text("").toggleClass("blank");
    }

    function computeResult() {
        if($('.output .result.blank').length>0)
            alert("unfinished business   ..... grrrrr");
        else
            alert("'"+$('.result').text()+"' okay cool....thats interesting... B-)")
    }

    $('body').bind("keydown",function (e) {
        if(e.which==8){
            clearLastOutput();
        }
        if(e.which==32){
            buildOutput($('.cell.selected').first().text())
        }
        else if(e.which==13)
        {
            computeResult();
        }
        else if(e.which>=37 && e.which<=40){
            if(e.which==39)
                selectedIndex = ++selectedIndex%25;
            if(e.which==37) {
                if(selectedIndex==0)
                    selectedIndex = 24;
                 else
                     selectedIndex = --selectedIndex%25;
            }if(e.which==38) {
                if(selectedIndex<5)
                    selectedIndex = (25+selectedIndex-5)%25;
                else
                    selectedIndex = (selectedIndex-5)%25;
            }if(e.which==40)
                selectedIndex = Math.abs(selectedIndex+5)%25;
            selectCell(selectedIndex);
        }
    })
})()