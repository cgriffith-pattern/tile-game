import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../components/Game';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props) => {
	return shallow(<Game {...props} />);
};

describe('app', () => {
	it('renders without crashing', () => {
		mount(<Game />);
	});
});

//This group of tests check if the functions related to initial game setup work as intended
describe('Game setup', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup();
	});

	test('tiles dynamically generate', () => { //checks if the genTile function works as intended
		wrapper.instance().setState({ width: 4 });
		const sixteens = {
			'0': '1',
			'1': '2',
			'2': '3',
			'3': '4',
			'4': '5',
			'5': '6',
			'6': '7',
			'7': '8',
			'8': '9',
			'9': '10',
			'10': '11',
			'11': '12',
			'12': '13',
			'13': '14',
			'14': '15',
			'15': '',
		};
		expect(wrapper.instance().genTile(4)).toEqual(sixteens);
	});
	test('tiles are ordered', () => { //checks if the ordered function works as intended
		wrapper.instance().setState({ width: 3 });
		const randomNines = {
			'0': '3',
			'1': '2',
			'2': '6',
			'3': '5',
			'4': '1',
			'5': '4',
			'6': '7',
			'7': '',
			'8': '8',
		};
		const orderNines = {
			'0': '1',
			'1': '2',
			'2': '3',
			'3': '4',
			'4': '5',
			'5': '6',
			'6': '7',
			'7': '8',
			'8': '',
		};
		expect(wrapper.instance().ordered(randomNines)).toBe(false);
		expect(wrapper.instance().ordered(orderNines)).toBe(true);
	});
	test('tiles are shuffled', () => { //checks if the shuffle function works as intended
		wrapper.instance().setState({ width: 3 });
		const orderNines = {
			'0': '1',
			'1': '2',
			'2': '3',
			'3': '4',
			'4': '5',
			'5': '6',
			'6': '7',
			'7': '8',
			'8': '',
		};
		const copyNines = {
			'0': '1',
			'1': '2',
			'2': '3',
			'3': '4',
			'4': '5',
			'5': '6',
			'6': '7',
			'7': '8',
			'8': '',
		};
		expect(wrapper.instance().shuffle(orderNines)).not.toEqual(copyNines);
	});
});

//This group of tests check if the solvable function works as intended
describe('Game solvability tests', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup();
	});

	test('even width, odd row blank is solvable', () => {
		wrapper.instance().setState({ width: 4 });
		const eo_Solvable = {
			'0': '6',
			'1': '13',
			'2': '7',
			'3': '10',
			'4': '8',
			'5': '9',
			'6': '11',
			'7': '',
			'8': '15',
			'9': '2',
			'10': '12',
			'11': '5',
			'12': '14',
			'13': '3',
			'14': '1',
			'15': '4',
		};
		const eo_Unsolvable = {
			'0': '3',
			'1': '9',
			'2': '1',
			'3': '15',
			'4': '14',
			'5': '11',
			'6': '4',
			'7': '6',
			'8': '13',
			'9': '7',
			'10': '10',
			'11': '12',
			'12': '2',
			'13': '',
			'14': '8',
			'15': '5',
		};

		expect(wrapper.instance().solvable(eo_Solvable)).toBe(true);
		expect(wrapper.instance().solvable(eo_Unsolvable)).toBe(false);
	});
	test('even width, even row blank is solvable', () => {
		wrapper.instance().setState({ width: 4 });
		const ee_Solvable = {
			'0': '13',
			'1': '2',
			'2': '10',
			'3': '3',
			'4': '1',
			'5': '12',
			'6': '8',
			'7': '4',
			'8': '5',
			'9': '',
			'10': '9',
			'11': '6',
			'12': '15',
			'13': '14',
			'14': '11',
			'15': '7',
		};
		const ee_Unsolvable = {
			'0': '3',
			'1': '9',
			'2': '1',
			'3': '15',
			'4': '14',
			'5': '11',
			'6': '4',
			'7': '6',
			'8': '13',
			'9': '',
			'10': '10',
			'11': '12',
			'12': '2',
			'13': '7',
			'14': '8',
			'15': '5',
		};

		expect(wrapper.instance().solvable(ee_Solvable)).toBe(true);
		expect(wrapper.instance().solvable(ee_Unsolvable)).toBe(false);
	});
	test('odd width is solvable', () => {
		wrapper.instance().setState({ width: 3 });
		const ow_Solvable = {
			'0': '1',
			'1': '8',
			'2': '2',
			'3': '',
			'4': '4',
			'5': '3',
			'6': '7',
			'7': '6',
			'8': '5',
		};
		const ow_Unsolvable = {
			'0': '8',
			'1': '1',
			'2': '2',
			'3': '',
			'4': '4',
			'5': '3',
			'6': '7',
			'7': '6',
			'8': '5',
		};

		expect(wrapper.instance().solvable(ow_Solvable)).toBe(true);
		expect(wrapper.instance().solvable(ow_Unsolvable)).toBe(false);
	});
});
