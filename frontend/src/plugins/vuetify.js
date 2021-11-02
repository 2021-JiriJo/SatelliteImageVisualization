import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VChip from 'v-chip'
import VTooltip from 'v-tooltip'
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

Vue.use(Vuetify);
Vue.use(VTooltip);
Vue.use(VChip);
Vue.use(DatePicker);

export default new Vuetify({
    theme: {
        dark: true,
      }
});