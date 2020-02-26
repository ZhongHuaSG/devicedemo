package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Body {

    @JSONField(name="COMLIST")
    private List<ComList> comList;

    @JSONField(name="DESTINATION")
    private Destinaition destination;

    @JSONField(name="SOURCE")
    private Source source;

}
