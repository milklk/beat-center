import axios from "./axios";

export const Loging = ({ account, password, code }) =>
  axios("/bs/login", { account, password, code }, "post");

export const getCode = () => axios("/bs/getVerificationCode");

export const wallTableConfig = ({ pageNumber, pageSize }) =>
  axios("/bs/bsReportConfig/page", { pageNumber, pageSize }, "post");
export const wallTableConfigDel = ({ ids }) =>
  axios("/bs/bsReportConfig/del", { ids }, "post");
export const wallTableData = ({ pageNumber, pageSize }) =>
  axios("/bs/bsReport/page", { pageNumber, pageSize }, "post");
export const wallTableDataDel = ({ ids }) =>
  axios("/bs/bsReport/del", { ids }, "post");

export const wallTableType = ({ dicType }) =>
  axios("/bs/dictionary/getBaseDictionarySelectList", { dicType }, "post");
export const wallList = ({ pageNumber, pageSize }) =>
  axios("/bs/dictionary/list", { pageNumber, pageSize }, "post");

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
    "/bs/bsReportConfig/save",
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
    "/bs/bsReport/save",
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

export const manageGet = () => axios("/manage");
