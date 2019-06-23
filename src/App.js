import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import Header from './components/Header';

import { store, persistor } from "./store";
import TimeList from "./components/TimeList";


const App = () => (
	<div className="App">
		<Header />
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<TimeList />
			</PersistGate>
		</Provider>
	</div>
);

export default App;
