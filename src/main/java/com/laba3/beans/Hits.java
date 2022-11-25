package com.laba3.beans;

import com.laba3.entities.Hit;
import com.laba3.utils.DB;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.annotation.ManagedProperty;
import jakarta.inject.Named;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Named
public class Hits {
    @ManagedProperty(value = "#{hit}")
    private Hit hit;
    private List<Hit> hits;

    public Hits() {
        hit = new Hit();
        hits = new ArrayList<>();

        loadHits();
    }


    public void loadHits() {
        hits = DB.getInstance().getAll();
    }

    public void clear() {
        if (DB.getInstance().clear()) {
            hits.clear();
        }
    }

    public void addHit() {
        hit.checkHit();
        if (DB.getInstance().add(hit)) {
            hits.add(hit);
            hit = new Hit();
        }
    }


    public List<Hit> getHits() {
        return hits;
    }

    public void setHits(List<Hit> hits) {
        this.hits = hits;
    }

    public Hit getHit() {
        return hit;
    }

    public void setHit(Hit hit) {
        this.hit = hit;
    }
}
