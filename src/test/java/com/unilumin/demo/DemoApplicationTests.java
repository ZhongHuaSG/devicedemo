package com.unilumin.demo;

import com.alibaba.fastjson.JSON;
import com.unilumin.entity.Body;
import com.unilumin.utils.ReadUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
class DemoApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    public static void main(String []args){

       String path = "E:\\ledparas2.json";
        String s = ReadUtils.readJsonFile(path);
        Map<String,Object> body = JSON.parseObject(s);
        System.out.println("body==========="+body.toString());
        Body bodyBean = JSON.toJavaObject(JSON.parseObject(s),Body.class);
        System.out.println("bodyBean==========="+bodyBean.toString());
        Map<String,Object> destinaition = (Map<String, Object>) body.get("DESTINATION");
        System.out.println("id============"+destinaition.get("ID"));
        System.out.println("device============"+destinaition.get("DEVICE"));
        System.out.println("INTERFACES============"+destinaition.get("INTERFACES"));
//
        JSONArray links = jobj.getJSONArray("links");

        for (int i = 0 ; i < links.size();i++){
            JSONObject key1 = (JSONObject)links.get(i);
            String name = (String)key1.get("name");
            String url = (String)key1.get("url");
            System.out.println(name);
            System.out.println(url);
        }

    }

}
