
export const getFullArea = (code,areaList) => {
    if(areaList.length > 0){
        return findIndexArray(areaList,code,[]);
    }
    return [code];
}

export const getAreaName = (code,areaList) => {
    if(areaList.length > 0){
        return findAreaName(areaList,code);
    }
    return [code];
}
function findAreaName (data, value) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].value === value) {
        return data[i].label;
      }
      let children = data[i].children
      if (children && children.length) {
        let result = findAreaName(children, value)
        if (result) return result
      }
    }
    return false
  }

function findIndexArray (data, value, indexArray) {
    let arr = Array.from(indexArray)
    for (let i = 0, len = data.length; i < len; i++) {
      arr.push(data[i].value)
      if (data[i].value === value) {
        return arr
      }
      let children = data[i].children
      if (children && children.length) {
        let result = findIndexArray(children, value, arr)
        if (result) return result
      }
      arr.pop()
    }
    return false
  }