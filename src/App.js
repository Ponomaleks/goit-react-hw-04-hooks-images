import './App.css';
import { Component } from 'react';

import Searchbar from './Components/Searchbar/Searchbar';
import API from './Servises/API';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';
import LoaderEl from './Components/Loader';
import Modal from './Components/Modal/Modal';

const statuses = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    req: '',
    page: 1,
    images: [],
    status: statuses.IDLE,
    showModal: false,
  };

  handleSubmit = request => {
    if (this.state.req !== request) {
      this.setState({ req: request, page: 1 });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.req !== this.state.req) {
      this.setState({ status: statuses.PENDING });
      // this.setState({ page: 1 });
      this.searchImages();
      return;
    }
    if (prevState.page !== this.state.page) {
      API(this.state.req, this.state.page, this.getImages);
      console.log('increase page');
    }
    if ((this.state.page > 1) & !this.state.showModal) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } else return;
  }

  searchImages = () => {
    API(this.state.req, this.state.page, this.setImages);
    console.log('fetch');
  };

  setImages = (images, status) => {
    this.setState({ images: images, status: status });
  };

  getImages = (newImages, status) => {
    this.setState({ images: [...this.state.images, ...newImages], status: status });
  };

  nexpPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  togleModal = (webformatURL, tags) => {
    this.setState({
      showModal: !this.state.showModal,
      modalImg: { img: webformatURL, descr: tags },
    });
    // console.log(e);
  };

  render() {
    let loadMore;
    if (this.state.images.length >= 12) {
      loadMore = true;
    } else loadMore = false;

    const { images, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {status === statuses.RESOLVED && (
          <ImageGallery cards={images} openModal={this.togleModal} />
        )}
        {status === statuses.PENDING && <LoaderEl />}
        {status === statuses.REJECTED && <h2>Something went wrong. Please try again</h2>}
        {loadMore && <Button onClick={this.nexpPage} />}
        {this.state.showModal && (
          <Modal
            img={this.state.modalImg.img}
            description={this.state.modalImg.descr}
            closeModal={this.togleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
