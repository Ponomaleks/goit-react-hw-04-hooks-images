import { Component } from 'react';
import s from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = e => {
    if (e.code !== 'Escape') {
      return;
    }

    this.props.closeModal();
  };

  handleByBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.handleByBackdropClick}>
        <div className={s.Modal}>
          <img src={this.props.img} alt={this.props.description} />
        </div>
      </div>
    );
  }
}
