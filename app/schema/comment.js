const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchemea = mongoose.Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: 'articlelists'
    }, // 所属文章,多表关联查询
    userComments:
    // 评论
    {
        // 评论用户名
        commentUser: {
            type: String,
            default: ''
        },
        // 评论内容
        commentContent: {
            type: String,
            default: ''
        },
        // 回复时间
        commentTime: {
            type: Date,
            default: Date.now
        },
        // 点赞数
        commentSupport: {
            type: Number,
            default: 0
        },
        // 是否已经点赞
        isSupport: {
            type: Boolean,
            default: false
        },
        // 回复面板是否展开
        isShow: {
            type: Boolean,
            default: false
        },
        // 是否有回复
        isReply: {
            type: Boolean,
            default: false
        },
        // 回复信息
        reply: [
            {
                // 评论用户名
                replyUser: {
                    type: String,
                    default: ''
                },
                // 评论内容
                replyContent: {
                    type: String,
                    default: ''
                },
                // 回复时间
                replyTime: {
                    type: Date,
                    default: Date.now
                },
                // 点赞数
                replySupport: {
                    type: Number,
                    default: 0
                },
                // 是否已经点赞
                replyIsSupport: {
                    type: Boolean,
                    default: false
                },
                // 回复框是否展开
                isShowReply: {
                    type: Boolean,
                    default: false
                },
                // 回复的用户名
                replyUsered: {
                    type: String,
                    default: ''
                }
            }
        ]
    }// 评论内容
});
module.exports = mongoose.model('commentlists', commentSchemea);
