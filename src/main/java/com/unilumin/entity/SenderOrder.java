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
public class SenderOrder {

    @JSONField(name="BRIGHT")
    private String bright;

    @JSONField(name="CHROMA")
    private String chroma;

    @JSONField(name="DEFAULT_BRIGHT")
    private String default_Bright;

    @JSONField(name="GAMMA")
    private String gamma;

    @JSONField(name="ID")
    private String id;

    @JSONField(name="INPUTSOURCE")
    private String inputSource;

    @JSONField(name="IPADDR")
    private String ipAddr;

    @JSONField(name="MACADDR")
    private String macAddr;

    @JSONField(name="PORT")
    private String port;

    @JSONField(name="PORT_ORDER")
    private List<Map<String,Object>> portOrder;

}
