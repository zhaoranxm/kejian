### JS正式课2（变量提升）
#### 变量提升
- 当前作用域形成，JS代码自上而下执行之前，浏览器首先会把所有带var和function关键词的进行提前“声 明”或者“定义”。这种预先处理机制称之为变量提升
      ->声明：var a (默认值undefined)
      ->定义：a = 12;(定义其实就是赋值)
     【变量提升阶段】
       带var的只是声明未定义
       带function的声明和赋值都完成了
      ->变量提升只是发生在当前作用域（例如：开始加载页面的时候只对全局作用域下进行提升，因为此时函数中储             存的都是字符串而已）
      ->在全局作用域下声明的函数或者变量是"全局变量"，同理在私有作用域下声明的变量是"私有变量"
         【带var和function的才是声明】
      ->浏览器很懒，做过的事情不会重复第二遍，也就是，当前代码遇到创建函数这部分代码后直接跳过即可，因为            在提升阶段就已经完成函数的赋值操作了
- JS引擎一开始会解析全局作用域中的所有var的变量和function，会通过函数比undefined要大（留下的是函数），还有后面的函数会把前面的函数覆盖的原则进行变量值赋最后确认赋值
- 逐行解读代码，读打印、输出、赋值（=）
## 作用域
- 域：JS执行的环境范围
- 全局作用域（window执行栈）
         1.在全局作用域下声明一个变量，也相当于给window全局对象设置了一个属性，变量的值就是属性值（私有作用域中声明的私有变量和window没关系）  （var会在window下挂属性let不会）
            加var是创建一个变量，不加var的本质是window下的属性
          2.如果有多个script标签，上一个script标签报错是不会影响下面script中的代码执行的。
          3.查找到方式是看当前的script中有没有，没有还会去上一个script标签中查找，如果找不到就报错，上一个script报错 下一个script不会报错
- 局部作用域（函数中的执行栈）
      局部作用域的函数比谁都大
      当函数执行的时候开辟了一个执行栈把函数中存的字符串运行在这个执行栈中
    1.形参赋值
    2.变量提升
    3.执行上下文
    4.执行栈销毁
【作用域链】
    1 如果局部作用域中没有变量（var 、let）、函数、形参的时候，就会查找函数外面的变量，直到window为止
    ```
        var a = 10;
        function fn(){
            console.log(a);//10
        }
        fn()
    ```
    2如果局部作用域有变量（var、let）会直接找这个变量，是不会去函数外进行查找。
    ```
        var a = 20;
        function fn(){
            alert(a);//undefined
            var a = 10;
        }
        fn();
    ```
    3 如果局部作用域有变量（var、let）还有形参，那么会优先形参
    ```
        var a = 5;
        function fn(a){
            alert(a);//5
            var a = 10;
            alert(a);//10
        }
        fn(a);
    ```
   
    4 如果局部作用域中有函数、变量（var、let）还有形参，那么会优先函数体内的函数，并不是形参
    ```
        var a = function (){};
        function fn(a){
            alert(a);  //function a(){}
            var a = 10;
            alert(a); //10
        function a(){}
        }
        fn(a);
    ```
#### this
- 全局this window
    ```
        console.log(this); //window
        fn() // window
        (function(){
            console.log(this);//window
        })()
    ```
- 事件this  事件触发的对象
    ```
        btn.onclick = function(){
            console.log(this);//btn
        }
    ```
- 对象下的this  指向.前面的主
    ```
        obj = {
        style:{
            fn:function(){
                console.log(this);
            }
        }
        }
        obj.style.fn(); //this-> obj.style
    ```
#### 闭包
- 闭包：教科书上说的是，一个函数访问外部变量就是这个函数就叫闭包。
- 闭包的作用：为了存储变量或者参数
     1.函数嵌套函数
     2.子函数引用父函数的参数或者变量
     3.子函数被外界所引用
     4.父级就形成了闭包环境，父级的参数或者变量就不会被浏览器垃圾回收机制回收
     5.打印父级的函数返回值，那么发现，scopes下有个closure，就是闭包

     ```
        function fn(){
            var a = 10;//定义父函数的变量
        function f(){
            console.log(a)//子函数引用父函数的变量
          }
        teturn f;//返回值，子函数返回值被外界引用
        }
        let ff =fn(); //fn就形成了闭包环境,fn中的参数或者变量就不会被浏览器垃圾回收机制回收
        console.dir(ff);
     ```