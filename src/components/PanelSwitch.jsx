import './PanelSwitch.css';

function PanelSwitch({side, setSide}){
	function handleFrontClick(){
		setSide('front');
		//console.log('Front按鈕被點擊');   //測試執行，console會顯示log()內的文字
	}
	function handleRearClick(){
		setSide('rear');
		//console.log('Rear 按鈕被點擊');
	}
	return(
		<div className='panel-switch'>   
			<button type='button' 
					onClick={handleFrontClick}
					aria-pressed={side === 'front'}
					className={`panel-button panel-button-front ${side === 'front' ? 'panel-button-active' : ''}`}>
				front
			</button>   {/* 點擊此按鈕，執行onClick中的func. */}
			<button type='button' 
				onClick={handleRearClick}
				aria-pressed={side === 'rear'}
				className={`panel-button panel-button-back ${side === 'rear' ? 'panel-button-active' : ''}`}>
				back
			</button>
		</div>
	);
}
export default PanelSwitch;
