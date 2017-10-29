/**
 * Project : Cloud-WIFI
 * 
 * File generated at : 2015年3月22日-下午8:14:22
 * 
 * Copyright 2015 Phicomm Co.,Ltd.
 * 
 */
package com.alice.application.subscriber.util;

import java.util.HashMap;
import java.util.Map;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;


/**
 * 
 * ResponseMessage 用于封装返回出错信息
 * 
 * TODO json String 格式检验信息记录
 * 
 * author: bin, 2015年3月22日-下午8:14:22, based on @version 1.0.1.22
 * 
 */
public class ResponseMessage {
	
	/** The Constant ERROR_CODE_NA. */
	// 上层接口常用参数的封装. error code and detailError code should not be -1.
	public static final int ERROR_CODE_NA = -1;

	/** The Constant ERROR_STRING_NA. */
	public static final String ERROR_STRING_NA = "N/A";

	/** The _token. */
	private String _token = ERROR_STRING_NA;

	/** The error value. */
	private int errorValue = ERROR_CODE_NA;

	/** The error msg. */
	private String errorMsg = ERROR_STRING_NA;

	/** The json result body. */
	private String jsonResultBody = "{}";

	/** The with detail. */
	boolean withDetail = false;

	/** The detail error. */
	private String detailError = ERROR_STRING_NA;

	/** The detail error code. */
	private int detailErrorCode = ERROR_CODE_NA;

	/**
	 * token 用链式构造的方式，为ErrorResponse增加参数.
	 *
	 * @param token the token
	 * @return ErrorResponse 返回值说明
	 * @since 1.0.0 (从xx版本开始实现，可选)
	 */
	public ResponseMessage token(String token) {
		this._token = token;
		return this;
	}

	/**
	 * Error 构造ErrorResponse的error值。 (这里描述这个方法适用条件 – 可选).
	 *
	 * @param err            用枚举值作为error值
	 * @return ErrorResponse 返回值说明
	 * @since 1.0.0 (从xx版本开始实现，可选)
	 */
	public ResponseMessage Error(ErrorEnum err) {
		this.errorValue = err.getValue();
		this.errorMsg = err.getDisplay();
		return this;
	}

	/**
	 * Error.
	 *
	 * @param errorValue the error value
	 * @param errorMsg the error msg
	 * @return the response message
	 */
	public ResponseMessage Error(int errorValue, String errorMsg) {
		this.errorValue = errorValue;
		if (null != errorMsg) {
			this.errorMsg = errorMsg;
		}
		return this;
	}

	/**
	 * Detail error.
	 *
	 * @param detailErrorCode the detail error code
	 * @param detailError the detail error
	 * @return the response message
	 */
	public ResponseMessage detailError(int detailErrorCode, String detailError) {
		if (detailErrorCode != ERROR_CODE_NA) {
			this.detailErrorCode = detailErrorCode;
			this.withDetail = true;
			this.detailError = detailError;
		} else {
			this.withDetail = false;
		}

		return this;
	}

	/**
	 * Ok.
	 *
	 * @return the response message
	 */
	public ResponseMessage Ok() {
		this.errorValue = ErrorEnum.errNone.getValue();
		return this;
	}

	/**
	 * Ok 当结果正确时，使用该方法返回pojo类型的key-value对，作为返回内容。.
	 *
	 * @param keyValue            key-value对构成的map. 当value值为数值时，返回结果中value不包含引号。
	 * @return ErrorResponse 返回值说明
	 * @since 1.0.0 (从xx版本开始实现，可选)
	 */
	public ResponseMessage Ok(Map<String, Object> keyValue) {
		jsonResultBody = toJSON(keyValue);
		Ok();
		return this;

	}

	/**
	 * Ok.
	 *
	 * @param jsonObj the json obj
	 * @return the response message
	 */
	public ResponseMessage Ok(JSONObject jsonObj) {
		jsonResultBody = jsonObj.toString();
		Ok();
		return this;
	}

	/**
	 * Ok.
	 *
	 * @param md the md
	 * @return the response message
	 */
//	public ResponseMessage Ok(ModelDataSet md) {
//		jsonResultBody = md.toJSONByRows();
//		Ok();
//		return this;
//	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		assert (_token != null) : " token is null.";
		assert (!_token.equals("")) : "token is empty string";

		StringBuffer response = new StringBuffer();
		response.append("\"response\":");

		try {
			JSONObject jsonBody = new JSONObject(jsonResultBody);
			jsonBody.put("token", _token);
			jsonBody.put("error", Integer.toString((errorValue)));
			if (!errorMsg.equals(ERROR_STRING_NA))
				jsonBody.put("errorMsg", errorMsg);

			if (withDetail) {
				jsonBody.put("detailErrorCode", this.detailErrorCode);
				jsonBody.put("detailError", this.detailError);
			} else {
				jsonBody.put("detailErrorCode", Integer.toString((errorValue)));
				jsonBody.put("detailError", errorMsg);
			}

			response.append(jsonBody.toString());

		} catch (JSONException e) {

		}
		return response.toString();

	}

	/**
	 * To json.
	 *
	 * @param rowData the row data
	 * @return the string
	 */
	private String toJSON(Map<String, Object> rowData) {
		/*
		 * JSONObject jsonObject = new JSONObject(); for (String key : rowData.keySet()) { Object value = rowData.get(key); jsonObject.put(key, value); } return
		 * jsonObject.toString();
		 */
		return JsonParserUtil.instanse.obj2Json(rowData);
	}

	/**
	 * Gets the.
	 *
	 * @return the response message
	 */
	public static ResponseMessage get() {
		return new ResponseMessage();
	}

	/**
	 * Gets the error value.
	 *
	 * @return the error value
	 */
	public int getErrorValue() {
		return errorValue;
	}

	/**
	 * Gets the error msg.
	 *
	 * @return the error msg
	 */
	public String getErrorMsg() {
		return errorMsg;
	}

	/**
	 * Gets the json result body.
	 *
	 * @return the json result body
	 */
	public String getJsonResultBody() {
		return jsonResultBody;
	}

	/**
	 * Gets the detail error.
	 *
	 * @return the detail error
	 */
	public String getDetailError() {
		return detailError;
	}

	/**
	 * Gets the detail error code.
	 *
	 * @return the detail error code
	 */
	public int getDetailErrorCode() {
		return detailErrorCode;
	}

	/**
	 * Test.
	 *
	 * @param args the args
	 */
	public static void test(String... args) {
		// "response":{"token":"abcd","error":"1010"}
		System.out.println(ResponseMessage.get().Error(1010, null).token("abcd"));
		// "response":{"token":"abcd","error":"0"}
		System.out.println(ResponseMessage.get().Ok().token("abcd"));

		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("xiaoming", "male");
		map.put("xiaohong", 35);

		// "response":{"xiaoming":"male","xiaohong":35,"token":"abcde","error":"0"}
		System.out.println(ResponseMessage.get().Ok(map).token("abcde"));

		// "response":{"token":"abcde","error":"1010","errorMsg":"参数错误","detailErrorCode":3456,"detailError":"作者头昏中..."}
		System.out.println(ResponseMessage.get().Error(ErrorEnum.ERR_STD_1010).token("abcde").detailError(3456, "作者头昏中..."));
	}

}
