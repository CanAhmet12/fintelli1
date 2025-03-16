import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  seo: {
    title: {
      title: String,
      length: Number,
      score: Number,
      recommendations: [String]
    },
    meta: {
      description: String,
      length: Number,
      score: Number,
      recommendations: [String]
    },
    keywords: {
      keywords: [String],
      density: Map,
      recommendations: [String]
    },
    score: Number,
    recommendations: [String]
  },
  performance: {
    metrics: {
      load_time: Number,
      page_size: Number,
      status_code: Number,
      resource_count: {
        images: Number,
        scripts: Number,
        styles: Number
      },
      score: Number
    },
    recommendations: [String]
  },
  ai_recommendations: [{
    type: String,
    description: String,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low']
    },
    impact: Number
  }],
  overall_score: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Report = mongoose.model('Report', reportSchema) 