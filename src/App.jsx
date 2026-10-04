import {useEffect, useState} from 'react';  //useState是react的套件
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MixerViewer from './components/MixerViewer.jsx';
import PanelSwitch from './components/PanelSwitch.jsx';
import './App.css';

function App(){
	
	const [side, setSide] = useState('front');
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(()=>{
		function handleScroll(){
			setIsScrolled(window.scrollY > 8);
		}

		handleScroll();
		window.addEventListener('scroll', handleScroll, {passive: true});
		return ()=>window.removeEventListener('scroll', handleScroll);
	}, []);
	return(
		<div data-theme="nord" className="app-shell">
			<>
				<div className={`top-controls ${isScrolled ? 'top-controls--scrolled' : ''}`}>
					<Header/>
					<PanelSwitch
						side={side}
						setSide={setSide}
					/>
				</div>
				<MixerViewer
					key={side}
					side={side}	
				/>   {/* 將side變數傳入function */}
				<Footer/>
			</>
		</div>
	);
}
export default App;   //使此funtion可被別人import
