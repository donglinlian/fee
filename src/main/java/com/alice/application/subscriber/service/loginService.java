package com.alice.application.subscriber.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.alice.application.subscriber.dao.ILoginDao;

@Service
@Transactional
@EnableTransactionManagement 
public class loginService implements ILoginService {
	@Resource 
	ILoginDao loginDao;

	@Override
	public boolean checkIsAdmin(String username, String password) {
		boolean isExist = loginDao.checkAccount(username,password);
		return isExist;
	}

}
