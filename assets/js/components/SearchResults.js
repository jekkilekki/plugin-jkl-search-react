import React from 'react';
import SearchLoading from './SearchLoading';
import SearchResultSingle from './SearchResultSingle';

export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let results = '';

		// If Loading results.
		if ( this.props.loading ) {
			// results = <p className="search-results-loading">Loading</p>;
			results = <SearchLoading />;
		} 
		
		// Results found.
		else if ( this.props.results.length > 0 ) {
			
			const _results = this.props.results.map( result => {
				return (  // Single Result Component.
					<SearchResultSingle
						key={result.id}
						result={result}
						container={this.props.container}
					/>
				);
			});
			results = <ul>{_results}</ul>;
		} 
		
		// No results found.
		else if ( this.props.searched ) {
			results = <p>Nothing Found</p>;
		} 
		
		// Default - reset.
		else {
			results = '';
		}

		return (
			<div className="search-results">{results}</div>
		)
	}
}