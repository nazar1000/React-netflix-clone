export const api_key = "";

export const getRandomID = (list: any[]): number => {
    let random = Math.floor(Math.random() * list.length);
    let id = list[random].id;
    return id;
}

export const timer = (callback: Function, delayS: number) => {
    setTimeout(() => {
        callback();
    }, delayS * 1000);


}