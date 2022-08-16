<template>

  <div class="card" style="width: 18rem;">
    <img class="card-img-top" :src="product.imagen" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <p class="card-text">${{ product.precio }}</p>

    </div>
    <div class="control">
      <button class="btn btn-primary" @click="addToCart">Agregar al carrito</button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      quantity:1,
      product: '',
    }

  },
  mounted: function () {
    this.product = this.$route.params.id;
    axios.get('https://djangoapiyo.herokuapp.com/productos/list/' + this.product).then(response => this.product = response.data)
  },
  methods:{
    addToCart(){
      if(isNaN(this.quantity||this.quantity<1)){
        this.quantity=1
      }
      const item = {
        product: this.product,
        quantity:this.quantity
      }
      this.$store.commit('AgregarCarro', item)
    }
  }
}

</script>