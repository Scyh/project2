var mongoose = require('mongoose');

// 建模
var schema_Food = new mongoose.Schema({
	food_name: {
		type: String,
		require: true
	},
	food_brief: {
		type: String,
		require: true,
		default: "暂无简介！"
	},
	food_star: {
		type: Number,
		default: 0
	},
	food_price: {
		type: Number
	},
	food_tel: {
		type: Number
	},
	open_time: {
		type: String,
		default: '周一至周日, 上午8:00-20:00',
	},
	food_addr: {
		type: String,
	},
	food_belongsTo: {
		type: Number,
		require: true
	},
	food_cover_img: {
		type: String,
		default: ''
	}
})

schema_Food.statics = {
	
	// 获取分页文章
	fetchPart(params, data) {
		return this.find({'food_belongsTo': params.canteen}, {
			'food_name': 1,
			'food_brief': 1,
			'food_price': 1,
			'food_star': 1,
			'food_cover_img': 1,
			'food_belongsTo': 1
		}).limit(6).skip((params.page - 1 ) * 6).exec(data)
	},

	// 更新 food 的评分
	updataScore(params, data) {
		return this.update({"_id": params.food_id}, {
			$set: {
				'food_star': params.new_score
			}
		}).exec(data)
	},

	// 按照评分获取 food
	fetchByStar(params, data) {

		// -1 升序 asc
		// 1 降序 desc
		let ranking = -1;
		params.ranking == 'asc' ? ranking = -1 : ranking = 1;

		return this.find({}, {
			'food_name': 1,
			'food_star': 1,
			'food_belongsTo': 1,
			'food_price':1,
			'food_cover_img': 1
		}).sort({
			'food_star': ranking
		}).limit(6).skip((params.page - 1) * 6).exec(data)
	},

	// 获取每个食堂的菜品总量
	getFoodCount(canteen_id, data) {
		return this.find({'food_belongsTo': canteen_id}).count().exec(data)
	},

	// 删除菜品
	delOne(food_id, data) {
		return this.remove({'_id': food_id}).exec(data)
	},

	// 修改菜品信息
	changeFoodInfo(params, data) {
		return this.update({'_id': params.food_id}, {
			$set: {
				'food_name': params.food_name,
				'food_brief': params.food_brief,
				'food_price': params.food_price,
				'food_tel': params.food_tel,
				'open_time': params.open_time,
				'food_addr': params.food_addr,
				'food_cover_img': params.food_cover_img
			}
		}).exec(data)
	}

}

module.exports = schema_Food