import {toRefs, ref, reactive, onMounted} from 'vue';
import { dataStore } from '@/stores/data'
export function all(){

    const mark = (ev, item, index, vinstance) => {
        let obj = {
            'name': item.name,
            'url': item.url,
            'fav': !item.fav,
            '_index': item._index
        }
        vinstance.store.data.splice(item._index, 1, obj);
        if (vinstance.serachkey!=''){
            var _newindex = vinstance.filteredArray.map(function(e) {
                return e._index;
            }).indexOf(item._index);

        //let _newindex = Array.from(vinstance.filteredArray).indexOf(obj);
        vinstance.filteredArray.splice(_newindex, 1, obj);
        }
        else{
            vinstance.filteredArray.splice(item._index, 1, obj);
        }
        vinstance.$forceUpdate();
    }
    return {mark};
}



export function favs() {
    let store = dataStore();
    //let filtered_dat = ref([]);
    //let has_favs=ref(false);

    let state = reactive({
        filtered_dat: [],
        has_favs: false
      });

    const unmark = (ev, item, index) => {
            var obj = {
                'name': item.name,
                'url': item.url,
                'fav': !item.fav,
                '_index': item.index
            }
            console.log(obj);
            store.data.splice(item.index, 1, obj);
            state.filtered_dat.splice(index, 1)
            
            console.log(state.filtered_dat.length);
            if (state.filtered_dat.length == 0) 
                state.has_favs=false;
            else
                state.has_favs=true;
  
            console.log(store.data);
           // this.$forceUpdate();
    }

    const getfavs = () => {
        state.filtered_dat = [];
        state.has_favs=false;
        if (store.data.length>0){ //!==undefined){
          for (var i=0; 
            i<store.data.length; i++){
              if(store.data[i].fav){
                state.filtered_dat.push({'name':store.data[i].name, 'url': store.data[i].url, 'fav':store.data[i].fav, 'index':i});
                state.has_favs=true;
              }
          }
        }
        onMounted(() => {
            getfavs();
        });
    }
return  {...toRefs(state),getfavs,unmark,store}  //filtered_dat,has_favs,getfavs,store
}

export function fetchapi(){
    const baseurl = "https://pokeapi.co/api/v2/";
    //let gstore = ref(dataStore())
    let store = dataStore();

    let state = reactive({
        showLoading: true,
        showlist: false
      });

    /*let showLoading =reactive(true);
    let showlist =reactive(false);*/

    onMounted(() => {
        const endpoint = baseurl+'pokemon'
        var self = this;
        //fetchData(endpoint);9
        console.log("que pasa aquí");
        console.log(Array.from(store.data));

        if ((store.data).length > 0) {
            state.showLoading= false;
            state.showlist=true;
        }
        else{  
        //cargar datos de la api
        store.data = [];
        fetchData(endpoint);
    } 
    });

    const fetchData = async (endpoint) => {
        store.data = [];
            fetch(endpoint)
            .then(response => response.json())
            .then(data => loadfunc(data.results));

        setTimeout(() => {
            store.teststring = "gualanda";
            state.showLoading = false;
            state.showlist = true;
            console.log(store.data);
            console.log("se ejecutó load, list"+ state.showLoading+state.showlist);
        }, 5000);
    }
    const loadfunc = (data) => {
        var _data = [];
        Array.prototype.push.apply(_data, data);
          for (var i=0; i<_data.length; i++){
                console.log(_data[i].name);
                store.data.push({'name':data[i].name, 'url': data[i].url, 'fav':false, '_index':i})
              }
        }

    return {
        store,...toRefs(state)
    }
}