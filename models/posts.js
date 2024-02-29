import { Schema, model, ObjectId } from 'mongoose'

const PostSchema = new Schema({
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, '缺少貼文標題']
  },
  image: {
    type: [String],
    required: [true, '缺少貼文圖片']
  },
  content: {
    type: String,
    required: [true, '缺少貼文內容']
  },
  release: {
    type: Boolean,
    required: [true, '缺少貼文發佈狀態']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('posts', PostSchema)
