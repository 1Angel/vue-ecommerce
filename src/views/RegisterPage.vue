<template>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3 card">
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Username</label>
        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="username" v-model="username">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
          v-model="password">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password Confirmation</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password Confirmation"
          v-model="password2">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

  </div>


</template>

<script>
export default{
    data(){
        return{
            username:'',
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            password2:'',
        }
    },
    methods: {
        register(){
            this.$store.dispatch('register',{
                username: this.username,
                email: this.email,
                password: this.password,
                password2: this.password2,
            }).then(()=>{
                this.$router.push({name: 'home'})
            })
        }
    },
}
</script>