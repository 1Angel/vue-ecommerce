<template>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3 card">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
      <router-link :to="{name: 'register'}">Registrate si no tienes cuenta</router-link>

  </div>


</template>

<script>
export default{
  data(){
    return{
      email:"",
      password:""
    }
  },
  methods: {
    login(){
      this.$store.dispatch('login',{
        email:this.email,
        password:this.password
      }).then(()=>{
        this.$router.push({name: 'home'})
      })
    }
},
}

</script>
