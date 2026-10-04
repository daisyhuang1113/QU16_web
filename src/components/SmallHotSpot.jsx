function SmallHotSpot({title, position, active, onClick}){
	return(
		<button type='button'
						onClick={onClick}
						className={`small-hotspot ${active ? 'small-hotspot-active' : ''}`}
						style={position}>
			{title}
		</button>
	);
}

export default SmallHotSpot;
