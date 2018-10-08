package techlab.model;

import java.util.Date;

public class GetOffsetAtDateTimeResponse {


    private Date dateTime;
    private Long offset;

    /**
     * @return the offset
     */
    public Long getOffset() {
        return offset;
    }

    /**
     * @param offset the offset to set
     */
    public void setOffset(Long offset) {
        this.offset = offset;
    }

    /**
     * @return the dateTime
     */
    public Date getDateTime() {
        return dateTime;
    }
    /**
     * @param dateTime the dateTime to set
     */
    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
    

}