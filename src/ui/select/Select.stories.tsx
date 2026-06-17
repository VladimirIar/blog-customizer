import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { useState } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import type { OptionType } from 'src/constants/articleProps';

const meta: Meta<typeof Select> = {
	component: Select,
	title: 'UI/Select',
	decorators: [
		(Story) => (
			<div style={{ width: '360px', padding: '20px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Select>;

const SelectWithState = ({
	options,
	title,
}: {
	options: OptionType[];
	title: string;
}) => {
	const [selected, setSelected] = useState(options[0]);

	return (
		<Select
			selected={selected}
			onChange={setSelected}
			options={options}
			title={title}
		/>
	);
};
export const FontFamily: Story = {
	render: () => <SelectWithState options={fontFamilyOptions} title='Шрифт' />,
};

export const FontColor: Story = {
	render: () => <SelectWithState options={fontColors} title='Цвет шрифта' />,
};

export const BackgroundColor: Story = {
	render: () => (
		<SelectWithState options={backgroundColors} title='Цвет фона' />
	),
};

export const ContentWidth: Story = {
	render: () => (
		<SelectWithState options={contentWidthArr} title='Ширина контента' />
	),
};
