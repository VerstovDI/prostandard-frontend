<template>
  <div id="root">
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  background-image: url("../src/assets/MephiBlur.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#content {
  flex: 1 0 auto;
}
</style>
