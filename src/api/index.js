import axios from "./axios";
import api from "./proxy";

export const Loging = ({ account, password, code }) =>
  axios(api + "/login", { account, password, code }, "post");

export const getCode = () => axios(api + "/getVerificationCode");

export const wallTableConfig = ({ pageNumber, pageSize }) =>
  axios(api + "/bsReportConfig/page", { pageNumber, pageSize }, "post");
export const wallTableConfigDel = ({ ids }) =>
  axios(api + "/bsReportConfig/del", { ids }, "post");
export const wallTableData = ({ pageNumber, pageSize }) =>
  axios(api + "/bsReport/page", { pageNumber, pageSize }, "post");
export const wallTableDataDel = ({ ids }) =>
  axios(api + "/bsReport/del", { ids }, "post");

export const tableType = ({ dicType }) =>
  axios(api + "/dictionary/getBaseDictionarySelectList", { dicType }, "post");
export const wallList = ({ pageNumber, pageSize }) =>
  axios(api + "/dictionary/list", { pageNumber, pageSize }, "post");

export const wallConfigAddEdit = ({
  id,
  name,
  type,
  cycleType,
  cycleName,
  state,
  dataCycle
}) =>
  axios(
    api + "/bsReportConfig/save",
    { id, name, type, cycleType, cycleName, state, dataCycle },
    "post"
  );
export const wallDataAddEdit = ({
  id,
  name,
  type,
  code,
  abscissaName,
  quantity,
  source,
  statisticsDate,
  cycleType,
  cycleName,
  state
}) =>
  axios(
    api + "/bsReport/save",
    {
      id,
      name,
      type,
      code,
      abscissaName,
      quantity,
      source,
      statisticsDate,
      cycleType,
      cycleName,
      state
    },
    "post"
  );

export const caseList = ({ pageNumber, pageSize, keywords }) =>
  axios(api + "/bsCase/list", { pageNumber, pageSize, keywords }, "post");
export const caseDel = ({ id }) =>
  axios(api + "/bsCase/deleteCaseDrug", { id }, "post");
export const caseEdit = ({
  id,
  name,
  type,
  content,
  drugCount,
  happenAddress,
  areaName,
  areaId,
  state,
  managerName,
  fileId,
  happenTime
}) =>
  axios(
    api + "/bsCase/updateCase",
    {
      id,
      name,
      type,
      content,
      drugCount,
      happenAddress,
      areaName,
      areaId,
      state,
      managerName,
      fileId,
      happenTime
    },
    "post"
  );

export const glevelCity = ({ levelCity }) =>
  axios(api + "/ares/list", { levelCity }, "post");
export const manageGet = () => axios("/manage");
