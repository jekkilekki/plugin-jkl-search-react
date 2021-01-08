import React from 'react';
import '../../css/spinner.css';

export default class SearchLoading extends React.Component {
	render() {
		return (
			<div className='loading-container'>
				<div className='lds-ripple'>
					<div></div>
					<div></div>
				</div>
				<p className='loading-text'>Loading…</p>
			</div>
		)
	}
}