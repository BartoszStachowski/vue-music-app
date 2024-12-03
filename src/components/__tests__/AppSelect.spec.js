import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppSelect from '../AppSelect.vue'



describe('AppSelect Component', () => {
    it('renders properly', () => {
        const options = ['Option 1', 'Option 2'];
        const wrapper = mount(AppSelect, {props: {label: 'Select', options}});
        
        console.log(wrapper.html())
        const optionsEl = wrapper.findAllComponents('option');
      
        
        expect(wrapper.text()).toContain('Option 2')
        expect(wrapper.text()).not.toContain('Option 3')
    })
})