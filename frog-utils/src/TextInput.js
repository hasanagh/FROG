// @flow

import React, { Component } from 'react';

type TextInputPropsT = {
  value: ?string,
  onChange: ?Function,
  onSubmit: ?Function,
  onCancel: ?Function,
  style: ?string
};

export class TextInput extends Component {
  state: { value: string };
  textInput: { focus: Function };

  constructor(props: TextInputPropsT) {
    super(props);
    this.state = { value: this.props.value || '' };
  }

  componentDidMount() {
    this.textInput.focus();
  }

  componentWillReceiveProps(nextProps: TextInputPropsT) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value || '' });
    }
  }

  onChange = (e: any) => {
    this.setState({ value: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
  };

  handleKey = (e: any) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
    if (e.keyCode === 13) {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.state.value);
      }
    }
  };

  render() {
    return (
      <input
        type="text"
        onChange={this.onChange}
        onKeyDown={this.handleKey}
        value={this.state.value}
        ref={input => (this.textInput = input)}
        onSubmit={this.onSubmit}
        onBlur={this.onSubmit}
        style={this.props.style}
      />
    );
  }
}

export class ChangeableText extends Component {
  state: {
    edit: boolean,
    value: string
  };

  constructor(
    props: TextInputPropsT & {
      EditComponent: ReactClass<*>,
      onlyHover?: Boolean
    }
  ) {
    super(props);
    this.state = { edit: false, value: (this.props.value = '') };
  }

  componentWillReceiveProps(nextProps: TextInputPropsT) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value || '' });
    }
  }

  render() {
    const {
      EditComponent = TextInput,
      onlyHover = false,
      ...rest
    } = this.props;
    if (this.state.edit) {
      return (
        <EditComponent
          value={this.state.value}
          {...rest}
          onSubmit={e => {
            this.setState({ edit: false, value: e });
            if (this.props.onSubmit) {
              this.props.onSubmit(e);
            }
          }}
        />
      );
    } else {
      return (
        <span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => this.setState({ edit: true })}
          >
            &nbsp;{this.state.value}
          </span>
          <i
            role="button"
            tabIndex={0}
            style={{ color: 'blue' }}
            onClick={() => this.setState({ edit: true })}
            className={`fa fa-pencil ${onlyHover ? 'edithover' : ''}`}
          />
        </span>
      );
    }
  }
}
