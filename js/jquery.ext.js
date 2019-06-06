(function ($) {
	$.extend($, {
		/*提示信息方法开始--------------------------------------------------------------------------*/

		/*消息提示 content:提示内容*/
	    msg: function (content, url, callback) {
			
	        var arguments_length = arguments.length;
			layer.open({
				content: content
                , skin: 'msg'
                , time: 2000
			});
			if (url && url != "") {
				if (url == "back") {
				    setTimeout(function () { history.back(-1); }, 2000);
				}
				else if (url == "reload") {
				    setTimeout(function () { window.location.reload(); }, 2000);
				}
				else {
					setTimeout(function () { location.href = url }, 2000);
				}
			}

			//执行回调函数
			if (arguments_length == 3) {
				callback();
			}
		},
		/*询问框 content:内容,yesFunc 函数,YesText:按钮文字,NoText:按钮文字*/
		confirm: function (content, yesFunc, noFunc, yesText, noText) {
			yesFunc = yesFunc || function () { $.closemsgall(); };
			noFunc = noFunc || function () { $.closemsgall(); };
			yesText = yesText || "确定";
			noText = noText || "取消";

			layer.open({
				content: content
                , btn: [yesText, noText]
                , yes: function () { yesFunc() }
                , no: function () { noFunc() }
			});
		},
		/*底部对话框 content:内容,yesFunc 函数,YesText:按钮文字,NoText:按钮文字*/
		footermsg: function (content, yesFunc, yesText, noText) {
			yesFunc = yesFunc || function () { $.closemsgall(); };
			yesText = yesText || "确定";
			noText = noText || "取消";

			layer.open({
				content: content
                , shadeClose: false
                , btn: [yesText, noText]
                , skin: 'footer'
                , yes: function () { yesFunc(); }
			});
		},
		/*loading*/
		loadingmsg: function (sclose) {
			sclose = sclose || false;
			var i= layer.open({ type: 2, shadeClose: sclose });
			//设置遮罩层颜色
			$(".layui-m-layershade").css("background-color", "transparent");
			return i;
		},
		/*loading 带文字*/
		loadingmsg2: function (content, sclose) {
			sclose = sclose || false;
			var i= layer.open({
				type: 2
                , content: content
                , shadeClose: sclose
			});
			//设置遮罩层颜色
			$(".layui-m-layershade").css("background-color", "transparent");
			return i;
		},
		/*关闭消息提示*/
		closemsg: function (i) {
			layer.close(i);
		},
		/*关闭所有消息提示*/
		closemsgall: function () {
			layer.closeAll();
		},
		/*内容验证方法开始--------------------------------------------------------------------------*/

		/*验证用户名*/
		checkUserName: function (user, errormsg) {
			errormsg = errormsg || "用户名只允许输入英文、数字、汉字";
			var reg = /^(\w|[\u4E00-\u9FA5])*$/;
			if (user.match(reg)) {
				return true;
			} else {
				$.msg(errormsg);
				return false;
			}
		},
		/*验证用户密码*/
		checkUserPwd: function (pwd, errormsg) {
			errormsg = errormsg || "密码只允许输入8-16位的英文、数字";
			var reg = /^[A-Za-z0-9]{8,16}$/;
			if (pwd.match(reg)) {
				return true;
			} else {
				$.msg(errormsg);
				return false;
			}
		},
		/*验证邮箱*/
		checkEmail: function (email, errormsg) {
			errormsg = errormsg || "请正确输入E-Mail";
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+[\.][a-zA-Z]{2,3}$/;
			if (!reg.test(email)) {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证手机*/
		checkPhone: function (tel, errormsg) {
			errormsg = errormsg || "请正确输入手机";
			if (/^13\d{9}$/g.test(tel) || /^14\d{9}$/g.test(tel) || /^15\d{9}$/g.test(tel) || /^16\d{9}$/g.test(tel) || /^17\d{9}$/g.test(tel) || /^18\d{9}$/g.test(tel) || /^19\d{9}$/g.test(tel)) {
				return true;
			} else {
				$.msg(errormsg);
				return false;
			}
		},
		/*验证姓名*/
		checkChn: function (name, errormsg) {
			errormsg = errormsg || "请正确输入真实姓名";
			var reg = /^[\u4E00-\u9FA5]+$/;
			if (!reg.test(name)) {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证是否为空*/
		checkNullOrUndefined: function (content, errormsg) {
			errormsg = errormsg || "内容不能为空";
			if (content == "" || content == " " || content == "  " || typeof (content) == "undefined") {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证是否为数字*/
		checkNumber: function (number, errormsg) {
			errormsg = errormsg || "请正确输入数字";
			var reg = /^[0-9]*$/;
			if (!reg.test(number)) {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证是否为日期*/
		checkDateTime: function (time, errormsg) {
			errormsg = errormsg || "请选择正确的日期";
			var reg = /^\s*$|^\d{4}\-\d{1,2}\-\d{1,2}$/;
			if (!reg.test(time)) {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证是否为金钱*/
		checkMoney: function (money, errormsg) {
			errormsg = errormsg || "请正确输入金额";
			var reg = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
			if (!reg.test(money)) {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证是否为QQ*/
		checkQQ: function (qq, errormsg) {
			errormsg = errormsg || "请正确输入QQ号码";
			var reg = /^[1-9][0-9]{4,}$/
			if (!reg.test(qq)) {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证固定电话*/
		checkTel: function (tel, errormsg) {
			errormsg = errormsg || "请正确输入固定电话";
			var reg = /0\d{2,3}-\d{7,8}/
			if (!reg.test(tel)) {
				$.msg(errormsg);
				return false;
			}
			return true;
		},
		/*验证身份证*/
		checkCardId: function (socialNo) {
			if (socialNo == "") {
				$.msg("请正确输入身份证");
				return false;
			}

			if (socialNo.length != 15 && socialNo.length != 18) {
				$.msg("请正确输入身份证");
				return false;
			}

			var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };

			if (area[parseInt(socialNo.substr(0, 2))] == null) {
				$.msg("请正确输入身份证");
				return (false);
			}

			if (socialNo.length == 15) {
				pattern = /^\d{15}$/;
				if (pattern.exec(socialNo) == null) {
					$.msg("请正确输入身份证");
					return (false);
				}
				var birth = parseInt("19" + socialNo.substr(6, 2));
				var month = socialNo.substr(8, 2);
				var day = parseInt(socialNo.substr(10, 2));
				switch (month) {
					case '01':
					case '03':
					case '05':
					case '07':
					case '08':
					case '10':
					case '12':
						if (day > 31) {
							$.msg('请正确输入身份证');
							return false;
						}
						break;
					case '04':
					case '06':
					case '09':
					case '11':
						if (day > 30) {
							$.msg('请正确输入身份证');
							return false;
						}
						break;
					case '02':
						if ((birth % 4 == 0 && birth % 100 != 0) || birth % 400 == 0) {
							if (day > 29) {
								$.msg('请正确输入身份证');
								return false;
							}
						} else {
							if (day > 28) {
								$.msg('请正确输入身份证');
								return false;
							}
						}
						break;
					default:
						$.msg('请正确输入身份证');
						return false;
				}
				var nowYear = new Date().getYear();
				if (nowYear - parseInt(birth) < 15 || nowYear - parseInt(birth) > 100) {
					$.msg('请正确输入身份证');
					return false;
				}
				return true;
			}

			var Wi = new Array(
                      7, 9, 10, 5, 8, 4, 2, 1, 6,
                      3, 7, 9, 10, 5, 8, 4, 2, 1
                      );
			var lSum = 0;
			var nNum = 0;
			var nCheckSum = 0;

			for (i = 0; i < 17; ++i) {


				if (socialNo.charAt(i) < '0' || socialNo.charAt(i) > '9') {
					$.msg("请正确输入身份证");
					return false;
				}
				else {
					nNum = socialNo.charAt(i) - '0';
				}
				lSum += nNum * Wi[i];
			}

			if (socialNo.charAt(17) == 'X' || socialNo.charAt(17) == 'x') {
				lSum += 10 * Wi[17];
			}
			else if (socialNo.charAt(17) < '0' || socialNo.charAt(17) > '9') {
				$.msg("请正确输入身份证");
				return false;
			}
			else {
				lSum += (socialNo.charAt(17) - '0') * Wi[17];
			}

			if ((lSum % 11) == 1) {
				return true;
			}
			else {
				$.msg("请正确输入身份证");
				return false;
			}

			return true;
		}
	});

	/*通用AJAX方法开始--------------------------------------------------------------------------*/
	var $layindex = 0;
	$.ajaxDefaults = $.ajaxDefaults || {};
	$.ajaxDefaults.property = {
		type: 'post',
		dataType: 'json',
		timeOut: 60000,
		sendUrl: null,
		data: null,
		loading: true,
		loadingText: '请稍后...',
		callBack: null
	};

	$.extend($, {
		/*一般的异步请求封装[d格式：{'data':data,'msg':msg,'backurl':backurl}]*/
	    ajaxDefSet: function (b) {
			var p = $.extend({}, $.ajaxDefaults.property, b || {});

			if (p.callBack == null || typeof (p.callBack) == 'undefined') {
			    p.callBack = function (d) {
			        $.msg(d.msg, d.backurl);
			    };
			}

			var ajaxbegin = function () { }, ajaxcomplete = function () { };
			if (p.loading) {
				ajaxbegin = $.ajaxbegin;
				ajaxcomplete = $.ajaxcomplete;
			}

			$.ajax({
				url: p.sendUrl,
				type: p.type,
				timeout: p.timeOut,
				dataType: p.dataType,
				data: p.data,
				beforeSend: function () {
					ajaxbegin(p.loadingText);
				},
				complete: function () {
					ajaxcomplete($layindex);
				},
				success: p.callBack,
				error: function (XMLHttpRequest, textStatus, errorThrown) {
				    //$.msg('状态：' + textStatus + '；出错提示：' + errorThrown)
				    $.msg('系统繁忙，请稍后再试');
				}
			});
		},
		/*异步表单提交前loading方法*/
		ajaxbegin: function (msg) {
			$layindex = $.loadingmsg2(msg);
		},
		/*异步表单提交后关闭loading方法*/
		ajaxcomplete: function (index) {
			layer.close(index);
		}
	});
}(jQuery));