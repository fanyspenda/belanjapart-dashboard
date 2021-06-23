import React, { PureComponent, Fragment } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { renderField, capitalize } from '@components/Field';

export const ModalAttributeDetail = ({ dataAttribute }) => (
  // console.log('testtt', dataAttribute);
  <Fragment>
    <ModalHeader className="modal-head-product">
      <div className="row">
        <div className="col-md-12 pt-2">
          <p className="mb-0">VALUE ATTRIBUTE</p>
        </div>
      </div>
    </ModalHeader>
    <ModalBody className="modal-body-product">
      {dataAttribute &&
        dataAttribute.map(val => (
          <div className="row">
            <label>
              {val.attribute_code} - {val.attribute_name} {' : '}
              <span>{val.int_value || val.string_value}</span>
            </label>
          </div>
        ))}
    </ModalBody>
    <ModalFooter className="modal-foot border border-0">
      <div className="row text-center">
        <div className="col-md-6">
          {/* <Button className="btn btn-green-dark text-white">Save</Button> */}
        </div>
      </div>
    </ModalFooter>
  </Fragment>
);

class ModalAttribute extends PureComponent {
  componentDidMount() {
    const { dispatch, data, dataSrc } = this.props;

    const arrAttribute = [];
    // console.log('data', data);
    data &&
      data.map((val, index) => {
        switch (val.type) {
          case 'string':
            if (dataSrc) {
              arrAttribute.push({
                attribute_id: val.id,
                string_value: dataSrc[index].string_value || null
              });
            } else {
              arrAttribute.push({
                attribute_id: val.id,
                string_value: null
              });
            }
            break;

          case 'int':
            if (dataSrc) {
              arrAttribute.push({
                attribute_id: val.id,
                string_value: dataSrc[index].int_value || null
              });
            } else {
              arrAttribute.push({
                attribute_id: val.id,
                int_value: null
              });
            }
            break;

          default:
            break;
        }
        return null;
      });
    dispatch(change('modalUploadForm', 'attribute', arrAttribute));
  }

  onSubmit = value => {
    const { index, updateField, toggle, addAttribute } = this.props;
    // console.log('value', value);
    updateField(index, 'attribute', value.attribute);
    addAttribute(value);
    toggle();
  };

  renderMembers = ({ fields }) => {
    const { data } = this.props;

    return (
      <div className="col-md-12">
        {fields.map((item, index) => (
          <Fragment>
            <Field
              name={`${item}.attribute_id`}
              type="hidden"
              component={renderField}
              placeholder="Input Value"
            />
            {data[index].type === 'string' ? (
              <Field
                name={`${item}.string_value`}
                type="text"
                component={renderField}
                label={data[index].code}
                placeholder="Input String Value"
                normalize={capitalize}
              />
            ) : (
              <Field
                name={`${item}.int_value`}
                type="number"
                parse={value => Number(value)}
                component={renderField}
                label={data[index].code}
                placeholder="Input Integer Value"
              />
            )}
          </Fragment>
        ))}
      </div>
    );
  };

  render() {
    const { handleSubmit } = this.props;
    // console.log('attribute', attribute);
    return (
      <Fragment>
        <form>
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
                <Button
                  type="button"
                  onClick={handleSubmit(this.onSubmit)}
                  className="btn btn-green-dark text-white"
                >
                  Save
                </Button>
              </div>
            </div>
          </ModalFooter>
        </form>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'modalUploadForm'
})(ModalAttribute);
