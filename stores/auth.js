
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return{
      user:{
        username:"",
        password:"",
      },
      authenticated: false,
      loading: false,
      errors: {
        username:"",
        password:"",
        login:"",
      },
    }
  },
  actions: {
    async authenticateUser() {
      this.loading=true
      const {$brorder} = useNuxtApp()
      let data=null
      try{
        data = (await $brorder("/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/ld+json' },
          body: this.user,
        })).token;
        if(data){
          const token = useCookie('token');
          token.value=data;
          this.authenticated = true; // set authenticated  state value to true
        }
      }catch (err) {
        console.log(err)
        this.errors.login="Invalid credentials";
        setTimeout(() => {
              this.errors.login = "";
            }, 3000);
      } finally {
        this.loading = false
      }
    },

    isUserValid() {
      if (this.user.username == "") {
        this.errors.username = "Invalid username";
        return false;
      }
      if (this.user.password == "") {
        this.errors.password = "Invalid password";
        return false;
      }
      return true;
    },

    logUserOut() {
      this.token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      this.token = null; // clear the token cookie
    },
  },
});