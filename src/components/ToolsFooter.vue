<template>
    <div class="footer">
        <slot></slot>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss">
    .footer {
        background: #fff;
        padding-left: 10px;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        line-height: 50px;
        width: 100%;
        border-top: #DDD 1px solid;
        .name {
            padding: 0 5px 0 15px;
        }
        input,
        select {
            padding: 4px 7px;
            font-size: 12px;
            border: 1px solid #dddee1;
            border-radius: 4px;
            color: #495060;
            background-color: #fff;
        }
        .btn-down {
            padding: 4px 7px;
            font-size: 15px;
            border: 1px solid #dddee1;
            border-radius: 4px;
        }
    }
</style>
