import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDocuments } from '../../actions/documentActions';
import Loading from '../Loading/Loading';
import './Portal.css';

class Portal extends Component {
  componentDidMount() {
    this.props.dispatch(fetchDocuments());
  }

  render() {
    const { isFetching, items } = this.props;
    return (
      <div>
        {isFetching ? <Loading /> :
          <div>
            <p>View or download this year's exhibitor documentation here.</p>
            <ul>
              {items.map((link) => {
                if (link.url) {
                  return (
                    <li className="portal-link" key={link.id}>
                      <a href={link.url} target="_blank">{link.name}</a>
                      {link.notes ? (
                        <ul>
                          <li>
                            {link.notes}
                          </li>
                        </ul>
                        ) : null
                      }
                      {/* <Glyphicon className="portal-download" glyph="download-alt" /> */}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        }
      </div>
    );
  }
}

Portal.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { document } = state;
  const {
    isFetching,
    items
  } = document;

  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(Portal);
