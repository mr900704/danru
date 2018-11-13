//此文档作为联系兼容ie使用
var MR={};
//获取元素样式兼容
    MR.getStyle=function (obj,attr){
        return  obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
    };
//requestAnimationFream的兼容
    MR.window.requestAnimationFrame=window.requestAnimationFrame||function () {
        var timer=setTimeout()
        return timer;
    };
//cancelAnimationFrame的兼容
    MR.window.cancelAnimationFrame=window.cancelAnimationFrame||clearTimeout;
//添加类名兼容
    MR.addClassName=function (obj,attr){
        var aClassName=obj.className,
            arr=aClassName.split(" ");
        // console.log(arr)//返回值：[""] length：1；
        /* 注：1、当一个空字符串被切成数组时，这个空字符串会作为数组中的唯一的一个值；
         2、一个字符串如果被切成数组，在split()方法的参数在字符串中没有找到，数组的值是有整个字符串组成的唯一个值；
         */
        var target=attr.split(" ");
        var targetLen=target.length,
            arrLen=arr.length;
        for(var i=0;i<arrLen;i++){
            for(var j=0;j<targetLen;j++){
                if(arr[i]===target[j]){continue};
                arr.push(target[j]);
            }
        };
        var newClassName=arr.join(" ");
        obj.className=newClassName;
    };
//移除类名兼容处理
    MR.removeClassName=function (obj,attr){
        var aClassName=obj.className,
            arr=aClassName.split(" ");
        var target=attr.split(" "),
            targetLen=target.length;
        for(var i=0;i<targetLen;i++){
            var index=arr.indexOf(target[i]);
            if(index==-1){continue; }
            arr.splice(index,1);
        }
        var str=arr.join(" ");
        obj.className=str;
    };
//运动框架(自己封装）
    MR. remove=function(obj,attr,target,step) {
    var init=parseFloat(getStyle(obj,attr)),
        step=parseFloat(step),
        target=parseFloat(target);
    //判断初始值和目标值的大小
    init<target?step=step:step=-step;//判断起始值和结束值的大小，设置计算为+或者-
    ;(function move(){
        var animation= requestAnimationFrame(move);
        // init=init+step;
        /*判断传入的参数是否为透明度*/
        if(attr!=="opacity"){/*传入的参数不为透明度时*/
            if(init<target){//如果初始值小于目标值
                init=init+step;
                if(init>=target){//当初始值计算后大于目标值时-重新赋值为目标值-并停止动画
                    init=target;
                    cancelAnimationFrame(animation)
                }
            }else {//当初始值小于目标值时
                init=init+step;
                if(init<=target){//当初始值经过计算后小于目标值时-重新赋值为目标值-并停止动画
                    init=target;
                    cancelAnimationFrame(animation)
                }
            };
            obj.style[attr]=init+"px";
        }else {
            //当传入的属性时透明度时
            if(init<target){//如果初始值小于目标值
                init=init+step;//进行运算
                if(init>=target){//判断当初始值大于等于目标值时-赋值-停止动画
                    init=target;
                    cancelAnimationFrame(animation)
                };
            }else {//如果初始值大于目标值
                init=init+step;//进行运算
                if(init<=target){//判断当初始值大于等于目标值时-赋值-停止动画
                    init=target;
                    cancelAnimationFrame(animation)
                };

            };
            obj.style[attr]=init;
        }
    })();
};
