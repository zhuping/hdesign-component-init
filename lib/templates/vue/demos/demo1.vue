<template>
  <div class="page-example-demo">
    write component demo here.
  </div>
</template>

<script>
import { <%=componentNameUpper %> } from '@huobi/hdesign-vue-mobile';
export default {
  name: '<%=componentName %>-demo',
  components: {
    [<%=componentNameUpper %>.name]: <%=componentNameUpper %>,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="less">
.page-example-demo {
  font-size: 51px;
  color: #000;
}
</style>