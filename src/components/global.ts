import Vue from 'vue'

import PageContainer from './PageContainer.vue'
import WelcomeContainer from './WelcomeContainer.vue'
import SmallContainer from './SmallContainer.vue'

import Button from './forms/Button.vue'
import CheckboxGroup from './forms/CheckboxGroup.vue'
import InputGroup from './forms/InputGroup.vue'
import CopyField from './forms/CopyField.vue'

// containers
Vue.component('sp-page-container', PageContainer)
Vue.component('sp-welcome-container', WelcomeContainer)
Vue.component('sp-small-container', SmallContainer)

// forms
Vue.component('sp-button', Button)
Vue.component('sp-checkbox-group', CheckboxGroup)
Vue.component('sp-input-group', InputGroup)
Vue.component('sp-copy-field', CopyField)

