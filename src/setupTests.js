import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

if(!process.env.REACT_APP_ENVIRONMENT){
    console.log('Could not find necessary environment variables');
    console.log(`Try running 'yarn deploy -- test`);
    process.exit('Error loading env file');
}

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

/* configure JSDOM */
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

const copyProps = (src, target) =>{
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);