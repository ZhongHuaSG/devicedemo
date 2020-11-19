let demo = new Vue({
    el:'#main',
    //封装的内部参数
    data() {
        return{
            //功能页面索引
            page_Index:1,
            //亮度
            brightness:0,
            //伽马值
            gamma:1.0,
            //色温调节
            color_temperatrue:4000,
            value1:0,
            //全局变量锁定
            global_setting_lock: false,
            //停止状态
            pause_status:false,
            //断电
            blackout:false,
            brightness_marks:{
                25: '25',
                50: '50',
                75: '75',
            },
            gamma_marks:{
                1: '1',
                1.8: '1.8',
                2.5: '2.5',
                3.3: '3.3',
            },
            color_temperatrue_marks:{
                4000: '4000',
                5252: '5252',
                6504: '6504',
                7756: '7756',
            },
        }
    },
    //进入页面一次加载
    mounted() {
    },
    //封装的内部方法
    methods: {
        color_temperatrueInput(){
            if(this.color_temperatrue <4000){
                this.color_temperatrue = 4000
            }
        },
        GammaInput(){
            if(this.gamma <1.0){
                this.gamma = 1.0
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        restore_image_adjust_default(){
            this.brightness=0;
            this.gamma=1.0;
            this.color_temperatrue=4000;
        },
        //页面切换
        handleSelect(key, keyPath) {
            this.page_Index = key;
            let canvas = document.getElementById('box-canvas');

            let ctx = canvas.getContext("2d");

            //canvas宽高
            let canvasWidth = 1380;
            let canvasHeight = 680;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.fillStyle="#FF0000";
            ctx.fillRect(0,0,150,75);
        },
    },
})

