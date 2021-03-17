<template>
  <el-carousel :interval="2000" type="card" height="300px">
    <el-carousel-item v-for="(item, index) in itemList" :key="index">
      <div style="text-align: center" @click="handleSelected(item, index)">
        <h3>{{ item.title }}</h3>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          key: 0,
          title: "犬儒主义",
          url: "",
        },
        {
          key: 1,
          title: "暂无专题",
          url: "",
        },
        {
          key: 2,
          title: "暂无专题",
          url: "",
        },
      ],
    };
  },
  methods: {
    handleSelected(item, index) {
      if (index === 0) {
        window.location.href = "./essay/2018-01-01.html";
      }
    },
  },
};
</script>
<style scoped>
.el-carousel__item h3 {
  font-size: 20px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #d3dce6;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #99a9bf;
}
</style>
