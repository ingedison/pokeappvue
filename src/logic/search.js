
export function filterSearch(array, skey){
    var filteredArray = array.filter(function (el) {
            return el.name.includes(skey);
    });
    console.log(filteredArray);
    return filteredArray;
}