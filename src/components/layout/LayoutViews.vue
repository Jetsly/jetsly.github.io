<template>
    <div class="views">
        <slot></slot>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss">
    .layout .views {
        height: 100%;
        flex: auto;
        text-align: center;
        .phone {
            height: 100%;
        }
    }
</style>
