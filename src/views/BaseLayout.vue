<template>
    <div id="base">
        <ImgContainer/>
        <BaseToolsBar/>
    </div>
</template>

<script>
import ImgContainer from "@/components/layers/ImgContainer.vue";
import BaseToolsBar from "@/components/bars/BaseToolsBar.vue";


export default {
    name: 'BaseLayout',
    components: {BaseToolsBar, ImgContainer}
}
</script>
