import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import React from 'react';
import s from './Loader.module.css';

export default class LoaderEl extends React.Component {
  //other logic
  render() {
    return <Loader className={s.Loader} type="Grid" color="#3746a6" height={150} width={150} />;
  }
}
