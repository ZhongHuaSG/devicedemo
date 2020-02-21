package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Box {

    @JSONField(name="ID")
    private String ID;

    @JSONField(name="ORDER")
    private String order;

    @JSONField(name="XPOS")
    private String xPos;

    @JSONField(name="YPOS")
    private String yPos;

    @JSONField(name="REC")
    private List<Map<String,Object>> rec;

    @JSONField(name="SENSOR_POWER")
    private List<Map<String,Object>> sensor_Power;


}
