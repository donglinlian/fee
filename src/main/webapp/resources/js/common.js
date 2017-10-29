﻿/**
 * 前端公共模块
 */

(function() {

	/**
	 * AMD config for warpper function.
	 * require.config：设置依赖包名称和路径，参看js AMD加载方案
	 * baseUrl: 改变相对于main中隐式指定的baseUrl
	 * dependenceModule: 对于AMD define 模块时，指出依赖模块
	 */
	var requireJsModuleConfig = {
		//	　baseUrl: "js",
		paths: {
			"jquery": "jquery/jquery-1.11.1.min",

			"cookie": "jquery/jquery.cookie"
		}
	};
	//AMD依赖方式加载, 依赖jquery和jquery.cookie 包
	var dependenceModule = ["jquery", 'cookie'];

	/**
	 * @description 封装为同时支持AMD和原有html 包含js序列的模式
	 * @param generator 用于产生导出对象exports的工厂方法。
	 * @public_name 采用原有叠加js方式时，采用导出的名字（如$phi) 的公用制造方式，
	 */


	var warpper = function( _factory ) {
		if (typeof define === "function" && define.amd) {

			//如果AMD依赖方式加载，

			require.config(requireJsModuleConfig);

			define("phicommon",dependenceModule, _factory);
			console.log('phi-common module loaded. ');

		} else {
			//assume the jquery has linked in the html file in original method.
			//传统方式，在html文件中依次先加载jquery. $是全局juery对象（且加载了jquery.cookie plugins)，在本JS前加载。
			window.$phi = _factory($);
		}
	};

	/**
	 *
	 * @param {Object} $ 依赖的已经加载的外部对象，如此处的jquery等... 如依赖多个外部对象，则应列出多个参数。 例如 ($,_) 并修改上方法AMD中依赖模块
	 * @returns 返回需要暴露给公有的exports 对象
	 */


	var factory = function($) {
		/**
		 * @description 空对象，后面指示它的属性，表示本文件中哪些变量是可以开放出来供使用的.
		 */
		var exports = {};

		var const_vars_cn = {
			sorryRetry: '对不起，请求发送失败,请重试...',
			_8000: '服务端出现错误',
			_8009: '服务器异常',
			_8010: '请求超时',
			_1010: '参数错误',
			_1011: '参数不支持',
			_1020: '查询失败',
			_1030: '创建失败',
			_1040: '更新失败',
			_1050: '删除失败',
			_1110: '操作冲突',
			_1200: '无权限或权限已过期', //'令牌不匹配',
			_1201: '接口调用者与设备合作商不一致',
			_1101: '重启失败',
			_1103: '软件升级失败',
			_1070: '管理的网络不能重复',
			_1016: '设备不支持'
		};

		var const_browser_laster_ver = {
			ie: 8,
			firefox: 30,
			chrome: 30,
			opera: 10.5,
			safari: 4
		};

		var projectConfig = {
			project_name: "FX_Service_DevMng", // string of project name and be part of relative url. like :"FX_Service_DevMng"
			login_page: "login.html"
		};
		var http = window.location.protocol; //normally string 'http:'
		var host = window.location.host; // string like "127.0.0.1:8020"
		var baseUrl = http + "//" + host + "/" + projectConfig.project_name + "/"; //string of baseUrl of project, like http://127.0.0.1:8080/FX_Service_DevMng/  (end with '/')

		/**
		 * @description get token from cookie.
		 */
		var token = $.cookie("token") ? $.cookie("token") : "";


		/**
		 * to check if current page is unload/refreshed.
		 */
		var isPageBeingRefreshed = false;

		$(window).on('beforeunload', function() {
			isPageBeingRefreshed = true;
		});

		var isPopRelogin = true;
		
		/**
		 * @description judgement of errorCode.
		 * @param {Object} error - The errorCode for judge.
		 */
		var showError = function(error) {
			if (0 == error) {

			} else if (8000 == error) {
				alert("error", const_vars_cn._8000);
			} else if (8009 == error) {
				alert("error", const_vars_cn._8009);
			} else if (8010 == error) {
				alert("error", const_vars_cn._8010);
			} else if (1010 == error) {
				alert("error", const_vars_cn._1010);
			} else if (1011 == error) {
				alert("error", const_vars_cn._1011);
			} else if (1020 == error) {
				alert("error", const_vars_cn._1020);
			} else if (1030 == error) {
				alert("error", const_vars_cn._1030);
			} else if (1040 == error) {
				alert("error", const_vars_cn._1040);
			} else if (1050 == error) {
				alert("error", const_vars_cn._1050);
			} else if (1110 == error) {
				alert("error", const_vars_cn._1110);
			} else if (1200 == error) {
				if(isPopRelogin){
					alert("error", const_vars_cn._1200, relogin);
					isPopRelogin = false;
				}
			} else if (1201 == error) {
				alert("error", const_vars_cn._1201);
			} else if (1101 == error) {
				alert("error", const_vars_cn._1101);
			} else if (1103 == error) {
				alert("error", const_vars_cn._1103);
			} else if (1070 == error) {
				alert("error", const_vars_cn._1070);
			} else if (1016 == error) {
				alert("error", const_vars_cn._1016);
			}
		};

		function relogin(){
			window.top.location.href = http + "//" + host + "/" + projectConfig.project_name + "/" + projectConfig.login_page;
		}
		
		/**
		 * @description Ajax请求发送和接收过程中转圆圈提示.
		 */
		$(document).ajaxStart(onStart).ajaxComplete(onComplete).ajaxSuccess(onSuccess)
			.ajaxError(onError);

		function onStart(event) {
			//        var top = ($(window).height() - $(divName).height())/2;   
			//        var left = ($(window).width() - $(divName).width())/2;   
			var top = ($(window).height() - 50) / 2;
			var left = ($(window).width() - 50) / 2;
			var scrollTop = $(document).scrollTop();
			var scrollLeft = $(document).scrollLeft();
			var loading = $("<div id=\"loading\" style=\"z-index:100;position:absolute;top:0px;left:0px;width:"+$(window).width()+"px; height:"+$(window).height()+"px;opacity:0.5;background:#e8e8e8;;\">" + "<img src=\"" + baseUrl + "resources/images/loading.gif\" title=\"加载中...\" alt=\"加载中...\" width=\"50\" height=\"50\" style=\"position:relative;top:" + (top + scrollTop) + "px;left:" + (left + scrollLeft) + "px;\"/></div>");
			if ($('#loading').html() == null) {
				$("body").append(loading);
			} else {
				//			$('#loading').attr('style', "position:absolute; top:"+(top+scrollTop)+";left:"+(left+scrollLeft)+";");
				//			$('#loading').show();
				$('#loading').css({
					position: 'absolute',
					top: 0,//top + scrollTop,
					left: 0,//left + scrollLeft
				}).show();
			}
		}

		function onComplete(event, xhr, settings) {
			// alert("onComplete");
			$('#loading').hide();

			// $('#loading').attr('style', "display:none;z-index:1;");
		}

		function onSuccess(event, xhr, settings) {
			// alert("onSuccess");
			// $('#loading').attr('style', "display:none;z-index:1;");
			$('#loading').hide();
		}

		function onError() {
			// alert("onError");
			// $('#loading').attr('style', "display:none;z-index:1;");
			$('#loading').hide();
		}

		/**
		 * @description 全选和反选方法.
		 * @param {String} checkAll_id - The 全选checkbox的ID
		 * @param {String} checkbox_class - The 被选checkbox的class
		 */
		var check = function(checkAll_id, checkbox_class) {
			/* check all */
			$('#' + checkAll_id + '').click(function() {
				$('.' + checkbox_class + '').prop('checked', $(this)[0].checked);
				//$(this).prop('checked');
			});
			$('.' + checkbox_class + '').click(function() {
				var ckbObjs = $('input[name="checkbox"]');
				var isAllChecked = true;
				for (var i = 0; i < ckbObjs.length; i++) {
					if (!ckbObjs[i].checked) {
						isAllChecked = false;
						break;
					};
				}
				$('#' + checkAll_id + '').prop('checked', isAllChecked);
			});
		};

		/**
		 * @description get checked ids from table.
		 * @return String.
		 */
		var getIds = function() {
			var ids = "";
			var ckbObj = $("input[name='checkbox']");
			for (var i = 0; i < ckbObj.length; i++) {
				ids += ckbObj[i].id + ",";
			}
			ids = ids.substring(0, ids.length - 1);
			return ids;
		};

		/**
		 * @description 获得页面表格中全部选中的数据的ids，ids是隐藏在checkbox中的.
		 * @return String.
		 */
		var getCheckedIds = function(fromvalue) {
			var ids = "";
			$("input[name='checkbox']").each(function() {
				if (this.checked == true) {
					if (fromvalue != null && fromvalue != "undefined") {
						if($(this).val()=="on"){
							// TODO
						} else {
							ids += $(this).val() + ",";
						}	
					} else {
						ids += this.id + ",";
					}
				}
			});
			ids = ids.substring(0, ids.length - 1);
			return ids;
		};

		/**
		 * @description transfor string to json.
		 * @param {String} datas - The String server-side returned.Server-side returns "response":{"token":123,"rows":[]},take out '"response:":',the remain is json type string.
		 * @return json.
		 */
		var str2json = function(datas) {
			try {
				var index = datas.indexOf(":") + 1;
				var temp = datas.substring(index, datas.length);
				var data = eval('(' + temp + ')');
				return data;
			} catch (e) {
				console.log("server返回数据转成json出错：" + e.message);
				return "";
			}
		};

		var page_num = 1;

		/**
		 * @description function to show page num.
		 * @param {String} total - The param server-side returned.
		 * @param {String} size - The page size.
		 * @param {String} id - The id of input to show page number.
		 */
		var page = function(total, size, id) {
			var total_page_num = 1;
			if (0 == total) {
				total = 1;
			}
			if ("" == size || size > total) {
				size = total;
				page_num = 1;
			} else {
				if (total / size <= 1) {
					total_page_num = 1;
				} else if (total / size > 1 && total % size == 0) {
					total_page_num = total / size;
				} else if (total % size != 0) {
					total_page_num = Math.ceil(total / size);
				}
			}
			//page_num = page_num>total_page_num?total_page_num:page_num;
			total_page_num = page_num > total_page_num ? page_num : total_page_num;
			$('#' + id + '').val(page_num + "/" + total_page_num);
		};

		/**
		 * @description refresh page by interval.
		 * @param {Object} sec - The second for interval to refresh page.
		 */
		var refreshByInterval = function(sec, fnn) {
			if (fnn) {
				setInterval(fnn, sec * 1000);
			} else {
				function show() {
					// alert("ready");
					location.reload(false);
				}
				setInterval(show, sec * 1000);
			}
		};

		/**
		 * @description clear interval
		 */
		var clearInterval = function() {
			window.clearInterval();
		};

		/**
		 * @description To determine whether a browser supports localStorage.
		 */
		var isSupportLocalStorage = function(){
			if (window.localStorage) {
				//alert("浏览器支持localStorage");
				return true;
			} else {
				//alert("error", "您的浏览器不支持localStorage，请使用最新版浏览器或使用Chrome、FireFox等浏览器，否则某些功能将不能正常使用。");
				return false;
			} //或者 if(typeof window.localStorage == 'undefined'){ 	alert("浏览器不支持localStorage") }
		};

		/**
		 * @description Ajax get request
		 * @param {String} url - The url of the request.
		 * @param {Object} data - The data of the request to send.
		 * @param {Function} callback - The function will be execute, when request send success.
		 * @param {Object} Dates - The data used to process in success.
		 * @param {Function} errorToDo - The function will be execute, when error not equals 0.
		 */
		var get = function(url, data, callback, Dates, errorToDo) {
			var domain_id = localStorage.getItem("domain_id");
			if(data.domain_id){
			}else{
				if (domain_id != null && domain_id != "null") {
					data.domain_id = domain_id;
				}
			}
			if(typeof data.token === "undefined"){
				data.token = token;
			}
			data._r_a_n_d_o_m_ = generateMixed(30);
			data._d_a_t_e_ = new Date();
			$.ajax({
				url: baseUrl + url,
				data: data,
				type: "GET",
				enctype: "application/json;charset=utf-8",
				//			processData: false, // tell jQuery not to process the data
				contentType: "application/json;charset=utf-8", // tell jQuery not to set contentType
				dataType: "text",
				cache: false,
				success: function(datas) {
					var data = str2json(datas);
					if (data.error == 0) {
						if (Dates) {
							callback(data, Dates);
						} else {
							callback(data);
						}

					} else {
						if (errorToDo) {
							errorToDo(data);
						} else {
							if (data.detailError) {
								if(data.detailErrorCode != 1200)
									alert("error", data.detailError);
								if (data.error == 1200 && isPopRelogin) {
									alert("error", const_vars_cn._1200, relogin);
									isPopRelogin = false;
								}
							} else if (data.entities) {
								var msg = "";
								$.each(data.entities, function(n, data) {
									var sn = data.sn ? data.sn : "";
									var message = data.message ? data.message : "";
									if (sn != "") {
										msg += "sn:" + sn + "," + message + ";";
									} else {
										msg += message + ";";
									}
								});
								alert("error", "失败详情：" + msg);
							} else {
								showError(data.error);
							}
						}
					}
				},
				error: function(xhr, error) {
					if (!isPageBeingRefreshed) {
						alert("error", const_vars_cn.sorryRetry);
					}

				}
			});
		};
		/**
		 * @description Ajax post request
		 * @param {String} url - The url of the request.
		 * @param {Object} data - The data of the request to send.
		 * @param {Function} callback - The function will be execute, when request send success.
		 * @param {Object} Dates - The data used to process in success.
		 * @param {Function} errorToDo - The function will be execute, when error not equals 0.
		 */
		var post = function(url, data, callback, Dates, errorToDo) {
			var domain_id = localStorage.getItem("domain_id");
			if(data.domain_id){

			}else{
				if (domain_id != null && domain_id != "null") {
					data.domain_id = domain_id;
				}
			}
			if(typeof data.token === "undefined"){
				data.token = token;
			}
			$.ajax({
				url: baseUrl + url,
				type: "POST",
				data: data,
				enctype: 'application/json;charset=utf-8',
				dataType: "text",
				success: function(datas) {
					var data = str2json(datas);
					if (data.error == 0) {
						if (callback) {
							if (Dates) {
								callback(data, Dates);
							} else {
								callback(data);
							}
						} else {
							succPrompt();
						}
					} else {
						if (errorToDo) {
							errorToDo(data);
						} else {
							if (data.detailError) {
								if(data.detailErrorCode != 1200)
									alert("error", data.detailError);
								if (data.error == 1200 && isPopRelogin) {
									alert("error", const_vars_cn._1200, relogin);
									isPopRelogin = false;
								}
							} else if (data.entities) {
								var msg = "";
								$.each(data.entities, function(n, data) {
									var sn = data.sn ? data.sn : "";
									var message = data.message ? data.message : "";
									if (sn != "") {
										msg += "sn:" + sn + "," + message + ";";
									} else {
										msg += message + ";";
									}
								});
								alert("error", "失败详情：" + msg);
							} else {
								showError(data.error);
							}
						}
					}
				},
				error: function(xhr, error) {
					if (!isPageBeingRefreshed) {
						alert("error", const_vars_cn.sorryRetry);
					}

				}
			});
		};

		var succPrompt = function() {
			alert("msg", "操作执行成功！", reload);
		};

		var reload = function() {
			location.reload(false);
		};

		/*var domain = function(){
			try{
				var topFrameObj = window.top.document.getElementById("topFrame").contentWindow;
				var domain = topFrameObj.document.getElementById("domain").value;
				localStorage.setItem("domain_id", domain);
				return domain;
			}catch(e){
				console.log(e.message);
			}
		};*/
		/**
		 * @description 获得网络
		 */
		var domain_id = function() {
			return localStorage.getItem("domain_id");
		};


		/**
		 * @description 分页按钮方法
		 * @param {String} first - The id of button, goto first page.
		 * @param {String} prev - The id of button, goto prev page.
		 * @param {String} next - The id of button, goto next page.
		 * @param {String} last - The id of button, goto last page.
		 * @param {String} page_num - The page_num.
		 * @param {String} tableId - The table's id.
		 * @param {Function} find - The function of request datas for show.
		 */
		var paginationBtn = function(first, prev, next, last, find, tableId) {
			$('#' + first + '').click(function() {
				if (tableId) {
					$('#' + tableId).find('input[type="checkbox"]').prop('checked', false);
				}
				page_num = 1;
				find(page_num);
			});

			$('#' + prev + '').click(function() {
				if (tableId) {
					$('#' + tableId).find('input[type="checkbox"]').prop('checked', false);
				}
				if ("" == page_size || page_size > total) {
					page_size = total;
				}
				if (1 < page_num) {
					page_num = page_num - 1;
					find(page_num);
					return;
				}
			});

			$('#' + next + '').click(function() {
				if (tableId) {
					$('#' + tableId).find('input[type="checkbox"]').prop('checked', false);
				}
				if (0 == total) {
					total = 1;
				}
				if ("" == page_size || page_size > total) {
					page_size = total;
				}
				var total_page_num = "";
				if (total / page_size <= 1) {
					total_page_num = 1;
				} else if (total / page_size > 1 && total % page_size == 0) {
					total_page_num = total / page_size;
				} else if (total % page_size != 0) {
					total_page_num = Math.ceil(total / page_size);
				}

				if (total_page_num > page_num) {
					page_num += 1;
					find(page_num);
				}
			});

			$('#' + last + '').click(function() {
				if (tableId) {
					$('#' + tableId).find('input[type="checkbox"]').prop('checked', false);
				}
				if ("" == page_size || page_size > total) {
					page_size = total;
				}
				if (total / page_size <= 1) {
					page_num = 1;
				} else if (total / page_size > 1 && total % page_size == 0) {
					page_num = total / page_size;
				} else if (total % page_size != 0) {
					page_num = Math.ceil(total / page_size);
				}
				find(page_num);
			});
		};

		//alert(GetQueryString("参数名1")); alert(GetQueryString("参数名2"));
		var getQueryString = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		};
		//alert(GetCodeString("参数名1")); alert(GetCodeString("参数名2"));
		//获取get请求中的中文参数
		var getCodeString = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return r[2];
			return null;
		};
		/**
		 * 如果str最左侧是以withOf起始，则截取掉withOf
		 * @param {String} str
		 * @param {String} withOf
		 */
		var trimLiftWith = function(str, withOf) {
			//if start with given pattern
			if (str.indexOf(withOf) == 0) {
				return str.substr(withOf.length);
			}
			return str;
		};
		var fullUrl = function(relativeUrl) {

			return baseUrl + trimLiftWith(relativeUrl, '/');

		};

		/**
		 * @description To determine whether positive integers in the specified range.
		 * @param {String} str - The number of by judgment.
		 * @param {String} min - The minimum value.
		 * @param {String} max - The maximum.
		 * @returns
		 */
		var isRangeOfPositiveInteger = function(str, min, max) {
			var reg = /^\d+$/;
			if (reg.test(str)) {
				if (typeof(min) == 'undefined') {
					min = 1;
				}
				if (typeof(max) == 'undefined') {
					max = 999999999;
				}
				if (str >= min & str <= max) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		};

		var getJuris = function(domain_id) {
			var value = 0;
			var jurisData = localStorage.getItem("jurisData")?localStorage.getItem("jurisData"):'';
			if(jurisData != ''){
				jurisData = JSON.parse(jurisData);
				$.each(jurisData.juris, function(n, data) {
					if (data.domain_id == domain_id) {
						value = data.value;
					}
				});
			}
			return value;
		};

		/**
		 * @decription 执行用户当前网络的权限
		 * @param {String} domain_id - The current domain_id.
		 * @param {String} class_name - The btn's class name to disable.
		 */
		var executeJuris = function(domainId, className) {
			var juris = "";
			if (domainId) {
				juris = getJuris(domainId);
			} else {
				juris = getJuris(domain_id);
			}
			if (juris != 0) {
				if (className) {
					$('.' + className + '').attr("disabled", "disabled");
				} else {
					$('.edit').attr("disabled", "disabled");
				}
			}
			/*else{
						if(className){
							$('.'+className+'').removeAttr("disabled", "disabled");
						}else{
							$('.edit').removeAttr("disabled", "disabled");
						}
					}*/
		};

		/**
		 * 生成指定位数的随机数
		 *
		 * @param n 位数
		 * @returns {String} 随机数
		 */
		var generateMixed = function(n) {
			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			var res = "";
			for (var i = 0; i < n; i++) {
				var id = Math.ceil(Math.random() * 35);
				res += chars[id];
			}
			return res;
		};

		/**
		 * @description 读取acl来判断哪些设备类型的设备支持哪些功能.
		 * @param {String} acls - The acls backup responsed.
		 * @param {String} ap_type - The device type.
		 */
		var aclsCtrl = function(acls, ap_type) {
			/*data = {"acls":{"5G":{"FAP-252CPA":1,"FAP-252CP":0},
				"vlan":{"FAP-252CPA":1,"FAP-252CP":0},"radio":{"FAP-252CPA":1,"FAP-252CP":0},
				"ssid.5G-navi":{"FAP-252CPA":1,"FAP-252CP":0},"5G.radio":{"FAP-252CPA":1,"FAP-252CP":0},
				"DDoS":{"FAP-252CPA":1,"FAP-252CP":0},"FTP":{"FAP-252CPA":1,"FAP-252CP":0},
				"LoadBalance":{"FAP-252CPA":1,"FAP-252CP":1}}};*/

			if ("" != acls) {
				var featurePoint = "";
				for (var key in acls) {
					featurePoint += key + ",";
				}
				featurePoint = featurePoint.substring(0, featurePoint.length - 1); //vlan,5g_navi

				var point = featurePoint.split(','); //[vlan,5g_navi]
				$.each(point, function(n, point) {
					var isDevSup = acls[point] ? acls[point] : ""; //{"FAP-252CPA":0,"FAP-252CP":0}
					if ("" != isDevSup) {
						var devSup = "";
						for (var isSup in isDevSup) {
							devSup += isSup + ",";
						}
						devSup = devSup.substring(0, devSup.length - 1); //FAP-252CPA,FAP-252CP
						var devSupAttr = devSup.split(',');
						$.each(devSupAttr, function(n, devSupAttr) {
							if (ap_type == devSupAttr) {
								if (0 == acls[point][devSupAttr]) {
									console.log(ap_type + "不支持" + point);
									$('.' + ap_type).find('.' + point + '_cont').hide(); //.attr('disabled', 'disabled');
								} else if (1 == acls[point][devSupAttr]) {
									console.log(ap_type + "支持" + point);
								}
							}
						});
					}
				});
			}
		};

		/**
		 * @description 获取当月最后一天日期
		 * @param {String} year - The current year.
		 * @param {String} month - The current month.
		 */
		var getLastDay = function(year, month) {
			var new_year = year; //取当前的年份
			var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
			if (month > 12) { //如果当前大于12月，则年份转到下一年
				new_month -= 12; //月份减
				new_year++; //年份增
			}
			var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
			return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期
		};

		/**
		 * @description 判断浏览器版本
		 */
		var judgeBrowserVer = function() {
			var Sys = {};
			var ua = navigator.userAgent.toLowerCase();
			var s;
			if (!!window.ActiveXObject || "ActiveXObject" in window) {
				if (ua.match(/msie ([\d.]+)/) != null) {
					(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
				} else if (ua.match(/(trident)\/([\d.]+)/) != null) {
					(ua.match(/(trident)\/([\d.]+)/)[2] == "7.0") ? Sys.ie = "11.0" : 0;
				}
			} else if (ua.indexOf('firefox') > -1) {
				(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1]: 0;
			} else if (window.MessageEvent && !document.getBoxObjectFor && ua.indexOf('chrome') > -1) {
				(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1]: 0;
			} else if (window.opera) {
				(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1]: 0;
			} else if (window.openDatabase) {
				(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1]: 0;
			}
			/*if (Sys.ie) document.write('IE: ' + Sys.ie); 
			if (Sys.firefox) document.write('Firefox: ' + Sys.firefox); 
			if (Sys.chrome) document.write('Chrome: ' + Sys.chrome); 
			if (Sys.opera) document.write('Opera: ' + Sys.opera); 
			if (Sys.safari) document.write('Safari: ' + Sys.safari); */
			var ieVer = Sys.ie;
			var firefoxVer = Sys.firefox;
			var chromeVer = Sys.chrome;
			var operaVer = Sys.opera;
			var safariVer = Sys.safari;
			//console.log(Sys);
			var error = 0; //0:正常，-1:版本太低， 1:小众浏览器
			if (ieVer) {
				//console.log('IE: ' + Sys.ie);
				if (ieVer.substring(0, ieVer.indexOf('.')) < const_browser_laster_ver.ie) error = -1;
			} else if (firefoxVer) {
				//console.log('Firefox: ' + Sys.firefox);
				if (firefoxVer.substring(0, firefoxVer.indexOf('.')) < const_browser_laster_ver.firefox) error = -1;
			} else if (chromeVer) {
				//console.log('Chrome: ' + Sys.chrome);
				if (chromeVer.substring(0, chromeVer.indexOf('.')) < const_browser_laster_ver.chrome) error = -1;
			} else if (operaVer) {
				//console.log('Opera: ' + Sys.opera);
				if (operaVer.substring(0, operaVer.indexOf('.')) < const_browser_laster_ver.opera) error = -1;
			} else if (safariVer) {
				//console.log('Safari: ' + Sys.safari);
				if (safariVer.substring(0, safariVer.indexOf('.')) < const_browser_laster_ver.safari) error = -1;
			} else {
				error = 1;
			}
			return error;
		};

		//框架类防止重名，可采用noConflict方式重新恢复之前的$phi同名对象，类似jQuery同类方法。
		var _old$phi_ = window.$phi;
		var _phiProjectJs_ = window.phiProjectJs;
		window.phiProjectJs = exports;

		var noConflict = function(deep) {
			if (window.$phi === $phi) {
				window.$phi = _old$phi_;
			}
			if (deep && window.phiProjectJs === _phiProjectJs_) {
				phiProjectJs = _phiProjectJs_;
			}

			return exports;
		};

		//数组扩展方法 删除指定索引的数组
		Array.prototype.remove = function(dx) {
			if (isNaN(dx) || dx > this.length) {
				return false;
			}
			for (var i = 0, n = 0; i < this.length; i++) {
				if (this[i] != this[dx]) {
					this[n++] = this[i];
				}
			};
			this.length -= 1;
		};

		/**
		 * 生成指定位数的随机数
		 *
		 * @param n 位数
		 * @returns {String} 随机数
		 */
		var generateMixed = function generateMixed(n) {
			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			var res = "";
			for (var i = 0; i < n; i++) {
				var id = Math.ceil(Math.random() * 35);
				res += chars[id];
			}
			return res;
		};

		/** 
		 * 弹出模态框方法
		 *
		 * @id 需要弹出的div的id值
		 * @title 弹出框的标题
		 * @confirmCallback 点击确定按钮的回调函数
		 * @width 模态框的宽度
		 * @height 模态框高度
		 */
		var modal = function modal(id, title, confirmCallback, width, height) {
			var bodyDiv = $("#" + id);
			var modalId = id + "_modal";
			var oldModal = $("#" + modalId);
			if (oldModal) {
				oldModal.detach();
			}
			var body = $("body");
			var modal = $("<div class='modal fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'></div>");
			modal.attr("id", modalId);
			body.append(modal);
			var modal_dialog = $("<div class='modal-dialog modal-lg' role='document'></div>");
			modal_dialog.appendTo(modal);
			if (width) {
				modal_dialog.css("width", width);
			}
			if (height) {
				modal_dialog.css("height", height);
			}
			var modal_content = $("<div class='modal-content'></div>");
			modal_content.appendTo(modal_dialog);
			var modal_header = $("<div class='modal-header'><div class='icon-cancel' data-dismiss='modal'></div></div>");
			modal_header.appendTo(modal_content);
			var modal_title = $("<h4 class='modal-title'></h4>");
			modal_title.appendTo(modal_header);
			if (title) modal_title.text(title);

			var modal_body = $("<div class='modal-body'></div>");
			modal_body.appendTo(modal_content);
			modal_body.append(bodyDiv);
			bodyDiv.show();

			var modal_footer = $("<div class='modal-footer'></div>");
			modal_footer.appendTo(modal_content);
			var modal_cancel = $("<button type='button' class='btn cancelBtn' data-dismiss='modal'><span class='icon-modal-cancelBtn' >取消</button>");
			modal_footer.append(modal_cancel);
			var modal_confirm = $("<button type='button' class='btn findBtn' ><span class='icon-modal-findBtn' ></span>确定</button>");
			modal_footer.append(modal_confirm);

			if (confirmCallback) {
				modal_confirm.click(confirmCallback);
			}
			modal.modal({
				'backdrop': 'static'
			});
		};

		/**
		 * 弹出框方法
		 *
		 * @type:弹出框的类型，支持四种字符串类型 "warn","remind","msg","error" 分别对应警告、提示和消息类型的弹出框,如忽略，则为msg.
		 * @msg:弹出的具体消息内容(必须）
		 * @confirmCallback:点击确定按钮的回调函数（可选）
		 * @cancelCallback:点击关闭图标的回调函数（可选）
		 */
		var alert = function alert(type, msg, confirmCallback, cancelCallback,findRoot) {
			var len = arguments.length;
			if (len == 1) {
				msg = type;
				type = 'msg';
			} else if (len == 2) {
				if (msg instanceof Function) {
					confirmCallback = msg;
					msg = type;
				}
			}

            var body = $('body');
            if(findRoot !== 'undefined' && findRoot){
            	var count = 0;
                while(!body.hasClass('cloudac-body')){
                	body = $(parent.window.document.body);
                	if(count++ === 5){
                		break;
                	}
                }
            }
            
			//var body = $("#cloudac-body");
			var modal = $("<div class='dialog modal fade' aria-hidden='true' ></div>");
			/******for old version*********/
			if (!modal.modal || !(modal.modal instanceof Function)) {
				window.alert(msg);
				console.log("需要更新到新版本alert框！--" + msg);
				confirmCallback();
				return;
			}
			/******************************/

			body.append(modal);
			var modal_dialog = $("<div class='modal-dialog'></div>");
			modal_dialog.appendTo(modal);

			var modal_content = $("<div class='modal-content'></div>");
			modal_content.appendTo(modal_dialog);
			var modal_header = $("<div class='modal-header'><h4 class='modal-title'>&nbsp;</h4></div>");
			var modal_cancel = $("<div class='icon-cancel' data-dismiss='modal'></div>");
			var modal_cancel_div = $("<div style='width:52px;height:34px;float:right;'></div>");
			modal_cancel.appendTo(modal_cancel_div);
			modal_cancel_div.prependTo(modal_header);
			modal_header.appendTo(modal_content);
			var modal_body = $("<div class='modal-body'></div>");
			modal_body.appendTo(modal_content);
			var body_container = $("<div style='text-align:center; width:100%;'></div>");
			body_container.appendTo(modal_body);
			var img = $("<image src=''/>");
			if (type == "warn") {
				img.attr("src", baseUrl + "resources/images/alarm.png");
			} else if (type == "remind") {
				img.attr("src", baseUrl + "resources/images/alarm2.png");
			} else if (type == "msg") {
				img.attr("src", baseUrl + "resources/images/alarm3.png");
			} else if (type == "error") {
				img.attr("src", baseUrl + "resources/images/alarm.png");
			}
			img.appendTo(body_container);
			var body_text = $("<span style='margin-left:20px; font-size:16px; color:#333333;'></span>");
			body_text.html(msg);
			body_text.appendTo(body_container);


			var modal_footer = $("<div class='modal-footer' style='border-top:1px solid #dedede;'></div>");
			modal_footer.appendTo(modal_content);
			var modal_confirm;
			if (type == "warn") {
				var modal_cancel = $("<button type='button' class='btn cancelBtn' data-dismiss='modal'><span class='icon-modal-cancelBtn'></span><span class='mls' style='vertical-align:top;'>取消</span></button>");
				modal_footer.append(modal_cancel);
				modal_confirm = $("<button type='button' class='btn confirmBtn' data-dismiss='modal' style='margin-left:20px;'><span class='icon-modal-confirmBtn'></span><span class='mls' style='vertical-align:top;'>确定</span></button>");
			} else if (type == "error") {
				modal_confirm = $("<button type='button' class='btn confirmBtn' data-dismiss='modal' style='margin-left:20px;'><span class='icon-modal-confirmBtn'></span><span class='mls' style='vertical-align:top;'>确定</span></button>");
			} else {
				modal_confirm = $("<button type='button' class='btn btn-info' data-dismiss='modal' style='margin-left:20px;'><span class='icon-modal-confirmBtn'></span><span class='mls' style='vertical-align:top;'>确定</span></button>");
			}
			modal_footer.append(modal_confirm);

			if (confirmCallback) {
				modal_confirm.click(confirmCallback);
			}
			if(cancelCallback){
				modal_cancel_div.click(cancelCallback);
			}
			modal.modal();
		};

		/**
		 * 关闭模态框方法
		 *
		 * @id 需关闭的div的id值
		 */
		var closeModal = function closeModal(id) {
			var modalId = id + "_modal";
			var modalobj = $("#" + modalId);
			modalobj.modal('hide');
	};
	
	/**
	 * @description validate mac is or not separate with ':'.
	 * @param {String} mac - The MAC array or only one.
	 * @param {String}  separator - The Separate MAC array of separator, default ','.
	 */
	var checkMAC = function(mac, separator){
		var reg = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
		if(separator == undefined || separator == "" || separator == 'null' || separator == null){
			separator = ',';
		}
		var arr = mac.split(separator);
		console.log(arr);
		var flag = 0;
		for(var i=0; i<arr.length; i++){
			if(arr[i].length != 17){
				flag += 1;
			}else{
				if(!reg.test(arr[i])){
					flag += 1;
				}
			}
		}
		if(flag == 0){
			return true;
		}else{
			return false;
		}
		};
		/**
		 * @description Check if URL is legal
		 * @param {String} year - The url to check.
		 * @param {String} month - The Separate URL array of separator, default ','.
		 */
		var checkUrl = function(url, separator){
			var RegUrl = "^((https|http|ftp|rtsp|mms)?://)" 
				+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
		           + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
		           + "|" // 允许IP和DOMAIN（域名）
		           + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
		           + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
		           + "[a-z]{2,6})" // first level domain- .com or .museum 
		           + "(:[0-9]{1,4})?" // 端口- :80 
		           + "((/?)|" // a slash isn't required if there is no file name 
		           + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
			var reg = new RegExp(RegUrl);
			if(separator == undefined || separator == "" || separator == 'null' || separator == null){
				separator = ',';
			}
			var arr = url.split(separator);
			for(var i=0; i<arr.length; i++){
				if(reg.test(arr[i])){
					return true;
				}else{
					return false;
				}
			}
		};
		var isTimeCompare =function(startTime,endTime)
		{
			var intStart=parseInt(startTime.split(":")[0]) * 60*60 + parseInt(startTime.split(":")[1]*60+parseInt(startTime.split(":")[2]));
			var intEnd=parseInt(endTime.split(":")[0]) * 60*60 + parseInt(endTime.split(":")[1]*60+parseInt(endTime.split(":")[2]));
			var result=intEnd-intStart;
			if(result>=60)
			{
				return true;
			}
			else
			{
				return false;
			}
		};

		//for check ip address
		/**
		 * @description for check ip address
		 * @param {String} field - The object whitch contains ip. 
		 */
		var checkIpAddr = function(field)
		{
			if (field.value == "")
		    {
		        field.value = field.defaultValue;
		        return -1;
		    }
			
			if (field.value.split(".").length > 4 || field.value.split(".")[0] == "" || field.value.split(".")[1] == "" || field.value.split(".")[2] == "" || field.value.split(".")[3] == "")
		    {
		        field.value = field.defaultValue;
		        return -2;
		    }
		    

		    if (validateKey(field.value) != 1)
		    {
		        field.value = field.defaultValue;
		        return -3;
		    }
			if (!checkDigitRange1(field.value, 1, 224, 239) || getDigit(field.value, 1) == 127)
		    {
		        field.value = field.defaultValue;
		        return -4;
		    }
		    if (!checkDigitRange(field.value, 1, 1, 254))
		    {
		        field.value = field.defaultValue;
		        return -5;

		    }
		    if (!checkDigitRange(field.value, 2, 0, 255))
		    {
		        field.value = field.defaultValue;
		        return -6;
		    }
		    if (!checkDigitRange(field.value, 3, 0, 255))
		    {
		        field.value = field.defaultValue;
		        return -7;
		    }
		    if (!checkDigitRange(field.value, 4, 1, 254))
		    {
		        field.value = field.defaultValue;
		        return -8;
		    }
		    return 0;
		};

		var validateKey = function(str)
		{
			for (var i=0; i<str.length; i++) {
				if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
						(str.charAt(i) == '.' ) )
						continue;
			return 0;
			}
			var item_str = str.split('.');
			for(i=0; i<item_str.length; i++)
			{
				if(item_str[i].charAt(0) == '0' && item_str[i].charAt(1) !='')
					return 2;
			}
		  return 1;
		};

		var checkDigitRange1 = function(str, num, min, max)
		{
		  var d = getDigit(str,num);
		  if ( d > max || d < min )
		      	return true;
		  return false;
		};

		var checkDigitRange = function(str, num, min, max)
		{
		  var d = getDigit(str,num);
		  if ( d > max || d < min )
		      	return false;
		  return true;
		};

		var getDigit = function(str, num)
		{
		  var i=1;
		  if ( num != 1 ) {
		  	while (i!=num && str.length!=0) {
				if ( str.charAt(0) == '.' ) {
					i++;
				}
				str = str.substring(1);
		  	}
		  	if ( i!=num )
		  		return -1;
		  }
		  for (i=0; i<str.length; i++) {
		  	if ( str.charAt(i) == '.' ) {
				str = str.substring(0, i);
				break;
			}
		  }
		  if ( str.length == 0)
		  	return -1;
		  var d = parseInt(str, 10);
		  return d;
		};
		
		
		/*check Mask */
		/**
		 * @description for Subnet Mask
		 * @param {String} fobj - The object whitch Subnet Mask. 
		 */
		var changeIP = function(ip) 
		{ 
			return (ip+256).toString(2).substring(1); 
		}; 

		var checkMask = function(fobj)
		{ 
			var MaskStr = fobj.value;
			var IPPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
			if(!IPPattern.test(MaskStr))return false; 
			
			var IPArray = MaskStr.split("."); 
			var ip1 = parseInt(IPArray[0]); 
			var ip2 = parseInt(IPArray[1]); 
			var ip3 = parseInt(IPArray[2]); 
			var ip4 = parseInt(IPArray[3]); 
			if ( ip1<=0 || ip1>255 
			   || ip2<0 || ip2>255 
			   || ip3<0 || ip3>255 
			   || ip4<0 || ip4>255 ) 
			{ 
			   return false; 
			} 	
			var ip_binary = changeIP(ip1) + changeIP(ip2) + changeIP(ip3) + changeIP(ip4); 	
			if(-1 != ip_binary.indexOf("01"))  return false; 
			return true; 
		}; 
		
		
		/*check GatewayAddress */
		/**
		 * @description for Gateway Address
		 * @param {String} field - The object whitch Gateway Address 
		 */
		var checkGatewayAddr = function(field)
		{
		    
			if (field.value == "")
		    {
		        field.value = field.defaultValue;
		        return -1;
		    }
			
			if (field.value.split(".").length > 4)
		    {
		        field.value = field.defaultValue;
		        return -2;
		    }
		    

		    if (validateKey(field.value) != 1)
		    {
		        field.value = field.defaultValue;
		        return -3;
		    }
		    if (!checkDigitRange(field.value, 1, 1, 223))
		    {
		        field.value = field.defaultValue;
		        return -4;
		    }
		    if (getDigit(field.value, 1) == 127)
		    {
		        field.value = field.defaultValue;
		        return -5;

		    }
		    if (!checkDigitRange(field.value, 2, 0, 255))
		    {
		        field.value = field.defaultValue;
		        return -6;
		    }
		    if (!checkDigitRange(field.value, 3, 0, 255))
		    {
		        field.value = field.defaultValue;
		        return -7;
		    }
		    if (!checkDigitRange(field.value, 4, 1, 254))
		    {
		        field.value = field.defaultValue;
		        return -8;
		    }
		    return 0;
		};
		
		
		
		var checkDNS = function(field)
		{		    
			
		/*	if (field.value == "")
		    {
		        field.value = field.defaultValue;
		        return -1;
		    }*/
			if (field.value.split(".").length != 4)
		    {
		        field.value = field.defaultValue;
		        return -2;
		    }
		    if (validateKey(field.value) != 1)
		    {
		        field.value = field.defaultValue;
		        return -3;
		    }
		    if (!checkDigitRange(field.value, 1, 1, 223))
		    {
		        field.value = field.defaultValue;
		        return -4;
		    }
		    if (getDigit(field.value, 1) == 127)
		    {
		        field.value = field.defaultValue;
		        return -5;
		    }
		    if (!checkDigitRange(field.value, 2, 0, 255))
		    {
		        field.value = field.defaultValue;
		        return -6;
		    }
		    if (!checkDigitRange(field.value, 3, 0, 255))
		    {
		        field.value = field.defaultValue;
		        return -7;
		    }
		    if (!checkDigitRange(field.value, 4, 1, 254))
		    {
		        field.value = field.defaultValue;
		        return -8;
		    }
		    return 0;
		};
		
		
		/*var checkMac = function(fobj)
		{
			var j=0;
			var macvalue=fobj.value;
			var myRE = /[0-9a-fA-F]{12}/;
			var mactmp="";	
			var macs = new Array();
			
			if(macvalue.length!=17)
				return false;
			else
			{
				if(macvalue.charAt(2)==':')
				{
					for(j=2;j<17;j+=3)
		        		{
		            			if(macvalue.charAt(j)!=':')
		            			{
		                			return false;
		            			}
		        		}
					mactmp = macvalue.replace(/:/g,"");
					macs = fobj.value.split(":");
					if((macs[0] & 1)==1)
					{ 
						return false;    
					}
					if((parseInt(macs[0],16) & parseInt(macs[1],16) & parseInt(macs[2],16) & parseInt(macs[3],16) & parseInt(macs[4],16) & parseInt(macs[5],16)) == 0xff || (parseInt(macs[0],16) | parseInt(macs[1],16) | parseInt(macs[2],16) | parseInt(macs[3],16) | parseInt(macs[4],16) | parseInt(macs[5],16)) == 0x00)
					{  
						return false; 
					}
				}	
				else if(macvalue.charAt(2)=='-')
				{
					return false;
				}
				else
					return false;

				if(mactmp.length != 12 || myRE.test(mactmp)!=true)	
				{
					return false;
				}		
			}
			return true;
		};*/
		/**
		 * @description get character's length,contains Chinese characters
		 * @param {String} character - The character for get length.
		 */
		var getCharacterLen = function (character) {
		    var len = 0;
		    for (var i = 0; i < character.length; i++) {
		        if (character[i].match(/[^\x00-\xff]/ig) != null) //全角
		            len += 3;
		        else
		            len += 1;
		    };
		    return len;
		};
		/**
		 * @description get substring character with length,contains Chinese characters
		 * @param {String} character - The character for substring.
		 * @param {String} len - The length of the interception.
		 */
		var getSubstringCharacter = function(character, len){
			var str = '';
			var num = 0;
		    for (var i = 0; i < character.length; i++) {
		    	if(num <= len){
		    		if (character[i].match(/[^\x00-\xff]/ig) != null){ //全角
		    			num += 3;
		    			str += character[i];
		    		}else{
		    			num += 1;
		    			str += character[i];
		    		}
		    	}
		    };
		    return str;
		};	
		
		
		//以下为导出变量列表
		exports.token = token;
		exports.get = get;
		exports.post = post;
		exports.showError = showError;
		exports.page = page;
		exports.check = check;
		exports.getIds = getIds;
		exports.getCheckedIds = getCheckedIds;
		exports.refreshByInterval = refreshByInterval;
		exports.clearInterval = clearInterval;
		exports.noConflict = noConflict;
		exports.paginationBtn = paginationBtn;
		exports.page_num = page_num;
		exports.domain_id = domain_id;
		exports.getQueryString = getQueryString;
		exports.getCodeString = getCodeString;
		exports.baseUrl = baseUrl;
		exports.fullUrl = fullUrl;
		exports.isRangeOfPositiveInteger = isRangeOfPositiveInteger;
		exports.isTimeCompare=isTimeCompare;
		exports.generateMixed = generateMixed;
		exports.aclsCtrl = aclsCtrl;
		exports.generateMixed = generateMixed;
		exports.str2json = str2json;
		exports.getJuris = getJuris;
		exports.executeJuris = executeJuris;
		exports.getLastDay = getLastDay;
		exports.judgeBrowserVer = judgeBrowserVer;
		exports.modal = modal;
		exports.closeModal = closeModal;
		exports.alert = alert;
		exports.checkMAC = checkMAC;
		exports.checkUrl = checkUrl;
		exports.isSupportLocalStorage = isSupportLocalStorage;
		exports.checkIpAddr = checkIpAddr;
		exports.checkMask = checkMask;
		exports.checkGatewayAddr = checkGatewayAddr;
		exports.checkDNS = checkDNS;
	//	exports.checkMac = checkMac;
		exports.getCharacterLen = getCharacterLen;
		exports.getSubstringCharacter = getSubstringCharacter;
		exports.isPopRelogin = isPopRelogin;
		return exports;
	};
	warpper(factory);
})();


