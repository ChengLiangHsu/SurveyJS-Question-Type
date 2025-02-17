<script setup>
import { RouterView } from "vue-router";

import zhTw from "element-plus/dist/locale/zh-tw.mjs";

onMounted(() => {
  const character = `
    ╔═╗╦═╗╔═╗╔╗╔╔╦╗╔═╗╔╗╔╔╦╗
    ╠╣ ╠╦╝║ ║║║║ ║ ║╣ ║║║ ║║
    ╚  ╩╚═╚═╝╝╚╝ ╩ ╚═╝╝╚╝═╩╝
    ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
    ║ ║╣ ║║║╠═╝║  ╠═╣ ║ ║╣ 
    ╩ ╚═╝╩ ╩╩  ╩═╝╩ ╩ ╩ ╚═╝
    ver. 1.1.1
  `;
  console.log(character);
});
</script>

<template>
  <el-config-provider :locale="zhTw">
    <RouterView />
  </el-config-provider>
</template>
