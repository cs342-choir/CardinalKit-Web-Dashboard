<template>
  <section class="wrapper-login">
    <Card>
      <template v-slot:card-header>
        <Logo :className="'flex justify-center mb-3'" :width="'145'"></Logo>
        <h1 class="text-3xl text-center">SIGN IN</h1>
      </template>
      <template v-slot:card-body>
        <form class="login-form" @submit.prevent="handleSubmitLogin" >
          <div class="form-group">
            <label for="email">Email Address</label>
            <input class="form-input" type="email" placeholder=""
            id="email" v-model="email"/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-input" type="password" placeholder=""
            id="password" v-model="password"/>
            <router-link to="#" class="ev-link forgot">Forgot Password?</router-link>
          </div>
          <button class="btn btn-eventtia" type="submit">Log in</button>
        </form>
      </template>
      <template v-slot:card-footer>
        <div class="text-center">
          <span class="ft-10">Not a member? </span>
          <router-link class="ev-link" to="/signup">Sign up</router-link>
        </div>
      </template>
    </Card>
  </section>
</template>
<script>

import Logo from '@/components/auth/Logo';
import Card from '@/components/auth/Card';
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      email:'',
      password:''
    }
  },
  components:{
    Logo,
    Card
  },
  methods:{
    ...mapActions('auth',['SignIn']),
    handleSubmitLogin(){
      this.SignIn({ email: this.email, password: this.password });
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper-login {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  height: 100vh;
  background: rgba(66,10,67,0.70);

  .login-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 2rem;

      .form-group{
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;

        label {
          text-align: start;
          margin-bottom: 3px;
          font-size: 10pt;
        }
        input {
          margin-bottom: .5rem;
        }

        a {
          width: 100%;
          display: flex;
          justify-content: flex-end;

          &.forgot {
            font-size: 10pt;
          }
        }
      }
  }
}
</style>
