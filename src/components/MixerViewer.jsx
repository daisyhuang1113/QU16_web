import {useEffect, useState} from 'react';
import './MixerViewer.css';
import BigHotSpot from './BigHotSpot.jsx';
import SmallHotSpot from './SmallHotSpot.jsx';
import MixerData from './MixerData.json';

function MixerViewer({side}){
	const [area, setArea] = useState(null);
	const [part, setPart] = useState(null);
	const [isLeaving, setIsLeaving] = useState(false);

	function finishAreaExit(){
		setIsLeaving(true);
		window.setTimeout(()=>{
			setArea(null);
			setIsLeaving(false);
		}, 220);
	}

	function navigateBack(){
		if(window.history.state?.mixerLayer){
			window.history.back();
		}else if(part !== null){
			setPart(null);
		}else if(area !== null){
			finishAreaExit();
		}
	}

	useEffect(()=>{
		function handlePopState(){
			if(part !== null){
				setPart(null);
			}else if(area !== null){
				finishAreaExit();
			}
		}

		function handleKeyDown(event){
			if(event.key === 'Escape' && (part !== null || area !== null)){
				navigateBack();
			}
		}

		window.addEventListener('popstate', handlePopState);
		window.addEventListener('keydown', handleKeyDown);
		return ()=>{
			window.removeEventListener('popstate', handlePopState);
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	const image = 
		side === 'front'
			? 'images/qu-front.png'   //if side=='front: image = 'qu-front.jpg'
			: 'images/qu-back.png';
	const areasData = MixerData[side];
	const selectedArea = area === null ? null : areasData[area];
	const selectedPart = part === null ? null : selectedArea?.parts[part];

	return(
		<main className="mixer-main">
				<div className={`mixer-container ${area !== null ? 'mixer-container-zoomed' : ''}`}>
					<div className={`mixer-stage mixer-stage-${side} ${area !== null ? selectedArea.zoomClass : ''} ${isLeaving ? 'mixer-stage-leaving' : ''}`}>
						<img src={image}
							alt={side === 'front' ? 'Qu-16 混音機前面板' : 'Qu-16 混音機背板'}
							className="mixer-image"/>
				{/* 大方框 */}
				{area ===null &&
					Object.entries(areasData).map(([areaKey, areaData])=>(
						<BigHotSpot
							key={areaKey}
							title={areaData.label}
							position={areaData.position}
							onClick={()=>{
								window.history.pushState({mixerLayer: 'area'}, '');
								setArea(areaKey);
								setPart(null);
							}}/>
				))}
				{/* 放大後的子元件熱區，與圖片套用相同縮放 */}
				{area !== null && (
					<div className="mixer-hotspot-layer">
						{Object.entries(selectedArea.parts).map(([partKey, partData])=>(
							<SmallHotSpot
								key={partKey}
								title={partData.label}
								position={partData.position}
								active={part === partKey}
								onClick={()=>{
									window.history.pushState({mixerLayer: 'part'}, '');
									setPart(partKey);
								}}/>
						))}
					</div>
				)}
					</div>
				</div>
				<button
					type="button"
					className={`m3-icon-button-xs mixer-back-button ${area === null ? 'mixer-back-button-hidden' : ''}`}
					aria-label={part !== null ? '回到功能區' : '退出放大區域'}
					disabled={area === null}
					onClick={navigateBack}>
					<span className="material-symbols-rounded" aria-hidden="true">{part !== null ? 'arrow_back' : 'close'}</span>
				</button>
			{selectedPart && (
				<>
				<button type="button" className="bottom-sheet-scrim" aria-label="關閉詳細說明" onClick={navigateBack}/>
				<article className="part-info" role="dialog" aria-modal="true" aria-live="polite">
					<div className="bottom-sheet-handle" aria-hidden="true"/>
					<button
						type="button"
						className="part-info-close"
						aria-label="關閉詳細說明"
						onClick={navigateBack}>
						<span className="material-symbols-rounded" aria-hidden="true">close</span>
					</button>
					<h2>{selectedPart.label}</h2>
					<p><strong>操作：</strong>{selectedPart.step}</p>
					<p><strong>功能：</strong>{selectedPart.function}</p>
					<p><strong>注意：</strong>{selectedPart.warning}</p>
				</article>
				</>
			)}
		</main>   //一個頁面通常只有一個主要的 <main>
	);
}
export default MixerViewer;
