import React from 'react'
import { shallow } from 'enzyme'

import Container from '../Container'
import Box from '../Box'

describe('<Container />>', () => {
    it('should render five <Box /> components', () => {
        const wrapper = shallow(<Container />)
        const boxes = wrapper.find(Box)
        console.log(wrapper.debug())

        expect(boxes.length).toBe(5)
    })
})
