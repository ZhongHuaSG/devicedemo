
function getCanShu() {

    var ledParasJson = null ;
    var senderOrderList = [] ;

    //发送卡初始X值
    var XInitSender = 200;

    //发送卡初始Y值
    var YInitSender = 1000;

    //网口初始X值-X轴上单个偏移差值为60一个单位(向右+60)
    var XInitPort = 290;
    //网口初始Y值-Y轴上单个偏移差值为70一个单位（向下-70）
    var YInitPort = 1000;
    //网口最大总数量
    var MaxPort = 16;

    //X轴上单个偏移差值为60一个单位(向右+60)----屏体（同网口）
    var XInit = 660;
    //Y轴上单个偏移差值为140一个单位(向下-140)----屏体
    var YInit = 960;
    //矢量图形组
    var nodes = [{
        x: 0,
        y: 600,
        nodeName: '控制卡',
        name: '控制卡',
        type: '播放器',
        svgPath: 'M885.76 919.552H116.736C53.248 919.552 1.024 867.328 1.024 803.84V284.672c0-63.488 52.224-115.712 115.712-115.712h769.024c63.488 0 115.712 52.224 115.712 115.712v519.168c0 63.488-52.224 115.712-115.712 115.712zM116.736 226.304c-31.744 0-58.368 25.6-58.368 58.368v519.168c0 31.744 25.6 58.368 58.368 58.368h769.024c31.744 0 58.368-25.6 58.368-58.368V284.672c0-31.744-25.6-58.368-58.368-58.368H116.736z M432.128 740.352c-15.36 0-30.72-4.096-44.032-12.288-25.6-15.36-40.96-43.008-40.96-72.704V458.752c0-30.72 15.36-57.344 40.96-72.704s57.344-16.384 83.968-2.048L658.432 481.28c27.648 14.336 46.08 44.032 46.08 75.776 0 31.744-17.408 60.416-46.08 75.776l-185.344 98.304c-13.312 6.144-26.624 9.216-40.96 9.216z m1.024-279.552v191.488l182.272-96.256L433.152 460.8z m184.32 97.28l20.48-37.888-20.48 37.888z',
        symbolSize: 70,

    }
    ]
    //连接线数组
    var links = []
    //走线方式数组
    var portGroup = [];

    //请求后台参数
    $.ajax({
        url: "/getJsonMessage",
        data:null,
        type: "GET",
        dataType: "json",
        success: function(data) {
            for(var i = 0;i<data.comList.length;i++){
                //获取屏幕对象
                ledParasJson = data.comList[i].ledParas;
                //发送卡数组
                senderOrderList = ledParasJson.senderOrderList;
                //遍历发送卡列表可知发送卡数量
                for(var i = 0;i<senderOrderList.length;i++){
                    //当前发送卡信息
                    var senderOrder = senderOrderList[i];
                    //发送卡信息
                    var sender ={
                        x: XInitSender,
                        y: YInitSender,
                        nodeName: senderOrder.id,
                        name: senderOrder.id,
                        type: '发送卡',
                        svgPath: 'M868.48 104.96H155.52a32 32 0 0 0-32 32v538.24a32 32 0 0 0 32 32h712.96a32 32 0 0 0 32-32V136.96a32 32 0 0 0-32-32z m-32 64V390.4H187.52V168.96zM187.52 643.2V422.4h648.96v221.44z M252.8 232.96h32v74.88h-32zM334.72 232.96h32v74.88h-32zM252.8 502.4h32v74.88h-32zM334.72 502.4h32v74.88h-32zM868.48 853.12H600.96a94.72 94.72 0 0 0-56.96-56.96v-53.76h-64v53.76a94.72 94.72 0 0 0-56.96 56.96H155.52a32 32 0 1 0 0 64h267.52a94.08 94.08 0 0 0 177.92 0h267.52a32 32 0 0 0 0-64zM512 915.84a30.72 30.72 0 1 1 30.72-30.72 30.72 30.72 0 0 1-30.72 30.72z'
                    }
                    //新增拓扑连接线
                    var lineSender = {
                        source: '控制卡',
                        target: senderOrder.id,
                        name: '连通',
                        type: '网线',
                        nodeName: '主网线'
                    }
                    //连接线新增
                    links.push(lineSender);
                    //矢量图形新增
                    nodes.push(sender);
                    //获取走线端口数量
                    var portNum = senderOrder.portOrder.length;
                    //遍历走线接口
                    for(var j = 0;j<portNum;j++){
                        //走线详情信息
                        var port = senderOrder.portOrder[j];
                        //判断索引是否能够取余4来判断在当前X轴的Y位置
                        if((j+1)%4 == 0){
                            //当前port对象
                            var singlePort = {
                                //X轴上单个偏移差值为60一个单位(向右+60)
                                x: XInitPort+parseInt((j+1)/4-1)*60,
                                //Y轴上单个偏移差值为70一个单位（向下-70）
                                y: YInitPort-3*70,
                                symbolSize: 20,
                                nodeName: port.id,
                                name: port.id,
                                type: '网口',
                                svgPath: 'M509.92 176C325.504 176 176 325.504 176 509.92c0 184.416 149.504 333.92 333.92 333.92 184.416 0 333.92-149.504 333.92-333.92C843.84 325.504 694.32 176 509.92 176z m0 48c157.904 0 285.92 128 285.92 285.92 0 157.904-128.016 285.92-285.92 285.92C352 795.84 224 667.808 224 509.92 224 352 352 224 509.92 224z m0 96C405.024 320 320 405.024 320 509.92c0 104.88 85.024 189.92 189.92 189.92 104.88 0 189.92-85.04 189.92-189.92 0-104.896-85.04-189.92-189.92-189.92z',
                            };
                            //走线方式数组添加
                            nodes.push(singlePort);
                        }else{
                            var singlePort = {
                                //X轴上单个偏移差值为60一个单位(向右+60)
                                x: XInitPort+parseInt((j+1)/4)*60,
                                //Y轴上单个偏移差值为70一个单位（向下-70）
                                y: YInitPort-(j)%4*70,
                                symbolSize: 20,
                                nodeName: port.id,
                                name: port.id,
                                type: '网口',
                                svgPath: 'M509.92 176C325.504 176 176 325.504 176 509.92c0 184.416 149.504 333.92 333.92 333.92 184.416 0 333.92-149.504 333.92-333.92C843.84 325.504 694.32 176 509.92 176z m0 48c157.904 0 285.92 128 285.92 285.92 0 157.904-128.016 285.92-285.92 285.92C352 795.84 224 667.808 224 509.92 224 352 352 224 509.92 224z m0 96C405.024 320 320 405.024 320 509.92c0 104.88 85.024 189.92 189.92 189.92 104.88 0 189.92-85.04 189.92-189.92 0-104.896-85.04-189.92-189.92-189.92z',
                            };
                            nodes.push(singlePort);
                        }
                        //遍历单个走线口的屏体信息
                        for(var boxindex = 0;boxindex < port.box.length;boxindex++){
                            var box = port.box[boxindex];
                            //判断屏体顺序是否为1能和端口直连
                            if(box.order == 1){
                                var portBox = {
                                    source: port.id,
                                    target: box.id,
                                    name: '连通',
                                    type: '网线',
                                    nodeName: '网线'
                                }
                                //连接线新增
                                links.push(portBox);
                            }
                            //单个屏体的信息
                            console.log(box);
                        }
                    }
                }
            }
            // data = jQuery.parseJSON(data);
            // dataType指明了返回数据为json类型，故不需要再反序列化
            tuopu(nodes,links);
        },
        error: function () {
            alert("获取后台参数失败");
        }
    });


}


//发送卡拓扑图
function tuopu(nodes,links) {

    var charts = {
        //拓扑模块
        nodes: [],
        //目标连接线
        links: [],
        //网格线
        linesData: []
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('tuopu'));

    var dataMap = new Map();
    //遍历SVG图形
    for (var j = 0; j < nodes.length; j++) {
        const {
            x,
            y,
            nodeName,
            name,
            type,
            svgPath,
            symbolSize
        } = nodes[j];
        if(type == '屏体'){
            var node = {
                nodeName,
                name,
                type,
                value: [x, y],
                symbolSize: symbolSize || 50,
                symbol: 'path://' + svgPath,
                itemStyle: {
                    color: '#043c58',
                    emphasis: {
                        color: '#1D5D76'
                    },
                }
            }
            dataMap.set(nodes[j].name, [x, y])
            charts.nodes.push(node)
        }else{
            var node = {
                nodeName,
                name,
                type,
                value: [x, y],
                symbolSize: symbolSize || 50,
                symbol: 'path://' + svgPath,
                itemStyle: {
                    color: 'orange',
                    emphasis: {
                        color: '#FFDD00'
                    },
                }
            }
            dataMap.set(nodes[j].name, [x, y])
            charts.nodes.push(node)
        }
    }

    //遍历目标连接线
    for (var i = 0; i < links.length; i++) {
        var link = {
            source: links[i].source,
            target: links[i].target,
            type: links[i].type,
            nodeName: links[i].nodeName,
            label: {
                normal:{
                  show:false
                },
                emphasis:{
                    symbolSize:8,
                    fontSize:38,
                    color:'red',
                    show: true,
                    formatter: links[i].name
                }
            },
            lineStyle: {
                normal: {
                    curveness:0.15,
                    symbolSize:0
                },
                emphasis:{
                    symbolSize:8,
                    type: 'solid',
                    color: '#20A0FF'
                }
            }
        }
        charts.links.push(link);
        // 组装动态移动的效果数据
        var lines = {
            coords:[
                dataMap.get(links[i].source),
                dataMap.get(links[i].target)
                    ]
                    };
        charts.linesData.push(lines);
    }
    option = {
        //提示框显示
        tooltip: {
                //显示延迟
            showDelay: 300,
            backgroundColor: '#1F2D3D',
            borderColor: '#324057',
            borderRadius: 4,           // 提示边框圆角，单位px，默认为4
            borderWidth: 1,            // 提示边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
               type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
               lineStyle : {          // 直线指示器样式设置
                color: '#48b',
                width: 2,
                type: 'solid'
            },
            shadowStyle : {                       // 阴影指示器样式设置
                width: 'auto',                   // 阴影大小
                color: '#475669'  // 阴影颜色
            }
        },
                //动画变换延迟单位：s
                transitionDuration: 0.8,
                // formatter: '设备类型:{b}<br />序列号:<br />'
                formatter: function (item) {
                    return '设备类型:<b style="color: green;">&nbsp;&nbsp;' + item.data.type + '</b><hr />' +
                        '设备ID:<b style="color: green;">&nbsp;&nbsp;' + item.data.nodeName + '</b><hr />' +
                        '型号：<b style="color: green;"></b><hr />' +
                        '信号强度：<b style="color: green;">强</b><hr />' +
                        '工作状态：<b style="color: green;">正常</b><hr />'
                }
            },
            // backgroundColor: "#0B1321",
            xAxis: {
                min: 0,
                max: 1000,
                show: false,
                type: 'value'
            },
            yAxis: {
                min: 0,
                max: 1000,
                show: false,
                type: 'value'
            },
            series: [{
                type: 'graph',
                coordinateSystem: 'cartesian2d',
                focusNodeAdjacency: true, // 鼠标移到节点上突出显示节点以及节点的边和邻接节点
                lineStyle: {
                    normal: {
                        width: 2,
                        shadowColor: 'none'
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                label: {
                    show: true,
                    position: 'bottom',
                    color: 'orange',
                    formatter: function (item) {
                        return item.data.nodeName
                    }
                },
                data: charts.nodes,
                links: charts.links
            },
            //     {
            //     type: 'lines',
            //     polyline: true,
            //     coordinateSystem: 'cartesian2d',
            //     lineStyle: {
            //         //设置网格线类型 dotted：虚线   solid:实线
            //         type: 'solid',
            //         width: 1,
            //         color: '#175064',
            //         curveness: 0.1
            //
            //     },
            //     effect: {
            //         show: true,
            //         trailLength: 0.1,
            //         symbol: 'arrow',
            //         color: 'orange',
            //         symbolSize: 8
            //     },
            //     data: charts.linesData
            // }
            ]
        };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 处理点击事件并且弹出数据名称-params传入的参数
        myChart.on('click', function (params) {
            if(params.data.type == '屏体'){
                $('#cover').css('display','block'); //显示遮罩层
                $('.container').attr('style', 'visibility: visible').find('.pop-up').attr('style', 'visibility: visible').siblings().attr('style', 'visibility: hidden');
            }else{
             alert("暂未开放");
            }
        });
}

getCanShu();

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



