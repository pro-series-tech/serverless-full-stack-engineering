import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

if(!process.env.REACT_APP_ENVIRONMENT){
    console.log('Could not find necessary environment variables');
    console.log(`Try running 'yarn deploy -- test`);
    process.exit('Error loading env file');
}

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});
