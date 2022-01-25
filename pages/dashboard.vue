<template>
<div>

<p>Dashboard!!!</p>
  <button  type="button"></button></div>

</template>

<script>
export default {
middleware: 'auth',



methods: {

 btn(){
   console.log(this.$auth.user.email)
 }

},

}
</script>



<style>

</style>
