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
public class Body {

    @JSONField(name="COMLIST")
    private List<Map<String,Object>> comList;

    @JSONField(name="DESTINATION")
    private Map<String,Object> destination;

    @JSONField(name="SOURCE")
    private Map<String,Object> source;

}
