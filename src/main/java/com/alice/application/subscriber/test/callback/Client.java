/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月23日-下午1:38:32  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.test.callback;

/**  
 *   
 * Client  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月23日-下午1:38:32, based on @version 1.0.0     
 *  
 */
public class Client implements CSCallBack{

	 private Server server;

	    public Client(Server server) {
	        this.server = server;
	    }

	    public void sendMsg(final String msg){
	        System.out.println("客户端：发送的消息为：" + msg);
	        new Thread(new Runnable() {
	            @Override
	            public void run() {
	                server.getClientMsg(Client.this,msg);
	            }
	        }).start();
	        System.out.println("客户端：异步发送成功");
	    }

	    @Override
	    public void process(String status) {
	        System.out.println("客户端：服务端回调状态为：" + status);
	    }
}
