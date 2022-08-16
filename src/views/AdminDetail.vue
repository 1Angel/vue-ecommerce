<template>
    <div>
        <center>
            <div class="mx-auto mt-5" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ usuario.id }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ usuario.username }}</h6>
                    <p class="card-text">{{ usuario.email }}</p>
                    <a href="#" class="card-link" @click="eliminarUsuario">Eliminar</a>
                </div>
            </div>
            <div>
                    <v-app>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>
                Editar Usuario
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="email" prepend-icon="mdi-account-circle" label="Email"></v-text-field>
                                        <v-text-field v-model="username" prepend-icon="mdi-account-circle" label="username"></v-text-field>
                                                            <v-text-field v-model="password" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'" :type="showPassword ? 'text': 'password'" label="Password" @click:append="showPassword = !showPassword"></v-text-field>


                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue" type="submit" @click="EditarUsuario">Editar</v-btn>
            </v-card-actions>
        </v-card>

    </v-app>
            </div>
        </center>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    data() {
        return {
           usuario:'',
           email:"",
           password:"",
           username:''
        }
    },
    methods:{
        verId(){
            this.usuario = this.$route.params.id
            axios.get('https://djangoapiyo.herokuapp.com/auth/list/'+this.usuario).then(response => this.usuario = response.data)
        },
        eliminarUsuario(){
                        this.usuario = this.$route.params.id

            axios.delete('https://djangoapiyo.herokuapp.com/auth/list/'+this.usuario).then(()=>{
                this.$router.push({name: 'home'})
            })
        },
        EditarUsuario(){
            this.usuario = this.$route.params.id
            axios.put('https://djangoapiyo.herokuapp.com/auth/list/'+this.usuario,{
                username:this.username,
                email:this.email,
                password:this.password
            }).then(()=>{
                this.$router.push({name: 'admin'})
            })
        }
    },
    mounted(){
        this.verId();
    }
}
</script>