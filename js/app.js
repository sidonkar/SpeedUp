(function () {

    var selectedIndex=0,rowsAndColumns=4;

    function makeid(pos) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return possible.charAt(pos%26)
    }

    /*    for (var i = 0; i < 10; i++) {
            var id = Math.round(Math.random()*100);
            console.log(id,makeid(id));
        }*/

    /*
    *
    * <div class="row">
                    <div class="cell"><span class="alphabet"></span></div>
                    <div class="cell"><span class="alphabet"></span></div>
                    <div class="cell"><span class="alphabet"></span></div>
                    <div class="cell"><span class="alphabet"></span></div>
                    <div class="cell"><span class="alphabet"></span></div>
                </div>
    * */
    for (var i = 0; i < rowsAndColumns; i++) {
        var txt = '<div class="row">';
        for (var j = 0; j < rowsAndColumns; j++) {
            txt+='<div class="cell" id="' +(j+i*rowsAndColumns)+
                '"><span class="alphabet">' +makeid(Math.round(Math.random()*100))+
                '</span></div>';
        }
        txt+='</div>';
        $(".grid").append(txt);
    }




/*
    $('span.alphabet').each(
        function (index) {
            $(this).text(makeid(Math.round(Math.random()*100)));
        });
*/

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
        selectCell($(this).attr("id"));
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
                selectedIndex = ++selectedIndex%(rowsAndColumns*rowsAndColumns);
            if(e.which==37) {
                if(selectedIndex==0)
                    selectedIndex = rowsAndColumns*rowsAndColumns-1;
                 else
                     selectedIndex = --selectedIndex%(rowsAndColumns*rowsAndColumns);
            }if(e.which==38) {
                if(selectedIndex<rowsAndColumns)
                    selectedIndex = (rowsAndColumns*rowsAndColumns+selectedIndex-rowsAndColumns)%(rowsAndColumns*rowsAndColumns);
                else
                    selectedIndex = (selectedIndex-rowsAndColumns)%(rowsAndColumns*rowsAndColumns);
            }if(e.which==40)
                selectedIndex = Math.abs(selectedIndex+rowsAndColumns)%(rowsAndColumns*rowsAndColumns);
            selectCell(selectedIndex);
        }
    })
})()