/* eslint-disable @next/next/no-img-element */
import styles from './styles'
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { formatVNprice } from 'utils/function'
import { IMAGE_QUALITY } from 'utils/constant'
import { removeItemById } from 'store/reducers/checkoutSlice'

const NavBar = () => {
  const router = useRouter()

  const CheckoutSlice = useSelector((state) => state.checkout)
  const cartList = Object.values(CheckoutSlice.cart)
  const totalCost = CheckoutSlice.totalPrice
  let totalQuantity = 0
  cartList.forEach((cart) => {
    totalQuantity += cart.quantity
  })

  const left = totalQuantity < 10 ? '5px' : totalQuantity < 100 ? '2px' : '0'
  const dispatch = useDispatch()

  if (!router.isReady) return null

  return (
    <nav className="top-navbar-wrapper">
      <div className="navbar-container">
        <div className="image-logo">
          <Image src="/images/Logo.png" alt="companyLogo" loading="lazy" width={120} height={40} />
        </div>

        <div className="menus">
          <div className="menu-items">
            <Link href="/" passHref>
              <div className={classNames('title', { isChosen: router.asPath === '/' })}>Home</div>
            </Link>
          </div>
          <div className="menu-items">
            <Link href="/products" passHref>
              <div className={classNames('title', { isChosen: router.asPath === '/products' })}>Product</div>
            </Link>
          </div>
          <div className="menu-items">
            <div className="title">About us</div>
          </div>
        </div>

        <div className="icons">
          <div className="shopping-bag">
            <img className="shopping-bag-icon" src="/images/icon-shopping-bag.png" alt="shopping" />
            <div className="num-product" style={{ left: left }}>
              {totalQuantity}
            </div>
            <div className="cart-wrapper">
              <div className="tooltip-arrow"></div>
              <div className="cart-container">
                {cartList.map((cart) => {
                  return (
                    <div className="cart-card" key={cart.id}>
                      <div className="cart-img">
                        <Image
                          src={cart.images.length !== 0 ? cart.images[0].storageUrl : '/images/no-image.png'}
                          alt={cart.name}
                          width={IMAGE_QUALITY.MED}
                          height={IMAGE_QUALITY.MED}
                        />
                      </div>
                      <div className="cart-info">
                        <Link href={`/products/${cart.id}`}>
                          <a className="cart-name">{cart.name}</a>
                        </Link>
                        <p className="cart-quantity">
                          {cart.quantity} &#215; <span className="cart-price">{formatVNprice(cart.price)}</span>
                          <span className="unit-price">₫</span>
                        </p>
                      </div>
                      <span
                        className="material-icons-outlined remove"
                        onClick={() => dispatch(removeItemById(cart.id))}
                      >
                        cancel
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="row">
                <p className="total">Subtotal:</p>
                <p className="cart-total">
                  <span className="cart-price">{formatVNprice(totalCost)}</span>
                  <span className="unit-price">₫</span>
                </p>
              </div>
              <div className="row">
                <Link href="/checkout" passHref>
                  <a className="cart-review">View cart</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="search">
            <img src="/images/icon-search.png" alt="search" />
          </div>
          <div className="panel">
            <span className="material-icons-outlined">reorder</span>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </nav>
  )
}

export default NavBar
