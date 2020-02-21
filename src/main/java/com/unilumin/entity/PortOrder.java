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
public class PortOrder {

    @JSONField(name="ID")
    private String id;

    @JSONField(name="BOX")
    private List<Map<String,Object>> box;

}
