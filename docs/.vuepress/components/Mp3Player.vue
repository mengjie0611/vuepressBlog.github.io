<template>
  <div class="mp3-player">
    音乐
    <el-switch
        v-model="isPlay"
        @change="play">
    </el-switch>
    <audio ref="music" loop>
      <source
          src="../public/mp3/7 Years - Lukas Graham.mp3"
          type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogTableVisible: false,
        isPlay: false,
      }
    },
    methods: {
      play() {
        if (this.$refs.music.paused) {
          this.$refs.music.play()
        } else {
          this.$refs.music.pause()
        }
        this.isPlay = !this.$refs.music.paused
      }
    }
  }
</script>

<style scoped>
  .mp3-player {
    margin-left: 20px;
    margin-right:20px;
  }
</style>