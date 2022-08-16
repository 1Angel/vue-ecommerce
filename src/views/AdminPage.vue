<template>
    <div>
        <center>
            <div class="card" style="width: 18rem;" v-for="usuario in usuarios" :key="usuario.id">
            <router-link :to="{name: 'admindetail', params:{id:usuario.id}}">
                <div class="card-body">
                    <h5 class="card-title">{{ usuario.id }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ usuario.username }}</h6>
                    <p class="card-text">{{ usuario.email }}</p>

                </div>
                </router-link>
            </div>
            <div>
                    <router-link :to="{name: 'AdminCreate'}">Pulsa aqui para crear un nuevo usuario</router-link>

            </div>
        </center>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            usuarios: ''
        }
    },
    methods: {
        verUsuario() {
            axios.get('https://djangoapiyo.herokuapp.com/auth/list/').then(response => this.usuarios = response.data)
        }
    },
    mounted() {
        this.verUsuario()
    }

}
</script>