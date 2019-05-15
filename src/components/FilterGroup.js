import React from 'react';
import Filter from './Filter';
import styled from 'styled-components';
import colors from '../styles/colors';
import { debounce } from '../utils/utils';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filterGroup.filters
    }
    this.debouncer = new debounce();
  }

  render() {
    const fg = this.props.filterGroup;
    return(
      <StyledFilterGroup>
        <div className="filter-group">
          <div className="filter-group__header">
            <div className="filter-group__name">
              <h3>{fg.name}</h3>
              <span className="filter-group__colon">:</span>
              <span>{fg.group_key}</span>
            </div>
            <div className="filter-group__add">
              <button>Add Filter</button>
            </div>
          </div>
          <div className="filter-group__table-container">
            <table>
              <tbody>
                {this.state.filters.map(f => (
                  <Filter key={f.id} filter={f} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </StyledFilterGroup>
    )
  }

}

const StyledFilterGroup = styled.div`

.filter-group {
  //box-shadow: 0 0 1px 0 ${colors.grayDarkest};
  //padding: 15px;
  margin: 30px 30px 30px 0;

  h3 {
    display: inline-block;
  }

  .filter-group__colon {
    display: inline-block;
    margin: 0 10px;
  }

  .filter-group__header {
    display: flex;
    justify-content: space-between;
  }

  .filter-group__name {
    display: inline-block;
  }

  .filter-group__table-container {
    margin: 0 15px;
  }
  
}

`;
