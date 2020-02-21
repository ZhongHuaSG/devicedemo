package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class LampPara {

    @JSONField(name="ANGLE")
    private String angle;

    @JSONField(name="ANTISTATIC")
    private String antistatic;

    @JSONField(name="BRIGHT")
    private String bright;

    @JSONField(name="LEAKAGE_CURRENT")
    private String leakage_Current;

    @JSONField(name="STYLE")
    private String style;

    @JSONField(name="WAVELEN")
    private String wavelen;

}
