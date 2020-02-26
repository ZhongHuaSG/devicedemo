package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class LedParas {

    @JSONField(name="ANDROID_IP")
    private String android_Ip;

    @JSONField(name="ANDROID_MAC")
    private String android_Mac;

    @JSONField(name="CMD")
    private String cmd;

    @JSONField(name="COMMON_MODPARAS")
    private CommonModparas common_Modparas;

    @JSONField(name="COMMON_RECPARAS")
    private CommonRecparas common_Recparas;

    @JSONField(name="CONTRAST")
    private String contrast;

    @JSONField(name="CURRENT")
    private String current;

    @JSONField(name="CURRENT_WORKTIME")
    private String current_Worktime;

    @JSONField(name="CUSTOM")
    private String custom;

    @JSONField(name="ENVI_BRIGHT")
    private String envi_Bright;

    @JSONField(name="FAN_CTRL")
    private String fan_Ctrl;

    @JSONField(name="HUE")
    private String hue;

    @JSONField(name="HUMIDITY")
    private String humidity;

    @JSONField(name="LED_RSLT")
    private String led_Rslt;

    @JSONField(name="LED_SPACE")
    private String led_Space;

    @JSONField(name="LED_TYPE")
    private String led_Type;

    @JSONField(name="ORDERFORM")
    private String orderForm;

    @JSONField(name="RT_POWERDIS")
    private String re_PowerDis;

    @JSONField(name="SATURABILITY")
    private String saturabilty;

    @JSONField(name="SENDER_CNT")
    private String sender_Cnt;

    @JSONField(name="SENDER_ORDER")
    private List<SenderOrder> senderOrderList;

    @JSONField(name="TEMP")
    private String temp;

    @JSONField(name="TOTAL_WORKTIME")
    private String total_WorkTime;

    @JSONField(name="VOLTAGE")
    private String voltage;

}
