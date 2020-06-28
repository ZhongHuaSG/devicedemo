
//点击close-pop这个类时取消弹框
$('.close-pop').on('click', function () {
    $('#cover').css('display','none');
    $(this).parent().parent().hide().find('.cont-div').attr('style', 'visibility: hidden');
})


function aiguozhe(item){
    if($('.modedetail').css('display') === 'none'){
        $('.modedetail').attr('style','display:block;');
        $('.set-div').attr('style','z-index:1;');
    }else{
        $(".modedetail").hide();
        $('.set-div').attr('style','z-index:3;');
    }
}

// $(document).on('click',function (e) {
//     var target = $(e.target);
//     if(target.closest(".modedetail").length == 0 && target.closest(".module").length == 0){
//         $(".modedetail").hide();
//     }
// })



