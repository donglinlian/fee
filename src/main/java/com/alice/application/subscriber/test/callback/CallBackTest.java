/**  
 * Project : Cloud-WIFI   
 *    
 * File generated at : 2017年10月23日-下午1:43:56  
 * 
 * Copyright 2017 Phicomm Co.,Ltd.
 *   
 */
package com.alice.application.subscriber.test.callback;

/**  
 *   
 * CallBackTest  说明内容 
 *  
 * TODO 现有问题及需完善的方向  
 *  
 * author: Alice, 2017年10月23日-下午1:43:56, based on @version 1.0.0     
 *  
 */
public class CallBackTest {
	public static void main(String[] args) {
        Server server = new Server();
        Client client = new Client(server);

        client.sendMsg("Server,Hello~");
    }
}
