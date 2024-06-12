import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from "./FilterForm.module.css";

const FilterSchema = Yup.object().shape({
  brand: Yup.string(),
  price: Yup.string(),
  mileageFrom: Yup.number().min(0, "Mileage must be at least 0").nullable(),
  mileageTo: Yup.number().min(0, "Mileage must be at least 0").nullable(),
});

const FilterForm = ({ onFilter }) => {
  return (
    <Formik
      initialValues={{
        brand: "",
        price: "",
        mileageFrom: "",
        mileageTo: "",
      }}
      validationSchema={FilterSchema}
      onSubmit={(values) => {
        onFilter(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.filterForm}>
          <Field as="select" name="brand" className={s.selectField}>
            <option value="">Car brand</option>
            <option value="Buick">Buick</option>
            <option value="Volvo">Volvo</option>
            <option value="Hummer">Hummer</option>
            <option value="Subaru">Subaru</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Nissan">Nissan</option>
            <option value="Lincoln">Lincoln</option>
            <option value="GMC">GMC</option>
            <option value="Hyundai">Hyundai</option>
          </Field>
          {errors.brand && touched.brand ? <div>{errors.brand}</div> : null}

          <Field as="select" name="price" className={s.selectField}>
            <option value="">Price / 1 hour</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </Field>
          {errors.price && touched.price ? <div>{errors.price}</div> : null}

          <Field
            name="mileageFrom"
            type="number"
            placeholder="From"
            className={s.inputField}
          />
          {errors.mileageFrom && touched.mileageFrom ? (
            <div>{errors.mileageFrom}</div>
          ) : null}

          <Field
            name="mileageTo"
            type="number"
            placeholder="To"
            className={s.inputField}
          />
          {errors.mileageTo && touched.mileageTo ? (
            <div>{errors.mileageTo}</div>
          ) : null}

          <button type="submit" className={s.searchButton}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
