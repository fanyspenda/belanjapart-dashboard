import React, { Component, Fragment } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  renderField,
  capitalize,
  renderFieldFloat,
  renderSelectInput,
  normalizeNumber,
  normalizeNumberSeparatorPoint
} from '@components/Field';
import { connect } from 'react-redux';
import { regexStartEndSpace } from '@helpers/textConfig';

class ModalAttributeEdit extends Component {
  componentDidMount() {
    const { dispatch, dataSrc } = this.props;
    const arrAttribute = [];
    // console.log('dataSrc didmount', dataSrc);
    dataSrc &&
      dataSrc.map(value => {
        if (value.attribute_type === 'string') {
          arrAttribute.push({
            attribute_id: value.id,
            attribute_type: value.attribute_type,
            attribute_code: value.attribute_code,
            string_value: value.string_value
          });
        } else if (value.attribute_type === 'int') {
          arrAttribute.push({
            attribute_id: value.id,
            attribute_type: value.attribute_type,
            attribute_code: value.attribute_code,
            int_value: value.int_value
          });
        } else {
          arrAttribute.push({
            attribute_id: value.id,
            attribute_type: value.attribute_type,
            attribute_code: value.attribute_code,
            int_value: value.int_value
          });
        }
      });
    dispatch(change('modalEditUploadForm', 'attribute', arrAttribute));
  }

  onSubmit = value => {
    const { index, updateField, toggle, dataSrc } = this.props;
    const initValue = dataSrc.map((item, index) => {
      if (item.attribute_type === 'string') {
        return {
          attribute_id: item.attribute_id,
          attribute_type: item.attribute_type,
          string_value: (value.attribute[index].string_value || '').replace(
            regexStartEndSpace,
            ''
          )
        };
      }
      if (item.attribute_type === 'int') {
        return {
          attribute_id: item.attribute_id,
          attribute_type: item.attribute_type,
          int_value: value.attribute[index].int_value
        };
      }
      return {
        attribute_id: item.attribute_id,
        attribute_type: item.attribute_type,
        int_value: typeof value.attribute[index].int_value === 'object'
          ? parseFloat(value.attribute[index].int_value[0])
            : value.attribute[index].int_value !== ''
            ? value.attribute[index].int_value
            : 0
      };
    });
    updateField(index, 'attribute', initValue);
    toggle();
    // console.log('value.attribute', value.attribute);
    // console.log('dataSrc', dataSrc);
    // console.log('initValue', initValue);
  };

  renderMembers = ({ fields }) => {
    const { dataSrc, atribut } = this.props;

    const findAttribute = id => {
      const tempAtribut = atribut.dataAll.find(val => val.id === id);
      return `${tempAtribut.code} - ${tempAtribut.name}`;
    };

    if (!dataSrc) {
      return 'Attribbute is empty';
    }
    // console.log('dataSrc', dataSrc);
    return (
      <div className="col-md-12">
        {fields.map((item, index) => (
          <Fragment>
            <Field
              name={`${item}.attribute_id`}
              type="hidden"
              component={renderField}
            />
            {dataSrc[index].attribute_type === 'string' && (
              <Field
                name={`${item}.string_value`}
                type="text"
                component={renderField}
                label={findAttribute(dataSrc[index].attribute_id)}
                placeholder="Input String Value"
                normalize={capitalize}
              />
            )}
            {dataSrc[index].attribute_type === 'int' && (
              <Field
                name={`${item}.int_value`}
                type="number"
                parse={value => Number(value)}
                component={renderField}
                label={findAttribute(dataSrc[index].attribute_id)}
                placeholder="Input Integer Value"
              />
            )}
            {dataSrc[index].attribute_type === 'float' && (
              <Field
                name={`${item}.int_value`}
                type="text"
                component={renderField}
                // parse={value => Number(value)}
                normalize={normalizeNumberSeparatorPoint}
                label={findAttribute(dataSrc[index].attribute_id)}
                placeholder="Input Float Value"
              />
            )}
            {dataSrc[index].attribute_type === 'boolean' && (
              <Field
                name={`${item}.boolean_value`}
                type="text"
                component={renderSelectInput}
                options={[
                  {
                    value: true,
                    label: 'True',
                    code: 'true'
                  },
                  {
                    value: false,
                    label: 'False',
                    code: 'false'
                  }
                ]}
                label={findAttribute(dataSrc[index].attribute_id)}
                placeholder="Input Boolean Value"
              />
            )}
            {!dataSrc[index].attribute_type && 'Attribbute not found'}
          </Fragment>
        ))}
      </div>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalHeader className="modal-head-product">
            <div className="row">
              <div className="col-md-12 pt-2">
                <p className="mb-0">INPUT ATTRIBUTE</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="modal-body-product">
            <div className="row">
              <FieldArray name="attribute" component={this.renderMembers} />
            </div>
          </ModalBody>
          <ModalFooter className="modal-foot border border-0">
            <div className="row text-center">
              <div className="col-md-6">
                <Button className="btn btn-green-dark text-white">Save</Button>
              </div>
            </div>
          </ModalFooter>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  atribut: state.atribut
});

export default reduxForm({
  form: 'modalEditUploadForm'
})(connect(mapStateToProps, {})(ModalAttributeEdit));
