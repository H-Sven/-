<template>
  <div class="m_header">
    
  </div>
</template>
   
<script>
   
export default {
  inject:['reload'],
  name : 'header',
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    // 国际化
    changeLang(name){
      this.language = this.$utils.filterLangName(name)
      this.$store.commit('changeLangEvent',name);
      this.reload();
    },
  }
}
</script>
<style lang='less'>
 
</style>