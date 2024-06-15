import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

import s from "./FilterForm.module.css";

const generateMileageOptions = (start, end, step) => {
  const options = [];
  for (let i = start; i <= end; i += step) {
    options.push(i);
  }
  return options;
};

const FilterForm = ({ onFilter }) => {
  const mileageOptions = generateMileageOptions(3000, 10000, 500);
  const [mileageFrom, setMileageFrom] = useState(3000);

  return (
    <Formik
      initialValues={{
        brand: "",
        price: "",
        mileageFrom: "3000",
        mileageTo: "10000",
      }}
      onSubmit={(values) => {
        console.log("Filter values submitted:", values);
        onFilter(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={s.filterForm}>
          <div className={s.fieldContainer}>
            <label htmlFor="brand">Car brand</label>
            <Field as="select" name="brand" id="brand">
              <option value="">Enter the text</option>
              <option value="Buick">Buick</option>
              <option value="Volvo">Volvo</option>
              <option value="Hummer">Hummer</option>
              <option value="Subaru">Subaru</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
              <option value="Lincoln">Lincoln</option>
              <option value="GMC">GMC</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Toyota">Toyota</option>
              <option value="MINI">MINI</option>
              <option value="Bentley">Bentley</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Pontiac">Pontiac</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Chrysler">Chrysler</option>
              <option value="Kia">Kia</option>
              <option value="Rover">Rover</option>
            </Field>
          </div>

          <div className={s.fieldContainer}>
            <label htmlFor="price">Price / 1 hour</label>
            <Field as="select" name="price" id="price">
              <option value="">To $</option>
              <option value="30">To 30$</option>
              <option value="40">To 40$</option>
              <option value="50">To 50$</option>
              <option value="60">To 60$</option>
              <option value="70">To 70$</option>
              <option value="80">To 80$</option>
            </Field>
          </div>

          <div className={s.fieldContainer}>
            <label>Car mileage / km</label>
            <div className={s.mileageInputs}>
              <Field
                as="select"
                name="mileageFrom"
                value={values.mileageFrom}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setMileageFrom(value);
                  setFieldValue("mileageFrom", value);
                  setFieldValue(
                    "mileageTo",
                    Math.max(value + 500, values.mileageTo)
                  );
                }}
              >
                <option value="">From</option>
                {mileageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
              <Field as="select" name="mileageTo" value={values.mileageTo}>
                <option value="">To</option>
                {mileageOptions
                  .filter((option) => option > mileageFrom)
                  .map((option) => (
                    <option key={option} value={option}>
                      To {option}
                    </option>
                  ))}
              </Field>
            </div>
          </div>

          <button type="submit" className={s.button}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

FilterForm.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default FilterForm;
