<template>
<div>
    <div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">Nombre: {{Usuario.username}}</h5>
    <p class="card-text">Correo: {{Usuario.email}}</p>
    <p class="card-text"><small class="text-muted"></small></p>
  </div>
</div>
</div>

</template>

<script>
import axios from 'axios'
export default{
    data() {
        return {
           Usuario:'', 
        }
    },
    methods:{
        getUserData(){
            axios.get('https://djangoapiyo.herokuapp.com/auth/profile').then(response=>this.Usuario=response.data)
        }
    },
    mounted(){
        this.getUserData();
    }
}
</script>