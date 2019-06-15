<template>
  <div>
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step  v-for="item in steps" :title="item.title"></el-step>
    </el-steps>
      <el-dialog :title="dialog_title" :visible.sync="informationShow" width="800px" :close-on-click-modal="false">

        <el-form :model="form"  :inline="true" :rules="rules" ref="ruleForm">
          <el-form-item label="情报名称：" label-width="130px" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="是否有效：" label-width="130px">
            <el-radio-group v-model="form.isEffective" size="medium">
              <el-radio-button label="0">新建</el-radio-button>
              <el-radio-button label="1">有效</el-radio-button>
              <el-radio-button label="2">无效</el-radio-button>
            </el-radio-group>        
          </el-form-item>

          <el-form-item label="情报区域：" label-width="130px" prop="areaId">
            <el-cascader style="width:202px;" v-model="areaId" :options="area" @change="areaChange"></el-cascader>
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

<script type="text/javascript">
export default {
  name: "steps-form",
  data() {
    return {
      steps: [
        {
          title: "基本信息"
        }
      ],
      active: 0
    };
  },
  components: {}
};
</script>

<style lang="stylus" scoped></style>
