<template>
    <div class="compts">
        <ul>
            <li v-for="(item,idx) in comptsName" class="draggable" v-draggable="item.key">
                <span class="name">{{item.compt.displayName}}</span>
                <span class="drag-label"><icon name="arrows"></icon>拖动</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import 'vue-awesome/icons/arrows'
    import Icon from 'vue-awesome/components/Icon'
    export default {
      components: {
        Icon
      },
      props: {
        comptsName: {
          type: Array
        }
      }
    }
</script>
<style lang="scss">
    .layout .compts {
        box-sizing: border-box;
        padding: 9px 15px;
        width: 200px;
        height: 100%;
        background: #ccc;
        .draggable {
            position: relative;
            display: flex;
            flex-direction: row;
            color: #666;
            font-size: 12px;
            line-height: 22px;
            padding: 5px;
            overflow: hidden;
            border-radius: 5px;
        }
        .name {
            flex: auto;
        }
        .drag-label {
            cursor: pointer;
            width: 60px;
            text-align: center;
            padding: 4px;
            font-weight: bold;
            line-height: 14px;
            color: #fff;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            background-color: #999;
            border-radius: 3px;
            box-sizing: border-box;
            .fa-icon {
                width: 14px;
                height: 14px;
                color: #000;
                margin-right: 5px;
                vertical-align: text-top;
            }
        }
    }
</style>
