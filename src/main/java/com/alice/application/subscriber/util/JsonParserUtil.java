/*
 * 
 * Cloud AC 
 * 
 */
package com.alice.application.subscriber.util;

import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * The Enum JsonParserUtil.
 */
public enum JsonParserUtil {
	
	/** The instanse. */
	instanse;

	/** The Constant gson. */
	private final static Gson gson = new GsonBuilder().create();;

	/**
	 * Obj2 json.
	 *
	 * @param obj the obj
	 * @return the string
	 */
	public String obj2Json(Object obj) {
		return gson.toJson(obj);
	}

	/**
	 * Json2 obj.
	 *
	 * @param <T> the generic type
	 * @param json the json
	 * @param type the type
	 * @return the t
	 */
	public <T> T json2Obj(String json, Type type) {
		return gson.fromJson(json, type);
	}

	/**
	 * Json2 obj.
	 *
	 * @param <T> the generic type
	 * @param json the json
	 * @param cls the cls
	 * @return the t
	 */
	public <T> T json2Obj(String json, Class<T> cls) {
		return gson.fromJson(json, cls);
	}

	/**
	 * Obj2 map.
	 *
	 * @param obj the obj
	 * @return the map
	 * @throws IllegalArgumentException the illegal argument exception
	 * @throws IllegalAccessException the illegal access exception
	 */
	public Map<String, Object> obj2Map(Object obj) throws IllegalArgumentException, IllegalAccessException {
		Map<String, Object> rs = new HashMap<>();
		if (obj == null)
			return rs;
		Class<?> cls = obj.getClass();
		Field[] fields = cls.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			rs.put(field.getName(), field.get(obj));
		}
		return rs;
	}
}
