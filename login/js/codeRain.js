    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    // 画布大小
    var cw = cvs.width = 400;
    var ch = cvs.height =550;
    // var cw = cvs.width = document.body.clientWidth;
    // var ch = cvs.height = document.body.clientHeight;
    //动画绘制对象
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var codeRainArr = []; //代码雨数组
    var cols = parseInt(cw / 80); //代码雨列数
    var step = parseInt(Math.random() * 50 );    //步长，每一列内部数字之间的上下间隔
    ctx.font = " 25px Microsoft YaHei"; //声明字体
    // ctx.font = "blod 25px microsoft yahei"; //声明字体
  
    function createColorCv() {
        //画布基本颜色
        ctx.fillStyle = "#242424";
        ctx.fillRect(0, 0, cw, ch);
    }
  
    //创建代码雨
    function createCodeRain() {
        for (var n = 0; n < cols; n++) {
            var col = [];
            //基础位置，为了列与列之间产生错位
            var basePos = parseInt(Math.random() * 200);
            //随机速度 3~13之间
            // var speed = parseInt(Math.random() * 10) + 3;
            var speed = parseInt(Math.random() * 5);
            //每组的x轴位置随机产生
            var colx = parseInt(Math.random() * cw)
  
            //绿色随机
            var rgbr = 48;
            var rgbg = 52;
            var rgbb = 99;
            // var rgbr = 0;
            // var rgbg = parseInt(Math.random() * 255);
            // var rgbb = 0;
            //ctx.fillStyle = "rgb("+r+','+g+','+b+")"
  
            for (var i = 0; i < parseInt(ch / step) / 2; i++) {
                var code = {
                    x: colx,
                    y: -(step * i) - basePos,
                    speed: speed,
                    //  text : parseInt(Math.random()*10), //随机生成0或者1
                     text : parseInt(Math.random()*10)%2 == 0 ? 0 : 1, //随机生成0或者1
                    // text: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "s", "t", "u", "v", "w", "x", "y", "z"][parseInt(Math.random() * 11)], //随机生成字母数组中的一个
                    color: "rgb(" + rgbr + ',' + rgbg + ',' + rgbb + ")"
                }
                col.push(code);
            }
            codeRainArr.push(col);
        }
    }
  
    //代码雨下起来
    function codeRaining() {
        //把画布擦干净
        ctx.clearRect(0, 0, cw, ch);
        //创建有颜色的画布
        //createColorCv();
        for (var n = 0; n < codeRainArr.length; n++) {
            //取出列
            col = codeRainArr[n];
            //遍历列，画出该列的代码
            for (var i = 0; i < col.length; i++) {
                var code = col[i];
                if (code.y > ch) {
                    //如果超出下边界则重置到顶部
                    code.y = 0;
                } else {
                    //匀速降落
                    code.y += code.speed;
                }
                 
                //1 颜色也随机变化
                // ctx.fillStyle = "hsl("+(parseInt(Math.random()*359)+1)+",30%,"+(50-i*2)+"%)"; 
                // ctx.fillStyle = "hsl("+(parseInt(Math.random()*359)+1)+",30%,"+(50-i*2)+"%)"; 
  
                //2 绿色逐渐变浅
                // ctx.fillStyle = "hsl(123,80%,"+(30-i*2)+"%)"; 
  
                //3 绿色随机
                // var r= 0;
                // var g= parseInt(Math.random()*255) + 3;
                // var b= 0;
                // ctx.fillStyle = "rgb("+r+','+g+','+b+")";
  
                //4 一致绿
                ctx.fillStyle = code.color;
                //把代码画出来
                ctx.fillText(code.text, code.x, code.y);
            }
        }
        requestAnimationFrame(codeRaining);
    }
  
    //创建代码雨
    createCodeRain();
    //开始下雨吧 GO>>
    requestAnimationFrame(codeRaining);