import React from '../client/node_modules/react';
import renderer from '../client/node_modules/react-test-renderer';
import Popup from "../client/src/components/Popup";

describe('test React components', () => {

    it('should match Menu snapshot', () => {

        const component = renderer.create(
            <Popup/>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

});