<template>
	<section>
		<Header 
			:src-logo="logo" 
			className="bg-danger"
			brandTitle="CardinalKit" 
			logout 
			width-logo="50" 
			@handle-logout="handleLogout" 
			:menu="menu" 
		/>
		<div>
			<router-view/>
		</div>
	</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/auth/Header';
export default {
  components: {
    Header
  },
  data: function () {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  computed:{
    ...mapGetters("user", ["getUserRol"]),
    menu(){
      let main = [{ name: 'Home', route: '/'}]
      if(this.getUserRol=="superAdmin"){
        main.push({name: 'Register doctors', route:'/register'})
      }
      return main;
    }
  },
  methods: {
    ...mapActions("auth", ["Logout"]),
    handleLogout() {
      this.Logout().then(() => {
        console.log("Called Logout");
        this.$router.push("Login");
      });
    },
  },
};
</script>

<style>

</style>