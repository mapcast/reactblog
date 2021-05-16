export function callApiLike() {//1초뒤에 이행되는 프로미스.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random()*10<5){
                resolve();
            }else{
                reject("callApiLike 실패");
            }
        }, 1000);
    });
}