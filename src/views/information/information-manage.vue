<template>
  <div class="information">
      <section>
        <header>
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" class="icon"></el-button>
          </el-input>
          <div>
            <el-button type="success" @click="add">增加</el-button>
            <!-- <el-button type="danger" @click="removes">删除</el-button> -->
          </div>
        </header>
        <List 
          :table="table"
          :tableData="tableData"
          :total="total"
          v-on:getList="getList"
          v-on:remove="remove"
          v-on:edit="edit"
          v-on:dblclick="dblclick"
          :selection="selection"
        v-if="!this.$route.query.id"/>
      </section>
      <el-dialog :title="dialog_title" :visible.sync="informationShow" width="800px" :close-on-click-modal="false">
        <el-form :model="form"  :inline="true" :rules="rules" ref="ruleForm">
          <el-form-item label="情报名称：" label-width="130px" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="情报录入人：" label-width="130px">
            <el-input v-model="form.receiver" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="提供人：" label-width="130px">
            <el-input v-model="form.provider" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="提供人联系方式：" label-width="130px">
            <el-input v-model="form.providerLink" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="情报区域：" label-width="130px" prop="areaId">
            <el-cascader style="width:202px;" v-model="areaId" :options="area" @change="areaChange"></el-cascader>
            <!-- <el-input v-model="form.areaId" autocomplete="off"></el-input>
            <el-input v-model="form.areaName" autocomplete="off"></el-input> -->
          </el-form-item>
          <el-form-item label="收集时间：" label-width="130px" prop="receiveTime">
            <el-date-picker style="width:202px;" v-model="form.receiveTime" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>

          <el-form-item label="是否有效：" label-width="130px">
            <el-radio-group v-model="form.isEffective" size="medium">
              <el-radio-button label="0">新建</el-radio-button>
              <el-radio-button label="1">有效</el-radio-button>
              <el-radio-button label="2">无效</el-radio-button>
            </el-radio-group>
            
          </el-form-item>
          <el-form-item label="状态：" label-width="130px">
            <el-radio-group v-model="form.status" size="medium">
              <el-radio-button label="0">未处理</el-radio-button>
              <el-radio-button label="1">已处理</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="情报内容：" label-width="130px" prop="content">
            <el-input type="textarea" style="width:550px;" maxlength="200" show-word-limit :autosize="{ minRows: 3}" placeholder="请输入内容" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="附件：" label-width="130px">
            <el-upload multiple 
            class="upload-demo"
            accept=".zip,.jpg,.jpeg,.rar,.png,.7z,.doc,.docx,.xls,xlsx,.ppt,.pptx"
            ref="upload"
            action=""
            :on-change="handleChange"
            :before-remove="handleRemove"
            :on-preview="handlePreview"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Word/Excel/PPT/图片/压缩文件，且不超过10M</div>
          </el-upload>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="informationShow = false">取 消</el-button>
          <el-button type="primary" @click="submitForm" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="loadingText" element-loading-background="rgba(10,10,10, 0.5)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="温馨提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span style="text-align:center;">确认需要删除该文件吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delFile">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import List from "../../components/pagelist";
import {axiosRest,axiosFiles,axiosUrl} from "../../api";
import {getFullArea,getAreaName} from "../../utils/areautils";
import {format} from "../../utils/date";
export default {
  name: "information-manage",
  data() {
    return {
      actionUrl:'',
      informationShow:false,
      centerDialogVisible:false,
      dialog_title:'新增情报',
      loadingText:"正在提交中...",
      input:"",
      fullscreenLoading: false,
      tableData: [],
      selection:[],
      total:0,
      fileList:[],
      delFileId:'',
      areaId:[],
      informationFiles:[],
      table: [
        {
          name: '情报名称',
          value: 'name'
        },
        {
          name: '情报区域',
          value: 'areaName'
        },
        {
          name: '提供者',
          value: 'provider'
        },
        {
          name: '收集者',
          value: 'receiver'
        },
        {
          name: '收集者联系方式',
          value: 'providerLink'
        },
        {
          name: '是否有效',
          value: 'isEffective',
          formatter:(row, column) =>{
            return row.isEffective == 1 ? '有效' : row.isEffective === 0 ? '未分析' : '无效';
          }
        },
        {
          name: '状态',
          value: 'status',
          formatter:(row, column) =>{
            return row.status == 1 ? '已处理' : '未处理';
          }
        }
      ],
      form:{
        id:'',
        name:'',
        areaId:'',
        areaName:'',
        provider:'',
        receiver:'',
        isEffective:0,
        status:0,
        providerLink:'',
        receiveTime:'',
        content:'',
        fileId:'',
      },
      rules:{
        name: [
            { required: true, message: '请输入情报名称', trigger: 'blur' },
          ],
        receiveTime: [
            { required: true, message: '请输入收集时间', trigger: 'blur' },
          ],
        content: [
            { required: true, message: '请输入情报内容', trigger: 'blur' },
          ],
        areaId: [
            { required: true, message: '请输入情报区域', trigger: 'blur' },
          ],
      }
      };
  },
  computed: {
    ...mapGetters("dictionaries", {
      area: "Area"
    })
  },
  components: {
    List
  },
  mounted() {},
  methods: {
    handleChange(file,fileList){
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!');
      }else{
        this.informationFiles = fileList;
      }
      return isLt10M;
    },
    handleRemove(file, fileList){
      if(file.id){
        this.centerDialogVisible = true;
        this.delFileId = file.id;
        return false;
      }
      this.informationFiles = fileList;
    },
    handlePreview(file){
      if(file.id)
      window.open(axiosUrl()+'/attachment/downloadFile?attId=' + file.id);
    },
    getAreaList(){
      this.$store.dispatch('dictionaries/getArea',{levelCity:'4503'});
    },
    areaChange(obj){
      this.form.areaId = obj[obj.length-1];
    },
    async delFile(){
      let result = await axiosRest("/attachment/delFile",{attId:this.delFileId},"get");
      if(result.ret == "200"){
        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i].id == this.delFileId){
            this.fileList.splice(i,1);
          }
        }
        this.$message({
          message: '删除成功！',
          type: 'success',
          center: true
        });
      }
      this.centerDialogVisible = false;

    },
    dblclick(row) {
      console.log(row);
    },
    async edit(row) {
      this.actionUrl = '/bsInformation/updateInformation';
      this.dialog_title = "编辑情报";
      this.informationShow = true;
      let result = await axiosRest("/bsInformation/detail",{id:row.id},"get");
      this.form = result.data.information;
      if(this.form.fileId){
        let fileResult = await axiosRest("/attachment/getFileList",{relationId:this.form.fileId},"get");
        fileResult.data.forEach(
          d =>
          (d.name = d.oldFileName)
        )
        this.fileList = fileResult.data;
        this.areaId = getFullArea(this.form.areaId,this.area);
      }
    },
    async remove(id) {
      let result = await axiosRest("/bsInformation/deleteInformation",{id:id},"get");
      if(result.ret == "200"){
        this.$message({
          message: '删除成功！',
          type: 'success',
          center: true
        });
      }
    },
    async getList(data){
      let result = await axiosRest("/bsInformation/list",data,"get");
      this.tableData = result.data.list;
      this.total = result.data.total;
    },
    add(){
      this.form = {
        id:'',
        name:'',
        areaId:'',
        areaName:'',
        provider:'',
        receiver:'',
        isEffective:0,
        status:0,
        providerLink:'',
        receiveTime:'',
        content:'',
        fileId:'',
      };
      this.dialog_title = "新增情报";
      this.informationShow = true;
      this.actionUrl = '/bsInformation/addInformation';
    },
    submitForm(){
      this.$refs.ruleForm.validate(valid => {
        if(valid){
          this.form.receiveTime = format(this.form.receiveTime,"yyyy-MM-dd");
          this.form.areaName = getAreaName(this.form.areaId,this.area);
          if(this.informationFiles && this.informationFiles.length >0){
            let informationFiles = [];
            this.informationFiles.forEach(element => {
              if(!element.id && element.raw){
                informationFiles.push(element.raw);
              }
            });
            this.informationFiles = informationFiles;
          }
          this.loadingText = '正在提交中...';
          this.fullscreenLoading = true;
          let app = this;
          axiosFiles(this.actionUrl,this.form,"informationFiles",this.informationFiles).then(function(data) {
            app.fullscreenLoading = false;
            if(data.ret == "200"){
              app.$message({
                message: '操作成功！',
                type: 'success',
                center: true
              });
              app.getList();
              app.informationShow = false;
            }
          });
        }
      })

    },
  },
  created: function(){
    this.getAreaList();
  }
};
</script>

<style lang="stylus" scoped>
.information
  box-sizing border-box
  width 100%
  width 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items center

section {
  box-sizing: border-box;
  background: #ffffff;
  width: 100%;
  min-height: 760px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  header {
    width: 100%;
    height: 40px;
    margin: 0 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .input-with-select {
      width: 240px;
    }

    .icon {
      color: #409EFF;
      font-size: 20px;
    }
  }
}
</style>