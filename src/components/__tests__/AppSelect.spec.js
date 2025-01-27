import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import Select from '../Select.vue';

describe('Select Component', () => {
  it('renders properly', () => {
    const options = ['Option 1', 'Option 2'];
    const wrapper = mount(Select, { props: { label: 'Select', options } });

    console.log(wrapper.html());
    const optionsEl = wrapper.findAllComponents('option');

    expect(wrapper.text()).toContain('Option 2');
    expect(wrapper.text()).not.toContain('Option 3');
  });
});
