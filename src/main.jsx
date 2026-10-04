import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
ReactDOM.createRoot(   //從這個地方開始，由react管理整個畫面
	document.getElementById("root")
).render(   //render: 畫整個網站
	<React.StrictMode>
        <App />
    </React.StrictMode>
);

