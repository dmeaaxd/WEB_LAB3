package com.laba3.entities;

public class Hit {
    private int id;

    private Integer x;
    private Double y;
    private Double r;
    private String hitResult;

    public Hit() { }

    public void checkHit() {
        hitResult = (
                (x >= 0 && y >= 0 && x * x + y * y <= r * r) ||
                (x <= 0 && y >= 0 && y <= 2 * x + r) ||
                (x >= 0 && y <= 0 && x <= r && y >= -r / 2.0)
        ) ? "<span style='color: green'>TRUE</span>" : "<span style='color: red'>FALSE</span>";
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public String getHitResult() {
        return hitResult;
    }

    public void setHitResult(String hitResult) {
        this.hitResult = hitResult;
    }
}
