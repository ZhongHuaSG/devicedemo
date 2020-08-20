package com.unilumin.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.unilumin.entity.Body;
import com.unilumin.utils.ReadUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
/**
 * @author ZhongWei
 * */
public class MainController {

    @Value("${jsonfile.dir}")
    private  String name;

    /**
     * 获取json文件参数接口
     * */
    @GetMapping("/getJsonMessage")
    @ResponseBody
    public String getJsonMessage(){
        String s = ReadUtils.readJsonFile(name);
        Map<String,Object> lbody = JSON.parseObject(s);
        Body bodyBean = JSON.toJavaObject(JSON.parseObject(s),Body.class);
        System.out.println(s);
        return s;
    }

    /**
     * 获取屏幕亮度或者调节亮度接口 ----判断依据 para值为空与否
     *
     * @Param  para
     * */
    @GetMapping("/setPara")
    @ResponseBody
    public JSONObject setPara(@Param("para")String para){
        //返回的Json
        JSONObject resultJson = new JSONObject();
        if(para.equals("")||para == null){
            resultJson.put("para","76");
        }else{
            //设置para值并传回给安卓播放器端
            System.out.println("收到的para"+para);
        }
        resultJson.put("resultCode","200");
        return resultJson;
    }

}
