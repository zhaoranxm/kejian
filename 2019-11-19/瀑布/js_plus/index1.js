const box = document.querySelector('.body');
const lis = document.querySelectorAll('li');
const head = document.querySelector('.head');
/*
   findIndex(callback)
      找到回调函数中return后符合条件的索引值，找不到为-1
    callback（数组的每一项，索引，all）
   
    
*/
function minEle(lis){
    let ary = [...lis].map(ele=>ele.scrollHeight);
    let min = Math.min(...ary);
    let index = ary.findIndex(item=>item === min);//最小的值
    // console.log(ary);
    // console.log(lis);
    return {
        ele:lis[index],
        index,
        min
    }
}


//防抖
function debounce(cb,time){
    let timer;
    return function(...arg){
        //当事件触发的时候就先关闭上次的timer
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            cb.call(this,...arg);
        }, time);
        
    }
}
//节流
function throttling(cb,time){
    let prevtime = 0,
    timer;
    return function(...arg){
        let nowTime = +new Date;
        if(nowTime - prevtime > time){
            cb.call(this,...arg);
        }else{
            clearInterval(timer);
            timer = setTimeout(()=>{
                if(+new Date - prevtime > time){
                    cb.call(this,...arg);
                }
            },time);
        }
        prevtime = nowTime;
    }
}



function render(){
    fetch('./data.json')
    .then(d=>d.json())
    .then(ary=>{
        // console.log(data);
        //再循环数组的过程中，去计算每个li的高度找到最短的li
        ary.forEach((item,i) => {
            let {ele} = minEle(lis);
            let div = document.createElement('div');
                div.className = 'img_box';
            let img = document.createElement('img');
                img.src = item.pic;
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
                p1.className = 'desc';
                p1.innerText = item.desc;
                p2.className = 'author';
                p2.innerText = item.author;
            
            div.append(img);
            div.append(p1);
            div.append(p2);
            ele.append(div);  
        });
    })
}
render();

let iH = window.innerHeight;//可视区的高度
// window.onscroll = debounce(fn,200);
window.onscroll = throttling(fn,200);

function fn(){
    if(box.scrollHeight < iH)return;
    let {min} = minEle(lis);//最短的距离
    let scroll = window.pageYOffset;//滚动条的距离


    if(iH + scroll >= min+head.offsetHeight){
       console.log('触底了');
       render()
       
    }
    // console.log(iH+scroll);
    // console.log(min+head.offsetHeight);
    
    
    
}