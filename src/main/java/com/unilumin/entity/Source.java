package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;


@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Source {

    @JSONField(name="DEVICE")
    private String device;

    @JSONField(name="LEDSCREEN")
    private LedScreen ledScreen;

}
