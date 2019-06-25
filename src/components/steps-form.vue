<template>
  <div class="steps-form">
    <el-steps :active="active" finish-status="success" simple style="margin:20px 0;">
      <el-step v-for="(item,index) in steps" :key="index" :title="item"/>
    </el-steps>

    <el-form
      :model="caseForm"
      :inline="true"
      :rules="rules"
      ref="ruleForm"
      class="form"
      v-show="active === 0"
    >
      <el-form-item label="案件名称：" :label-width="labelW" prop="name" class="form-item">
        <el-input v-model="caseForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="案件编号：" :label-width="labelW" class="form-item" prop="code">
        <el-input v-model="caseForm.code" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="类型：" :label-width="labelW" prop="type" class="form-item">
        <el-select v-model="caseForm.type" placeholder="请选择案件类型" style="width: 202px">
          <el-option
            v-for="option in caseType"
            :key="option.code"
            :label="option.value"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="详细地点：" :label-width="labelW" class="form-item" prop="happenAddress">
        <el-input v-model="caseForm.happenAddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发生区域：" :label-width="labelW" prop="areaId" class="form-item">
        <el-cascader style="width:202px;" v-model="areaId" :options="area" @change="areaChange"></el-cascader>
      </el-form-item>
      <el-form-item label="发生时间：" label-width="130px" prop="happenTime">
        <el-date-picker
          style="width:202px;"
          v-model="caseForm.happenTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="负责人：" :label-width="labelW" prop="managerName" class="form-item">
        <el-input v-model="caseForm.managerName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态：" :label-width="labelW" class="form-item">
        <el-radio-group v-model="caseForm.state" size="medium">
          <el-radio-button label="0">未破案</el-radio-button>
          <el-radio-button label="1">已破案</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="案件内容：" :label-width="labelW" prop="content" class="content">
        <el-input
          type="textarea"
          style="width:100%;"
          maxlength="200"
          show-word-limit
          :autosize="{ minRows: 3}"
          placeholder="请输入内容"
          v-model="caseForm.content"
        ></el-input>
      </el-form-item>

      <el-form-item label="附件：" label-width="130px" class="upload">
        <el-upload
          multiple
          class="upload-demo"
          accept=".zip, .jpg, .jpeg, .rar, .png, .7z, .doc, .docx, .xls, xlsx, .ppt, .pptx"
          ref="upload"
          action
          :on-change="handleChange"
          :before-remove="handleRemove"
          :on-preview="handlePreview"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传Word/Excel/PPT/图片/压缩文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
    </el-form>

    <section v-show="active === 1" class="active">
      <el-form
        v-for="(item,i) in drugForm"
        :key="`editDrugForm${i}`"
        :rules="rules"
        :inline="true"
        class="drug-form"
      >
        <el-form-item
          label="毒品类型："
          :label-width="labelW"
          prop="drugId"
          class="form-item"
        >{{item.drugName}}</el-form-item>
        <el-form-item label="毒品数量：" :label-width="labelW" class="form-item" prop="drugcount">
          <el-input v-model="item.drugCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="labelW" class="form-item">
          <el-button type="primary" @click="addDrugitem">新增</el-button>
          <el-button type="info" @click="delDrug(i)">删除</el-button>
        </el-form-item>
      </el-form>

      <el-form
        v-for="(item,i) in addDrugForm"
        :key="`addDrugForm${i}`"
        :inline="true"
        class="drug-form"
        :rules="rules"
      >
        <el-form-item label="毒品类型：" :label-width="labelW" class="form-item" prop="drugId">
          <el-select v-model="item.drugId" placeholder="请选择毒品类型" style="width: 202px">
            <el-option
              v-for="option in drugList"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毒品数量：" :label-width="labelW" class="form-item" prop="drugcount">
          <el-input v-model="item.drugCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="labelW" class="form-item">
          <el-button type="primary" @click="addDrugitem">新增</el-button>
          <el-button type="info" @click="delDrugitem(i)">删除</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section v-show="active === 2" class="active">
      <el-form
        v-for="(item,i) in personForm"
        :key="`personForm${i}`"
        :rules="rules"
        :inline="true"
        class="person-form"
      >
        <el-form-item label="嫌疑人名称：" :label-width="labelW" prop="personName">
          <el-input v-model="item.personName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" :label-width="labelW" prop="personIdcard">
          <el-input v-model="item.personIdcard" autocomplete="off" maxlength="18" minlength="18"></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="labelW">
          <el-radio-group v-model="item.personSex" size="medium">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="2">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="程度：" :label-width="labelW">
          <el-radio-group v-model="item.personGrade" size="medium">
            <el-radio-button label="10">低</el-radio-button>
            <el-radio-button label="20">中</el-radio-button>
            <el-radio-button label="30">高</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="labelW">
          <el-button type="primary" @click="addPersonitem">新增</el-button>
          <el-button type="info" @click="delPerson(i)">删除</el-button>
        </el-form-item>
      </el-form>

      <el-form
        v-for="(item,i) in addPersonForm"
        :key="`addPersonForm${i}`"
        :rules="rules"
        :inline="true"
        class="person-form"
      >
        <el-form-item label="嫌疑人名称：" :label-width="labelW" prop="personName">
          <el-input v-model="item.personName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" :label-width="labelW" prop="personIdcard">
          <el-input v-model="item.personIdcard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="labelW">
          <el-radio-group v-model="item.personSex" size="medium">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="2">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="程度：" :label-width="labelW">
          <el-radio-group v-model="item.personGrade" size="medium">
            <el-radio-button label="10">低</el-radio-button>
            <el-radio-button label="20">中</el-radio-button>
            <el-radio-button label="30">高</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="labelW">
          <el-button type="primary" @click="addPersonitem">新增</el-button>
          <el-button type="info" @click="delPersonitem(i)">删除</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section v-show="active === steps.length" class="success">
      <div class="i">
        <i class="el-icon-check"></i>
      </div>
      <div class="title">提交成功</div>
      <el-button type="info" @click="info">返回列表</el-button>
    </section>

    <footer v-show="active !== steps.length">
      <el-button type="success" @click="success">提交</el-button>
      <!-- <el-button type="success" @click="skip" v-show="active !== 0">跳过</el-button> -->
      <el-button type="info" @click="info">取消</el-button>
    </footer>

    <el-dialog title="温馨提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span style="text-align:center;">确认需要删除该文件吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delFile">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
import { axiosRest, axiosFiles, axiosUrl, drug } from "../api";
import { getFullArea, getAreaName } from "../utils/areautils";
import { format } from "../utils/date";
import { Message } from "element-ui";
export default {
  name: "steps-form",
  props: {
    caseType: Array,
    apiShow: String,
    api: Array,
    caseDetail: Object
  },
  watch: {
    async caseDetail() {
      const caseForm = this.caseDetail.case;
      this.id = caseForm.id;
      this.areaId = getFullArea(caseForm.areaId, this.area);
      caseForm.happenTime = format(caseForm.happenTime, "yyyy-MM-dd");
      if (caseForm.fileId) {
        let fileResult = await axiosRest("/attachment/getFileList",{ relationId: caseForm.fileId },"get");
        fileResult.data.forEach(d => (d.name = d.oldFileName));
        this.fileList = fileResult.data;
      }
      this.caseForm = {
        name: caseForm.name,
        type: caseForm.type.toString(),
        code: caseForm.code,
        content: caseForm.content,
        happenAddress: caseForm.happenAddress,
        areaName: caseForm.areaName,
        areaId: caseForm.areaId,
        state: caseForm.state,
        managerName: caseForm.managerName,
        happenTime: caseForm.happenTime,
        fileId: caseForm.fileId
      };
      const caseDrug = this.caseDetail.caseDrugs;
      caseDrug.forEach(d => {
        this.drugForm.push({
          id: d.id,
          drugCount: !!d.drugCount ? d.drugCount : 0,
          drugName: d.drugName
        });
      });
      const casePerson = this.caseDetail.casePersons;

      casePerson.forEach(d => {
        this.personForm.push({
          personIdcard: d.personIdcard,
          personName: d.personName,
          personSex: d.personSex,
          personGrade: d.personGrade,
          id: d.id,
          caseId: this.id
        });
      });
    }
  },
  data() {
    return {
      labelW: "130px",
      steps: ["案件基本信息", "毒品信息", "案件嫌疑人", "提交成功"],
      active: 0,
      centerDialogVisible: false,
      fileList: [],
      delFileId: "",
      areaId: [],
      type: [],
      drugList: [],
      caseFiles: [],
      caseForm: {
        name: "",
        type: "",
        code: "",
        content: "",
        happenAddress: "",
        areaName: "",
        areaId: "",
        state: 0,
        managerName: "",
        happenTime: "",
        fileId: ""
      },
      id: "",
      drugForm: [],
      addDrugForm: [],
      delDrugForm: [],
      personForm: [],
      addPersonForm: [],
      delPersonForm: [],
      rules: {
        name: [{ required: true, message: "请输入案件名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入案件编号", trigger: "blur" }],
        type: [{ required: true, message: "请选择案件类型", trigger: "blur" }],
        content: [
          { required: true, message: "请输入案件内容", trigger: "blur" }
        ],
        happenAddress: [
          { required: true, message: "请输入案件发生详细地点", trigger: "blur" }
        ],
        areaId: [
          { required: true, message: "请选择案件发生区域", trigger: "blur" }
        ],
        happenTime: [
          { required: true, message: "请选择案件发生时间", trigger: "blur" }
        ],
        managerName: [
          { required: true, message: "请输入负责人名称", trigger: "blur" }
        ],
        drugId: [{ required: true, message: "请选择毒品类型", trigger: "blur" }]
      }
    };
  },
  components: {},
  computed: {
    ...mapGetters("dictionaries", {
      area: "Area"
    })
  },
  methods: {
    async success() {
      if (this.apiShow === "add") {
        switch (this.active) {
          case 0:
            this.api[0].add(this.caseForm).then(d => {
              if (d.ret === "200") {
                this.id = d.data;
                Message.success({
                  message: "提交成功",
                  center: true
                });
                this.addDrugForm.push({
                  drugId: "",
                  caseId: this.id,
                  drugCount: ""
                });
                this.addPersonForm.push({
                  personName: "",
                  personIdcard: "",
                  personSex: "1",
                  personGrade: "10",
                  caseId: this.id
                });
                ++this.active;
              }
            });
            break;
          case 1:
            let ret = 0;
            this.addDrugForm.forEach(d =>
              this.api[1].add(d).then(d => {
                if (d.ret === "200") {
                  ret++;
                }
                if (ret === this.addDrugForm.length) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  ++this.active;
                }
              })
            );
            break;
          case 2:
            let retz = 0;
            this.addPersonForm.forEach(d =>
              this.api[2].add(d).then(d => {
                if (d.ret === "200") {
                  retz++;
                }
                if (retz === this.addDrugForm.length) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  this.active += 2;
                }
              })
            );
            break;
          default:
            break;
        }
      } else if (this.apiShow === "edit") {
        switch (this.active) {
          case 0:
            this.api[0].update({ ...this.caseForm, id: this.id }).then(d => {
              if (d.ret === "200") {
                Message.success({
                  message: "提交成功",
                  center: true
                });
                if (this.drugForm.length === 0) {
                  this.addDrugForm.push({
                    drugId: "",
                    caseId: this.id,
                    drugCount: ""
                  });
                }
                if (this.personForm.length === 0) {
                  this.addPersonForm.push({
                    personName: "",
                    personIdcard: "",
                    personSex: "1",
                    personGrade: "10",
                    caseId: this.id
                  });
                }
                ++this.active;
              }
            });
            break;
          case 1:
            let ret = 0;
            await this.delDrugForm.forEach(d =>
              this.api[1].del(d).then(d => {
                if (d.ret === "200") {
                  ret++;
                }
                if (
                  this.drugForm.length +
                    this.addDrugForm.length +
                    this.delDrugForm.length ===
                  ret
                ) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  this.active++;
                }
              })
            );
            await this.addDrugForm.forEach(d =>
              this.api[1].add(d).then(d => {
                if (d.ret === "200") {
                  ret++;
                }
                if (
                  this.drugForm.length +
                    this.addDrugForm.length +
                    this.delDrugForm.length ===
                  ret
                ) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  this.active++;
                }
              })
            );
            await this.drugForm.forEach(d =>
              this.api[1].update(d).then(d => {
                if (d.ret === "200") {
                  ret++;
                }
                if (
                  this.drugForm.length +
                    this.addDrugForm.length +
                    this.delDrugForm.length ===
                  ret
                ) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  this.active++;
                }
              })
            );
            if (
              this.drugForm.length +
                this.addDrugForm.length +
                this.delDrugForm.length ===
              0
            ) {
              this.active++;
            }
            break;
          case 2:
            let retz = 0;
            this.personForm.forEach(d =>
              this.api[2].update(d).then(d => {
                if (d.ret === "200") {
                  retz++;
                }
                if (
                  this.personForm.length +
                    this.addPersonForm.length +
                    this.delPersonForm.length ===
                  retz
                ) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  this.active += 2;
                }
              })
            );
            this.delPersonForm.forEach(d =>
              this.api[2].del(d).then(d => {
                if (d.ret === "200") {
                  retz++;
                }
                if (
                  this.personForm.length +
                    this.addPersonForm.length +
                    this.delPersonForm.length ===
                  retz
                ) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  this.active += 2;
                }
              })
            );
            this.addPersonForm.forEach(d =>
              this.api[2].add(d).then(d => {
                if (d.ret === "200") {
                  retz++;
                }
                if (
                  this.personForm.length +
                    this.addPersonForm.length +
                    this.delPersonForm.length ===
                  retz
                ) {
                  Message.success({
                    message: "提交成功",
                    center: true
                  });
                  this.active += 2;
                }
              })
            );
            if (
              this.personForm.length +
                this.addPersonForm.length +
                this.delPersonForm.length ===
              0
            ) {
              this.active += 2;
            }
            break;
          default:
            break;
        }
      }
    },
    skip() {
      this.active += this.active < this.steps.length - 2 ? 1 : 2
    },
    info() {
      this.$emit("setShow", false);
      this.active = 0;
      this.centerDialogVisible = false;
      this.fileList = [];
      this.delFileId = "";
      this.areaId = [];
      this.caseForm = {
        name: "",
        type: "",
        code: "",
        content: "",
        happenAddress: "",
        areaName: "",
        areaId: "",
        state: 0,
        managerName: "",
        happenTime: "",
        fileId: ""
      };
      this.id = "";
      this.drugForm = [];
      this.addDrugForm = [];
      this.delDrugForm = [];
      this.personForm = [];
      this.addPersonForm = [];
      this.delPersonForm = [];
    },
    addDrugitem() {
      if (this.addDrugForm.length + this.drugForm.length <= 7) {
        this.addDrugForm.push({ drugId: "", caseId: this.id, drugCount: "" });
      } else {
        Message.success({
          message: "最多添加8条",
          center: true
        });
      }
    },
    delDrugitem(i) {
      this.addDrugForm.splice(i, 1);
    },
    delDrug(i) {
      this.delDrugForm.push({ id: this.drugForm[i].id });
      this.drugForm.splice(i, 1);
    },
    addPersonitem() {
      if (this.addPersonForm.length + this.personForm.length <= 7) {
        this.addPersonForm.push({
          personName: "",
          personIdcard: "",
          personSex: "1",
          personGrade: "10",
          caseId: this.id
        });
      } else {
        Message.success({
          message: "最多添加8条",
          center: true
        });
      }
    },
    delPersonitem(i) {
      this.addPersonForm.splice(i, 1);
    },
    delPerson(i) {
      this.delPersonForm.push({ id: this.personForm[i].id });
      this.personForm.splice(i, 1);
    },
    areaChange(obj) {
      this.caseForm.areaId = obj[obj.length - 1];
    },
    handleChange(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      } else {
        this.caseFiles = fileList;
      }
      return isLt10M;
    },
    handleRemove(file, fileList) {
      if (file.id) {
        this.centerDialogVisible = true;
        this.delFileId = file.id;
        return false;
      }
      this.caseFiles = fileList;
    },
    handlePreview(file) {
      if (file.id)
        window.open(axiosUrl() + "/attachment/downloadFile?attId=" + file.id);
    },
    async delFile() {
      let result = await axiosRest(
        "/attachment/delFile",
        { attId: this.delFileId },
        "get"
      );
      if (result.ret == "200") {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].id == this.delFileId) {
            this.fileList.splice(i, 1);
          }
        }
        this.$message({
          message: "删除成功！",
          type: "success",
          center: true
        });
      }
      this.centerDialogVisible = false;
    }
  },

  created() {
    this.$store.dispatch("dictionaries/getArea", { levelCity: "4503" });
    drug.list({ pageNum: 1, pageSize: 100 }).then(d => {
      this.drugList = d.data.list;
    });
  }
};
</script>

<style lang="stylus" scoped>
.steps-form {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  left: 0;
  top: 0;
}

.form {
  width: 100%;
  height: calc(100% - 120px);
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-auto-columns: 33.3%;
  grid-template-rows: 60px 60px;
  grid-auto-rows: 70px;
  min-width: 1090px;
}

.drug-form {
  width: 100%;
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-auto-columns: 33.3%;
  grid-template-rows: 60px;
  grid-auto-rows: 70px;
  min-width: 1090px;
  justify-items: center;
}

.person-form {
  width: 100%;
  display: grid;
  grid-template-columns: 343px 343px 320px 320px 1fr;
  grid-template-rows: 60px;
  min-width: 1090px;
  justify-items: center;
}

.active {
  min-width: 100%;
  min-height: calc(100% - 120px);
}

.form-item {
  width: 340px;
}

.upload {
  width: 100%;
  grid-column: 1 / 4;
}

.content {
  grid-column: 1 / 4;
  grid-row-end: span 2;
  width: 100%;
}

.success {
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 250px;
  text-align: center;

  .i {
    width: 100px;
    height: 100px;
    transform: translateX(50px);
    border-radius: 50% 50%;
    background-color: #67C23A;

    i {
      line-height: 100px;
      color: #ffffff;
      font-size: 66px;
      font-weight: 700;
    }
  }

  .title {
    color: #67C23A;
    font-size: 40px;
    margin: 20px;
  }
}

footer {
  display: flex;
  justify-content: flex-end;
}
</style>
