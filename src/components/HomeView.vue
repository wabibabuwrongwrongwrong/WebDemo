<template>
  <div class="common-layout" style="display: center;">
    <el-affix :offset="0">
    <el-container style="background-color: white">
      <el-header class="main-header clearfix toolbar">
        <span class="header-logo leftfix clearfix">
          <img src="../assets/logo.png" alt="logo" width="40" height="40" class="leftfix">
          <div class="leftfix" style="line-height: 40px;font-size: 20px;margin-left: 10px;font-weight: bold;">判题系统</div>
        </span>
        <span class="header-navigator rightfix ">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :ellipsis="false"
          >
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-menu-item index="2">Info</el-menu-item>
            <el-menu-item index="3">Workspace</el-menu-item>
          <!-- user头像和ID -->
            <el-menu-item index="4">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span>&nbsp;&nbsp;</span>
              <span>user-ID</span>

            </el-menu-item>
          </el-menu>
        </span>
      </el-header>
    </el-container>
    </el-affix>
     
    <!-- 侧边栏 -->
    <div class="aside">
      <el-aside width="220px">
        <!-- 侧边导航 -->
        <el-menu 
          background-color="#8aceff"
          text-color="#ffffff"
          router
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="vertical"
          @select="handleSelect"
          :ellipsis="false"
        >
          <el-menu-item @click="TestClick">Processing Center</el-menu-item>
          <el-menu-item >Info</el-menu-item>
          <!-- <el-menu-item index="3">Workspace</el-menu-item> -->
        </el-menu>

      </el-aside>
    </div>
  </div>

</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },      
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      TestClick() {
        alert('');
      }
  
    },

  }
</script>

<style>
  .main-header{
    border-bottom:1px solid #dcdfe6;
  }
  .el-main{
    background-color: lightblue;
  }
  .header-logo{
    margin-top: 10px;
  }
  .headernavigator{
    float: right;
  }
  .aside {
    height:900px;
      width: 200px;
      background-color: #0080c9;
      overflow: hidden;
  }
  .el-aside {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
  }

</style>

