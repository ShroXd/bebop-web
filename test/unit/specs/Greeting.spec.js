import { mount } from '@vue/test-utils'
import Greeting from '../../../src/components/Greeting'

describe('Greeting.vue', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Greeting)
    console.log(wrapper.html())
  })
})
