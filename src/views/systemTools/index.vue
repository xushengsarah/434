<template>
  <div class="main">
    <ul class="box">
      <li @click="goUrl('/theme')"><img src="@/assets/img/card_theme.png" /></li>
      <li @click="goUrl('/user')"><img src="@/assets/img/card_user.png" /></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goUrl (url) {
      this.$router.push(url)
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
  .box {
    overflow: hidden;
    margin-top: 20px;
    padding: 15px;
    > li {
      float: left;
      margin: 20px 10px 0 10px;
      cursor: pointer;
    }
  }
</style>
