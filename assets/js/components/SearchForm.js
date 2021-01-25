import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';

export default class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.submitSearch = this.submitSearch.bind(this);
		this.getResults = this.getResults.bind(this);
		this.resetResults = this.resetResults.bind(this);
		this.filterResults = this.filterResults.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.state = {
			query: '', // Input query
			results: [], // Results from search
			loading: false, // Are we still loading previous results?
			searched: false, // Are we actually even searching (any words in input)?
			containerId: ''
		};
		this.typingTimeout = 0;
	}

	componentDidMount() {
		this.setState({
			containerId: ReactDOM.findDOMNode(this).parentNode.parentNode.getAttribute('class')
		});
	}

	submitSearch(e) {
		e.preventDefault();
		location.assign( location.origin + '?s=' + this.state.query );
	}

	loadMore(e) {
		e.preventDefault();
		location.assign( location.origin + '/page/2/?s=' + this.state.query );
	}

	getResults(e) {
		// Get the input value
		const search = e.target.value;
		this.setState({ query: search });

		// If we push Enter, then go to the Search results page.
		if ( e.key === 'Enter' ) {
			this.submitSearch(e);
			return;
		}

		// If we have a timeout, reset it.
		if ( this.typingTimeout ) clearTimeout( this.typingTimeout );
		
		// Set a typing timeout so that we only start searching when the user stops typing (300ms).
		this.typingTimeout = setTimeout(() => {
			// At least 2 letters
			if ( search && search.length > 1 ) {

				// Load and Search
				this.setState({ loading: true, searched: true });

				// Let's change the %s into the search param of our REST URL.
				let url = jkl_search_react_js.rest_search_posts.replace( '%s', search );
				let json = fetch(url)
					.then( res => {
						return res.json();
					})
					.then( results => {
						// We got results now, so no more loading
						this.setState({ results: results, loading: false });
						console.log(results);
					});
			} else {
				// No input, so don't search.
				this.setState({ results: [], searched: false });
			}
		}, 300);
	}

	filterResults(e) {
		e.preventDefault();
	}

	resetResults(e) {
		this.setState({ 
			query: '',
			results: [],
			loading: false,
			searched: false 
		});
	}

	render() {
		return (
			<form
				className="search-form-input"
				onSubmit={this.submitSearch}
			>
				<input
					placeholder="Search …"
					className="search-form-field"
					type="text"
					onKeyUp={this.getResults}
					// onFocus={this.getResults}
					// onBlur={this.resetResults}
				/>

				{/* {this.state.containerId === 'site-search-overlay gradient-overlay' &&
					<div className='search-button-group button-group'>
						<button onClick={this.filterResults}>Relevance</button>
						<button onClick={this.filterResults}>Newest</button>
						<button onClick={this.filterResults}>Oldest</button>
					</div>
				}

				{this.state.containerId === 'site-search-overlay gradient-overlay' &&
					<aside className='search-filters'>
						Some filters
					</aside>
				} */}

				<SearchResults
					query={this.state.query}
					searched={this.state.searched}
					loading={this.state.loading}
					results={this.state.results}
					container={this.state.containerId}
				/>
				{this.state.searched && ! this.state.loading && this.state.results.length > 10 &&
					<button
						className="btn alt"
						onClick={this.loadMore}
					>
						Load More
					</button>
				}
			</form>
		)
	}
}