import React from 'react';
import parse from 'html-react-parser';

export default class SearchResultSingle extends React.Component {
	constructor(props) {
		super(props);
		this.getDate = this.getDate.bind(this);
		this.getExcerpt = this.getExcerpt.bind(this);
	}

	getDate(date) {
		return new Date(date).toLocaleDateString('en-US');
	}

	getExcerpt(excerpt) {
		let excerptEsc = excerpt.substring(3, 103) + ' …';
		return parse(excerptEsc);
	}

	render() {
		if ( this.props.container === 'site-search-overlay gradient-overlay' ) {
			return (
				<li
				className={this.props.result.featured_image_src ? 'search-result-single has-featured-image' : 'search-result-single'}
				>
					{this.props.result.featured_image_src &&
						<a href={this.props.result.link}>
							<img
								className="post-featured-image"
								src={this.props.result.featured_image_src}
							/>
						</a>
					}
					<div className="search-post-meta">
						<h3 className="search-post-link">
							<a href={this.props.result.link}>
								{parse(this.props.result.title.rendered)}
							</a>
						</h3>
						<p>
							{this.getExcerpt(this.props.result.excerpt.rendered)}
						</p>
						<small>Updated: {this.getDate(this.props.result.modified)}</small>
					</div>
				</li>
			)
		} else {
			return (
				<li>
					<a href={this.props.result.link}>
						{parse(this.props.result.title.rendered)}
					</a>
				</li>
			)
		}
	}
}