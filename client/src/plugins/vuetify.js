import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blue.accent3,
                accent: colors.deepPurple.accent2,
            },
            dark: {
                primary: colors.blue.accent3,
                accent: colors.deepPurple.accent2,
            }
        },
    },
});
