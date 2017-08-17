<template>
    <a-scene>
        <a-sky src="#sky"></a-sky>
        <img id="door" src="../../assets/img/door.jpg">
        <img id="floor" src="../../assets/img/floor.jpg">
        </a-assets>
        <a-sky src="#door"></a-sky>
        <!-- <a-sky src="#floor"></a-sky> -->
    </a-scene>
</template>
<script>
    export default {
      mounted () {
        require('aframe')
      }
    }
</script>