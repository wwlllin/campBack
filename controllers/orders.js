import orders from '../models/orders.js'
import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    if (req.user.cart.length === 0) throw new Error('EMPTY')
    const result = await users.findById(req.user._id, 'cart').populate('cart.product')
    const ok = result.cart.every(item => item.product.sell)
    if (!ok) throw new Error('SELL')

    await orders.create({
      user: req.user._id,
      cart: req.user.cart
    })

    req.user.cart = []
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    if (error.name === 'EMPTY') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '購物車是空的'
      })
    } else if (error.name === 'SELL') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: '包含已下架商品'
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}

export const get = async (req, res) => {
  try {
    const result = await orders.find({ user: req.user._id }).populate('cart.product')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await orders.find().populate('user', 'account').populate('cart.product')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
