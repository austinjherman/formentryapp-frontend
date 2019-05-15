import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.filter.id,
      value: props.filter.value,
      editMode: false,
      dirty: false
    };
  }

  toggleEditMode = (e) => {
    if ( this.state.editMode ) {
      this.setState({editMode: false});
    }
    else {
      this.setState({editMode: true});
    }
  }

  handleKeyPress = (e) => {
    if ( e.key === 'Enter' ) {
      e.target.blur();
    }
  }

  updateValue = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <tr>
        <td>
          <StyledFilter>
            <input type="text"
                  value={ this.state.value }
                  onChange={ this.updateValue }
                  onFocus={ this.toggleEditMode }
                  onKeyPress={ this.handleKeyPress }
                  onBlur={ this.toggleEditMode }
                  className={ this.state.editMode ? 'input--active' : 'input--disabled' }
            />
            <span>
              <button className="input-button">
                <i className="fas fa-plus"></i>
              </button>
              <button className="input-button">
                <i className="fas fa-times"></i>
              </button>
            </span>
          </StyledFilter>
        </td>
      </tr>
    )
  }

}

const StyledFilter = styled.div`

  display: flex;
  justify-content: space-between;

  input {
    padding: 0 5px;
    width: 75%;
    margin: 0;
    &:hover {
      cursor: pointer;
    }
  }

  .input--active {
    border: 1px solid ${ colors.grayLightest };
  }

  .input--disabled {
    border: 1px solid transparent;
    margin: 0;
    width: 75%;
    padding: 0 5px;
    display: flex;
    align-items: center;
  }

  .input-button {
    background-color: transparent;
    padding: 5px 10px;

    &:active,
    &:focus,
    &:hover {
      background-color: transparent;

      i {
        color: ${ colors.blueBright };
        cursor: pointer;
      }
    }

    i {
      color: ${ colors.bluePale };
    }

  }

`;