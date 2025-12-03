// ShoreSquad JavaScript — small interactive behaviours
(function(){
	const openMapBtn = document.getElementById('open-map');
	const checkWeatherBtn = document.getElementById('check-weather');
	const joinEventBtn = document.getElementById('join-event');
	const mapRoot = document.getElementById('map-root');
	const announcer = document.getElementById('live-announcer');

	function announce(text){
		if(announcer) announcer.textContent = text;
	}

	// Lazy-load a lightweight map script (simulation) when user requests it
	openMapBtn?.addEventListener('click', async () => {
		// If an iframe is already embedded, just announce it's ready.
		if(mapRoot && mapRoot.querySelector && mapRoot.querySelector('iframe')){
			announce('Map is ready');
			return;
		}

		// Fallback lazy-insert an embedded Google Maps iframe if the static iframe is not present
		announce('Loading map…');
		mapRoot.textContent = 'Loading map…';
		await new Promise(r=>setTimeout(r,600));
		mapRoot.textContent = '';
		const iframe = document.createElement('iframe');
		iframe.title = 'ShoreSquad — Next Cleanup at Pasir Ris';
		iframe.src = 'https://www.google.com/maps?q=1.381497,103.955574(Next%20Cleanup)&z=17&output=embed';
		iframe.loading = 'lazy';
		iframe.style.width = '100%';
		iframe.style.height = '420px';
		iframe.style.border = '0';
		mapRoot.appendChild(iframe);
		announce('Map loaded');
	});

	// Check weather — placeholder that demonstrates fetch + graceful degradation
	checkWeatherBtn?.addEventListener('click', async () => {
		announce('Fetching local weather…');
		// NOTE: Replace with an actual weather API + key in production
		try{
			// small simulated fetch delay
			await new Promise(r=>setTimeout(r,500));
			const fake = {temp: 22, desc: 'Sunny with light breeze'};
			announce(`Weather: ${fake.temp}°C — ${fake.desc}`);
			alert(`Local weather: ${fake.temp}°C — ${fake.desc}`);
		}catch(e){
			announce('Unable to fetch weather');
			console.error(e);
		}
	});

	// Join event — optimistic UI example
	joinEventBtn?.addEventListener('click', async () => {
		announce('Joining event…');
		const prev = joinEventBtn.textContent;
		joinEventBtn.textContent = 'Joining…';
		joinEventBtn.disabled = true;
		try{
			await new Promise(r=>setTimeout(r,700));
			joinEventBtn.textContent = 'Joined ✓';
			announce('You joined the cleanup');
		}catch(e){
			joinEventBtn.textContent = prev;
			announce('Join failed');
		}finally{
			setTimeout(()=>{joinEventBtn.disabled=false},1200);
		}
	});

	// Optional service worker registration for offline support
	if('serviceWorker' in navigator){
		navigator.serviceWorker.register('/sw.js').then(()=>{
			console.log('SW registered (placeholder)');
		}).catch(()=>{
			// ignore in dev without SW file
		});
	}

	console.log('ShoreSquad UI ready');
})();