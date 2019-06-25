import axios from "./axios";
import requre from "axios";
import api from "./proxy";

// 获取项目前缀
export const axiosUrl = () =>{return api}

// 通用ajax请求配置
export const axiosRest = (url, data, type = "get") => axios(api + url, data, type);

// 登录
export const Loging = ({ account, password, code }) => axios(`${api}/login`, { account, password, code }, "post", false);

// 验证码
export const getCode = () => axios(`${api}/getVerificationCode`, {}, "get", false);

// 字典获取
export const dictionary = ({ dicType }) => axios(`${api}/dictionary/getBaseDictionarySelectList`, { dicType }, "post");
// 区域列表
export const glevelCity = ({ levelCity }) => axios(`${api}/area/list`, { levelCity }, "post");

export const axiosFiles = (url, data,filesname,files) =>
{
    let config = {
        headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    let formData = new FormData();
    if(files.length > 0){
      files.forEach(element =>{
        formData.append(filesname, element,element.name); //多个用循环 append 添加
      })
    }
    Object.keys(data).forEach(key => {
      if(data[key] || data[key] === 0 || data[key] === false) {
        formData.append(key,data[key]);
      }
    });
    return new Promise(function(resolve, reject) {
      let promise = requre.post(api+url,formData,config);
      promise.then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

export const wallTableConfig = ({ pageNumber, pageSize }) => axios(`${api}/bsReportConfig/page`, { pageNumber, pageSize }, "post");
export const wallTableConfigDel = ({ ids }) => axios(`${api}/bsReportConfig/del`, { ids }, "post");
export const wallTableData = ({ pageNumber, pageSize }) => axios(`${api}/bsReport/page`, { pageNumber, pageSize }, "post");
export const wallTableDataDel = ({ ids }) => axios(`${api}/bsReport/del`, { ids }, "post");
export const wallList = ({ pageNumber, pageSize }) => axios(`${api}/dictionary/list`, { pageNumber, pageSize }, "post");
export const wallConfigAddEdit = ({id,name,type,cycleType,cycleName,state,dataCycle}) =>
  axios(`${api}/bsReportConfig/save`,{ id, name, type, cycleType, cycleName, state, dataCycle },"post");
export const wallDataAddEdit = ({id = "",name,type,code,abscissaName,quantity,source,statisticsDate,cycleType,cycleName,state} = {}) =>
  axios(`${api}/bsReport/save`,{id,name,type,code,abscissaName,quantity,source,statisticsDate,cycleType,cycleName,state},"post");
export const caseList = ({ pageNumber, pageSize, keywords }) =>
  axios(`${api}/bsCase/list`, { pageNumber, pageSize, keywords }, "post");
export const caseDel = ({ id }) =>
  axios(`${api}/bsCase/deleteCase`, { id }, "post");
export const caseEdit = ({id = "",name,type,content,drugCount,happenAddress,areaName,areaId,state,managerName,fileId,happenTime,code} = {}) =>
  axios(`${api}/bsCase/updateCase`,{id,name,type,content,drugCount,happenAddress,areaName,areaId,state,managerName,fileId,happenTime,code},"post");
export const caseAdd = ({name,type,code,content,happenAddress,areaName,areaId,state,managerName,fileId,happenTime}) =>
  axios(`${api}/bsCase/addCaseDrug`,{name,type,code,content,happenAddress,areaName,areaId,state,managerName,fileId,happenTime},"post");


export const manageGet = () => axios(`${api}/manage`);

/**
 * 附件
 * @param {String} relationId 附件关联ID
 * @param {String} attId 附件ID
 */
export const file = {
  list({ relationId }) {
    return axios(`${api}/attachment/getFileList`, { relationId }, "post");
  },
  download({ attId }) {
    return axios(`${api}/attachment/downloadFile`, { attId }, "post");
  },
  del({ attId }) {
    return axios(`${api}/attachment/delFile`, { attId }, "post");
  }
};

/**
 * 毒品相关配置
 * @param {String} pageNum 页码，页数据数，关键字
 * @param {String} pageSize 页数据条数
 * @param {String} [keywords=""] 关键字
 * @param {String} name 毒品名称
 * @param {String} id 毒品ID
 * @param {Number} type 毒品类型：字典drugType
 * @param {Number} isNew 新型毒品(1:是;0:否)
 * @param {String} [content=""] 毒品描述
 * @param {file}  [drugFiles=""] 毒品照片
 */
export const drug = {
  list({ pageNum, pageSize, keywords = "" } = {}) {
    return axios(`${api}/bsDrugs/list`,{ pageNum, pageSize, keywords },"post");
  },
  add({ name, type, isNew, content = "", drugFiles = "" } = {}) {
    return axios(`${api}/bsDrugs/addDrug`,{ name, type, isNew, content, drugFiles },"post");
  },
  update({ name, type, isNew, id, content = "", drugFiles = "" } = {}) {
    return axios(`${api}/bsDrugs/updateDrug`,{ name, type, isNew, id, content, drugFiles },"post");
  },
  del({ id }) {
    return axios(`${api}/bsCase/deleteCaseDrug`, { id }, "post");
  }
};

/**
 * 案件配置 案件删除缺少 案件状态add,update与list,detail不相同
 * @param {String} pageNum 页码，页数据数，关键字
 * @param {String} pageSize 页数据条数
 * @param {String} [keywords=""] 关键字
 * @param {String} code 案件编号
 * @param {String} name 案件名称
 * @param {String} type 案件类型：字典caseType
 * @param {String} content 案件内容
 * @param {String} happenTime 发生时间yyyy-MM-dd HH:mm:ss
 * @param {String} areaId 发生区域编号
 * @param {String} areaName 发生区域名称
 * @param {String} happenAddress 详细地点
 * @param {String} managerName 负责人
 * @param {String} state 案件状态：0未破案1已破案
 * @param {String} id 案件ID
 * @param {file} [fileId=""] 附件
 */
export const caseManage = {
  list({ pageNumber, pageSize, keywords = "" } = {}) {
    return axios(`${api}/bsCase/list`,{ pageNumber, pageSize, keywords },"post");
  },
  detail({id}) {
    return axios(`${api}/bsCase/detail`,{ id },"post");
  },
  add( {name,type,code,content,happenAddress,areaName,areaId,state,managerName,happenTime,fileId=""} = {}) {
    return axios(`${api}/bsCase/addCase`,{name,type,code,content,happenAddress,areaName,areaId,state,managerName,fileId,happenTime},"post");
  },
  update({name,type,code,content,happenAddress,areaName,areaId,state,managerName,happenTime,fileId="",id} = {}) {
    return axios(`${api}/bsCase/updateCase`, {name,type,code,content,happenAddress,areaName,areaId,state,managerName,happenTime,fileId,id}, "post");
  },
  del({id}) {
    return axios(`${api}/bsCase/deleteCase`,{ id },"post");
  }
};

/**
 * 案件毒品配置 新增案件时无法配置
 * @param {String} drugId 毒品ID
 * @param {String} caseId 案件ID
 * @param {Number} drugCount 毒品数量
 * @param {String} id 毒品数量
 */
export const caseDrug = {
  add({ drugId, caseId, drugCount }) {
    return axios(`${api}/bsCase/addCaseDrug`, { drugId, caseId, drugCount });
  },
  update({ id, drugCount }) {
    return axios(`${api}/bsCase/updateCaseDrug`, { id, drugCount }, "post");
  },
  del({ id }) {
    return axios(`${api}/bsCase/deleteCaseDrug`, { id }, "post");
  }
};

/**
 * 案件嫌疑人 未处理列表和删除
 * @param {String} personIdcard 身份证号
 * @param {String} caseId  案件ID
 * @param {String} personName 人员名称
 * @param {Number} personSex 性别（1:男;2:女）
 * @param {Number} personGrade 嫌疑程度（10：低20：中30：高）
 * @param {String} id 嫌疑人关联表ID
 */
export const casePerson = {
  list({}) {},
  add({ personIdcard, caseId, personName, personSex, personGrade }) {
    return axios(
      `${api}/bsCase/addCasePerson`,
      { personIdcard, caseId, personName, personSex, personGrade },
      "post"
    );
  },
  update({ personIdcard, personName, personSex, personGrade, id,caseId }) {
    return axios(
      `${api}/bsCase/updateCasePerson`,
      { personIdcard, personName, personSex, personGrade, id,caseId },
      "post"
    );
  },
  del({ id }) {
    return axios(`${api}/bsCase/deleteCasePerson`, { id }, "post");
  }
};

/**
 * 人员配置 add,updata,del未配置
 * @param {String} pageNum 页码，页数据数，关键字
 * @param {String} pageSize 页数据条数
 * @param {String} [keywords=""] 关键字
 * 
 */
export const person = {
  list({ pageNum, pageSize, keywords = `` } = {}) {
    return axios(`${api}/bsPerson/list`,{ pageNum, pageSize, keywords },"post");
  },
  detail({idcard}) {
    return axios(`${api}/bsReport/personInfo`,{ idcard },"post");
  },
  add() {
    return ""
  },
  update() {
    return ""
  },
  del() {
    return ""
  }
}
/**
 * 情报墙报表配置
 * @param {String} pageNumber 页码，页数据数，关键字
 * @param {String} pageSize 页数据条数
 * @param {String} id 报表ID
 * @param {String} name 报表名称
 * @param {String} type 报表类型（每个报表唯一，从字典中获取对应值）
 * @param {String} cycleType 周期类型（字典中获取对应值）
 * @param {String} cycleName 周期类型名称（字典中获取对应值）
 * @param {String} dataCycle 统计周期
 * @param {Number} state 是否生效（0：不生效，1：生效）
 * @param {String} ids 需要删除的id数组
 */
export const wallConfig = {
  list({ pageNumber, pageSize} = {}) {
    return axios(`${api}/bsReportConfig/page`, { pageNumber, pageSize }, "post");
  },
  add({ id="", name, type, cycleType, cycleName, state, dataCycle } = {}) {
    return axios(`${api}/bsReportConfig/save`,{ id, name, type, cycleType, cycleName, state, dataCycle },"post");
  },
  update({ id, name, type, cycleType, cycleName, state, dataCycle }) {
    return axios(`${api}/bsReportConfig/save`,{ id, name, type, cycleType, cycleName, state, dataCycle },"post");
  },
  del({ ids }) {
    axios(`${api}/bsReportConfig/del`, { ids }, "post");
  }
}

/**
 * 情报墙数据配置
 * @param {String} pageNumber 页码，页数据数，关键字
 * @param {String} id 数据ID
 * @param {String} name 数据名称
 * @param {String} type 报表TYPE（字典获取）
 * @param {String} code 编码（字典获取，如01：海洛因）
 * @param {String} abscissaName 横坐标名称
 * @param {String} quantity 数量
 * @param {String} source 来源/区域（字典获取）
 * @param {String} statisticsDate 统计时间
 * @param {String} cycleType 周期编码（MON，YEAR等，字典获取）
 * @param {String} cycleName 周期名称
 * @param {String} ids 需要删除的id数组
 */
export const wallData = {
  list({ pageNumber, pageSize} = {}) {
    return axios(`${api}/bsReport/page`, { pageNumber, pageSize }, "post");
  },
  add({id = "",name,type,code,abscissaName,quantity,source,statisticsDate,cycleType,cycleName} = {}) {
    return axios(`${api}/bsReport/save`,{id,name,type,code,abscissaName,quantity,source,statisticsDate,cycleType,cycleName,state},"post");
  },
  update({id,name,type,code,abscissaName,quantity,source,statisticsDate,cycleType,cycleName}) {
    return axios(`${api}/bsReport/save`,{id,name,type,code,abscissaName,quantity,source,statisticsDate,cycleType,cycleName,state},"post");
  },
  del({ ids }) {
    axios(`${api}/bsReport/del`, { ids }, "post");
  }
}