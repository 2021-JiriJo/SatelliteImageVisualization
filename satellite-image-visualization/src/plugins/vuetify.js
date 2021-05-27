import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VTooltip from 'v-tooltip'

Vue.use(Vuetify);
Vue.use(VTooltip);

export default new Vuetify({
    theme: {
        dark: true,
      }
});