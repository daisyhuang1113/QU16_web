function BigHotSpot({title, position, onClick}){
	return(
		<button type='button'
				onClick={onClick}
				className="big-hotspot"
				style={position}>
			{title}
		</button>
	);
}

export default BigHotSpot;
