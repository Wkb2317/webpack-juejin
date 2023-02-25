<template>
  <div>App</div>
  <el-button type="primary">Primary</el-button>
  <ul>
    <li><router-link to="/home">home</router-link></li>
    <li><router-link to="/about">about</router-link></li>
  </ul>
  <router-view></router-view>
</template>

<script setup>
import { ElButton } from "element-plus";
</script>

<style lang="less"></style>
