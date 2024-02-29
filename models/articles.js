import { Schema, model } from 'mongoose'

const articlesSchema = new Schema({
  title: {
    type: String,
    required: [true, '缺少文章標題']
  },
  image: {
    type: [String],
    required: [true, '缺少文章圖片']
  },
  content: {
    type: String,
    required: [true, '缺少文章內容']
  },
  category: {
    type: String,
    required: [true, '缺少文章分類'],
    enum: {
      values: ['營地料理', '露營知識'],
      message: '文章分類錯誤'
    }
  },
  release: {
    type: Boolean,
    required: [true, '缺少文章發佈狀態']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('articles', articlesSchema)
