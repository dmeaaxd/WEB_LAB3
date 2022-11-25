package com.laba3.utils;

import com.laba3.entities.Hit;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class DB {
    private static Connection conn;
    private static DB instance;

    private DB() {
        try {
            conn = DriverManager.getConnection("jdbc:postgresql://pg:5432/studs", "***", "***");
            PreparedStatement ps = conn.prepareStatement(
            "CREATE TABLE IF NOT EXISTS \"hits\" (" +
                    "hit_id SERIAL PRIMARY KEY," +
                    "x INTEGER NOT NULL," +
                    "y DOUBLE PRECISION NOT NULL,"  +
                    "r DOUBLE PRECISION NOT NULL," +
                    "hit_result VARCHAR(40) NOT NULL" +
                ");"
            );
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            System.out.println("Ошибка инициализации БД");
            System.exit(0);
        }
    }

    public static DB getInstance() {
        if (instance == null)
            instance = new DB();
        return instance;
    }

    public List<Hit> getAll() {
        List<Hit> hits = new ArrayList<>();

        try {
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM hits");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Hit hit = new Hit();
                hit.setX(rs.getInt("x"));
                hit.setY(rs.getDouble("y"));
                hit.setR(rs.getDouble("r"));
                hit.setHitResult(rs.getString("hit_result"));
                hits.add(hit);
            }
        } catch (SQLException e) {
            System.out.println("Ошибка получения");
        }
        return hits;
    }

    public boolean add(Hit hit) {
        try {
            PreparedStatement ps = conn.prepareStatement("INSERT INTO hits(x, y, r, hit_result) VALUES (?, ?, ?, ?)");
            ps.setInt(1, hit.getX());
            ps.setDouble(2, hit.getY());
            ps.setDouble(3, hit.getR());
            ps.setString(4, hit.getHitResult());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            System.out.println("Ошибка добавления");
            System.out.println(e.getMessage());
            return false;
        }
    }

    public boolean clear() {
        try {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM hits");
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            return false;
        }
    }
}
