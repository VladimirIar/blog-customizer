import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { Select } from '../../ui/select/Select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [draftSettings, setDraftSettings] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);
	const handleChange = (key: keyof ArticleStateType) => (value: OptionType) => {
		setDraftSettings((prev) => ({ ...prev, [key]: value }));
	};
	const handleReset = () => {
		setDraftSettings(defaultArticleState);
		onApply(defaultArticleState);
	};
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(draftSettings);
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: formRef,
		onChange: setIsSidebarOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => {
					setIsSidebarOpen(!isSidebarOpen);
				}}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.topContainer}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={draftSettings.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={handleChange('fontFamilyOption')}
						/>
						<Select
							selected={draftSettings.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={handleChange('fontColor')}
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={draftSettings.fontSizeOption}
							title='Размер шрифта'
							onChange={handleChange('fontSizeOption')}
						/>
						<Separator />
						<Select
							selected={draftSettings.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={handleChange('backgroundColor')}
						/>
						<Select
							selected={draftSettings.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={handleChange('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
