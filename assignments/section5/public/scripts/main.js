const lis = document.getElementsByTagName('li')
console.log('lis : ', lis)


Array.from(lis).forEach(li => {
    
    const id = setInterval(()=>{
        if(getComputedStyle(li).color==="rgb(255, 0, 0)"){
            li.style.color='green'
        }else{
            li.style.color='red'
        }
    },1000)
});