/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月23日-下午1:43:22  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.test.callback;

/**  
 *   
 * Server  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月23日-下午1:43:22, based on @version 1.0.0     
 *  
 */
public class Server {
	public void getClientMsg(CSCallBack csCallBack , String msg) {
        System.out.println("服务端：服务端接收到客户端发送的消息为:" + msg);

        // 模拟服务端需要对数据处理
        try {
            Thread.sleep(5 * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("服务端:数据处理成功，返回成功状态 200");
        String status = "200";
        csCallBack.process(status);
    }
}
