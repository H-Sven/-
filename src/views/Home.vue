<template>
  <div class="home">
    <img src="../assets/images/logo.png" alt="" srcset="">
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {
    
  },
  data(){
    return {
      
    }
  },
  created() {
    
  },
  mounted () {
    this.$get('/user/getUserInfo',{}).then(res=>{
      if (!res.code) {
        console.log(res);
      }else{
        console.log(res.code);
      }
    })
  }
};
</script>
