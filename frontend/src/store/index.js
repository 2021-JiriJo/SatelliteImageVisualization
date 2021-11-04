import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id:undefined
  },
  mutations: {
    set_user_id(state, payload){
      console.log(payload.user_id);
      state.user_id = payload.user_id;
    }
  },
  actions: {
    check_session(context){
      return axios.get('/login')
      .then(res=>{
        context.commit('set_user_id',{user_id: res.data});
          router.push('/map');
      })
      .catch(()=>{
    
      });
    },
    login(context,payload){
      return axios({
        headers:{withCredentials:true},
        method: 'post',
        url:`/login`,
        data:payload
        })
        .then((response)=>{
            if(response.status == 200){
                
                // this.$store.state.user_id = response.data;
                console.log('logged in');
                context.commit('set_user_id',{user_id: response.data});
                router.push(`/`);
            }
            else{
                this.$emit('raiseError',response.data);
            }
        })
        .catch((error)=>{
            if (error.response) {
            this.$emit('raiseError',error.response.data);
            }
        });
    },
    logout(context){
      return axios.get('/logout')
            .then(res=>{
              context.commit('set_user_id',{user_id: undefined});
              if(res.status==200){
                router.push('/map');
              }
              else if(res.status == 401){
                router.push('/');
              }
            })
            .catch(err=>{
              context.commit('set_user_id',{user_id: undefined});
              if(err.response.status == 401){
                router.push('/');
              }
            });
    }
  },
  modules: {
  },
  getters:{
    user_id(state){
      return state.user_id;
    }
  }
})
