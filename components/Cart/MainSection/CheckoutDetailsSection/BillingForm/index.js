import styles from './styles'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { updateBillingInfo } from 'store/reducers/checkoutSlice'
import { consoleLog, formatVNprice } from 'utils/function'
import PaymentSection from '../../PaymentSection'

const BillingForm = ({ cartList, setStepIdx, totalCost, customerBillingDetail }) => {
  const dispatch = useDispatch()

  const BILLING_SCHEMA = Yup.object({
    firstName: Yup.string().required('It is a required field.'),
    lastName: Yup.string().required('It is a required field.'),
    phone: Yup.string().required('It is a required field.'),
    email: Yup.string().required('It is a required field.'),
    company: Yup.string(),
    region: Yup.string().required('It is a required field.'),
    district: Yup.string().required('It is a required field'),
    ward: Yup.string(),
    address: Yup.string().required('It is a required field'),
    orderComment: Yup.string(),
    paymentMethod: Yup.string().required(),
  })

  return (
    <div>
      <Formik
        validationSchema={BILLING_SCHEMA}
        initialValues={customerBillingDetail}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          try {
            dispatch(updateBillingInfo(values))
            const checkoutData = { cart: cartList, bill: values }
            consoleLog(checkoutData, 'Checkout: ')
            setSubmitting(false)
            resetForm()
            setStepIdx(2)
          } catch (e) {
            consoleLog(e)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          submitForm,
        }) => (
          <form
            name="checkout"
            className="checkout woocommerce-checkout"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="row pt-0">
              <div className="large-7 col">
                <div id="customer_details">
                  <div className="clear">
                    <div className="woocommerce-billing-fields">
                      <h3>Billing Information</h3>
                      <div className="woocommerce-billing-fields__field-wrapper">
                        <p className={'form-row form-row-first validate-required'}>
                          <label htmlFor={'firstName'}>
                            {'First name'}{' '}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'text'}
                              name={'firstName'}
                              className="input-text"
                              autoComplete={'given-name'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstName}
                              placeholder={'Enter first name'}
                            />
                          </span>
                        </p>
                        <p className={'form-row form-row-last validate-required'}>
                          <label htmlFor={'lastName'}>
                            {'Last name'}{' '}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'text'}
                              name={'lastName'}
                              className="input-text"
                              autoComplete={'family-name'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}
                              placeholder={'Enter last name'}
                            />
                          </span>
                        </p>
                        {touched.firstName && errors.firstName ? (
                          <p className="error-message">{errors.firstName}</p>
                        ) : null}
                        {touched.lastName && errors.lastName ? (
                          <p className="error-message">{errors.lastName}</p>
                        ) : null}
                        <p className={'form-row form-row-wide validate-required validate-phone'}>
                          <label htmlFor={'phone'}>
                            {'Phone number'}{' '}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'tel'}
                              name={'phone'}
                              className="input-text"
                              autoComplete={'tel'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone}
                              placeholder={'Enter phone number'}
                            />
                          </span>
                        </p>
                        {touched.phone && errors.phone ? <p className="error-message">{errors.phone}</p> : null}
                        <p className={'form-row form-row-wide validate-required validate-email'}>
                          <label htmlFor={'email'}>
                            {'Email'}{' '}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'email'}
                              name={'email'}
                              className="input-text"
                              autoComplete={'email'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              placeholder={'Enter email'}
                            />
                          </span>
                        </p>
                        {touched.email && errors.email ? <p className="error-message">{errors.email}</p> : null}
                        <p className={'form-row form-row-wide'}>
                          <label htmlFor={'company'}>
                            {'Company'} <span className="optional">(optional)</span>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'text'}
                              name={'company'}
                              className="input-text"
                              autoComplete={'organization'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.company}
                              placeholder={'Enter company'}
                            />
                          </span>
                        </p>
                        <p className={'form-row form-row-wide validate-required validate-region'}>
                          <label htmlFor={'region'}>
                            {'Province/City'}{' '}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'text'}
                              name={'region'}
                              className="input-text"
                              autoComplete={'address-level1'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.region}
                              placeholder={'Enter province or city'}
                            />
                          </span>
                        </p>
                        {touched.region && errors.region ? <p className="error-message">{errors.region}</p> : null}
                        <p className={'form-row form-row-wide validate-required validate-district'}>
                          <label htmlFor={'district'}>
                            {'District'}{' '}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'text'}
                              name={'district'}
                              className="input-text"
                              autoComplete={'address-level2'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.district}
                              placeholder={'Enter district'}
                            />
                          </span>
                        </p>
                        {touched.district && errors.district ? (
                          <p className="error-message">{errors.district}</p>
                        ) : null}
                        <p className={'form-row form-row-wide validate-required validate-ward'}>
                          <label htmlFor={'ward'}>
                            {'Ward'} <span className="optional">(optional)</span>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <input
                              type={'text'}
                              name={'ward'}
                              className="input-text"
                              autoComplete={'address-level3'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ward}
                              placeholder={'Enter ward'}
                            />
                          </span>
                        </p>
                        <p className={'form-row form-row-wide validate-required validate-address'}>
                          <label htmlFor={'address'}>
                            {'Address'}{' '}
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <textarea
                              type={'text'}
                              name={'address'}
                              className="input-text"
                              placeholder={'Enter address'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address}
                              autoComplete={'address-level4'}
                            />
                          </span>
                        </p>
                        {touched.address && errors.address ? <p className="error-message">{errors.address}</p> : null}
                      </div>
                    </div>
                  </div>
                  <div className="clear">
                    <div className="woocommerce-additional-fields">
                      <div className="woocommerce-additional-fields__field-wrapper">
                        <p className="form-row notes">
                          <label htmlFor="orderComment">
                            {'Comments'} <span className="optional">(optional)</span>
                          </label>
                          <span className="woocommerce-input-wrapper">
                            <textarea
                              name="orderComment"
                              className="input-text"
                              placeholder="
                              Enter order note"
                              rows="2"
                              cols="5"
                              value={values.orderComment}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="large-5 col">
                <div className="col-inner has-border">
                  <div className="checkout-sidebar sm-touch-scroll">
                    <h3 id="order_review_heading">Your order</h3>
                    <div id="order_review" className="woocommerce-checkout-review-order">
                      <table
                        className="shop_table woocommerce-checkout-review-order-table"
                        style={{
                          position: 'static',
                          zoom: 1,
                        }}
                      >
                        <thead>
                          <tr>
                            <th className="product-name">Product</th>
                            <th className="product-total">Temporary price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartList.map((cart) => {
                            return (
                              <tr className="cart-item" key={cart.id}>
                                <td className="product-name">
                                  {cart.name}
                                  <strong className="product-quantity">{` x ${cart.quantity}`}</strong>
                                </td>
                                <td className="product-total">
                                  <span className="woocommerce-Price-amount amount">
                                    <bdi>{formatVNprice(cart.price * cart.quantity)}</bdi>
                                    <span className="woocommerce-Price-currencySymbol">$</span>
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                        <tfoot>
                          <tr className="cart-subtotal">
                            <th>Temporary price</th>
                            <td>
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  {formatVNprice(totalCost)}
                                  <span className="woocommerce-Price-currencySymbol">$</span>
                                </bdi>
                              </span>
                            </td>
                          </tr>
                          <tr className="woocommerce-shipping-totals shipping">
                            <td className="shipping__inner" colSpan="2">
                              <table className="shipping__table ">
                                <tbody>
                                  <tr>
                                    <th>Delivery</th>
                                    <td data-title="Giao hàng">
                                      <ul className="shipping__list woocommerce-shipping-methods">
                                        <li className="shipping__list_item">
                                          <label className="shipping__list_label">Free Delivery</label>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Total</th>
                            <td>
                              <strong>
                                <span className="woocommerce-Price-amount amount">
                                  <bdi>
                                    {formatVNprice(totalCost)}
                                    <span className="woocommerce-Price-currencySymbol">$</span>
                                  </bdi>
                                </span>
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                      <div id="payment" className="woocommerce-checkout-payment">
                        <ul className="wc_payment_methods payment_methods methods">
                          <li className="wc_payment_method payment_method_bacs">
                            <input
                              id="payment_method_bacs"
                              type="radio"
                              className="input-radio"
                              name="paymentMethod"
                              value="paypal"
                              checked={values.paymentMethod === 'paypal'}
                              onChange={() => setFieldValue('paymentMethod', 'paypal', false)}
                            />
                            <label htmlFor="payment_method_bacs">PayPal</label>
                            {values.paymentMethod === 'paypal' ? (
                              <div className="payment_box payment_method_bacs">
                                <p>Make payments via PayPal. Orders will be shipped after payment has been made.</p>
                              </div>
                            ) : null}
                          </li>
                          <li className="wc_payment_method payment_method_cod">
                            <input
                              id="payment_method_cod"
                              type="radio"
                              className="input-radio"
                              name="paymentMethod"
                              value="cod"
                              checked={values.paymentMethod === 'cod'}
                              onChange={() => setFieldValue('paymentMethod', 'cod', false)}
                            />
                            <label htmlFor="payment_method_cod">Cash on delivery</label>
                            {values.paymentMethod === 'cod' ? (
                              <div className="payment_box payment_method_cod">
                                <p>Pay the deliverer or shipper using cash or card.</p>
                              </div>
                            ) : null}
                          </li>
                        </ul>
                        <div className="form-row place-order">
                          <div className="woocommerce-terms-and-conditions-wrapper" />
                          {values.paymentMethod === 'paypal' ? (
                            <PaymentSection disabled={isSubmitting} totalCost={totalCost} submitForm={submitForm} />
                          ) : (
                            <button
                              type="submit"
                              className="button alt"
                              name="woocommerce_checkout_place_order"
                              disabled={isSubmitting}
                              style={{ cursor: !isSubmitting ? 'pointer' : 'default', borderRadius: '5px' }}
                            >
                              <div className={`layer-mask ${!isSubmitting ? 'hidden' : null}`}></div>
                              <span className={`material-icons loop ${!isSubmitting ? 'hidden' : null}`}>loop</span>
                              Book
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <style jsx>{styles}</style>
    </div>
  )
}

export default BillingForm
