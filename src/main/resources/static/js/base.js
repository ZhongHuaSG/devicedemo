
//当前选中箱体的模组
var clicked_Box_ModGroup = null;

function getCanShu() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('tuopu'));

    let senderstatuslist = [{
        ORDER: '1',
        value: 'sender1',
        label: '发送卡1',
        HOSTIP:'192.168.48.17',
        STATUS:'1'
    },{
        ORDER: '2',
        value: 'sender2',
        label: '发送卡2',
        HOSTIP:'192.168.48.16',
        STATUS:'1'
    },{
            ORDER: '3',
            value: 'sender3',
            label: '发送卡3',
            HOSTIP:'192.168.48.18',
            STATUS:'1'
        }];

    let senderItem = [];

    for(let s = 0 ; s<senderstatuslist.length;s++){
        let getSender = senderstatuslist[s];
        let disabled = true;
        if(getSender.STATUS === '1'){
            disabled = false;
        }else{
            disabled = true;
        }
        if(senderItem.length===0){
            let sender = {
                id:getSender.ORDER+"",
                value: getSender.ORDER+"",
                label: getSender.HOSTIP+"",
                disabled: disabled
            };
            senderItem.push(sender);
        }else{
            // let sender = null;
            //循环本地发送卡列表
            for(let a = 0;a<senderItem.length;a++){
                //判断是否有相同的发送卡
                if(senderItem[a].id === getSender.ORDER+""){
                    continue;
                }else{
                    //没有相同的发送卡时赋值并推入一个新的senderItem
                    let sender = {
                        id:getSender.ORDER+"",
                        value: getSender.ORDER+"",
                        label: getSender.HOSTIP+"",
                        disabled: disabled
                    };
                    // if(senderItem.length === senderstatuslist.length){
                    //     break;
                    // }
                    senderItem.push(sender);
                }
            }
        }
    }

    var ledParasJson = null ;
    var senderOrderList = [] ;

    //发送卡初始X值
    var XInitSender = 200;

    //发送卡初始Y值-Y轴上单个偏移差值为300一个单位（向下-300）
    var YInitSender = 1000;

    //网口初始X值-X轴上单个偏移差值为60一个单位(向右+60)
    var XInitPort = 290;
    //网口初始Y值-Y轴上单个偏移差值为70一个单位（向下-70）
    var YInitPort = 1000;
    //网口最大总数量
    var MaxPort = 16;

    //X轴上单个偏移差值为60一个单位(向右+60)----屏体（同网口）
    var XInit = [560,600,640,680,720,760,800,840];
    //Y轴上单个偏移差值为140一个单位(向下-140)----屏体
    var YInit = [960,890,820,750,680,610,540,470];
    //矢量图形组
     nodes = [{
        x: 0,
        y: 600,
        nodeName: '控制卡',
        name: '控制卡',
        type: '播放器',
        svgPath: 'M885.76 919.552H116.736C53.248 919.552 1.024 867.328 1.024 803.84V284.672c0-63.488 52.224-115.712 115.712-115.712h769.024c63.488 0 115.712 52.224 115.712 115.712v519.168c0 63.488-52.224 115.712-115.712 115.712zM116.736 226.304c-31.744 0-58.368 25.6-58.368 58.368v519.168c0 31.744 25.6 58.368 58.368 58.368h769.024c31.744 0 58.368-25.6 58.368-58.368V284.672c0-31.744-25.6-58.368-58.368-58.368H116.736z M432.128 740.352c-15.36 0-30.72-4.096-44.032-12.288-25.6-15.36-40.96-43.008-40.96-72.704V458.752c0-30.72 15.36-57.344 40.96-72.704s57.344-16.384 83.968-2.048L658.432 481.28c27.648 14.336 46.08 44.032 46.08 75.776 0 31.744-17.408 60.416-46.08 75.776l-185.344 98.304c-13.312 6.144-26.624 9.216-40.96 9.216z m1.024-279.552v191.488l182.272-96.256L433.152 460.8z m184.32 97.28l20.48-37.888-20.48 37.888z',
        symbolSize: 70,

    },
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
            //发送卡初始X值
            var XInitSender = 200;

            //发送卡初始Y值
            var YInitSender = 830;

            //网口初始X值-X轴上单个偏移差值为60一个单位(向右+60)
            var XInitPort = 250;
            //网口初始Y值-Y轴上单个偏移差值为70一个单位（向下-70）
            var YInitPort = 910;
            //网口最大总数量
            var MaxPort = 16;

            //X轴上单个偏移差值为60一个单位(向右+70)----屏体（同网口）
            var XInit = [460,530,600,670,740,810,880,950,1020,1090,1160,1230,1300,1370,1440,1510];
            //Y轴上单个偏移差值为140一个单位(向下-120)----屏体
            var YInit = [870,750,630,510,390,270,150,30,-90,-210,-330,-450,-570,-690,-810,-930];

            //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
            var curWwwPath = window.document.location.href;
            //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            //获取主机地址，如： http://localhost:8083
            var localhostPaht = curWwwPath.substring(0, pos);
            //获取带"/"的项目名，如：/uimcardprj
            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

            //矢量图形组
            var nodes = [{
                x: 0,
                y: 530,
                nodeName: '控制卡',
                name: '控制卡',
                type: '播放器',
                detail:"OK",
                // svgPath: 'M868.48 104.96H155.52a32 32 0 0 0-32 32v538.24a32 32 0 0 0 32 32h712.96a32 32 0 0 0 32-32V136.96a32 32 0 0 0-32-32z m-32 64V390.4H187.52V168.96zM187.52 643.2V422.4h648.96v221.44z M252.8 232.96h32v74.88h-32zM334.72 232.96h32v74.88h-32zM252.8 502.4h32v74.88h-32zM334.72 502.4h32v74.88h-32zM868.48 853.12H600.96a94.72 94.72 0 0 0-56.96-56.96v-53.76h-64v53.76a94.72 94.72 0 0 0-56.96 56.96H155.52a32 32 0 1 0 0 64h267.52a94.08 94.08 0 0 0 177.92 0h267.52a32 32 0 0 0 0-64zM512 915.84a30.72 30.72 0 1 1 30.72-30.72 30.72 30.72 0 0 1-30.72 30.72z',
                svgPath:'image://'+localhostPaht+'/images/player.png',
                symbolSize: 100,

            }
            ]
            //连接线数组
            var links = [];
            //走线方式数组
            var portGroup = [];

            let _self = data;

            //请求后台参数
            for(var i = 0;i< _self.COMLIST.length;i++){
                //获取屏幕对象
                ledParasJson = _self.COMLIST[i].LEDPARAS;
                //外围参数拓展显示
                // console.log(ledParasJson);
                //通用接收卡对象
                var recParas = ledParasJson.COMMON_RECPARAS;
                //通用模组对象
                var modParas = ledParasJson.COMMON_MODPARAS;
                if(typeof (modParas.MOD_RSLT) == "undefined" ){
                    $('#MOD_RSL').text("未检测到");
                }else{
                    $('#MOD_RSL').text(modParas.MOD_RSLT);
                }

                if(typeof (modParas.MOD_SPACE) == "undefined" ){
                    $('#MOD_SPACE').text("未检测到");
                }else{
                    $('#MOD_SPACE').text(modParas.MOD_SPACE+"MM");
                }

                if(typeof (modParas.SCAN_NUM) == "undefined" ){
                    $('#MOD_SCAN_NUM').text("未检测到");
                }else{
                    $('#MOD_SCAN_NUM').text(modParas.SCAN_NUM+"SCAN");
                }

                //接收卡名称
                if(typeof (recParas.REC_TYPE) == "undefined" ){
                    $('#rec_Type').text("暂无数据");
                }else{
                    $('#rec_Type').text(recParas.REC_TYPE);
                }

                if(typeof (recParas.BOX_NAME) == "undefined" ){
                    $('#productTitle').text("未检测到");
                }else{
                    //箱体类型
                    $('#productTitle').text(recParas.BOX_NAME);
                }

                if(typeof (recParas.MOD_ORDER) == "undefined" ){
                    $('#MOD_ORDER').text("未检测到");
                }else{
                    //模组个数
                    $('#MOD_ORDER').text(recParas.MOD_ORDER);
                }

                if(typeof (modParas.MOD_SIZE) == "undefined" ){
                    $('#REC_Carrying_Area').text("未检测到");
                }else{
                    //接收卡带载面积计算：
                    var Mod_Area_Group = modParas.MOD_SIZE.split("*");
                    for(var s = 0;s<Mod_Area_Group.length;s++){
                        Mod_Area_Group[s] = Mod_Area_Group[s].replace(/[^0-9]/ig,"");
                    }
                    //接收卡带载面积：
                    $('#REC_Carrying_Area').text(parseInt((Mod_Area_Group[0]*Mod_Area_Group[1]*recParas.MODULE_CNT)/10000)+"mm²");
                }

                // if(typeof (modParas.ICSYLE) == "undefined" ){
                //     $('#ICSYLE').text("未检测到");
                // }else{
                //     //驱动IC
                //     $('#ICSYLE').text(modParas.ICSYLE);
                // }
                //判断发送卡列表是否存在
                if(typeof (ledParasJson.SENDER_ORDER) == "undefined"){
                    continue;
                }

                //发送卡数组
                senderOrderList = ledParasJson.SENDER_ORDER;

                //丢弃发送卡的值
                let abandon = 0;
                //遍历发送卡列表可知发送卡数量
                for(let i = 0;i<senderOrderList.length;i++){

                    //判断网口列表是否存在
                    if(typeof (senderOrderList[i].PORT_ORDER) == "undefined"){
                        abandon++;
                        continue;
                    }
                    //实际坐标的值
                    senderSum = i - abandon;


                    //判断发送卡连接是否有问题----有时候发送卡断电显示
                    let senderConnecting = true;

                    //该发送卡箱体总数
                    let totalBox = 0;

                    //箱体故障总数
                    let fault_num = 0;

                    //当前发送卡信息
                    var senderOrder = senderOrderList[i];
                    //接收卡版本号
                    if(senderOrder.VER === '' ||senderOrder.VER == null){
                        $('#REC_VER').text("暂无数据");
                    }else{
                        $('#REC_VER').text(senderOrder.VER);
                    }
                    if(typeof (senderOrder.ID) === "undefined"){
                        senderOrder.ID = senderOrder.IPADDR;
                    }
                    //发送卡信息
                    var sender ={
                        x: XInitSender,
                        y: YInitSender-senderSum*300,
                        symbolSize: [80,50],
                        nodeName: senderOrder.ID,
                        name: senderOrder.ID,
                        type: '发送卡',
                        detail:'ok',
                        // svgPath: 'M 0 265.6 v 448 h 192 v 64 h 128 v -64 h 384 v 64 h 128 v -64 h 192 v -448 H 0 Z m 960 384 H 64 v -320 h 896 v 320 Z m -64 -256 h -256 v 192 h 256 v -192 Z m -64 128 h -128 v -64 h 128 v 64 Z m -640 -64 H 128 v -64 h 64 v 64 Z m 128 0 H 256 v -64 h 64 v 64 Z m 128 0 h -64 v -64 h 64 v 64 Z m -256 128 H 128 v -64 h 64 v 64 Z m 128 0 H 256 v -64 h 64 v 64 Z m 128 0 h -64 v -64 h 64 v 64 Z m 128 -128 h -64 v -64 h 64 v 64 Z m 0 128 h -64 v -64 h 64 v 64 Z'
                        svgPath:'image://'+localhostPaht+'/images/senderReal.png'
                    }
                    //矢量图形新增
                    nodes.push(sender);
                    //获取走线端口数量
                    var portNum = senderOrder.PORT_ORDER.length;

                    //已用网口的数组
                    let usePort = [];

                    /**
                     * 排序网口
                     * */
                    for(let wai = 0;wai < portNum -1;wai++){
                        for(let fool = 0;fool < portNum-1 - wai;fool++){
                            let nowId = parseInt(senderOrder.PORT_ORDER[fool].ID.substring(1));
                            let nextId = parseInt(senderOrder.PORT_ORDER[fool+1].ID.substring(1));
                            if(nowId > nextId){
                                let temp = senderOrder.PORT_ORDER[fool];
                                senderOrder.PORT_ORDER[fool] = senderOrder.PORT_ORDER[fool+1];
                                senderOrder.PORT_ORDER[fool+1] = temp;
                            }
                        }
                    }

                    //遍历走线接口
                    for(var j = 0;j<portNum;j++){

                        //走线详情信息
                        var port = senderOrder.PORT_ORDER[j];


                        //遍历端口显示----默认发送卡有16个端口
                        for(let initPort = 1;initPort < 17;initPort++){
                            let portName = "P"+initPort;
                            //已使用网口
                            if(portName === port.ID){
                                //新增网线+发送卡归属关系
                                var hiddenLine = {
                                    source: senderOrder.ID,
                                    target: port.ID+senderOrder.ID,
                                    name: '连通',
                                    type: 0,
                                    nodeName: '主网线'
                                }
                                links.push(hiddenLine);
                                let singlePort = null;
                                //判断索引是否能够取余4来判断在当前X轴的Y位置
                                if((initPort)%4 === 0){
                                    //当前port对象
                                    singlePort = {
                                        //X轴上单个偏移差值为60一个单位(向右+60)
                                        x: XInitPort+parseInt((initPort)/4-1)*42,
                                        //Y轴上单个偏移差值为70一个单位（向下-70）
                                        y: YInitPort-3*50-senderSum*300,
                                        symbolSize: 20,
                                        nodeName: port.ID,
                                        name: port.ID+senderOrder.ID,
                                        type: '网口',
                                        detail:null,
                                        svgPath: 'path://M509.92 176C325.504 176 176 325.504 176 509.92c0 184.416 149.504 333.92 333.92 333.92 184.416 0 333.92-149.504 333.92-333.92C843.84 325.504 694.32 176 509.92 176z m0 48c157.904 0 285.92 128 285.92 285.92 0 157.904-128.016 285.92-285.92 285.92C352 795.84 224 667.808 224 509.92 224 352 352 224 509.92 224z m0 96C405.024 320 320 405.024 320 509.92c0 104.88 85.024 189.92 189.92 189.92 104.88 0 189.92-85.04 189.92-189.92 0-104.896-85.04-189.92-189.92-189.92z',
                                    };
                                    //走线方式数组添加
                                }else{
                                    singlePort = {
                                        //X轴上单个偏移差值为60一个单位(向右+60)
                                        x: XInitPort+parseInt((initPort)/4)*42,
                                        //Y轴上单个偏移差值为70一个单位（向下-70）
                                        y: YInitPort-(initPort-1)%4*50-senderSum*300,
                                        symbolSize: 20,
                                        nodeName: port.ID,
                                        name: port.ID+senderOrder.ID,
                                        type: '网口',
                                        detail:null,
                                        svgPath: 'path://M509.92 176C325.504 176 176 325.504 176 509.92c0 184.416 149.504 333.92 333.92 333.92 184.416 0 333.92-149.504 333.92-333.92C843.84 325.504 694.32 176 509.92 176z m0 48c157.904 0 285.92 128 285.92 285.92 0 157.904-128.016 285.92-285.92 285.92C352 795.84 224 667.808 224 509.92 224 352 352 224 509.92 224z m0 96C405.024 320 320 405.024 320 509.92c0 104.88 85.024 189.92 189.92 189.92 104.88 0 189.92-85.04 189.92-189.92 0-104.896-85.04-189.92-189.92-189.92z',
                                    };
                                }
                                nodes.push(singlePort);
                                usePort.push(portName);
                            }

                        }


                        /**
                         * 筛选箱体--重组箱体模型--将Box.order = 1按顺序往下排
                         *
                         * */
                        //外层循环，控制趟数，每一次找到一个最大值
                        for (let i = 0; i < port.BOX.length - 1; i++) {
                            // 内层循环,控制比较的次数，并且判断两个数的大小
                            for (let j = 0; j < port.BOX.length - 1 - i; j++) {
                                let ops = parseInt(port.BOX[j].ORDER);
                                let rit = parseInt(port.BOX[j+1].ORDER);
                                // 如果前面的数大，放到后面(当然是从小到大的冒泡排序)
                                if (ops > rit) {
                                    let temp = port.BOX[j];
                                    port.BOX[j] = port.BOX[j + 1];
                                    port.BOX[j + 1] = temp;
                                }
                            }

                        }
                        //遍历单个走线口的箱体信息
                        totalBox = totalBox + port.BOX.length;
                        for(var boxindex = 0;boxindex < port.BOX.length;boxindex++){

                            var box = port.BOX[boxindex];

                            //新增归属关系
                            var hiddenLine = {
                                source: senderOrder.ID,
                                target: senderOrder.ID+box.ID+boxindex,
                                name: '连通',
                                type: 0,
                                nodeName: '主网线'
                            }
                            links.push(hiddenLine);

                            //判断箱体顺序是否为1能和端口直连
                            if(box.ORDER === '1'){
                                var box_State;
                                //判断箱体状态
                                if(box.BOX_STATE === '1'){
                                    box_State = "连通"
                                }else if(box.BOX_STATE === '2'){
                                    box_State = "警告"
                                }else if(box.BOX_STATE === '3'){
                                    box_State = "报警"
                                    fault_num++
                                }else{
                                    box_State = "无法检测"
                                    fault_num++
                                }
                                var portBox = {
                                    source: port.ID+senderOrder.ID,
                                    target: senderOrder.ID+box.ID+boxindex,
                                    name: box_State,
                                    type: '网线',
                                    nodeName: '网线'
                                }
                                //端口连接线新增
                                links.push(portBox);
                            }

                            //新增归属关系
                            var hiddenLineForPort = {
                                source: port.ID+senderOrder.ID,
                                target: senderOrder.ID+box.ID+boxindex,
                                name: '连通',
                                type: 0,
                                nodeName: '主网线'
                            }
                            links.push(hiddenLineForPort);
                            //判断小于最后一个箱体之间的相互串联
                            if(box.ORDER < port.BOX.length){
                                var boxNext = port.BOX[boxindex+1]
                                //当下个箱体为空时不执行
                                if(boxindex+1 < port.BOX.length){
                                    var box_State;
                                    //判断箱体状态
                                    if(boxNext.BOX_STATE === '1'){
                                        box_State = "连通"
                                    }else if(boxNext.BOX_STATE === '2'){
                                        box_State = "警告"
                                    }else if(boxNext.BOX_STATE === '3'){
                                        box_State = "报警"
                                        fault_num++
                                    }else{
                                        box_State = "无法检测"
                                        fault_num++
                                    }
                                    var portBox = {
                                        source: senderOrder.ID+box.ID+boxindex,
                                        target: senderOrder.ID+boxNext.ID+(boxindex+1),
                                        name: box_State,
                                        type: '串联',
                                        nodeName: '串联'
                                    }
                                    links.push(portBox);
                                }
                            }
                            if(box.REC.length > 1){
                                //单个箱体的信息
                                var singleBox = {
                                    x: XInit[box.XPOS-1],
                                    y: YInit[box.YPOS-1],
                                    symbolSize: 70,
                                    nodeName: "箱体"+box.XPOS+"-"+box.YPOS,
                                    name: senderOrder.ID+box.ID+boxindex,
                                    type: '箱体',
                                    detail:box,
                                    svgPath: 'M17.212952 1022.634667h505.856V8.582095H17.212952v1014.052572zM647.070476 8.582095v1014.052572h505.807238V8.582095H647.070476z m418.279619 926.476191h-330.752V96.207238h333.190095v838.948572h-2.438095z'
                                }
                                nodes.push(singleBox);
                            }else{
                                //单个箱体的信息
                                var singleBox = {
                                    x: XInit[box.XPOS-1],
                                    y: YInit[box.YPOS-1],
                                    symbolSize: 70,
                                    nodeName: "箱体"+box.XPOS+"-"+box.YPOS,
                                    name: senderOrder.ID+box.ID+boxindex,
                                    type: '箱体',
                                    detail:box,
                                    svgPath: 'M651.636364 1024V558.545455h558.545454v465.454545z '
                                }
                                nodes.push(singleBox);
                            }
                        }

                    }


                    //遍历未连接的端口显示----默认发送卡有16个端口
                    for(var unPortNumIndex = 1;unPortNumIndex < 17;unPortNumIndex++){
                        let portName = "P"+unPortNumIndex;

                        if($.inArray(portName,usePort) === -1){
                            //新增归属关系
                            var hiddenLine = {
                                source: senderOrder.ID,
                                target: portName+senderOrder.ID,
                                name: '连通',
                                type: 0,
                                nodeName: '主网线'
                            }
                            links.push(hiddenLine);
                            //判断索引是否能够取余4来判断在当前X轴的Y位置
                            if((unPortNumIndex)%4 === 0){
                                //当前port对象
                                var singlePort = {
                                    //X轴上单个偏移差值为60一个单位(向右+60)
                                    x: XInitPort+parseInt((unPortNumIndex)/4-1)*42,
                                    //Y轴上单个偏移差值为70一个单位（向下-70）
                                    y: YInitPort-3*50-senderSum*300,
                                    symbolSize: 20,
                                    nodeName: "P"+unPortNumIndex,
                                    name: portName+senderOrder.ID,
                                    type: '未连接网口',
                                    detail:null,
                                    svgPath: 'M509.92 176C325.504 176 176 325.504 176 509.92c0 184.416 149.504 333.92 333.92 333.92 184.416 0 333.92-149.504 333.92-333.92C843.84 325.504 694.32 176 509.92 176z m0 48c157.904 0 285.92 128 285.92 285.92 0 157.904-128.016 285.92-285.92 285.92C352 795.84 224 667.808 224 509.92 224 352 352 224 509.92 224z m0 96C405.024 320 320 405.024 320 509.92c0 104.88 85.024 189.92 189.92 189.92 104.88 0 189.92-85.04 189.92-189.92 0-104.896-85.04-189.92-189.92-189.92z',
                                };
                                //走线方式数组添加
                                nodes.push(singlePort);
                            }else{
                                var singlePort = {
                                    //X轴上单个偏移差值为60一个单位(向右+60)
                                    x: XInitPort+parseInt((unPortNumIndex)/4)*42,
                                    //Y轴上单个偏移差值为70一个单位（向下-70）
                                    y: YInitPort-(unPortNumIndex-1)%4*50-senderSum*300,
                                    symbolSize: 20,
                                    nodeName: "P"+unPortNumIndex,
                                    name: portName+senderOrder.ID,
                                    type: '未连接网口',
                                    detail:null,
                                    svgPath: 'M509.92 176C325.504 176 176 325.504 176 509.92c0 184.416 149.504 333.92 333.92 333.92 184.416 0 333.92-149.504 333.92-333.92C843.84 325.504 694.32 176 509.92 176z m0 48c157.904 0 285.92 128 285.92 285.92 0 157.904-128.016 285.92-285.92 285.92C352 795.84 224 667.808 224 509.92 224 352 352 224 509.92 224z m0 96C405.024 320 320 405.024 320 509.92c0 104.88 85.024 189.92 189.92 189.92 104.88 0 189.92-85.04 189.92-189.92 0-104.896-85.04-189.92-189.92-189.92z',
                                };
                                //走线方式数组添加
                                nodes.push(singlePort);

                            }
                        }
                    }

                    if(totalBox === fault_num){
                        senderConnecting = false
                    }


                    if(senderConnecting === true){
                        //新增拓扑连接线
                        var lineSender = {
                            source: '控制卡',
                            target: senderOrder.ID,
                            name: '连通',
                            type: '网线',
                            nodeName: '主网线'
                        }
                        //连接线新增
                        links.push(lineSender);
                    }else{
                        //新增拓扑连接线
                        var lineSender = {
                            source: '控制卡',
                            target: senderOrder.ID,
                            name: '无法检测',
                            type: '网线',
                            nodeName: '主网线'
                        }
                        //连接线新增
                        links.push(lineSender);
                    }
                }

            }

            // data = jQuery.parseJSON(data);
            // dataType指明了返回数据为json类型，故不需要再反序列化

            //判断更新发送卡字段是否为空
            if(typeof (senderstatuslist)!="undefined"){
                //遍历该数组的发送卡
                for(var senderListIndex = 0;senderListIndex < senderstatuslist.length;senderListIndex++){
                    //判断发送卡的状态是否离线
                    if(senderstatuslist[senderListIndex].status != "1"){
                        for (var i = 0; i < nodes.length; i++) {
                            if(nodes[i].type === '发送卡'){
                                if(nodes[i].nodeName === senderstatuslist[senderListIndex].senderId){
                                    nodes[i].detail = 'uncheck'
                                }
                            }
                        }
                        for(var s = 0;s < links.length;s++){
                            if(links[s].target === senderstatuslist[senderListIndex].senderId){
                                links[s]. name = "无法检测";
                            }
                            //当原设备是有问题发送卡
                            if(links[s].source === senderstatuslist[senderListIndex].senderId){

                                for(var ok = 0;ok < links.length;ok++){
                                    //有问题网口
                                    if(links[s].target === links[ok].source){
                                        links[ok]. name = "无法检测";
                                        //有问题的直连屏体
                                        for(var rts = 0;rts < links.length;rts++){
                                            if(links[ok].target === links[rts].source){
                                                links[rts]. name = "无法检测";
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }

            //拓扑图形实现
            var charts = {
                //拓扑模块
                nodes: [],
                //目标连接线
                links: [],
                //连通线
                linesData: [],
                //无法检测线
                unchecklinesData:[],
                //警告线
                warninglinesData:[],
                //故障线
                faultlinesData:[]
            }


            var dataMap = new Map();
            //遍历SVG图形
            for (var j = 0; j < nodes.length; j++) {
                const {
                    x,
                    y,
                    nodeName,
                    name,
                    type,
                    detail,
                    svgPath,
                    symbolSize
                } = nodes[j];
                if(type == '箱体'){
                    var BoxColor ;
                    var BoxEmColor ;
                    //判断箱体状态
                    if(detail == 'uncheck'){
                        BoxColor = '#595857'
                        BoxEmColor = '#e9e4d4'
                    }else if(detail.BOX_STATE === '1'){
                        BoxColor = '#b1cfff'
                        BoxEmColor = '#b1cfff'
                    }else if(detail.BOX_STATE === '2'){
                        BoxColor = 'orange'
                        BoxEmColor = '#ffec47'
                    }else if(detail.BOX_STATE === '3'){
                        BoxColor = '#a73836'
                        BoxEmColor = '#b94047'
                    }else{
                        BoxColor = '#595857'
                        BoxEmColor = '#e9e4d4'
                    }
                    var node = {
                        nodeName,
                        name,
                        type,
                        detail,
                        value: [x, y],
                        symbolSize: symbolSize || 50,
                        symbol: 'path://' + svgPath,
                        label:{
                            position: ['9%', '42%'],
                            fontSize:20
                        },
                        itemStyle: {
                            borderColor: '#5d9bff',
                            borderWidth: 3,
                            color: BoxColor,
                            emphasis: {
                                color: BoxEmColor
                            },
                        }
                    }
                    dataMap.set(nodes[j].name, [x, y])
                    charts.nodes.push(node)
                }else if(type == '未连接网口'){
                    var node = {
                        nodeName,
                        name,
                        type,
                        detail,
                        value: [x, y],
                        symbolSize: symbolSize || 50,
                        symbol: 'path://' + svgPath,
                        itemStyle: {
                            color: '#75878a',
                            emphasis: {
                                color: '#808080'
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
                        detail,
                        value: [x, y],
                        symbolSize: symbolSize || 50,
                        symbol:  svgPath,
                        itemStyle: {
                            color: '#468efd',
                            emphasis: {
                                color: '#7ca9ee'
                            },
                        }
                    }
                    dataMap.set(nodes[j].name, [x, y])
                    charts.nodes.push(node)
                }
            }
            //判断网口的索引是否大于4
            var sopindex = 1;
            let thisPort = null;
            //遍历目标连接线
            for (var i = 0; i < links.length; i++) {
                var link;
                if(links[i].type == 0){
                    link = {
                        source: links[i].source,
                        target: links[i].target,
                        type: '',
                        nodeName: '',
                        label: {
                            show:false
                        },
                        lineStyle :{
                            width: 0, // 线宽是0
                            color: 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
                        },
                    }
                    charts.links.push(link);
                }else{

                    var lineColor ;
                    var lines;
                    // 组装动态移动的效果数据
                    //拐角线的重组
                    if(links[i].nodeName == "网线"){
                        var SourceX = dataMap.get(links[i].source)[0];
                        var SourceY = dataMap.get(links[i].source)[1];
                        var TategerX = dataMap.get(links[i].target)[0];
                        //当目标Y值小于YInit[4]，该屏体已经在第五组
                        var TategerY = dataMap.get(links[i].target)[1];
                        //第一个点--在网口出来的位置
                        var Source0;
                        //第二个点--在网口上方的位置
                        var Source ;
                        //第三个点--在屏体上方的位置
                        var Target;
                        //当源坐标Y坐标等于第一行时
                        if (SourceY > YInitPort - 151) {
                            if(thisPort != "ONE"){
                                thisPort = "ONE";
                                sopindex = 1;
                            }
                            //当目标Y坐标小于Y轴第三个屏体的Y坐标
                            if(TategerY === YInit[2] || TategerY === YInit[1] ||TategerY === YInit[3]){
                                Source0 = [SourceX+sopindex*7,SourceY]
                                Source = [SourceX+sopindex*7,TategerY-sopindex*20-65]
                                Target = [TategerX,TategerY-sopindex*20-65]
                            }
                            //当目标Y坐标等于Y轴第五个屏体的Y坐标
                            else if(TategerY === YInit[4]){
                                Source0 = [SourceX+(4-sopindex)*4+12,SourceY]
                                Source = [SourceX+(4-sopindex)*4+12,TategerY+40+sopindex*8]
                                Target = [TategerX,TategerY+40+sopindex*8]
                            }
                            //当目标Y坐标小于Y轴第六个屏体的Y坐标
                            else if(TategerY === YInit[5]){
                                Source0 = [SourceX+(4-sopindex)*4+12,SourceY]
                                Source = [SourceX+(4-sopindex)*4+12,SourceY-(4-sopindex)*44-348]
                                Target = [TategerX,SourceY-(4-sopindex)*44-348]
                                //当目标Y坐标小于Y轴第二个屏体的Y坐标
                            }else if(TategerY < YInit[6] && TategerY > YInit[7]){
                                Source0 = [SourceX+(4-sopindex)*7,SourceY]
                                Source = [SourceX+(4-sopindex)*7,SourceY-(4-sopindex)*44-888]
                                Target = [TategerX,SourceY-(4-sopindex)*44-888]
                            }else if(TategerY === YInit[7]){
                                Source0 = [SourceX+(4-sopindex)*7,SourceY]
                                Source = [SourceX+(4-sopindex)*7,TategerY-sopindex*10-50]
                                Target = [TategerX,TategerY-sopindex*10-50]
                            }else{
                                Source0 = [SourceX+sopindex*7,SourceY]
                                Source = [SourceX+sopindex*7,SourceY+sopindex*30+56]
                                Target = [TategerX,SourceY+sopindex*30+56]
                            }

                        }
                        //数据处于第二行发送卡
                        else if (SourceY < YInitPort - 299 && SourceY > YInitPort - 451) {
                            if(thisPort != "TWO"){
                                thisPort = "TWO";
                                sopindex = 1;
                            }
                            //当目标Y坐标小于Y轴第三个屏体的Y坐标
                            if (TategerY < YInit[2] && TategerY > YInit[4]) {
                                Source0 = [SourceX + sopindex * 7, SourceY]
                                Source = [SourceX + sopindex * 7, TategerY - sopindex * 20 - 65]
                                Target = [TategerX, TategerY - sopindex * 20 - 65]
                            }
                            //当目标Y坐标小于Y轴第四个屏体的Y坐标
                            else if (TategerY < YInit[3]) {
                                Source0 = [SourceX + sopindex * 7, SourceY]
                                Source = [SourceX - sopindex * 21, SourceY - sopindex * 20 + 88]
                                Target = [TategerX, SourceY - sopindex * 20 + 88]
                            }
                            //当目标Y坐标大于Y轴第二个屏体的Y坐标
                            else if(TategerY === YInit[0]){
                                Source0 = [SourceX+sopindex*7+4,SourceY]
                                Source = [SourceX+sopindex*7+4,SourceY-(4-sopindex)*38+535]
                                Target = [TategerX,SourceY-(4-sopindex)*38+535]
                            }else {
                                Source0 = [SourceX + sopindex * 7, SourceY]
                                Source = [SourceX + sopindex * 7, SourceY + sopindex * 20 + 46]
                                Target = [TategerX, SourceY + sopindex * 20 + 46]
                            }
                        } else {
                            if(thisPort != "THIRD"){
                                thisPort = "THIRD";
                                sopindex = 1;
                            }
                            Source0 = [SourceX + sopindex * 7, SourceY]
                            Source = [SourceX + sopindex * 7, TategerY + sopindex * 20 + 46]
                            Target = [TategerX, TategerY + sopindex * 20 + 46]
                        }
                        lines = {
                            coords:[
                                dataMap.get(links[i].source),
                                Source0,
                                Source,
                                Target,
                                dataMap.get(links[i].target)
                            ],
                            type: links[i].type,
                            nodeName: links[i].nodeName,
                        };
                        sopindex++;
                        if(sopindex>4){
                            sopindex = 1;
                        }
                    }else if(links[i].nodeName == "主网线"){
                        var SourceX = dataMap.get(links[i].source)[0];
                        var SourceY = dataMap.get(links[i].source)[1];
                        var TategerX = dataMap.get(links[i].target)[0];
                        var TategerY = dataMap.get(links[i].target)[1];

                        if(SourceY == TategerY){
                            lines = {
                                coords:[
                                    dataMap.get(links[i].source),
                                    dataMap.get(links[i].target)
                                ],
                                type: links[i].type,
                                nodeName: links[i].nodeName,
                            };
                        }else{
                            var center = [SourceX,TategerY];
                            lines = {
                                coords:[
                                    dataMap.get(links[i].source),
                                    center,
                                    dataMap.get(links[i].target)
                                ],
                                type: links[i].type,
                                nodeName: links[i].nodeName,
                            };
                        }

                    } else{
                        lines = {
                            coords:[
                                dataMap.get(links[i].source),
                                dataMap.get(links[i].target)
                            ],
                            type: links[i].type,
                            nodeName: links[i].nodeName,
                        };
                    }

                    if(links[i].name === '连通'){
                        charts.linesData.push(lines);
                        lineColor = '#7CFC00';
                    }else if(links[i].name === '警告'){
                        charts.warninglinesData.push(lines);
                        lineColor = '#FFFF00';
                    }else if(links[i].name === '报警'){
                        charts.faultlinesData.push(lines);
                        lineColor = '#FF0000';
                    }else{
                        charts.unchecklinesData.push(lines);
                        lineColor = '#a1afc9';
                    }
                    var lineSize = 2;
                    if(links[i].type == '串联'){
                        lineSize = 6;
                    }
                    link = {
                        source: links[i].source,
                        target: links[i].target,
                        type: links[i].type,
                        nodeName: links[i].nodeName,
                        label: {
                            normal:{
                                show:false,
                            },
                            emphasis:{
                                symbolSize:8,
                                fontSize:38,
                                color:'red',
                                show: true,
                                formatter: links[i].name
                            }
                        },
                        lineStyle:{
                            normal: {
                                width:lineSize,
                                curveness:0.15,
                                symbolSize:lineSize,
                                color: lineColor
                            },
                            emphasis:{
                                symbolSize:lineSize,
                                type: 'solid',
                                color: lineColor
                            }
                        },
                    }
                }
            }

            option = {
                legend: {
                    data:['连通','无法检测','警告','报警'],
                    icon: "circle",
                    textStyle: {
                        fontSize: 25,
                        fontWeight: "lighter"
                    }
                },
                //提示框显示
                tooltip: {
                    //显示延迟
                    showDelay: 100,
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
                        if(item.data.type == '箱体'){
                            var box_State;
                            let fontColor;
                            //判断箱体状态
                            if(item.data.detail == 'uncheck' ){
                                box_State = "无法检测"
                                fontColor = "color:#708090;"
                            }
                            else if(item.data.detail.BOX_STATE == '1'){
                                box_State = "连通"
                                fontColor = "color:green;"
                            }else if(item.data.detail.BOX_STATE == '2'){
                                box_State = "警告"
                                fontColor = "color:#FFFF00;"
                            }else if(item.data.detail.BOX_STATE == '3'){
                                box_State = "报警"
                                fontColor = "color:#8B0000;"
                            }else{
                                box_State = "无法检测"
                                fontColor = "color:#708090;"
                            }
                            return '设备类型:<b style="color: green;">&nbsp;&nbsp;' + item.data.type + '</b><hr />' +
                                '设备ID:<b style="color: green;">&nbsp;&nbsp;' + item.data.nodeName + '</b><hr />' +
                                '箱体坐标(X-Y)：<b style="color: green;">' +item.data.detail.XPOS+'-'+item.data.detail.YPOS +'</b><hr />' +
                                '工作状态：<b style="'+fontColor+'">'+box_State+'</b><hr />';
                        }else if(item.data.type == '串联'){
                            return '';
                        }
                        else{
                            return '设备类型:<b style="color: green;">&nbsp;&nbsp;' + item.data.type + '</b><hr />' +
                                '设备ID:<b style="color: green;">&nbsp;&nbsp;' + item.data.nodeName + '</b><hr />' ;
                        }
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
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    label: {
                        show: true,
                        position: 'bottom',
                        color: '#ffffff',
                        formatter: function (item) {
                            return item.data.nodeName
                        }
                    },
                    data: charts.nodes,
                    links: charts.links
                },
                  //连通效果
                {
                        name:'连通',
                        type: 'lines',
                        zlevel: 2,
                        step: "start",
                        polyline: true,
                        coordinateSystem: 'cartesian2d',
                        effect: {
                            //移动速率
                            period: 6,
                            show: true,
                            trailLength: 0.1,
                            symbol: 'arrow',
                            color: '#0c8918',
                            symbolSize: 10
                        },
                            lineStyle: {
                                type: 'solid',
                                width: 2,
                                color: '#7CFC00',
                                curveness: 0.9

                            },
                        data: charts.linesData
                    },
                    //无法检测效果
                    {
                        name:'无法检测',
                        type: 'lines',
                        zlevel: 2,
                        step: "start",
                        polyline: true,
                        coordinateSystem: 'cartesian2d',
                        effect: {
                            period: 20,
                            show: true,
                            trailLength: 0.1,
                            symbol: 'path://M547.4 512l278.2-278.2c9.8-9.8 9.8-25.6 0-35.4-9.8-9.8-25.6-9.8-35.4 0L512 476.6 233.8 198.4c-9.8-9.8-25.6-9.8-35.4 0-9.8 9.8-9.8 25.6 0 35.4L476.6 512 198.4 790.2c-9.8 9.8-9.8 25.6 0 35.4 4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3L512 547.4l278.2 278.2c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3c9.8-9.8 9.8-25.6 0-35.4L547.4 512z',
                            color: 'red',
                            symbolSize: 20
                        },
                        lineStyle: {
                            type: 'solid',
                            width: 2,
                            color: '#595857',
                            curveness: 0.1

                        },
                        data: charts.unchecklinesData
                    },
                    //警告效果
                    {
                        name:'警告',
                        type: 'lines',
                        zlevel: 2,
                        step: "start",
                        polyline: true,
                        coordinateSystem: 'cartesian2d',
                        effect: {
                            period: 40,
                            show: true,
                            trailLength: 0.1,
                            symbol: 'path://M743.316211 54.649263l487.154526 797.157053A113.178947 113.178947 0 0 1 1133.891368 1024H159.528421A113.178947 113.178947 0 0 1 63.056842 851.806316l487.208421-797.103158A113.178947 113.178947 0 0 1 737.28 45.810526l6.036211 8.838737z m395.15621 853.369263l-487.154526-797.103158-0.754527-1.077894-1.024-0.754527a5.389474 5.389474 0 0 0-7.383579 1.778527l-487.154526 797.103158a5.389474 5.389474 0 0 0 4.581053 8.245894H1133.945263a5.389474 5.389474 0 0 0 4.581053-8.192z M646.736842 323.368421a75.290947 75.290947 0 0 1 75.075369 80.626526l-17.354106 242.903579a57.882947 57.882947 0 0 1-115.442526 0l-17.354105-242.903579A75.290947 75.290947 0 0 1 646.736842 323.368421z M646.736842 808.421053m-53.894737 0a53.894737 53.894737 0 1 0 107.789474 0 53.894737 53.894737 0 1 0-107.789474 0Z',
                            color: '#faff72',
                            symbolSize: 40
                        },
                        lineStyle: {
                            type: 'solid',
                            width: 2,
                            color: 'orange',
                            curveness: 0.1

                        },
                        data: charts.warninglinesData
                    },
                    //报警效果
                    {
                        name:'报警',
                        type: 'lines',
                        zlevel: 2,
                        step: "start",
                        polyline: true,
                        coordinateSystem: 'cartesian2d',
                        effect: {
                            period: 60,
                            show: true,
                            trailLength: 0.1,
                            symbol: 'arrow',
                            color: 'red',
                            symbolSize: 10
                        },
                        lineStyle: {
                            type: 'solid',
                            width: 2,
                            color: '#a73836',
                            curveness: 0.1

                        },
                        data: charts.faultlinesData
                    },
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // 处理点击事件并且弹出数据名称-params传入的参数
            myChart.on('click', function (params) {
                if(params.data.type === '箱体'){
                    //箱体参数赋值
                    var detail = params.data.detail;
                    info_title = detail;
                    //维修日志赋值

                    if(typeof (detail.REC) != "undefined" && detail.REC.length > 0){
                        //接收卡信息
                        var rec = info_title.REC[0];
                        // console.log(rec);
                        //传感器赋值
                        if(typeof (rec.SENSOR_VOL) == "undefined" ){
                            $('#SENSOR_VOL').text("暂无数据");
                        }else{
                            let sensorVol = parseFloat(rec.SENSOR_VOL);
                            //警告
                            if(sensorVol>3.6 && sensorVol <4.0){
                                $("#SENSOR_VOL").removeAttr("style");
                                $('#SENSOR_VOL').attr('style','color:#FFD700;');
                                $('#SENSOR_VOL').text(rec.SENSOR_VOL+"V电压警告");
                                //警告
                            }else if(sensorVol>5.5 && sensorVol <6.0){
                                $("#SENSOR_VOL").removeAttr("style");
                                $('#SENSOR_VOL').attr('style','color:#FFD700;');
                                $('#SENSOR_VOL').text(rec.SENSOR_VOL+"V电压警告");
                                //报警
                            }else if(sensorVol < 3.6){
                                $("#SENSOR_VOL").removeAttr("style");
                                $('#SENSOR_VOL').attr('style','color:#DC143C;');
                                $('#SENSOR_VOL').text(rec.SENSOR_VOL+"V电压报警");
                                //报警
                            }else if(sensorVol > 6.0){
                                $("#SENSOR_VOL").removeAttr("style");
                                $('#SENSOR_VOL').attr('style','color:#DC143C;');
                                $('#SENSOR_VOL').text(rec.SENSOR_VOL+"V电压报警");
                            }else{
                                $("#SENSOR_VOL").removeAttr("style");
                                $('#SENSOR_VOL').attr('style','color:#E9E7E7;')
                                $('#SENSOR_VOL').text(rec.SENSOR_VOL+"V");
                            }
                        }
                        if(typeof (rec.SENSOR_CURRENT) == "undefined" ){
                            $('#SENSOR_CURRENT').text("暂无数据");
                        }else{
                            $('#SENSOR_CURRENT').text(rec.SENSOR_CURRENT+"A");
                        }
                        if(typeof (rec.SENSOR_HUMI) == "undefined" ){
                            $('#SENSOR_HUMI').text("暂无数据");
                        }else{
                            let sensorHumi = parseFloat(rec.SENSOR_HUMI);
                            //警告
                            if(sensorHumi>70.9 && sensorHumi <81.0){
                                $("#SENSOR_HUMI").removeAttr("style");
                                $('#SENSOR_HUMI').attr('style','color:#FFD700;');
                                //报警
                            }else if(sensorHumi > 80.9){
                                $("#SENSOR_HUMI").removeAttr("style");
                                $('#SENSOR_HUMI').attr('style','color:#DC143C;');
                            }else{
                                $("#SENSOR_HUMI").removeAttr("style");
                                $('#SENSOR_HUMI').attr('style','color:#E9E7E7;');
                            }
                            $('#SENSOR_HUMI').text(rec.SENSOR_HUMI+"%RH");
                        }
                        if(typeof (rec.SENSOR_TMP) == "undefined" ){
                            $('#SENSOR_TMP').text("暂无数据");
                        }else{
                            let sensorTmp = parseFloat(rec.SENSOR_TMP);
                            //警告
                            if(sensorTmp>60.9 && sensorTmp <80.0){
                                $("#SENSOR_TMP").removeAttr("style");
                                $('#SENSOR_TMP').attr('style','color:#FFD700;');
                                //报警
                            }else if(sensorTmp > 79.9){
                                $("#SENSOR_TMP").removeAttr("style");
                                $('#SENSOR_TMP').attr('style','color:#DC143C;');
                            }else{
                                $("#SENSOR_TMP").removeAttr("style");
                                $('#SENSOR_TMP').attr('style','color:#E9E7E7;');
                            }
                            $('#SENSOR_TMP').text(rec.SENSOR_TMP+"℃");
                        }
                        //接收卡版本号
                        if(typeof (rec.REC_VER) === "undefined"){
                            $('#REC_VER').text("暂无数据");
                        }else{
                            $('#REC_VER').text(rec.REC_VER);
                        }


                        clicked_Box_ModGroup = rec.MOD;
                        //模组信息赋值
                        //遍历模组
                        //通过遍历计算报警模组数量
                        var mod_Normal_count = 0;
                        for(let i = 0;i<rec.MOD.length;i++){

                            let sigleMod = rec.MOD[i];

                            let target  = null;
                            let pos = parseInt(sigleMod.POS);

                            switch (pos) {
                                case 1:
                                    target = "module1";
                                    break;
                                case 2:
                                    target = "module5";
                                    break;
                                case 3:
                                    target = "module2";
                                    break;
                                case 4:
                                    target = "module6";
                                    break;
                                case 5:
                                    target = "module3";
                                    break;
                                case  6:
                                    target = "module7";
                                    break;
                                case  7:
                                    target = "module4";
                                    break;
                                case  8:
                                    target = "module8";
                                    break;
                            }

                            if(typeof (sigleMod.ID) != "undefined"){
                                $('#MOD_ID').text(sigleMod.ID);
                            }else{
                                $('#MOD_ID').text("暂无数据");
                            }

                            //无法检测-灰色
                            if(rec.MOD[i].MOD_STATE === "0"){
                                $('.'+target).attr('style','background: rgba(169,169,169, .9);border-color:#696969;');
                                //正常
                            }else if(rec.MOD[i].MOD_STATE === "1"){
                                mod_Normal_count++;
                                $('.'+target).attr('style','background: rgba(173,255,47, 0);border-color:black;');
                                //警告-黄色
                            }else if(rec.MOD[i].MOD_STATE === "2"){
                                $('.'+target).attr('style','background: rgba(255,255,0, .5);border-color:#FFD700;');
                                //报警-红色
                            }else{
                                $('.'+target).attr('style','background: rgba(178,34,34, .5);border-color:#FF0000;');
                            }
                        }
                        //报警模组数
                        $('#MOD_FAULT').text(rec.MOD.length-mod_Normal_count);
                        //正常模组数
                        $('#MOD_NORMAL').text(mod_Normal_count);

                        if(typeof (rec.MAX_POWER) == "undefined" ){
                            $('#MAX_POWER').text("暂无数据");
                        }else{
                            //最大功率
                            $('#MAX_POWER').text(rec.MAX_POWER+"W/m²");
                        }
                        if(typeof (rec.RT_POWERDIS) == "undefined" ){
                            //实际功率
                            $('#RT_POWERDIS').text("暂无数据");
                        }else{
                            //实际功率
                            $('#RT_POWERDIS').text(rec.RT_POWERDIS+"W/m²");
                        }

                        if(typeof (rec.AVE_POWERDIS) == "undefined" ){
                            //平均功率
                            $('#AVE_POWERDIS').text("暂无数据");
                        }else{
                            //平均功率
                            $('#AVE_POWERDIS').text(rec.AVE_POWERDIS+"W/m²");
                        }

                        //接收卡信息赋值
                        //接收卡名称
                        if(typeof (rec.REC_ID) == "undefined" ){
                            $('#rec_Id').text("暂无数据");
                        }else{
                            $('#rec_Id').text(rec.REC_ID);
                        }

                        //接收卡个数
                        $('#rec_Count').text(detail.REC.length);
                        //接收卡运行时间
                        if(typeof (rec.TOTAL_WORKTIME) == "undefined" ){
                            $('#rec_TOTAL_WORKTIME').text("暂无数据");
                        }else{
                            $('#rec_TOTAL_WORKTIME').text(rec.TOTAL_WORKTIME+"S");
                        }

                        // 主接收卡  01 主接收卡工作   02 备份接收卡工作
                        if(typeof (detail.REC_MASTER) == "undefined" ){
                            $('#BOX_MASTER').text("暂无数据");
                        }else if(detail.REC_MASTER === '1'){
                            $('#BOX_MASTER').text('主接收卡工作');
                        }else{
                            $('#BOX_MASTER').text('备份接收卡工作');
                        }

                        // 网口状态   01 A网口工作   02 B网口工作
                        if(typeof (detail.PORT_MASTER) == "undefined" ){
                            $('#PORT_MASTER').text("暂无数据");
                        }else if(detail.PORT_MASTER === '1'){
                            $('#PORT_MASTER').text('网口1工作');
                        }else{
                            $('#PORT_MASTER').text('网口2工作');
                        }

                        // 网口状态   01 A网口工作   02 B网口工作
                        if(typeof (detail.POWER_MASTER) == "undefined" ){
                            $('#POWER_MASTER').text("暂无数据");
                        }else if(detail.PORT_MASTER === '1'){
                            $('#POWER_MASTER').text('主电源在线');
                        }else if(detail.PORT_MASTER === '2 '){
                            $('#POWER_MASTER').text('备份电源在线');
                        }else{
                            $('#POWER_MASTER').text('主，备电源都在线');
                        }

                    }


                    let BOX_State = params.data.detail.BOX_STATE;

                    if(BOX_State === '1'){

                    }else if(BOX_State === '2'){

                    }else if(BOX_State === '3'){

                    }else{
                        clearPopup("无法检测");
                    }


                    //驱动IC赋值
                    $('#cover').css('display','block'); //显示遮罩层
                    $('.container').attr('style', 'visibility: visible').find('.pop-up').
                    attr('style', 'visibility: visible').siblings().attr('style', 'visibility: hidden');
                }
            });
        },
        error: function (data) {
            console.log(data);
            alert("获取后台参数失败");
        }
    });

}

function getSocket(){
    var websocket = null;
    if('WebSocket' in window){
        websocket = new WebSocket("ws://127.0.0.1:9090/websocket/testname");
    }

    websocket.onopen = function(){
        console.log("连接成功");
    }

    websocket.onclose = function(){
        console.log("退出连接");
    }

    websocket.onmessage = function (event){
        console.log("收到消息"+event.data);
    }

    websocket.onerror = function(){
        console.log("连接出错");
    }

    window.onbeforeunload = function () {
        websocket.close();
    }
}

// var int=self.setInterval("getCanShu()",1000);
getCanShu();
getSocket();


function aiguozhe(item){
    let modGroup =  clicked_Box_ModGroup;
    for(let i = 0;i<modGroup.length;i++){

        let sigleMod = modGroup[i];

        let target  = null;
        let pos = parseInt(sigleMod.POS);
        switch (pos) {
            case 1:
                target = "module1";
                break;
            case 2:
                target = "module5";
                break;
            case 3:
                target = "module2";
                break;
            case 4:
                target = "module6";
                break;
            case 5:
                target = "module3";
                break;
            case  6:
                target = "module7";
                break;
            case  7:
                target = "module4";
                break;
            case  8:
                target = "module8";
                break;
        }
        if(item == target){
            //无法检测-灰色
            if(modGroup[i].MOD_STATE === "0"){
                //清空模组的方法
                clearModedetail("无法检测模组-暂无数据");
                //正常
            }else if(modGroup[i].MOD_STATE === "1"){
                if(typeof (sigleMod.ID) != "undefined"){
                    $('#MOD_ID').text(sigleMod.ID);
                }else{
                    $('#MOD_ID').text("暂无数据");
                }
                //警告-黄色
            }else if(modGroup[i].MOD_STATE === "2"){
                if(typeof (sigleMod.ID) != "undefined"){
                    $('#MOD_ID').text(sigleMod.ID);
                }else{
                    $('#MOD_ID').text("暂无数据");
                }
                //故障-红色
            }else{
                //清空模组的方法
                clearModedetail("模组故障-暂无数据");

            }
        }
    }
    if($('.modedetail').css('display') === 'none'){
        $('.modedetail').attr('style','display:block;');
        $('.set-div').attr('style','z-index:1;');
    }else{
        $(".modedetail").hide();
        $('.set-div').attr('style','z-index:3;');
    }
}

// function tuopu(nodes,links){
//
// }


//点击close-pop这个类时取消弹框
$('.close-pop').on('click', function () {
    $('#cover').css('display','none');
    $(this).parent().parent().hide().find('.cont-div').attr('style', 'visibility: hidden');
})

// $(document).on('click',function (e) {
//     var target = $(e.target);
//     if(target.closest(".modedetail").length == 0 && target.closest(".module").length == 0){
//         $(".modedetail").hide();
//     }
// })

//在箱体报警时清空箱体信息封装方法
function clearPopup(value) {
    $('#productTitle').text(value);
    $('#SENSOR_VOL').text(value);
    $('#SENSOR_CURRENT').text(value);
    $('#SENSOR_TMP').text(value);
    $('#SENSOR_HUMI').text(value);
    $('#RT_POWERDIS').text(value);
    $('#rec_Type').text(value);
    $('#rec_Count').text(value);
    $('#REC_VER').text(value);
    $('#REC_Carrying_Area').text(value);
    $('#PORT_MASTER').text(value);
    $('#BOX_MASTER').text(value);
    $('#POWER_MASTER').text(value);
    $('#MOD_ORDER').text(value);
    $('#MOD_NORMAL').text(value);
    $('#MOD_FAULT').text(value);
}

//在模组报警时清空箱体信息封装方法
function clearModedetail(value) {
    $('#MOD_RSL').text(value);
    $('#MOD_SPACE').text(value);
    $('#MOD_SCAN_NUM').text(value);
    $('#MOD_ID').text(value);
}

