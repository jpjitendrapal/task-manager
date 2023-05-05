
function getIdCounter(){
    return function(){
        return Date.now();
    }
}
const getId = getIdCounter();
export {getId}