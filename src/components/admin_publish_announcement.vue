<template>
	<div id="publish_announcement">
		<form class="form-horizontal">
			<div class="form-group">
				<label for="title" class="control-label col-md-2">公告标题</label>
				<div class="col-md-6">
					<input type="text" class="form-control" id="title" placeholder="标题：公告标题">
				</div>
			</div>
			<div class="form-group">
				<label for="content" class="control-label col-md-2">公告内容</label>
				<div class="col-md-6">
					<textarea class="form-control" id="content"></textarea>
				</div>
			</div>
			<div class="form-group">
				<div class="col-md-offset-7">
					<input type="reset" class="btn reset" value="清空">
					<button class="btn btn-primary" @click="publish">提交</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
	import bus from '../bus.js'

	export default {
		methods: {
			publish() {
				let title = $("#title").val().trim();
				let content = $("#content").val().trim();

				if (title == '' || content == '') {
					return
				} else {
					let result = confirm('确认发表公告？')
					if (result) {
						$.post('http://localhost:3001/apis/admin/publishAnnouncement', {
							title: title,
							content: content
						}).then(data => {
							if (data.status == 'success') {
								alert('发表成功！')
								$(".close").trigger("click");
								$(".reset").trigger("click");
								this.$emit('publish')
							}
						})
					}
				}
			}
		}
	}
</script>
<style scoped>
	label::after {
		content: '*';
		margin-left: 10px;
		position: absolute;
		display: inline-block;
		color: red;
		font-size: 18px;
	}
	#content {
		min-height: 400px;
		resize: none;
	}
	.btn button,
	.btn input {
		float: right;
		margin-left: 15px;
	}
	.modal-header,
	.modal-footer {
		padding: 10px 15px !important;
	}
	.modal-body {
		padding: 20px 15px;
	}
</style>