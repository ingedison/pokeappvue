<script la>
import {defineComponent} from 'vue'

export default defineComponent({
    setup() {
        const data=[]
        return{data}
    },
    props: {
     _showmodal: Boolean,
     _pokename:Object,
    },
      data: function () {
      return {
          showmodal:true,
          pokename:'',
          
          pokename:'',
          pokepeso:'',
          pokealtura:'',
          Poketipos:''
      }
  },
  mounted(){
  this.showmodal = this._showmodal;
  this.pokename = this._pokename;
  console.log(this._pokename); //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/2.png
  
        var self = this;
      //cargar datos de la api
        fetch('https://pokeapi.co/api/v2/pokemon/'+this._pokename.name)
        .then(response => response.json())
        .then(data => loadfunc(self,data));

  
  },
  methods: {
      closemodal: function(){
          this.$.appContext.app.unmount();
      }
  }
});
function loadfunc(instance, data){
          instance.data  = data;
          instance.pokename = instance.data.name;
          instance.pokealtura = instance.data.height;
          instance.pokepeso = instance.data.weight;
          console.log(instance.data);
}
</script>

<template v-if="showmodal">
    <div class="modalbg">
<div class="modal-dialog modal-md">
    <span tabindex="0"></span>
    <div id="my-modal___BV_modal_content_" tabindex="-1" class="modal-content">
        <header id="my-modal___BV_modal_header_" class="modal-header">
            <h5 id="my-modal___BV_modal_title_" class="modal-title"></h5>
            <div v-on:click="closemodal()" class="btn close" type="button" aria-label="Close">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0C5.81855 0 0 5.81855 0 13C0 20.1815 5.81855 26 13 26C20.1815 26 26 20.1815 26 13C26 5.81855 20.1815 0 13 0ZM19.3742 16.4125C19.6206 16.6589 19.6206 17.0573 19.3742 17.3036L17.2984 19.3742C17.052 19.6206 16.6536 19.6206 16.4073 19.3742L13 15.9355L9.5875 19.3742C9.34113 19.6206 8.94274 19.6206 8.69637 19.3742L6.62581 17.2984C6.37944 17.052 6.37944 16.6536 6.62581 16.4073L10.0645 13L6.62581 9.5875C6.37944 9.34113 6.37944 8.94274 6.62581 8.69637L8.70161 6.62056C8.94798 6.37419 9.34637 6.37419 9.59274 6.62056L13 10.0645L16.4125 6.62581C16.6589 6.37944 17.0573 6.37944 17.3036 6.62581L19.3794 8.70161C19.6258 8.94798 19.6258 9.34637 19.3794 9.59274L15.9355 13L19.3742 16.4125Z" fill="black"/>
</svg>    
            </div></header>
            <div id="my-modal___BV_modal_body_" class="modal-body">NOMBRE: {{pokename}} <br/>
                PESO: {{pokepeso}}<br/> 
                ALTURA: {{pokealtura}} <br/>
                Tipos: {{Poketipos}} <br/>
            </div>
            </div><span tabindex="0"></span></div>
    </div>
</template>
<style>
.modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
}

.modal-content{
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3rem;
    outline: 0;
        margin-top: 50px;
}
.modal-header{
    width: 100%;   
}
.btn{
    float:right;
    background: none;
    border:0;
    cursor:pointer;
}
.modal-dialog {
    position: relative;
    width: auto;
    margin: auto;
    pointer-events: none;
}
.modalbg{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: black;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    overflow-y: auto;
    overflow-x: hidden;
    transition: opacity .15s linear;
    background: #FFFFFF99;
    backdrop-filter: blur(-100px);
    box-shadow: 3px 3px 6px #00000044;
}

</style>