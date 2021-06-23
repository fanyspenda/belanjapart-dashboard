/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FormGroup } from 'reactstrap';

import {
  fetchProvince,
  fetchProvByProvId
} from '../../actions/province.action';
import { fetchCityByProvId } from '../../actions/city.action';
import { renderSelectInput } from '../Field';

class SelectProvCityDist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
      cities: [],
      districts: []
    };
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
  }

  componentDidMount() {
    const {
      fetchProvince,
      valueProvince,
      fetchProvByProvId,
      valueCity,
      fetchCityByProvId
    } = this.props;
    fetchProvince({ status: true });
    if (valueProvince) {
      fetchProvByProvId(valueProvince);
    }
    if (valueCity) {
      fetchCityByProvId(valueCity);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { province, district, city } = this.props;
    // console.log('tetsss', nextProps);
    if (province.province !== nextProps.province.province) {
      nextProps.province.province.map(data => {
        // console.log('tess', nextProps.province.data);
        this.setState(state => {
          const provinces = [
            ...state.provinces,
            { value: data.id, label: data.name }
          ];
          return {
            provinces
          };
        });
      });
    }

    if (province.city !== nextProps.province.city) {
      this.setState({
        cities: []
      });
      nextProps.province.city.map(data => {
        // console.log('tesss', nextProps.city);
        this.setState(state => {
          const cities = [
            ...state.cities,
            { value: data.id, label: data.name }
          ];
          return {
            cities
          };
        });
      });
    }

    if (city.district !== nextProps.city.district) {
      // console.log('tesss', nextProps.district);
      this.setState({
        districts: []
      });
      nextProps.city.district.map(data => {
        this.setState(state => {
          const districts = [
            ...state.districts,
            { value: data.id, label: data.name }
          ];
          return {
            districts
          };
        });
      });
    }
  }

  onChangeCategory(val) {
    const { onChangeCategory } = this.props;
    onChangeCategory();
    if (val.value) {
      const { fetchProvByProvId } = this.props;
      fetchProvByProvId(val.value);
    } else {
      this.setState({
        cities: []
      });
    }
  }

  onChangeCity(val) {
    const { onChangeCity } = this.props;
    onChangeCity();
    if (val.value) {
      const { fetchCityByProvId } = this.props;
      fetchCityByProvId(val.value);
      // fetchCityByProvId(val.value);
    } else {
      this.setState({
        districts: []
      });
    }
  }

  render() {
    const { provinces, cities, districts } = this.state;
    const { validate } = this.props;
    // console.log(provinces);
    return (
      <Fragment>
        <Field
          name="province_id"
          component={renderSelectInput}
          requiredStar
          label="Province"
          options={provinces}
          onChange={this.onChangeCategory}
          id="inputProvince"
          placeholder="Pilih Province"
          validate={validate}
        />

        <Field
          name="city_id"
          component={renderSelectInput}
          requiredStar
          label="City"
          options={cities}
          disabled={cities.length === 0}
          onChange={this.onChangeCity}
          id="inputCity"
          placeholder="Pilih Kota"
          validate={validate}
        />

        <Field
          name="district_id"
          component={renderSelectInput}
          requiredStar
          label="District"
          options={districts}
          disabled={districts.length === 0}
          id="inputDistrict"
          placeholder="Pilih District"
          validate={validate}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  province: state.province,
  district: state.district,
  city: state.city
});

export default connect(mapStateToProps, {
  fetchProvince,
  fetchProvByProvId,
  fetchCityByProvId
})(SelectProvCityDist);
